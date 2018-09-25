# Senti-MQTT-Client functions

## Todo (tasks):
- WebHook on GitHub to publish "now"
- API for webhook
- On message = "reboot" on topic /sensor/update
- PM2 daemon 
- Slack channel for subscribe/publish
- Push to Slack from client

## Done:
- On message = "now" on topic /sensor/update
- NodeJS execute bash command

### PM2 Process Manager

PM2 Runtime is a Production Process Manager for Node.js applications with a built-in Load Balancer. It allows you to keep applications alive forever, to reload them without downtime and facilitate common Devops tasks.

```sh
npm install pm2 -g
```

