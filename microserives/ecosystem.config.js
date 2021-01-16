module.exports = {
  apps : [{
    name: "chat-api",
    cwd: "./chat-api",
    script: "./app.js",
    watch: true,
    env: {
      NODE_ENV: "production",
      PORT: 5000
    }
  },{
    name: "chat-app",
    cwd: "./chat-app",
    // "script": "./chat-app/package.json",
    watch: true,
    script: "./node_modules/react-scripts/scripts/start.js",
    // script    : 'npm',
    // args      : 'run start:production',
    env: {
      NODE_ENV: 'production'
    }
  },{
    name: "chat-socket",
    cwd: "./chat-socket",
    script: "./socket.js",
    watch: true,
    // "args": "start",
    env: {
      NODE_ENV: "production",
      PORT: 8000
    }
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
