// import { create } from 'apisauce'
const create = require('apisauce').create

const api = create({
	// baseURL: backendHost,
	baseURL: 'http://localhost:3000/api/1/options',
	timeout: 30000,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
})

const getData = async () => {
	var data = await api.get("http://localhost:3000/api/1/options").then(rs => rs.data)
	return data
}

let data = getData().then(rs => console.log(rs))
console.log(data)