'use strict';

const server = require('./server');
const config = require('./config');

process.on('Unhandled rejection Error: no config', (err) => {
  console.log('hahahaha', err);
})

server.start(config)
  .then((app) => {

  })
