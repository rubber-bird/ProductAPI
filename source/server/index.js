'use strict';

const express = require('express');
const Promise = require('bluebird');

const

const start = (config) => {
  return new Promise((resolve, reject) => {
    if (!config) {
      reject(new Error('no config'));
    }

    const server = express();



    server.listen(config.server.port, (error) => {
      if (error) {
        reject(new Error(error));
      }

      resolve(server);
    })
  })
}

module.exports = {
  start
}
