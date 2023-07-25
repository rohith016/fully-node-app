const productService = require('../services/productService');
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.createProduct = async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json(product);
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getProducts = async (req, res) => {
  const products = await productService.getProducts();
  res.json(products);
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getProduct = async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  if (!product) {
    return res.status(404).send();
  }
  res.json(product);
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (err) {
    res.status(404).send();
  }
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.deleteProduct = async (req, res) => {
  const product = await productService.deleteProduct(req.params.id);
  if (!product) {
    return res.status(404).send();
  }
  res.status(204).send();
};
