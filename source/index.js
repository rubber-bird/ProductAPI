'use strict';

const server = require('./server');
const config = require('./config');

process.on('Unhandled rejection Error: no config', (err) => {
  console.log('hahahaha', err);
})


console.log(config.postgres);
server.start(config)
  .then((app) => {
    console.log('hopfully')
  })
  .catch((err) => {
    console.log('e', err);
  })