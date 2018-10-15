#!/usr/bin/env /usr/local/bin/node
// console.log = () => {}  //Uncomment for production
const init = require('./utils/init')
const options = require('./options')
const dateTimeLogger = require('./utils/datetimelogger')
// const log = require('./utils/log')
const postToSlack = require('./utils/slack')
const gitUpdate = require('./utils/gitupdate')
const npmInstall = require('./utils/npminstall')
const rpiTemp = require('./utils/rpi-temp')
var exec = require('child_process').exec
var mqtt = require('mqtt')
var mqttalk = require('mqttalk')
const pub = mqttalk.pub
const sub = mqttalk.sub

const channel = options.slackChannel
const slackOn = false

const clientId = options.clientId
const topic = options.topic
const status = topic + '/status'

init()

console.log('STARTING SENTI MQTT CLIENT SERVICES ...')

const rpiTemperature = async(log, topic) => {
	let result = await rpiTemp()
	if (topic) {
		client.publish('senti/sensor/sentiwi/8020/temperature', result.toString(), { retain: true })
	}
	if (log) console.log(result)
}

setInterval(() => {
	let payload = {
		id: clientId,
		status: 'online',
		timestamp: Date.now(),
		datetime: dateTimeLogger()
	}	
	// client.publish(status, JSON.stringify(payload), { retain: false })
	pub(client, status, 'online', 'default', false)
}, (options.ping))


const updateClient = () => {
	pub(client, status, clientId + ' offline ' + dateTimeLogger(), 'default', false)
	// client.publish(status, clientId + ' offline ' + dateTimeLogger(), { retain: false })
	client.publish(status, clientId + ' updating ' + dateTimeLogger(), { retain: false })
	console.log(clientId + ': updating ...', dateTimeLogger())
	// log()
	gitUpdate()
	npmInstall()
	exec('bash updateclient.sh', function (error, stdout, stderr) {
		if (error) {
			console.log(error.code)
			// log()
		}
	})
	console.log('UPDATE COMPLETED!')
	// log()
}

var client = mqtt.connect(options.host, {
	keepalive: options.keepalive,
	clientId: options.clientId,
	will: options.will
})

client.on('connect', () => {
	sub(client, status, null, (error) => {
		if (!error) {
			sub(client, 'sensor/update')
			console.log('Subscribing to:', status)
			// log()
			if (slackOn) postToSlack(channel, `{"text":"${clientId}: connected"}`)
		}
	})
	
/* 	client.subscribe(status, (error) => {
		if (!error) {
			client.subscribe('sensor/update')			
			if (slackOn) postToSlack(channel, `{"text":"${clientId}: connected"}`)
		}
	})
 */	
	console.log('SENTI MQTT CLIENT SERVICES STARTED! (' + topic + ')')
	rpiTemperature(true, options.tempTopic)
	// log()
})

client.on('message', (topic, message) => {
	let topicStr = topic.toString()
	let msgStr = message.toString()

	if (slackOn) postToSlack(channel, `{"text":"${message.toString()}"}`)
	
	switch (topicStr) {
		case 'sensor/update': if (msgStr === 'now') {
			console.log('CLIENT UPDATE')
			// log()
			updateClient()
		} 
		case 'sensor/update': if (msgStr === 'restart') {
			console.log('RESTART')
			// log()
			process.kill(process.pid, 'SIGUSR2') // DANGER - Kills nodemon service and restarts nodemon
		} 
		case 'sensor/update': if (msgStr === 'reboot') {
			// shutdown -r
			console.log('REBOOT')
			// log()
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
	client.publish(status, clientId + ' offline ' + dateTimeLogger(), { retain: false })
	console.log('Offline ...', dateTimeLogger())
	// log()
})

client.on("error", function (error) {
	console.log("ERROR: ", error, dateTimeLogger())
	// log()
})

client.on('reconnect', function () {
	client.publish(status, clientId + ' online ' + dateTimeLogger(), { retain: false })
	console.log("Reconnected ...", dateTimeLogger())
	// log()
})

client.on('disconnect', function () {
	console.log("Disconnected ...", dateTimeLogger())
	// log()
})

client.on('close', function () {	
	console.log('Closing ...', dateTimeLogger())
	// log()
})

client.on('packetreceive', function (packet) {
})

client.on('packetsend', function (packet) {
})

