const { body, validationResult } = require('express-validator');

const validateUser = [
  // Check if firstName is not empty
  body('firstName').notEmpty().withMessage('First name is required'),

  // Check if lastName is not empty
  body('lastName').notEmpty().withMessage('Last name is required'),

  // Check if email is not empty, is an email and normalize it
  body('email').isEmail().withMessage('Email is not valid').normalizeEmail(),

  // Check if password is not empty and is at least 5 characters long
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),

  (req, res, next) => {
    // Execute validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Proceed to the next middleware if validation passed
    next();
  },
];

module.exports = validateUser;
