const git = require('simple-git') // (workingDirPath)
const path = ''

const gitUpdate = () => {
	// git().cwd(path)
	git(path).pull((error) => {
		if (error) {
			console.log('Error during git pull')
		} else {
			console.log('git pull success')
		}
	})
}

module.exports = gitUpdate

// https://www.npmjs.com/package/simple-git