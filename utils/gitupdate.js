const git = require('simple-git') // (workingDirPath)
const options = require('../options')
const log = require('./log')

const gitUpdate = () => {
	// Pulls all updates from the default tracked repo
	git().pull()
	console.log('git pull')
	log()
}

module.exports = gitUpdate
