import express from 'express';
import {
  productsController,
  productInformationController,
  relatedProductsController,
} from '../controllers/products';

const router = express.Router();

// GET /products
router.get('/', productsController);

// GET /products/:productId
router.get('/:productId', productInformationController);

// GET /products/:productId/styles
router.get('/:productId/styles', (req, res) => {
  res.sendStatus(200);
});

// GET /products/:productId/related
router.get('/:productId/related', relatedProductsController);

export default router;
