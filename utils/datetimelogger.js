const options = require('../options')
var moment = require('moment')

moment.locale(options.logLocale)

const dateTimeLogger = () => {
	return moment().format('L - HH:mm:ss')
}

module.exports = dateTimeLogger
