'use strict';

const express = require('express');
const Promise = require('bluebird');

const api = require('../api');

const start = (config) => {
  return new Promise((resolve, reject) => {
    if (!config) {
      reject(new Error('no config'));
    }

    const server = express();

    api(server, config);

    server.listen(config.server.port, config.server.host, (error) => {
      if (error) {
        reject(new Error(error));
      }

      console.log(`Server works at ${config.server.host} ${config.server.port}`);
      resolve(server);
    })
  })
}

module.exports = {
  start
}
