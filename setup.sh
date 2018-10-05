#!/bin/bash
#chmod 700 setup.sh
# wget https://raw.githubusercontent.com/senti-platform/senti-mqtt-client/master/setup.sh && bash setup.sh

# Log in and sudo -i

clear

echo Setting up Senti-MQTT-Client

sudo mkdir -p /srv/nodejs


echo 
echo Pulling latest updates from GitHub
cd /srv/nodejs/
sudo git -C senti-mqtt-client pull || git clone https://github.com/senti-platform/senti-mqtt-client.git
echo 

echo Installing modules and/or upgrades
echo
cd senti-mqtt-client
sudo npm install

sudo mkdir -p /srv/nodejs/senti-mqtt-client/logs
echo
echo Starting senti-mqtt-client service ...
echo
bash run.sh
