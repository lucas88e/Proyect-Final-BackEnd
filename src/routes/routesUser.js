const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/login', userController.getUsers);
router.post('/register', userController.createUser);

module.exports = router;