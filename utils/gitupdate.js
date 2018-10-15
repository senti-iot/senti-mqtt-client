const git = require('simple-git') // (workingDirPath)
const path = '../'
const log = require('./log')

const gitUpdate = () => {
	git().cwd(path)
	git(path).pull((error) => {
		if (error) {
			console.log('ERROR!!!')
			log()
		} else {
			console.log('git pull success')
			log()
		}
	})
}

module.exports = gitUpdate
