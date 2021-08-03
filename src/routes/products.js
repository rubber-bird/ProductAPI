const express = require('express');
const {
  productsController,
  productInformationController,
  productStylesController,
  relatedProductsController,
} = require('../controllers/products');

const router = express.Router();

// GET /products
router.get('/', productsController);

// GET /products/:productId
router.get('/:productId', productInformationController);

// GET /products/:productId/styles
router.get('/:productId/styles', productStylesController);

// GET /products/:productId/related
router.get('/:productId/related', relatedProductsController);

module.exports = router;
