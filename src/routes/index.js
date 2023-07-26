const express = require('express');
const userController = require('../controllers/userController');
const validateUser = require('../middlewares/userValidator');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

// private routes
router.get('/users', authenticateToken, userController.list);     // List all users
router.get('/users/:id', authenticateToken, userController.show); // Show a single user
router.patch('/users/:id', authenticateToken, userController.updateUser);
router.delete('/users/:id', authenticateToken, userController.deleteUser);
// public routes
router.get('/logger', userController.sampleLogMessage);
router.post('/users', validateUser, userController.create);  // Create a new user
router.post('/users/login', userController.login);

module.exports = router;
