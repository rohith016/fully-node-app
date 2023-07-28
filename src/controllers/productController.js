const productService = require('../services/productService');
const { successResponse, errorResponse } = require('../utils/response');
const HTTP = require('../config/httpCodes');
const MESSAGE = require('../config/messages');
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(HTTP.STATUS_CREATED).json(successResponse(MESSAGE.PRODUCT_CREATED_SUCCESS, product, HTTP.STATUS_CREATED));    
  } catch (error) {
    return res.status(HTTP.STATUS_SERVER_ERROR).json(errorResponse(MESSAGE.GENERIC_ERROR, error.message, HTTP.STATUS_SERVER_ERROR));
  }
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.getProductList = async (req, res) => {
  try {
    const products = await productService.getProducts(req.body);
    return res.status(HTTP.STATUS_OK).json(successResponse(MESSAGE.PRODUCTS_RETRIEVE, products, HTTP.STATUS_OK));
  } catch (error) {
    return res.status(HTTP.STATUS_SERVER_ERROR).json(errorResponse(MESSAGE.GENERIC_ERROR, error.message, HTTP.STATUS_SERVER_ERROR));
  }
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    if (product) 
      return res.status(HTTP.STATUS_OK).json(successResponse(MESSAGE.PRODUCT_RETRIEVE, product, HTTP.STATUS_OK));

    return res.status(HTTP.STATUS_NOT_FOUND).json(errorResponse(MESSAGE.PRODUCT_NOT_FOUND, null, HTTP.STATUS_NOT_FOUND));
  } catch (error) {
    return res.status(HTTP.STATUS_SERVER_ERROR).json(errorResponse(MESSAGE.GENERIC_ERROR, error.message, HTTP.STATUS_SERVER_ERROR));
  }
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    const updateProduct = await productService.updateProduct(productId, productData);
    
    if (!updateProduct) 
      return res.status(HTTP.STATUS_NOT_FOUND).json(errorResponse(MESSAGE.PRODUCT_NOT_FOUND, null, HTTP.STATUS_NOT_FOUND));
    
    return res.status(HTTP.STATUS_OK).json(successResponse(MESSAGE.PRODUCT_UPDATED_SUCCESS, updateProduct, HTTP.STATUS_OK));

  } catch (error) {
    return res.status(HTTP.STATUS_SERVER_ERROR).json(errorResponse(MESSAGE.GENERIC_ERROR, error.message, HTTP.STATUS_SERVER_ERROR));
  }
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deleteProduct = await productService.deleteProduct(productId);
    
    if (!deleteProduct) 
      return res.status(HTTP.STATUS_NOT_FOUND).json(errorResponse(MESSAGE.PRODUCT_NOT_FOUND, null, HTTP.STATUS_NOT_FOUND));
    
    return res.status(HTTP.STATUS_REQUEST_ACCEPTED).json(successResponse(MESSAGE.PRODUCT_DELETED_SUCCESS, null, HTTP.STATUS_REQUEST_ACCEPTED));

  } catch (error) {
    return  res.status(HTTP.STATUS_SERVER_ERROR).json(errorResponse(MESSAGE.GENERIC_ERROR, error.message, HTTP.STATUS_SERVER_ERROR));
  }
};
