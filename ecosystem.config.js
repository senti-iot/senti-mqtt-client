module.exports = {
  apps : [{
    name: 'senti-mqtt-client',
    script: 'index.js',
    autorestart: true,
	watch: true,
	ignore_watch: 'logs/*',
    max_memory_restart: '512M',
  }],
}
