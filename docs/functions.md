# Senti-MQTT-Client functions

## Todo (tasks):
- Authentication/security of webhook (https://github.com/senti-platform/senti-service-dispatch)
- Get keepalive, ping and topic info from API
- Get MQTT username + password from API (SSL)
- API to set client in verbose logging mode (on/off)
- MQTT topic to execute CLI commands instantly (return result to REST interface or server topic)
- Move Slack to dispatcher
- Winston logger
- RPI power consumption 
- Update count (from dispatcher holding account of updates pushed - timestamp, uuid, count)
- Persist messages in DB (mysql) - Topic = '#' //subscribe to all topics
- Mysql -> Elsaticsearch

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
- Added .env for further use
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
