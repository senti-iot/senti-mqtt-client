// console.log = () => {}  //Uncomment for production
var os = require("os")
var fs = require('fs')
var ini = require('ini')
const isPi = require('./utils/rpi-detect')

const hostname = os.hostname()
const platform = os.platform()

var _clientId
var config

// const sensorType = isPi ? 'sentiwi' : platform

const sensorType = () => {
	if (isPi()) return 'sentiwi'
	else return platform
}

try {
	config = ini.parse(fs.readFileSync('/srv/senti/etc/infoAgent.ini', 'utf-8'))
	_clientId = config.rpi.deviceId
} catch (err) {
	if (err.code === 'ENOENT') {
		_clientId = hostname
	} else {
		throw err;
	}
}

const _topic = 'senti/sensor/' + sensorType() + '/' + _clientId

// console.log(_clientId)
console.log(_topic)

const options = {
	host: 'mqtt://hive.senti.cloud',
	port: '1883',
	username: '',
	password: '',
	keepalive: 60,
	clientId: _clientId || hostname,
	clean: true, // false for persistende sessions
	will: {
		topic: 'sensor/status/' + _clientId,
		payload: 'offline (dead)',
		qos: 1,
		retain: false
	},
	slackChannel: 'https://hooks.slack.com/services/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',
	logLocale: 'da',
	ping: 1000,
	topic: _topic
}

module.exports = options
