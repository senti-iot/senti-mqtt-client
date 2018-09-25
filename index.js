var mqtt = require('mqtt')

const options = {
	host: 'mqtt://hive.senti.cloud',
	port: '1883',
	username: '',
	password: '',
	keepalive: 60,
	clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
	will: {
		topic: 'sensor/status',
		payload: 'offline',
		qos: 2,
		retain: true
	}
}

// var client = mqtt.connect('mqtt://hive.senti.cloud', { options })
/* var client = mqtt.connect({
	host: options.host,
	port: options.port,
	will: {
		topic: 'sensor/status',
		payload: 'offline',
		qos: 1,
		retain: true
	} 
}) */

var client = mqtt.connect('mqtt://hive.senti.cloud', {
	keepalive: 60,
	clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
	will: {
		topic: 'sensor/status',
		payload: 'offline',
		qos: 1,
		retain: false
	}
})


// var client = mqtt.connect({ host: settings.mqttHost, port: settings.mqttPort })

client.on('connect', function () {
	client.subscribe('sensor/test', function (err) {
		if (!err) {
			client.publish('sensor/test', 'Hello Senti.Cloud from MQTT on Raspberry Pi')
			client.publish('sensor/status', 'This is the death topic')
		}
	})
})

client.on('message', function (topic, message) {
	// message is Buffer
	console.log(message.toString())
	// client.end()
})

client.on('offline', function () {	
	console.log('We are offline')
})

client.on("error", function (error) {
	console.log("ERROR: ", error);
})

client.on('reconnect', function () {
	console.log("reconnect");
})

client.on('close', function () {
	console.log('We are closing')
	client.end()
})

// for (;;) {}