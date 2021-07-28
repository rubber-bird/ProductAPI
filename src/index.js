import express from 'express';
import products from './routes/products';

require('./config/newrelic');

const app = express();

app.use(express.json());
app.use('/products', products);

app.listen(process.env.PORT);

export default app;
