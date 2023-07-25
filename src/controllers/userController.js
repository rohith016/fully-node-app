const User = require('../models/User');

// List all users
exports.list = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

// Show a single user
exports.show = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

// Create a new user
exports.create = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
};

module.exports = exports;
