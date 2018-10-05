#!/bin/bash
#chmod 700 updateclient.sh

echo Updating Senti-MQTT-Client ...

if [ "$EUID" -ne 0 ]
  then echo "Please run as root" >> logged_update.txt
  exit
fi

echo 
echo Pulling latest updates from GitHub
sudo git pull

retval=$?
# do_something $retval
if [ $retval -ne 0 ]; then
    echo "Return code from git pull was not zero but $retval" >> logged_update.txt
fi
echo 

echo Installing upgrades
echo
npm install

retval=$?
if [ $retval -ne 0 ]; then
    echo "Return code from npm install was not zero but $retval" >> logged_update.txt
fi
