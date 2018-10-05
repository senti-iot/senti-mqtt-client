# Senti-MQTT-Client functions

## Todo (tasks):
- Authentication/security of webhook (https://github.com/senti-platform/senti-service-dispatch)
- Switch statement to control message actions 
- On message = "reboot" on topic /sensor/update
- Local configuration and device ID from local file
- Communicate internally to own ID topics - e.g. 
- Get keepalive and topic info from API
- Get MQTT username + password from API (SSL)
- Topic structure design
- Topic structure implemented
- JSON schema with primary payload and meta data
- JSON decode payload
- Thin client - remove foreign topic chatter
- Read /srv/senti/etc/infoAgent.ini for clientId (deviceId)

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
- Make MQTT connect options argument work and require from external file
- Connected to node-red (yeah!!)
- React client (simple create-react-app) to subscribe to senti client and update state with status
- Create localhost dir and ini for tests - /srv/senti/etc/infoAgent.ini
