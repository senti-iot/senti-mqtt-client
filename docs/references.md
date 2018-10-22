# References

## MQTT.js
- https://github.com/mqttjs/MQTT.js
- https://github.com/mqttjs/MQTT.js/issues/364
- https://www.hivemq.com/blog/mqtt-client-library-mqtt-js

## API for Webhook
- https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9
https://coursework.vschool.io/express-params-and-query/

## NodeJS & MQTT
- https://blog.risingstack.com/getting-started-with-nodejs-and-mqtt/
- https://github.com/Losant/mqtt-garage-opener-example

## Slack
- https://github.com/kyle-alex-burke/mqtt-slack-chat

## MQTT CLI
```sh
mqtt sub -h hive.senti.cloud -t senti/sensor/sentiwi/8020/status
mqtt pub -h hive.senti.cloud -t senti/sensor/sentiwi/8020/data -m "{ text: "Hello world" }"
```

## React MQTT 
- https://github.com/lloydXmas/mqtt-react-weather
- https://github.com/mgdm/React-MQTT

## INI-file
- https://www.npmjs.com/package/ini

## Tracking with MQTT
- https://owntracks.org/booklet/guide/broker/

# Process Management

## Nodemon
```sh
nodemon index.js --watch index.js
nodemon (using the nodemon.json config file)
```
https://codeburst.io/dont-use-nodemon-there-are-better-ways-fc016b50b45e

## SystemD
- https://seanmcgary.com/posts/deploying-nodejs-applications-with-systemd/
- https://blog.codeship.com/running-node-js-linux-systemd/
- https://superuser.com/questions/1171751/restart-systemd-service-automatically-whenever-a-directory-changes-any-file-ins
- https://hackernoon.com/making-node-js-service-always-alive-on-ubuntu-server-e20c9c0808e4 

## PM2
```sh
Linux/Mac:	
pm2 start ecosystem.config.js

Pi:			
pm2 start index.js --name "senti-mqtt-client" --watch "./index.js ./options.js ./utils/*"

Pi:			
pm2 start index.js --name "senti-mqtt-client"

How to update PM2
Install the latest pm2 version:

sudo npm install pm2@latest -g
Then update the in-memory PM2 :

sudo pm2 update
```

## RPI temperature & system info
- https://github.com/sebhildebrandt/systeminformation 
- https://github.com/PsyChip/node-raspi
- https://github.com/bojkovak/rpi-temperature
- https://github.com/odensc/pi-temperature
- https://github.com/coopermaa/rpi-cpu-temperature

```sh
mqtt sub -h hive.senti.cloud -t senti/sensor/sentiwi/8020/temperature
```

**Example code:**

```js
var spawn = require('child_process').spawn
temp = spawn('cat', ['/sys/class/thermal/thermal_zone0/temp'])
temp.stdout.on('data', function(data) {
        console.log('Result: ' + data/1000 + ' degrees Celcius')
})
```

## MQTT DB persist (mysql + elasticsearch)
- https://www.instructables.com/id/Store-Messages-From-Mosquitto-MQTT-Broker-Into-SQL/ 
- https://iotbytes.wordpress.com/store-mqtt-data-from-sensors-into-sql-database/ 
- https://smart-factory.net/mqtt-elasticsearch-setup/ 
- https://github.com/clive-jevons/mqtt-elasticsearch-forwarding/tree/master/nodejs 

## Encryption / Decryption
- https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb 
- https://www.npmjs.com/package/crypto-js 
- https://www.npmjs.com/package/simple-crypto-js 

## React Native MQTT
- https://www.npmjs.com/package/react_native_mqtt (177 weekly downloads)
- http://appiconmaker.co/ 
- https://www.hivemq.com/blog/mqtt-client-library-encyclopedia-paho-js 

## Express API security
- https://expressjs.com/en/advanced/best-practice-security.html
- https://www.npmjs.com/package/jsonwebtoken
- https://dev.to/medaymentn/securing-your-node-js-api-with-json-web-token-5o5
- https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
- https://developer.okta.com/blog/2018/08/21/build-secure-rest-api-with-node
