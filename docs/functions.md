# Senti-MQTT-Client functions

## Todo (tasks):

### API:

- API: Get keepalive, ping and topic info from API
- API: Get MQTT username + password from API (SSL)
- API: API to set client in verbose logging mode (on/off)
- API: Client versioning so dead clients can connect to API and check if they have the latest version. If not -> updateclient
- API: Download/create .env file with secrets
- API: Authentication/security of webhook (https://github.com/senti-platform/senti-service-dispatch)

### Misc:
- MQTT topic to execute CLI commands instantly (return result to REST interface or server topic)
- Move Slack to dispatcher
- Logging (new) pinojs/pino / winston
- Logging to SQL / Elasticsearch
- RPI power consumption 
- Update count (from dispatcher holding account of updates pushed - timestamp, uuid, count)
- Persist messages in DB (mysql) - Topic = '#' //subscribe to all topics
- Mysql -> Elsaticsearch
- FIX: Create logs dir on initial run (doesn't work - not logging)
- Options: Restructure into MQTTOptions object and other options
- Uninstall script (uninstall.sh) - removes /srv/nodejs/senti... and removes systemd entries

## Done:
- On message = "now" on topic /sensor/update
- NodeJS execute bash command
- Remotely update the client from GitHub and restart
- PM2 daemon 
- Simple log, creating new log file every day
- API for webhook
- WebHook on GitHub to publish "now"
- Slack channel for subscribe/publish (create new channel and Slack App)
- Push to Slack from clients
- Added local hostname to clientId (temp)
- Added real device id to clientId
- Make MQTT connect options argument work and require from external file
- Connected to node-red (yeah!!)
- React client (simple create-react-app) to subscribe to senti client and update state with status
- Create localhost dir and ini for tests - /srv/senti/etc/infoAgent.ini
- Read /srv/senti/etc/infoAgent.ini for clientId (deviceId)
- Added .env for temporary access to secrets
- Split keepAlive into keepAlive + ping
- Local configuration and device ID from local file
- Communicate internally to own ID topics - e.g. 
- Switch statement to control message actions 
- On message = "reboot" on topic /sensor/update
- Thin client - remove foreign topic chatter
- Topic structure design
- Topic structure implemented
- Topic to update specific client 
- RPI temperature
- JSON decode payload
- JSON check if valid JSON (parsed)
- JSON schema with primary payload and meta data (payload, timestamp, messageId (uuid), clientId)
- React Native App demo to test MQTT connection (https://github.com/senti-platform/senti-monitor)
- SSL on dispatcher


### App structure (new):

#### Setup Client (Watchman + MQTT Client)
```sh
wget -O - https://services.senti.cloud/secret-route.sh | bash
wget -O - https://services.senti.cloud/setup > setup.sh
```
Or
```sh
git clone https://github.com/senti-platform/setup-client.git && cd setup-client && bash setup.sh
```

- Create paths
- Download assets (wget + unpack)
- Copy to destinations
- git pull
- npm install (npm --prefix ../senti-mqtt-client ../senti-mqtt-client)
- 

#### "Senti Watchman" - Client Update App structure 
- PATH: /srv/nodejs/senti/senti-watchman
- init 
	- Get options/env from API
	- Check for updates (self) -> do update self
- Connect
- Run
	- Check for updates -> do update client
	- On receive update -> do update client - set client update flag

#### "Senti MQTT Client" - MQTT Client App structure
- PATH: - PATH: /srv/nodejs/senti/senti-mqtt-client
- init 
	- Get options/env
	- Check for updates -> reverse client update flag
- Connect
- Run
