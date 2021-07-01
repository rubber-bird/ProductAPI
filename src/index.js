import express from 'express';
// import morgan from 'morgan';

import defaults from './routes/defaults';
import products from './routes/products';

const app = express();

app.use(express.json());
// app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

app.use('/', defaults);
app.use('/products', products);

app.listen(process.env.PORT, () => {
  console.log(`This server is running at localhost:${process.env.PORT}`);
});

export default app;
