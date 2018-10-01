var isPi = require('detect-rpi')

if (isPi()) {
	console.log('Running on Raspberry Pi!')
} else {
	console.log('Running on other platform')
}

module.exports = {
	isPi: isPi
}
