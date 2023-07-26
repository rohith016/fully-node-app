const userService = require('../services/userService');
const AppError = require('../utils/AppError');
const { successResponse, errorResponse } = require('../utils/response');
const HTTP = require('../config/httpCodes');
/**
 * List all users
 * @param {*} req 
 * @param {*} res 
 */
exports.list = async (req, res) => {
  try {
    const users = await userService.userList(req.body);
    // res.json(users);
    return res.status(HTTP.STATUS_OK).json(successResponse('Users retrieved successfully', users, HTTP.STATUS_OK));
  } catch (error) {
    // res.status(500).end(err)
    return res.status(HTTP.STATUS_SERVER_ERROR).json(errorResponse('An error occurred', err, HTTP.STATUS_SERVER_ERROR));
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
      return res.status(HTTP.STATUS_OK).json(successResponse('User retrieved successfully', user, HTTP.STATUS_OK));
    } else {
      return res.status(HTTP.STATUS_NOT_FOUND).json(errorResponse('User not found', null, HTTP.STATUS_NOT_FOUND));
    }
  } catch (err) {
    return res.status(HTTP.STATUS_SERVER_ERROR).json(errorResponse('An error occurred', err.message, HTTP.STATUS_SERVER_ERROR));
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
      return res.status(HTTP.STATUS_CREATED).json(successResponse('Users created successfully', newUser, HTTP.STATUS_CREATED));
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) 
        return res.status(HTTP.STATUS_CONFLICT).json(errorResponse('Email already exists', null, HTTP.STATUS_CONFLICT));
      
      return res.status(HTTP.STATUS_SERVER_ERROR).json(errorResponse('An error occurred', err.message, HTTP.STATUS_SERVER_ERROR));
    }
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const updatedUser = await userService.updateUser(userId, userData);
    
    if (!updatedUser) 
      return res.status(HTTP.STATUS_NOT_FOUND).json(errorResponse('User not found', null, HTTP.STATUS_NOT_FOUND));
    
    return res.status(HTTP.STATUS_OK).json(successResponse('User updated successfully', updatedUser, HTTP.STATUS_OK));

  } catch (error) {
    return res.status(HTTP.STATUS_SERVER_ERROR).json(errorResponse('An error occurred', error.message, HTTP.STATUS_SERVER_ERROR));
  }
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await userService.deleteUser(userId);
    
    if (!deletedUser) 
      return res.status(HTTP.STATUS_NOT_FOUND).json(errorResponse('User not found', null, HTTP.STATUS_NOT_FOUND));
    
    return res.status(HTTP.STATUS_REQUEST_ACCEPTED).json(successResponse('User deleted successfully', null, HTTP.STATUS_REQUEST_ACCEPTED));

  } catch (error) {
    return  res.status(HTTP.STATUS_SERVER_ERROR).json(errorResponse('An error occurred', error.message, HTTP.STATUS_SERVER_ERROR));
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
      return res.status(HTTP.STATUS_CREATED).json(successResponse('Users logged in successfully', user, HTTP.STATUS_CREATED));
    } catch (err) {
      return res.status(HTTP.STATUS_BAD_REQUEST).json(errorResponse('An error occurred', err.message, HTTP.STATUS_BAD_REQUEST));
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
    return res.status(HTTP.STATUS_OK).json(successResponse('Message logged in successfully', null, HTTP.STATUS_OK))

  } catch (error) {
    return res.status(HTTP.STATUS_SERVER_ERROR).json(errorResponse('An error occurred', error.message, HTTP.STATUS_SERVER_ERROR))
  }
}
