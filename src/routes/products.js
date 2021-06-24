import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendStatus(200);
});

router.get('/:productId', (req, res) => {
  res.sendStatus(200);
});

router.get('/:productId/styles', (req, res) => {
  res.sendStatus(200);
});

router.get('/:productId/related', (req, res) => {
  res.sendStatus(200);
});

export default router;

// GET /products
// GET /products/:productId
// GET /products/:productId/styles
// GET /products/:productId/related