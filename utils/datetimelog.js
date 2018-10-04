const options = require('../options').options
var moment = require('moment')

moment.locale(options.logLocale)

const dateTimeLog = () => {
	return moment().format('L - HH:mm:ss (ms)')
}

module.exports = {
	dateTimeLog: dateTimeLog
}

