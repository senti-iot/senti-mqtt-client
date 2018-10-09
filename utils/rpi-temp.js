var spawn = require('child_process').spawn
const isPi = require('./rpi-detect')

const rpiTemp = () => {
	return new Promise(resolve => {
		if (isPi()) {
			let tempOut
			temp = spawn('cat', ['/sys/class/thermal/thermal_zone0/temp'])
			temp.stdout.on('data', (data) => {
				tempOut = (data / 1000)
				resolve(tempOut)
			})
		} 
	})
}

// Insert in calling code
const rpiTemperature = async () => {
	var result = await rpiTemp()
	console.log(result)
}

module.exports = rpiTemp

// rpiTemperature()