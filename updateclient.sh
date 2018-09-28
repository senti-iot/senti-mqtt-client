#!/bin/bash
#chmod 700 updateclient.sh

echo Updating Senti-MQTT-Client ...

echo 
echo Pulling latest updates from GitHub
git pull
echo 

echo Installing upgrades
echo
npm install
