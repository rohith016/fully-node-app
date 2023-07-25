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
    try {
        const user = new User(req.body);
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            return res.status(409).send({ message: 'Email already exists' });
        }
        res.status(500).send({ message: err.message });
    }
};

module.exports = exports;
