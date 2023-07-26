const userService = require('../services/userService');
const AppError = require('../utils/AppError');
const { successResponse, errorResponse } = require('../utils/response');
/**
 * List all users
 * @param {*} req 
 * @param {*} res 
 */
exports.list = async (req, res) => {
  try {
    const users = await userService.userList(req.body);
    // res.json(users);
    res.status(200).json(successResponse('Users retrieved successfully', users));
  } catch (error) {
    // res.status(500).end(err)
    res.status(500).json(errorResponse('An error occurred', err, 500));
  }
  
};
/**
 * Show a single user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.show = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.status(200).json(successResponse('User retrieved successfully', user));
    } else {
    //   res.status(404).send({ message: 'User not found' });
      return res.status(404).json(errorResponse('User not found', null, 404));
      // return next(new AppError('User not found', 404));
    }
  } catch (err) {
    res.status(500).json(errorResponse('An error occurred', err.message, 500));
  }
};
/**
 * Create a new user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.create = async (req, res) => {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json(successResponse('Users created successfully', newUser, 201));
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) 
        return res.status(409).json(errorResponse('Email already exists', null, 409));
      
      res.status(500).json(errorResponse('An error occurred', err.message, 500));
    }
};
/**
 * Check user credentials
 * @param {*} req 
 * @param {*} res 
 */
exports.login = async (req, res) => {
    try {
      const user = await userService.checkUserCredentials(req.body.email, req.body.password);
      res.status(201).json(successResponse('Users logged in successfully', user));
    } catch (err) {
      res.status(400).json(errorResponse('An error occurred', err.message, 500));
    }
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.sampleLogMessage = async (req, res) => {
  try {
    const result = await userService.sampleLogMessage()
    res.status(200).json(successResponse('Message logged in successfully', null, 200))

  } catch (error) {
    res.status(500).json(errorResponse('An error occurred', error.message, 500))
  }
}
