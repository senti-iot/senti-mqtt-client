// curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' 

// https://hooks.slack.com/services/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

const channel = 'https://hooks.slack.com/services/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'

function postMessageToSlack(url, message) {
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
	var xmlhttp = new XMLHttpRequest()
	xmlhttp.open('POST', url, false)
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	xmlhttp.send(message)
}

// console.log(channels['cb'].value, channels['cb'].message)

postMessageToSlack(channel, 'Testing')

