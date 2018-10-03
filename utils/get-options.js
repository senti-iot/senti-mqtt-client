const fetch = require('node-fetch')

async function fetchAsync() {
	let data = await fetch('http://localhost:3000/api/1/options').then(result => result.json())
	return data
}
const fetchAs = async () => {
	let data = await fetch('http://localhost:3000/api/1/options').then(result => result.json()).then(json => json)
	// console.log(data)
	return data
}
module.exports = {
	get: fetchAsync
}

// var data = await fetchAsync()
var data = fetchAs()

console.log('Data on the way ... ')
// console.log(data)
console.log(data)


// console.log(fetchAsync().then)

/* fetch('http://localhost:3000/api/1/options')
	.then(res => res.json())
	.then(json => console.log(json)) */

