#!/bin/bash
#chmod 700 update.sh

clear

echo Updating Senti-MQTT-Client

cd ~/apps/senti-mqtt-client
echo
echo 
echo Pulling latest updates from GitHub
git pull
echo
echo 
echo Installing upgrades
npm install
echo
echo
echo Running senti-mqtt-client service
node index.js


