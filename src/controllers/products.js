const {
  getProducts,
  getProductInformation,
  getProductStyles,
  getRelatedProducts,
} = require('../models/products');

async function productsController(req, res) {
  const { page, count } = req.params;

  const qPage = page || 0;
  const qCount = count || 5;

  let result;
  try {
    result = await getProducts(qPage, qCount);
    res.status(200).json(result);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function productInformationController(req, res) {
  const { productId } = req.params;
  let result;

  try {
    result = await getProductInformation(productId);
    res.status(200).json(result);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function productStylesController(req, res) {
  const { productId } = req.params;
  let result;
  try {
    result = await getProductStyles(productId);
    res.status(200).json(result);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function relatedProductsController(req, res) {
  const { productId } = req.params;
  let result;

  try {
    result = await getRelatedProducts(productId);
    res.status(200).json(result);
  } catch (err) {
    res.sendStatus(500);
  }
}

module.exports = {
  productsController,
  productInformationController,
  productStylesController,
  relatedProductsController,
};
