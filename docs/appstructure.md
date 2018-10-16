# App structure:

## Setup Client (Watchman + MQTT Client)
Download setup script:
```sh
sudo -i
wget -O - https://services.senti.cloud/secret-route.sh | bash
wget -O - https://services.senti.cloud/setup > setup.sh
wget -O - https://github.com/senti-platform/senti-client-setup/blob/master/setup.sh | bash
```
Or git clone setup repository:
```sh
sudo -i
git clone https://github.com/senti-platform/senti-client-setup.git && cd setup-client-setup && bash setup.sh
```

- Install all needed helper software
- Create paths
- Download assets (wget + unpack)
- Copy to destinations
- git pull
- npm install (npm --prefix ../senti-mqtt-client ../senti-mqtt-client)
- Add systemd entries
- Start systemd services

## "Senti Watchman" - (Client Update App structure)
- Description: Senti Watchman is a sentinel that monitors the senti-mqtt-client and update/restart the client when needed
- PATH: /srv/nodejs/senti/senti-watchman
- init 
	- Get options/env/version from API
	- Check for updates - get version (self) -> do update self
- Connect
- Run
	- First run: Initial check for client updates -> do update client
	- On MQTT receive update - check version -> do update client - set client update flag
	- Restart systemd "senti-mqtt-client" service

## "Senti MQTT Client" - (MQTT Client App structure)
- PATH: /srv/nodejs/senti/senti-mqtt-client
- init 
	- Get options/env
	- Check for updates -> reverse client update flag
- Connect
- Run
	- Set ping rate from options
	- Listen to new ping rate