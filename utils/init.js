
var fs = require('fs')

const createLogDir = () => {
	var logDir = __dirname + '/../logs/'
	if (!fs.existsSync(logDir)) {
		fs.mkdirSync(logDir)
		console.log('logs directory created ... ')		
	} 	
}

const init = () => {
	createLogDir()
}

module.exports = init
