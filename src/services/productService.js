const Product = require('../models/Product');
/**
 * create new product
 * @param {*} productData 
 * @returns 
 */
exports.createProduct = async (productData) => {
  const product = new Product(productData);
  await product.save();
  return product;
};
/**
 * get all products
 * @returns 
 */
exports.getProducts = async () => {
  const products = await Product.find();
  return products;
};
/**
 * get product details
 * @param {*} id 
 * @returns 
 */
exports.getProductById = async (id) => {
  const product = await Product.findById(id);
  return product;
};
/**
 * update product 
 * @param {*} id 
 * @param {*} updateData 
 * @returns 
 */
exports.updateProduct = async (id, updateData) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  Object.keys(updateData).forEach((update) => product[update] = updateData[update]);
  await product.save();
  return product;
};
/**
 * delete product
 * @param {*} id 
 * @returns 
 */
exports.deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  return product;
};
