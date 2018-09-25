var exec = require('child_process').exec

function updateClient() {
	console.log('Updating client ...')
	exec('bash updateclient.sh', function (error, stdout, stderr) {
		if (error) {
			console.log(error.code)
		}
	})
}

var mqtt = require('mqtt')

var _clientId = 'sentidevice_' + Math.random().toString(16).substr(2, 8)

var client = mqtt.connect('mqtt://hive.senti.cloud', {
	keepalive: 6,
    clientId: _clientId,
    clean: true,
	will: {
		topic: 'sensor/status',
		payload: 'offline',
		qos: 1,
		retain: false
	}
})

var counter = 0
var packets = -3

client.publish('sensor/status', 'online', { retain: true })
client.publish('sensor/status/' + _clientId, 'online', { retain: true })

client.on('connect', function () {
	client.subscribe('sensor/test', function (err) {
		if (!err) {
			client.publish('sensor/test', 'Hello Senti.Cloud from MQTT on Raspberry Pi ' + 'Connection no.: ' + counter)
			// client.publish('sensor/status', 'online')
			client.subscribe('sensor/update')
			counter++
		}
	})
})

client.on('message', function (topic, message) {
	console.log(message.toString())	
	if (message.toString() == 'now') {		
		updateClient()
	}
})

client.on('offline', function () {	
	console.log('We are offline')
})

client.on("error", function (error) {
	console.log("ERROR: ", error);
})

client.on('reconnect', function () {
	console.log("Reconnected")
})

client.on('disconnect', function () {
	console.log("Disconnected ...")
})

client.on('close', function () {	
	// console.log('We are closing')
})

client.on('packetreceive', function (packet) {
	// console.log('Packet received from broker')
})

client.on('packetsend', function (packet) {
	packets++
	if (counter > 0) {
        console.log('Packet sent to broker from', _clientId, 'Connection no.:', counter, ' Ping no.:', packets)        
	}
	
	// console.log('Packet sent! ', packet)
})