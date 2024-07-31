const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require("../middlewares/multer")
// const multer = require("multer")
// const { extname } = require("path")

// const upload = multer({
//     storage: multer.diskStorage({
//         destination:  (req, file, cb) => {
//             cb(null, path.join(__dirname, 'public'))
//         },
//         filename: (req, file, cb) => {
//             const fileExtension = extname(file.originalname);
//             const fileName = file.originalname.split(fileExtension)[0]
//             cb(null, `${fileName}${fileExtension}`)
//         }
//     }),
//     fileFilter:(req,file,cb)=>{
//         if (MIMETYPES.includes(file.mimetype)) cb(null,true)
//             else cb(new Error(`Only ${MIMETYPES.join('')}mimetypes are allowed`))
//     },
//     limits:{
//         fieldSize: 10000000
//     }
// })

router.get('/users/:id', userController.getUser);

router.post('/login', userController.getUsers);
router.post('/register',upload.single("avatar"), userController.createUser);
router.post("/logout",userController.logoutUser)

module.exports = router;