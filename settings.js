module.exports = {

	port: 1890,

	options: {
		// the hostname of the MQTT broker to send and receive messages to
		host: "hive.senti.cloud",

		// the tcp port that the MQTT broker listening on
		port: 1883,

		// Retry time in milliseconds for MQTT connections
		mqttReconnectTime: 15000
	}
}

