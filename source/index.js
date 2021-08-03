'use strict';

const process = require('process');
const server = require('./server');
const config = require('./config');
const database = require('./database');

database.postgres(config.postgres)
  .then((connection) => {
    config.pgconn = connection;

    server.start(config)
    .then((app) => {
      console.log('hopfully')
    })
    .catch((err) => {
      console.error('e', err);
    });
  })
  .catch(err => {
    console.error(err);
  })