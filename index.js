#!/usr/bin/env /usr/local/bin/node

const log = require('./utils/log').log

const postToSlack = require('./utils/slack').postMessageToSlack
const channel = 'https://hooks.slack.com/services/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'

var moment = require('moment')
moment.locale('da')

const dateTimeLog = () => {
	return moment().format('L - HH:mm:ss')
}

var exec = require('child_process').exec

const _keepalive = 5
var counter = 0
var packets = -3

var mqtt = require('mqtt')

var _clientId = 'senti-' + Math.random().toString(16).substr(2, 8)

function updateClient() {
	console.log('Updating client ... ', dateTimeLog())
	log()
	client.publish('sensor/test', 'Client restarted ' + dateTimeLog())
	exec('bash updateclient.sh', function (error, stdout, stderr) {		
		if (error) {
			console.log(error.code)
			log()
		}
	})
}

var client = mqtt.connect('mqtt://hive.senti.cloud', {
	keepalive: _keepalive,
    clientId: _clientId,
    clean: true,
	will: {
		topic: 'sensor/status',
		payload: 'offline',
		qos: 1,
		retain: false
	}
})

client.publish('sensor/status', 'online', { retain: true })
client.publish('sensor/status' + _clientId, 'online', { retain: true })

client.on('connect', function () {
	client.subscribe('sensor/test', function (err) {
		if (!err) {
			client.publish('sensor/test', 'Hello from Senti-in-a-Box ID: ' + _clientId)
			client.publish('sensor/test', 'Keep alive = ' + _keepalive)
			client.subscribe('sensor/update')
			// postToSlack(channel, 'Hello from Senti-in-a-Box ID: ' + _clientId)
			postToSlack(channel, `{"text":"Hello from Senti-in-a-Box ID: ${_clientId}"}`)
			counter++
		}
	})
})

client.on('message', function (topic, message) {
	console.log(message.toString())
	log()
	if (topic.toString() === 'sensor/update') {
		if (message.toString() === 'now') {		
			updateClient()
			postToSlack(channel, `{"text":"Updating client ... ${dateTimeLog()}"}`)
		}
	}
})

client.on('offline', function () {	
	console.log('We are offline', dateTimeLog())
	log()
})

client.on("error", function (error) {
	console.log("ERROR: ", error, dateTimeLog())
	log()
})

client.on('reconnect', function () {
	console.log("Reconnected", dateTimeLog())
	log()
})

client.on('disconnect', function () {
	console.log("Disconnected ...", dateTimeLog())
	log()
})

client.on('close', function () {	
	console.log('We are closing', dateTimeLog())
	log()
})

client.on('packetreceive', function (packet) {
	// console.log('Packet received from broker')
})

client.on('packetsend', function (packet) {
	packets++
	if (counter > 0) {
		console.log('ID:', _clientId, '- Con:', counter, '- Ping:', packets, '-', dateTimeLog())
		// console.log(moment().format('LLLL'))
		// console.log(moment().format('L - HH:mm:ss'))
		// log('ID:', _clientId, '- Con:', counter, '- Ping:', packets, '-', moment().format('L - HH:mm:ss'))
		log()
	}
})