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

exports.createUser =  async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("Imagen no proporcionada");
  }
    const imagePath = `${req.file.filename}`;
    const { username, password: passwordPlainText, email, firstName, lastName, mobileNumber, address,avatar, genero, isAdmin } = req.body;

    if (!username || !passwordPlainText || !email) {
      return res.status(400).send('Faltan campos requeridos');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Nombre de usuario ya está en uso');
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send('Email ya está registrado');
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(passwordPlainText, salt);

    const newUser = new User({
      username,
      password,
      email,
      firstName,
      lastName,
      mobileNumber,
      address,
      avatar:imagePath ,
      genero,
      isAdmin
    });

    await newUser.save();

    const token = newUser.generateJWT();

    res.setHeader('Access-Control-Expose-Headers', 'x-auth-token');
    res.setHeader('x-auth-token', token);

    res.status(201).send("Registrado");
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).send('Error en el servidor');
  }
}


exports.logoutUser =async (req,res)=>{
  try{
   	await req.session.destroy();
	res.send("Sesion destruida")
	 
  }
  catch(error){
    console.log("Error al hacer el logout")
  }
	}