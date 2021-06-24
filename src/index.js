import express from 'express';
import morgan from 'morgan';

import defaults from './routes/defaults';
import products from './routes/products';

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

app.use('/', defaults);
app.use('/products', products);

app.listen(PORT, () => {
  console.log(`This server is running at localhost:${PORT}`);
});

export default app;
