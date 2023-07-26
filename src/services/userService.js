const User = require('../models/User');
const { hashPassword, comparePasswords } = require('../utils/passwordUtils');
const { generateToken } = require('../utils/jwtUtils');
/**
 * create new user
 * @param {*} userData 
 * @returns 
 */
exports.createUser = async (userData) => {
  userData.password = await hashPassword(userData.password);
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
    const users = await User.find().lean().exec();
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
  const user = await User.findById(id);
  return user;
}
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

