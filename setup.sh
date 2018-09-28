#!/bin/bash
#chmod 700 setup.sh

# Log in and sudo -i

clear

echo Setting up Senti-MQTT-Client

sudo mkdir -p /srv/nodejs/senti-mqtt-client/logs

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


