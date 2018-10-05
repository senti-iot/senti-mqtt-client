var moment = require('moment')
moment.locale('da')

moment().format('L')

var fileName = __dirname + '/../logs/' + moment().format('L') + '.log' 

var fs = require('fs')
var util = require('util')
// var log_file = fs.createWriteStream(__dirname + '/../logs/debug.log', { flags: 'a' })
var log_file = fs.createWriteStream(fileName, { flags: 'a' })
 // Or 'w' to truncate the file every time the process starts.
var log_stdout = process.stdout

function log(arguments) {
	console.log = function () {
		log_file.write(util.format.apply(null, arguments) + '\n')
		log_stdout.write(util.format.apply(null, arguments) + '\n')
	}
	console.error = console.log
}


module.exports = log
