function postMessageToSlack(url, message) {
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
	var xmlhttp = new XMLHttpRequest()
	xmlhttp.open('POST', url, false)
    xmlhttp.setRequestHeader('Content-Type', 'application/json')
	xmlhttp.send(message)
}

module.exports = postMessageToSlack
