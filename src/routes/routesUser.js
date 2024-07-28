const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users/:id', userController.getUser);

router.post('/login', userController.getUsers);
router.post('/register', userController.createUser);
router.post("/logout",(req,res)=>{
	req.session.destroy();
	res.send("Sesion destruida").redirect("/")
	
	
	})

module.exports = router;