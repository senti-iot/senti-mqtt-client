#!/bin/bash
#chmod 700 update.sh

clear

echo Updating Senti-MQTT-Client

cd ~/apps/senti-mqtt-client

echo 
echo Pulling latest updates from GitHub
git pull
echo 

echo Installing upgrades
echo
npm install

echo
echo Running senti-mqtt-client service
echo
nodemon index.js


