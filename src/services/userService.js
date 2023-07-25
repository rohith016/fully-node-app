const User = require('../models/User');
const { hashPassword, comparePasswords } = require('../utils/passwordUtils');
const { generateToken } = require('../utils/jwtUtils');


async function createUser(userData) {
  userData.password = await hashPassword(userData.password);
  const user = new User(userData);
  const newUser = await user.save();
  return newUser;
}

async function getUserById(id) {
  const user = await User.findById(id);
  return user;
}

async function checkUserCredentials(email, password) {
  const user = await User.findOne({ email });
  if (user && await comparePasswords(password, user.password)) {
    const token = generateToken({ id: user._id }, process.env.JWT_SECRET, '1h');
    return { user, token };
  } else {
    throw new Error('Invalid email or password');
  }
}

module.exports = {
  createUser,
  getUserById,
  checkUserCredentials,
};
