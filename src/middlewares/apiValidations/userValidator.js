const { body, param, validationResult } = require('express-validator');
const { errorResponse } = require('../../utils/response');
const HTTP = require('../../config/httpCodes');
/**
 * create user validation 
 */
const validateUser = [
  body('firstName').notEmpty().withMessage('First name is required').trim().escape(),
  body('lastName').notEmpty().withMessage('Last name is required').trim().escape(),
  body('email').isEmail().withMessage('Email is not valid').normalizeEmail(),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
      return res.status(HTTP.STATUS_BAD_REQUEST).json(errorResponse('Validation Error', errors.array(), HTTP.STATUS_BAD_REQUEST));
    
    next();
  },
];
/**
 * edit user validation
 */
const validateUserEdit = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) 
        return res.status(HTTP.STATUS_BAD_REQUEST).json(errorResponse('Validation Error', errors.array(), HTTP.STATUS_BAD_REQUEST));

      next();
  },
];
/**
 * update user validation
 */
const validateUserUpdate = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('firstName').optional().trim().escape(),
  body('lastName').optional().trim().escape(),
  body('email').optional().isEmail().withMessage('Email is not valid').normalizeEmail(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HTTP.STATUS_BAD_REQUEST).json(errorResponse('Validation Error', errors.array(), HTTP.STATUS_BAD_REQUEST));
    }
    next();
  },
];
/**
 * delete user validation
 */
const validateUsertDelete = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) 
        return res.status(HTTP.STATUS_BAD_REQUEST).json(errorResponse('Validation Error', errors.array(), HTTP.STATUS_BAD_REQUEST));

      next();
  },
];
/**
 * update user validation
 */
const validateUserStatusUpdate = [
  param('id').isMongoId().withMessage('Invalid user ID'),
  body('status').isIn(['active', 'inactive']).withMessage('Status must be either "active" or "inactive"'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
      return res.status(HTTP.STATUS_BAD_REQUEST).json(errorResponse('Validation Error', errors.array(), HTTP.STATUS_BAD_REQUEST));
    
    next();
  },
];

module.exports = { 
  validateUser,
  validateUserUpdate,
  validateUserEdit,
  validateUsertDelete,
  validateUserStatusUpdate
}
