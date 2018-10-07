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

const clientId = options.clientId
const topic = options.topic
const status = topic + '/status'

console.log('STARTING SENTI MQTT CLIENT SERVICES ...')

setInterval(() => {
	// client.publish('sensor/status/' + clientId, clientId + ' online ' + dateTimeLog(), { retain: false })
	client.publish(status, clientId + ' online ' + dateTimeLog(), { retain: false })
}, (options.ping))


const updateClient = () => {
	// client.publish('sensor/status/' + clientId, ' offline ' + dateTimeLog(), { retain: false })
	client.publish(status, ' offline ' + dateTimeLog(), { retain: false })
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
	// client.publish('sensor/test', clientId + ': restarted ' + dateTimeLog())
	// client.publish(status + clientId, 'online ' + dateTimeLog(), { retain: false })
	// client.publish('sensor/status', 'online ' + dateTimeLog(), { retain: false })
	// process.kill(process.pid, 'SIGUSR2') // DANGER - Kills nodemon service and restarts index.js
}

var client = mqtt.connect(options.host, {
	keepalive: options.keepalive,
	clientId: options.clientId,
	will: options.will
})

client.on('connect', function () {
	client.subscribe(status, function (error) {
		if (!error) {		
			client.subscribe('sensor/update')			
			if (slackOn) postToSlack(channel, `{"text":"${clientId}: connected"}`)
		}
	})
	console.log('SENTI MQTT CLIENT SERVICES STARTED!')
})

client.on('message', function (topic, message) {
	let topicStr = topic.toString()
	let msgStr = message.toString()
	
	if (topicStr === 'sensor/update') {
		if (msgStr === 'now') {		
			updateClient()
			if (slackOn) postToSlack(channel, `{"text":"${clientId}: updating - ${dateTimeLog()}"}`)
		}
	}
	if (slackOn) postToSlack(channel, `{"text":"${message.toString()}"}`)
	
	switch (topicStr) {
		case 'sensor/update': if (msgStr === 'now') console.log('SENSOR/UPDATE')
			break
		case '2':
			break
		case '3':
			break
		default:
			break
	}
})

client.on('offline', function () {	
	client.publish(status, clientId + ' offline ' + dateTimeLog(), { retain: false })
	console.log('Offline ...', dateTimeLog())
	log()
})

client.on("error", function (error) {
	console.log("ERROR: ", error, dateTimeLog())
	log()
})

client.on('reconnect', function () {
	client.publish(status, clientId + ' online ' + dateTimeLog(), { retain: false })
	console.log("Reconnected ...", dateTimeLog())
	log()
})

client.on('disconnect', function () {
	console.log("Disconnected ...", dateTimeLog())
	log()
})

client.on('close', function () {	
	console.log('Closing ...', dateTimeLog())
	log()
})

client.on('packetreceive', function (packet) {
})

client.on('packetsend', function (packet) {
})

