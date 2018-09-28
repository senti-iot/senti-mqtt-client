#!/bin/bash
#chmod 700 setup.sh

# Log in and sudo -i

clear

echo Setting up Senti-MQTT-Client

sudo mkdir -p /srv/nodejs/senti-mqtt-client/logs

cd /srv/nodejs/senti-mqtt-client/

echo 
echo Pulling latest updates from GitHub
git pull
echo 

echo Installing modules and/or upgrades
echo
npm install

echo
echo Starting senti-mqtt-client service ...
echo
pm2 start ecosystem.config.js --env production


