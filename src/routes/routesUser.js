const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require("../middlewares/multer")
const auth = require("../middlewares/auth")

router.get('/users/:id', userController.getUser);

router.post('/login', userController.getUsers);
router.post('/register',upload.single("avatar"), userController.createUser);
router.post("/logout",userController.logoutUser)
router.patch("/updateUser/:id",auth,userController.updateUser)
router.delete("/borrarUser/:id", userController.deleteUser)

module.exports = router;