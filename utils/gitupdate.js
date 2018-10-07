const git = require('simple-git') // (workingDirPath)

const options = require('../options')

const gitUpdate = () => {
	// Pulls all updates from the default tracked repo
	git().pull()
	console.log(options.clientId + ': git pull')
}

module.exports = gitUpdate
