'use strict';

const process = require('process');
const server = require('./server');
const config = require('./config');
const database = require('./database');

console.log(config.postgres);



server.start(config)
.then((app) => {
  console.log('hopfully')

})
.catch((err) => {
  console.log('e', err);
})