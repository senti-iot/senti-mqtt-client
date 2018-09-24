var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://hive.senti.cloud')

client.on('connect', function () {
	client.subscribe('sensor/test', function (err) {
		if (!err) {
			client.publish('sensor/test', 'Hello Senti.Cloud from MQTT on Raspberry Pi')
		}
	})
})

client.on('message', function (topic, message) {
	// message is Buffer
	console.log(message.toString())
	client.end()
})
