var isPi = require('detect-rpi')

var instance = 1

if (isPi()) {
	instance = 1
} else {
	instance = 'max'
}

module.exports = {
  apps : [{
    name: 'senti-mqtt-client',
    script: 'index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: instance,
    autorestart: true,
	watch: true,
	ignore_watch: 'logs/*',
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

/*   deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
 */}

