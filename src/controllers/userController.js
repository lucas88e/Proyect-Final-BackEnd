const User = require('../models/userModel');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

exports.getUsers = async (req, res) => {
  const { username, password } = req.body;
  console.log(username,password)

  try {
      const user = await User.findOne({ username });

      if (!user) {
          return res.status(400).send('Usuario o contraseña inválidos.');
      }

      const isAuth = await bcrypt.compare(password, user.password);

      if (!isAuth) {
          return res.status(400).send('Usuario o contraseña inválidos.');
      }

      const token = jwt.sign({ _id: user._id }, process.env.jwtPrivateKey);
      res.setHeader('Access-Control-Expose-Headers', 'x-auth-token');
      res.setHeader('x-auth-token', token);
      res.status(200).json({ message: 'Login exitoso', token , _id: user._id});
  } catch (error) {
      console.error('Error en el login:', error);
      res.status(500).send('Error interno en el servidor.');
  }
}
exports.getUser = async (req, res) => {
  try{
     const id= req.params.id
  const users =await User.findById(id)
res.send(users)
  }
  catch(error){
    console.log(error)
  }
 
}

exports.createUser = async (req, res) =>{
  const {
    username,
    password: passwordPlainText,
    ...rest
  } = req.body

  const user = await User.findOne({ username })

  if (user)
    return res.status(400).send('Usuario o contraseña invalido')

  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(passwordPlainText, salt)

  const newUser = await User.create({ username, password, ...rest })

  const token = newUser.generateJWT()
      console.log(token)

      res.setHeader('Access-Control-Expose-Headers', 'x-auth-token')
      res.setHeader('x-auth-token', token)

  res.send("Registrado")
}

exports.logoutUser =  (req,res)=>{
	 req.session.destroy();
	res.send("Sesion destruida")
	
	}