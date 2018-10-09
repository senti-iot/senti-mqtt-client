#!/usr/bin/env /usr/local/bin/node

const options = require('./options')
const dateTimeLog = require('./utils/datetimelog')
const log = require('./utils/log')
const postToSlack = require('./utils/slack')
const gitUpdate = require('./utils/gitupdate')
const npmInstall = require('./utils/npminstall')
const rpiTemp = require('./utils/rpi-temp')
var exec = require('child_process').exec
var mqtt = require('mqtt')

const channel = options.slackChannel
const slackOn = false

const clientId = options.clientId
const topic = options.topic
const status = topic + '/status'

console.log('STARTING SENTI MQTT CLIENT SERVICES ...')

const rpiTemperature = async(log, topic) => {
	let result = await rpiTemp()
	if (topic) {
		client.publish('senti/sensor/sentiwi/8020/temperature', result.toString(), { retain: false })
	}
	if (log) console.log(result)
}

setInterval(() => {
	client.publish(status, clientId + ' online ' + dateTimeLog(), { retain: false })
}, (options.ping))


const updateClient = () => {
	client.publish(status, clientId + ' offline ' + dateTimeLog(), { retain: false })
	client.publish(status, clientId + ' updating ' + dateTimeLog(), { retain: false })
	console.log(clientId + ': updating ...', dateTimeLog())
	log()
	gitUpdate()
	npmInstall()
	exec('bash updateclient.sh', function (error, stdout, stderr) {
		if (error) {
			console.log(error.code)
			log()
		}
	})
	console.log('UPDATE COMPLETED!')
	log()
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
	console.log('SENTI MQTT CLIENT SERVICES STARTED! (' + topic + ')')
	rpiTemperature(true, options.tempTopic)
	log()
})

client.on('message', function (topic, message) {
	let topicStr = topic.toString()
	let msgStr = message.toString()

	if (slackOn) postToSlack(channel, `{"text":"${message.toString()}"}`)
	
	switch (topicStr) {
		case 'sensor/update': if (msgStr === 'now') {
			console.log('CLIENT UPDATE')
			log()
			updateClient()
		} 
		case 'sensor/update': if (msgStr === 'restart') {
			console.log('RESTART')
			log()
			process.kill(process.pid, 'SIGUSR2') // DANGER - Kills nodemon service and restarts nodemon
		} 
		case 'sensor/update': if (msgStr === 'reboot') {
			// shutdown -r
			console.log('REBOOT')
			log()
		}
		case 'sensor/update': if (msgStr === 'clear') {
			process.stdout.write('\x1Bc')
			console.log('SENTI MQTT CLIENT SERVICES STARTED! (' + topic + ')')
		}
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

