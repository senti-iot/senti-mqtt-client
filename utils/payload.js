client.publish('senti/sensor/sentiwi/8020/data', JSON.stringify({ a: 5, b: 'Text' }))

client.on('message', function (topic, payload) {
    const obj = JSON.parse(payload.toString()) // payload is a buffer
})

/*

let a = JSON.stringify({ a: 5, b: 'Text' })
console.log(a)

{"a":5,"b":"Text"}

const obj = JSON.parse(a.toString())
console.log(obj)

{ a: 5, b: 'Text' }

*/

