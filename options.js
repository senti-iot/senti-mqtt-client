var os = require("os")
var hostname = os.hostname()

const options = {
	host: 'mqtt://hive.senti.cloud',
	port: '1883',
	username: '',
	password: '',
	keepalive: 5,
	clientId: 'senti-' + hostname,
	clean: true,
	will: {
		topic: 'sensor/status',
		payload: 'offline',
		qos: 1,
		retain: false
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

// var client = mqtt.connect({ host: settings.mqttHost, port: settings.mqttPort })

module.exports = {
	options: options
}

