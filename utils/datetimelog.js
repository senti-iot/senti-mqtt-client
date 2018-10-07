const options = require('../options')
var moment = require('moment')

moment.locale(options.logLocale)

const dateTimeLog = () => {
	return moment().format('L - HH:mm:ss')
}

module.exports = dateTimeLog
