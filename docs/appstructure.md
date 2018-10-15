# App structure:

## Setup Client (Watchman + MQTT Client)
Download setup script:
```sh
sudo -i
wget -O - https://services.senti.cloud/secret-route.sh | bash
wget -O - https://services.senti.cloud/setup > setup.sh
```
Or git clone setup repository:
```sh
sudo -i
git clone https://github.com/senti-platform/setup-client.git && cd setup-client && bash setup.sh
```

- Install all needed helper software
- Create paths
- Download assets (wget + unpack)
- Copy to destinations
- git pull
- npm install (npm --prefix ../senti-mqtt-client ../senti-mqtt-client)
- 

## "Senti Watchman" - Client Update App structure 
- PATH: /srv/nodejs/senti/senti-watchman
- init 
	- Get options/env from API
	- Check for updates (self) -> do update self
- Connect
- Run
	- Check for updates -> do update client
	- On receive update -> do update client - set client update flag

## "Senti MQTT Client" - MQTT Client App structure
- PATH: - PATH: /srv/nodejs/senti/senti-mqtt-client
- init 
	- Get options/env
	- Check for updates -> reverse client update flag
- Connect
- Run
