const detect = require('detect-rpi')

const isPi = () => {
	if (detect()) {
		return true
	} else {
		return false
	}
}

module.exports = isPi
