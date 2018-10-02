# References

## MQTT.js
https://github.com/mqttjs/MQTT.js
https://github.com/mqttjs/MQTT.js/issues/364
https://www.hivemq.com/blog/mqtt-client-library-mqtt-js

## API for Webhook
https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9

## Garage Door Opener example
https://blog.risingstack.com/getting-started-with-nodejs-and-mqtt/
https://github.com/Losant/mqtt-garage-opener-example

## Slack
https://github.com/kyle-alex-burke/mqtt-slack-chat

## PM2
Linux/Mac:	pm2 start ecosystem.config.js --env production
Pi:			pm2 start index.js --name "senti-mqtt-client" --watch "./index.js"

## MQTT CLI
mqtt subscribe -h hive.senti.cloud -t sensor/status
mqtt publish -h hive.senti.cloud -t sensor/test -m "Hello world"

