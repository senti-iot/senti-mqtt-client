const git = require('simple-git') // (workingDirPath)

const options = require('../options')

// Results in 'git pull origin master --no-rebase'
// git().pull('origin', 'master', { '--no-rebase': null })

const gitUpdate = () => {
	// Pulls all updates from the default tracked repo
	git().pull()
	console.log('git pull ' + options.clientId)
}

module.exports = gitUpdate
