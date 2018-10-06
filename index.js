#!/usr/bin/env /usr/local/bin/node

const options = require('./options')
const dateTimeLog = require('./utils/datetimelog')
const log = require('./utils/log')
const postToSlack = require('./utils/slack')
const gitUpdate = require('./utils/gitupdate')
const npmInstall = require('./utils/npminstall')
var exec = require('child_process').exec
var mqtt = require('mqtt')

const channel = options.slackChannel
const slackOn = false

var counter = 0
var packets = -3

var clientId = options.clientId

setInterval(() => {
	client.publish('sensor/status/' + clientId, 'online ' + dateTimeLog(), { retain: false })
}, (options.ping))

console.log('STARTING SENTI MQTT CLIENT SERVICES ...')

const updateClient = () => {
	client.publish('sensor/status/' + clientId, 'offline ' + dateTimeLog(), { retain: false })
	console.log(clientId + ': updating ', dateTimeLog())
	gitUpdate()
	npmInstall()
	log()
	exec('bash updateclient.sh', function (error, stdout, stderr) {
		if (error) {
			console.log(error.code)
			log()
		}
	})
	client.publish('sensor/test', clientId + ': restarted ' + dateTimeLog())
	client.publish('sensor/status/' + clientId, 'online ' + dateTimeLog(), { retain: false })
	client.publish('sensor/status', 'online ' + dateTimeLog(), { retain: false })
	process.kill(process.pid, 'SIGUSR2') // DANGER - Kills nodemon service and restarts index.js
}

var client = mqtt.connect(options.host, {
	keepalive: options.keepalive,
	clientId: options.clientId,
	will: options.will
})

client.on('connect', function () {
	client.subscribe('sensor/test', function (err) {
		if (!err) {
			client.publish('sensor/status', 'online ' + dateTimeLog(), { retain: false })
			client.publish('sensor/status/' + clientId, 'online ' + dateTimeLog(), { retain: false })
			client.publish('sensor/test', clientId + ': connected')			
			client.subscribe('sensor/update')			
			if (slackOn) postToSlack(channel, `{"text":"${clientId}: connected"}`)
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
			if (slackOn) postToSlack(channel, `{"text":"${clientId}: updating - ${dateTimeLog()}"}`)
		}
	}
	if (slackOn) postToSlack(channel, `{"text":"${message.toString()}"}`)
})

client.on('offline', function () {	
	client.publish('sensor/status/' + clientId, 'offline ' + dateTimeLog(), { retain: false }) // temp mutual test topic
	console.log('We are offline', dateTimeLog())
	log()
})

client.on("error", function (error) {
	console.log("ERROR: ", error, dateTimeLog())
	log()
})

client.on('reconnect', function () {
	client.publish('sensor/status/' + clientId, 'online ' + dateTimeLog(), { retain: false })
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

