var os = require("os")
var hostname = os.hostname()

var fs = require('fs')
	, ini = require('ini')

var config = ini.parse(fs.readFileSync('/srv/senti/etc/infoAgent.ini', 'utf-8'))

console.log(config.rpi.deviceId)

const options = {
	host: 'mqtt://hive.senti.cloud',
	port: '1883',
	username: '',
	password: '',
	keepalive: 5,
	clientId: config.rpi.deviceId,
	clean: true, // false for persistende sessions
	will: {
		topic: 'sensor/status/' + config.rpi.deviceId,
		payload: 'offline (dead)',
		qos: 1,
		retain: true
	},
	slackChannel: 'https://hooks.slack.com/services/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',
	logLocale: 'da'
}

module.exports = {
	options: options
}
