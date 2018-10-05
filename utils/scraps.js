const clientPublish = () => {
	client.publish('sensor/status/' + clientId, 'online ' + dateTimeLog(), { retain: false })
}

const pushStatus = () => {
	clientPublish()
	setTimeout(pushStatus(), (options.keepalive * 1000))
}

pushStatus()