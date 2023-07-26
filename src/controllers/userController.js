const userService = require('../services/userService');
const AppError = require('../utils/AppError');
/**
 * List all users
 * @param {*} req 
 * @param {*} res 
 */
exports.list = async (req, res) => {
  try {
    const users = await userService.userList(req.body);
    res.json(users);
  } catch (error) {
    res.status(500).end(err)
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
        res.json(user);
    } else {
    //   res.status(404).send({ message: 'User not found' });
        return next(new AppError('User not found', 404));
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
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
      res.status(201).json(newUser);
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).send({ message: 'Email already exists' });
      }
      res.status(500).send({ message: err.message });
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
      res.json(user);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
};


// module.exports = exports;
