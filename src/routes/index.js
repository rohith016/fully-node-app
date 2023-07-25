const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/users', userController.list);     // List all users
router.get('/users/:id', userController.show); // Show a single user
router.post('/users', userController.create);  // Create a new user

module.exports = router;
