#!/usr/bin/env /usr/local/bin/node

const options = require('./options').options
const log = require('./utils/log').log
const postToSlack = require('./utils/slack').postMessageToSlack
var exec = require('child_process').exec
var moment = require('moment')
var mqtt = require('mqtt')

const channel = options.slackChannel

moment.locale(options.logLocale)

const dateTimeLog = () => {
	return moment().format('L - HH:mm:ss')
}

var counter = 0
var packets = -3

var clientId = options.clientId

function updateClient() {
	console.log('Updating client(s):', dateTimeLog())
	log()
	client.publish('sensor/test', 'Client restarted ' + dateTimeLog())
	exec('bash updateclient.sh', function (error, stdout, stderr) {
		if (error) {
			console.log(error.code)
			log()
		}
	})
}

var client = mqtt.connect(options.host, {
	keepalive: options.keepalive,
	clientId: options.clientId,
    clean: options.clean,
	will: options.will
})

client.publish('sensor/status', 'online', { retain: true })
client.publish('sensor/status' + clientId, 'online', { retain: true })

client.on('connect', function () {
	client.subscribe('sensor/test', function (err) {
		if (!err) {
			client.publish('sensor/test', clientId + ': connected')			
			client.subscribe('sensor/update')			
			postToSlack(channel, `{"text":"${clientId}: connected"}`)
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
			postToSlack(channel, `{"text":"Updating client(s): ${dateTimeLog()}"}`)
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
		console.log(clientId, '- connection:', counter, '- ping:', packets, '-', dateTimeLog())
		log()
	}
})