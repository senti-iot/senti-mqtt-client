const execFile = require('child_process').execFile

const options = require('../options')

const runInstall = () => {
const child=execFile('npm', ['install'], (error, stdout, stderr) => {
	if (error) {
		console.error('stderr', stderr)
		throw error
	}
	console.log(options.clientId + ' npm install', stdout)
})
}

module.exports = runInstall