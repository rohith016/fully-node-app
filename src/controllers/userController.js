const { 
    createUser, 
    getUserById, 
    checkUserCredentials 
  } = require('../services/userService');

const AppError = require('../utils/AppError');

// List all users
exports.list = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};
// Show a single user
exports.show = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
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
// Create a new user
exports.create = async (req, res) => {
    try {
      const newUser = await createUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).send({ message: 'Email already exists' });
      }
      res.status(500).send({ message: err.message });
    }
};
// Check user credentials
exports.login = async (req, res) => {
    try {
      const user = await checkUserCredentials(req.body.email, req.body.password);
      res.json(user);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
};

module.exports = exports;
