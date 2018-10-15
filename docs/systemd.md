# SystemD 

## pm2-root.service
[Unit]
Description=PM2 process manager
Documentation=https://pm2.keymetrics.io/
After=network.target

[Service]
Type=forking
User=root
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity
Environment=PATH=/usr/bin:/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
Environment=PM2_HOME=/root/.pm2
PIDFile=/root/.pm2/pm2.pid

ExecStart=/usr/lib/node_modules/pm2/bin/pm2 resurrect
ExecReload=/usr/lib/node_modules/pm2/bin/pm2 reload all
ExecStop=/usr/lib/node_modules/pm2/bin/pm2 kill

[Install]
WantedBy=multi-user.target

## senti-watchman.service

[Unit]
Description=Senti Watchman is a sentinel service that monitors the senti-mqtt-client and update/restart the client when needed
Documentation=https://github.com/senti-platform/senti-watchman/blob/master/README.md

[Service]
WorkingDirectory=/srv/nodejs/senti/senti-watchman
ExecStart=/usr/local/bin/node server.js
Type=simple

---------
Place this file in /etc/systemd/system and run:

```sh
sudo systemctl start senti-watchman.service
```

