const create = require('apisauce').create

const api = create({
	baseURL: 'http://services.senti.cloud/dispatch',
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