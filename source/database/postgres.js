'use strict';

const Promise = require('bluebird');
const { Pool } = require('pg');

module.exports = (config) => {
  return new Promise((resolve, reject) => {
    const pool = new Pool(config);
    pool.on('error', (err) => {
      reject(new Error(err));
    });

    resolve(pool);
  });
};
