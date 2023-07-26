const User = require('../models/User');
const { hashPassword, comparePasswords } = require('../utils/passwordUtils');
const { generateToken } = require('../utils/jwtUtils');
const logger = require('../utils/logger');

/**
 * create new user
 * @param {*} userData 
 * @returns 
 */
exports.createUser = async (userData) => {
  // userData.password = await hashPassword(userData.password);
  const user = new User(userData);
  const newUser = await user.save();
  return newUser;
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.userList = async (reqData) => {
  try {
    const users = await User.find().select('-password').lean().exec();
    return users;
  } catch (error) {
    throw new Error('Product not found');
  }
  
};
/**
 * get user details
 * @param {*} id 
 * @returns 
 */
exports.getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  return user;
}
/**
 * 
 * @param {*} userId 
 * @param {*} userData 
 * @returns 
 */
exports.updateUser = async (userId, userData) => {
    const user = await User.findByIdAndUpdate(userId, userData, { new: true, runValidators: true });
    return user;
};
/**
 * 
 * @param {*} userId 
 * @returns 
 */
exports.deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  return user;
};
/**
 * login user
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
exports.checkUserCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && await comparePasswords(password, user.password)) {
    const token = generateToken({ id: user._id }, process.env.JWT_SECRET, '1h');
    return { user, token };
  } else {
    throw new Error('Invalid email or password');
  }
}
/**
 * 
 * @returns 
 */
exports.sampleLogMessage = async () => {
  logger.info('This is an informational message');
  logger.error('Error occurred');

  return true
}
