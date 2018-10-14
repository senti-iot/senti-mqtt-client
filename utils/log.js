var moment = require('moment')
moment.locale('da')

moment().format('L')

const logDirExist = () => {
	var logDir = __dirname + '/../logs/'
	if (!fs.existsSync(logDir)) {
		fs.mkdirSync(logDir)
		return true
	} else return false
}

var fileName = __dirname + '/../logs/' + moment().format('L') + '.log' 

var fs = require('fs')
var util = require('util')
var log_file = logDirExist() ? fs.createWriteStream(fileName, { flags: 'a' }) : null

 // Or 'w' to truncate the file every time the process starts.
var log_stdout = process.stdout

const log = (arguments) => {
	console.log = () => {
		if (logDirExist()) {
			log_file.write(util.format.apply(null, arguments) + '\n')
			log_stdout.write(util.format.apply(null, arguments) + '\n')
		}
	}
	console.error = console.log
}

module.exports = log
