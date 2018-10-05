#!/bin/bash
#chmod 700 updateclient.sh

echo LOGGED UPDATE 1.0 > .logged_update.txt

if [ "$EUID" -ne 0 ]
  then echo "Please run as root" >> .logged_update.txt
  exit
fi

git pull >> .logged_update.txt
retval=$?
# do_something $retval
if [ $retval -ne 0 ]; then
    echo "Return code from git pull was not zero but $retval" >> .logged_update.txt
fi
echo 

npm install >> .logged_update.txt
retval=$?
if [ $retval -ne 0 ]; then
    echo "Return code from npm install was not zero but $retval" >> .logged_update.txt
fi
