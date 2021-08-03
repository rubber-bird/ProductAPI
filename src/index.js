const express = require('express');
const products = require('./routes/products');

require('./config/newrelic');

const app = express();

app.use(express.json());
app.use('/products', products);

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log('Error', error);
  }

  console.log(`Server succesfully started at ${process.env.PORT}!`);
});

module.exports = app;
