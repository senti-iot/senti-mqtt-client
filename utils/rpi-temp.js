var spawn = require('child_process').spawn
const isPi = require('./rpi-detect')

const dummy = () => {
	if (isPi()) {
		let tempOut
		temp = spawn('cat', ['/sys/class/thermal/thermal_zone0/temp'])
		temp.stdout.on('data', function (data) {
			tempOut = (data / 1000)
			return tempOut
		})
	} else return null
}




function getRpiTemp() {
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

async function rpiTemp() {
	// console.log('calling')
	var result = await getRpiTemp()	
	console.log(result)	
}

module.exports = rpiTemp

rpiTemp()
