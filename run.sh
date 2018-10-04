#!/bin/bash
#chmod 700 run.sh

clear

echo Starting Senti MQTT Client service ...
echo
pm2 start index.js --name "senti-mqtt-client" --watch "./index.js"
pm2 save
pm2 ls
