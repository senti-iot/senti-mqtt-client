# References

## MQTT.js
https://github.com/mqttjs/MQTT.js
https://github.com/mqttjs/MQTT.js/issues/364
https://www.hivemq.com/blog/mqtt-client-library-mqtt-js

## API for Webhook
https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9
https://coursework.vschool.io/express-params-and-query/

## NodeJS & MQTT
https://blog.risingstack.com/getting-started-with-nodejs-and-mqtt/
https://github.com/Losant/mqtt-garage-opener-example

## Slack
https://github.com/kyle-alex-burke/mqtt-slack-chat

## MQTT CLI
mqtt sub -h hive.senti.cloud -t sensor/status
mqtt pub -h hive.senti.cloud -t sensor/test -m "Hello world"

## React MQTT 
https://github.com/lloydXmas/mqtt-react-weather
https://github.com/mgdm/React-MQTT

## INI-file
https://www.npmjs.com/package/ini

## Tracking with MQTT
https://owntracks.org/booklet/guide/broker/

# Process Management

## Nodemon
nodemon index.js --watch index.js
nodemon (using the nodemon.json config file)
https://codeburst.io/dont-use-nodemon-there-are-better-ways-fc016b50b45e

## SystemD
https://seanmcgary.com/posts/deploying-nodejs-applications-with-systemd/
https://blog.codeship.com/running-node-js-linux-systemd/
https://superuser.com/questions/1171751/restart-systemd-service-automatically-whenever-a-directory-changes-any-file-ins
https://hackernoon.com/making-node-js-service-always-alive-on-ubuntu-server-e20c9c0808e4 

## PM2
Linux/Mac:	pm2 start ecosystem.config.js
Pi:			pm2 start index.js --name "senti-mqtt-client" --watch "./index.js ./options.js ./utils/*"
Pi:			pm2 start index.js --name "senti-mqtt-client"

## RPI temperature & system info
https://github.com/sebhildebrandt/systeminformation 
https://github.com/PsyChip/node-raspi
https://github.com/bojkovak/rpi-temperature
https://github.com/odensc/pi-temperature
https://github.com/coopermaa/rpi-cpu-temperature

Create a file called "temp.js" and insert below code:

var spawn = require('child_process').spawn
temp = spawn('cat', ['/sys/class/thermal/thermal_zone0/temp'])
temp.stdout.on('data', function(data) {
        console.log('Result: ' + data/1000 + ' degrees Celcius')
})
