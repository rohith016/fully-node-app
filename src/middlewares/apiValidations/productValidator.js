const { body, param, validationResult } = require('express-validator');
const { errorResponse } = require('../../utils/response');
const HTTP = require('../../config/httpCodes');
/**
 * create product validation 
 */
const validateProductCreate = [
    body('name').notEmpty().withMessage('Product name is required').isLength({ min: 2 }).withMessage('Product name must be at least 2 characters long').trim().escape(),
    body('description').optional().isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters long').trim().escape(),
    body('price').notEmpty().withMessage('Product price is required').isNumeric().withMessage('Product price must be a number').trim().escape(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) 
        return res.status(HTTP.STATUS_BAD_REQUEST).json(errorResponse('Validation Error', errors.array(), HTTP.STATUS_BAD_REQUEST));
      
      next();
    },
];
/**
 * edit product validation
 */
const validateProductEdit = [
    param('id').isMongoId().withMessage('Invalid Product ID'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
          return res.status(HTTP.STATUS_BAD_REQUEST).json(errorResponse('Validation Error', errors.array(), HTTP.STATUS_BAD_REQUEST));

        next();
    },
];
/**
 * update product validation
 */
const validateProductUpdate = [
    param('id').isMongoId().withMessage('Invalid Product ID'),
    body('name').optional().isLength({ min: 2 }).withMessage('Product name must be at least 2 characters long').trim().escape(),
    body('description').optional().isLength({ min: 10, max: 500 }).withMessage('Description must be between 10 and 500 characters long').trim().escape(),
    body('price').optional().isNumeric().withMessage('Product price must be a number').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
          return res.status(HTTP.STATUS_BAD_REQUEST).json(errorResponse('Validation Error', errors.array(), HTTP.STATUS_BAD_REQUEST));
        
        next();
    },
 
];
/**
 * edit product validation
 */
const validateProductDelete = [
    param('id').isMongoId().withMessage('Invalid Product ID'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
          return res.status(HTTP.STATUS_BAD_REQUEST).json(errorResponse('Validation Error', errors.array(), HTTP.STATUS_BAD_REQUEST));

        next();
    },
];
module.exports = {
    validateProductCreate,
    validateProductUpdate,
    validateProductEdit,
    validateProductDelete
}