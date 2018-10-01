# Senti-MQTT-Client functions

## Todo (tasks):
- Authentication/security of webhook (https://github.com/senti-platform/senti-service-dispatch)
- On message = "reboot" on topic /sensor/update
- Make MQTT connect options argument work and require from external file
- Local configuration and device ID from local file
- Switch statement to control message actions 
- Slack channel for subscribe/publish
- Push to Slack from client
- Get keepalive and topic info from API
- Get username + password from API (SSL)

## Done:
- On message = "now" on topic /sensor/update
- NodeJS execute bash command
- Remotely update the client from GitHub and restart
- PM2 daemon 
- Simple log, creating new log file every day
- API for webhook
- WebHook on GitHub to publish "now"

