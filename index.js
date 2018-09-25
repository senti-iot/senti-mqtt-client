var mqtt = require('mqtt')

var client = mqtt.connect('mqtt://hive.senti.cloud', {
	keepalive: 6,
	clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
	will: {
		topic: 'sensor/status',
		payload: 'offline',
		qos: 1,
		retain: false
	}
})

var counter = 0
var packets = 0

client.on('connect', function () {
	client.subscribe('sensor/test', function (err) {
		if (!err) {
			client.publish('sensor/test', 'Hello Senti.Cloud from MQTT on Raspberry Pi')
			client.publish('sensor/status', 'online')
			counter++
		}
	})
})

client.on('message', function (topic, message) {
	console.log(message.toString())
	// client.end()
})

client.on('offline', function () {	
	console.log('We are offline')
	// client.end()
})

client.on("error", function (error) {
	console.log("ERROR: ", error);
})

client.on('reconnect', function () {
	console.log("Reconnected")	
})

client.on('disconnect', function () {
	console.log("Disconnected ...");
})

client.on('close', function () {	
	// console.log('We are closing')
})

/* client.on('packetreceive', function (packet) {
	console.log('Packet received: ', packet)
}) */

client.on('packetsend', function (packet) {
	packets++
	if (counter > 0) {
		console.log('Ping! ', 'Connection no.: ', counter, ' Ping no.: ', packets)
	}
	
	// console.log('Packet sent! ', packet)
})