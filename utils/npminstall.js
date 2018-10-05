const execFile = require('child_process').execFile
/* const child = execFile('npm', ['install'], (error, stdout, stderr) => {
	if (error) {
		console.error('stderr', stderr)
		throw error
	}
	console.log('npm install', stdout)
})
 */

const runInstall = () => {
const child=execFile('npm', ['install'], (error, stdout, stderr) => {
	if (error) {
		console.error('stderr', stderr)
		throw error
	}
	console.log('npm install', stdout)
})
}

module.exports = runInstall