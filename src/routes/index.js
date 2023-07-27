const express = require('express');
const userController = require('../controllers/userController');
const { validateUser, validateUserStatusUpdate, validateUserUpdate } = require('../middlewares/userValidator');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();
/**
 * private routes
 */
const authRoutes = express.Router();
authRoutes.use(authenticateToken);

authRoutes.route('/')
  .get(userController.list); // List all users

authRoutes.route('/:id')
  .get(userController.show) // Show a single user
  .patch(validateUserUpdate, userController.updateUser) // Update a single user
  .delete(userController.deleteUser); // Delete a single user

authRoutes.patch('/:id/status', validateUserStatusUpdate, userController.updateUserStatus); // Update user status

router.use('/users', authRoutes);
/**
 * private routes
 */
router.get('/logger', userController.sampleLogMessage);
router.post('/users', validateUser, userController.create);  // Create a new user
router.post('/users/login', userController.login);

module.exports = router;
