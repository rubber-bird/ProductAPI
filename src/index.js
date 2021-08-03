const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const client = require('prom-client');

const path = require('path');
const products = require('./routes/products');

require('./config/newrelic');

const register = new client.Registry();
const app = express();

register.setDefaultLabels({
  app: 'ProductApi',
});

client.collectDefaultMetrics({
  app: 'node-application-monitoring-app',
  prefix: 'node_',
  timeout: 10000,
  gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
  register,
});

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(logger('combined', { stream: accessLogStream }));
app.use(express.json());
app.use('/products', products);

app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log('Error', error);
  }

  console.log(`Server succesfully started at ${process.env.PORT}!`);
});

module.exports = app;
