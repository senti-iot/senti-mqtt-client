var spawn = require('child_process').spawn
const isPi = require('./rpi-detect')

const rpiTemp = () => {
	if (isPi()) {
		let tempOut
		temp = spawn('cat', ['/sys/class/thermal/thermal_zone0/temp'])
		temp.stdout.on('data', function (data) {
			tempOut = (data / 1000)
			return tempOut
		})
	} else return null
}


module.exports = rpiTemp

function resolveAfter2Seconds() {
	return new Promise(resolve => {
		if (isPi()) {
			let tempOut
			temp = spawn('cat', ['/sys/class/thermal/thermal_zone0/temp'])
			temp.stdout.on('data', function (data) {
				tempOut = (data / 1000)
				resolve(tempOut)
			})
		}
	})
}

async function asyncCall() {
	console.log('calling');
	var result = await resolveAfter2Seconds()
	console.log(result)	
}

asyncCall()
