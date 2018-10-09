const execFile = require('child_process').execFile
// const options = require('../options')
const log = require('./log')

const runInstall = () => {
const child=execFile('npm', ['install'], (error, stdout, stderr) => {
	if (error) {
		console.error('stderr', stderr)
		throw error
	}
	console.log('npm install', stdout)
	log()
})
}

module.exports = runInstall