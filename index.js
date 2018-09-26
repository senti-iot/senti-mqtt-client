#!/usr/bin/env /usr/local/bin/node

var exec = require('child_process').exec

const _keepalive = 5
var counter = 0
var packets = -3

var mqtt = require('mqtt')

var _clientId = 'senti-' + Math.random().toString(16).substr(2, 8)


function updateClient() {
	console.log('Updating client ...')
	client.publish('sensor/test', 'Client restarted with new software')
	exec('bash updateclient.sh', function (error, stdout, stderr) {		
		if (error) {
			console.log(error.code)
		}
		counter = 1
		packets = -3
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
client.publish('sensor/status/' + _clientId, 'online', { retain: true })

client.on('connect', function () {
	client.subscribe('sensor/test', function (err) {
		if (!err) {
			client.publish('sensor/test', 'Hello from Senti-in-a-Box client ID: ' + _clientId)
			client.publish('sensor/test', 'Keep alive = ' + _keepalive)
			client.subscribe('sensor/update')
			counter++
		}
	})
})

client.on('message', function (topic, message) {
	console.log(message.toString())	
	if (message.toString() === 'now') {		
		updateClient()
	}
})

client.on('offline', function () {	
	console.log('We are offline')
})

client.on("error", function (error) {
	console.log("ERROR: ", error);
})

client.on('reconnect', function () {
	console.log("Reconnected")
})

client.on('disconnect', function () {
	console.log("Disconnected ...")
})

client.on('close', function () {	
	// console.log('We are closing')
})

client.on('packetreceive', function (packet) {
	// console.log('Packet received from broker')
})

client.on('packetsend', function (packet) {
	packets++
	if (counter > 0) {
        console.log('Client:', _clientId, 'Connection:', counter, ' Ping:', packets)        
	}
	
	// console.log('Packet sent! ', packet)
})