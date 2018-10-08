// console.log = () => {}  //Uncomment for production
const execFile = require('child_process').execFile

const options = require('../options')

const execCmd = (cmd, args) => {
const child=execFile(cmd, [args], (error, stdout, stderr) => {
	if (error) {
		console.error('stderr', stderr)
		throw error
	}
	// console.log(options.clientId + ' ' + cmd + ' ' + args, stdout)
})
}

module.exports = execCmd

// execCmd('ls', '-al')