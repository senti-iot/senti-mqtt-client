require('dotenv').config()
const create = require('apisauce').create

const url = process.env.PUSHAPI

const api = create({
	baseURL: url,
	timeout: 30000,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
})

const pushUpdate = () => {
	api.post(api.baseURL)
}

module.exports = pushUpdate

console.log(url)
pushUpdate()
