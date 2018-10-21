// console.log = () => {}  //Uncomment for production
var os = require("os")
var fs = require('fs')
var ini = require('ini')
const isPi = require('./utils/rpi-detect')

const hostname = os.hostname()
const platform = os.platform()

const sensorType = () => {
	if (isPi()) return 'sentiwi'
	else return platform
}

const getClientId = () => {
	try {
		let config = ini.parse(fs.readFileSync('/srv/senti/etc/infoAgent.ini', 'utf-8'))
		return config.rpi.deviceId
	} catch (err) {
		if (err.code === 'ENOENT') {
			return hostname
		} else {
			throw err
		}
	}
}

const _clientId = getClientId()
const _topic = 'senti/sensor/' + sensorType() + '/' + _clientId
// _topic = senti/sensor/sensortype/clientid
// _topic = senti/sensor/darwin/cb-air

const options = {
	host: 'mqtt://hive.senti.cloud',
	port: '1883',
	username: '',
	password: '',
	keepalive: 60,
	clientId: _clientId,
	clean: false, // false for persistent sessions
	will: {
		topic: _topic + '/status',
		payload: JSON.stringify({ status: 'offline (dead)' }), 
		qos: 1,
		retain: true
	},
	slackChannel: 'https://hooks.slack.com/services/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',
	logLocale: 'da',
	ping: 3000,
	topic: _topic,
	tempTopic: _topic + '/temperature'
}

module.exports = options
