client.publish('senti/sensor/sentiwi/8020/data', JSON.stringify({ a: 5, b: 'Text' }))

client.on('message', function (topic, payload) {
    const obj = JSON.parse(payload.toString()) // payload is a buffer
})

