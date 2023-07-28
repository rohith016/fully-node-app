const express = require('express');
const productController = require('../controllers/productController');
const authenticateToken = require('../middlewares/auth');
const { validateProductCreate, validateProductUpdate, validateProductEdit, validateProductDelete } = require('../middlewares/apiValidations/productValidator');


const router = express.Router();

/**
 * private routes
 */
const authRoutes = express.Router();
authRoutes.use(authenticateToken);

authRoutes.route('/')
  .get(productController.getProductList)
  .post(validateProductCreate, productController.createProduct); 

authRoutes.route('/:id')
  .get(validateProductEdit, productController.getProduct) 
  .patch(validateProductUpdate, productController.updateProduct) 
  .delete(validateProductDelete, productController.deleteProduct); 

router.use('/', authRoutes);

module.exports = router;
