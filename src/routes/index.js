const express = require('express');
const userController = require('../controllers/userController');
const validateUser = require('../middlewares/userValidator');

const router = express.Router();

router.get('/users', userController.list);     // List all users
router.get('/users/:id', userController.show); // Show a single user
// add validation too
router.post('/users', validateUser, userController.create);  // Create a new user

module.exports = router;
