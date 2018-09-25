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

// var client = mqtt.connect({ host: settings.mqttHost, port: settings.mqttPort })

