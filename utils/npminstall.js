const execFile = require('child_process').execFile
// const options = require('../options')
const log = require('./log')

const npmInstall = () => {
const child=execFile('npm', ['install'], (error, stdout, stderr) => {
	if (error) {
		console.error('stderr', stderr)
		throw error
	}
	console.log('npm install', stdout)
	log()
})
}

module.exports = npmInstall

// https://stackoverflow.com/questions/15957529/can-i-install-a-npm-package-from-javascript-running-in-node-js