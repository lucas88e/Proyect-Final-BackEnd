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

exports.createUser = async (req, res) => {
  try {
    // Extracción de campos del cuerpo de la solicitud
    const { 
      username, 
      password: passwordPlainText, 
      email, 
      firstName, 
      lastName, 
      mobileNumber, 
      address, 
      avatar, 
      genero, 
      isAdmin 
    } = req.body;

    // Verificación de los campos requeridos
    if (!username || !passwordPlainText || !email) {
      return res.status(400).send('Faltan campos requeridos');
    }

    // Verificación de si el usuario o el email ya existen
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Nombre de usuario ya está en uso');
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send('Email ya está registrado');
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(passwordPlainText, salt);

    // Determinar la ruta de la imagen
    let imagePath;
    if (req.file) {
      // Si se subió un archivo, usar su ruta
      imagePath = req.file.filename;
    } else if (avatar) {
      // Si se proporcionó una URL de imagen, usarla
      imagePath = avatar;
    } else {
      // Opcional: asignar una imagen por defecto si no se proporciona ninguna
      imagePath = 'https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg'; // Reemplaza esto con la ruta real de tu imagen por defecto
    }

    // Creación del nuevo usuario
    const newUser = new User({
      username,
      password,
      email,
      firstName,
      lastName,
      mobileNumber,
      address,
      avatar: imagePath,
      genero,
      isAdmin
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Generar el token JWT
    const token = newUser.generateJWT();

    // Enviar el token en el encabezado de la respuesta
    res.setHeader('Access-Control-Expose-Headers', 'x-auth-token');
    res.setHeader('x-auth-token', token);

    res.status(201).send("Registrado");
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).send('Error en el servidor');
  }
};



exports.updateUser =async (req,res)=>{
  const id = req.params.id;
  const usuarioActualizado = await User.findByIdAndUpdate(
      id,
      req.body,
      {new:true})
  if(!usuarioActualizado){
      return res.json({error: "Error usuario no encontrado"})
  }
  res.status(201).send(`${usuarioActualizado} actualizado exitosamente`)
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

  exports.deleteUser = async (req, res,) => {
    
    const id = req.params.id
    const usuarioBorrado = await User.findByIdAndDelete(id)
    if (!usuarioBorrado) {
        return res.json({ error: "Usuario no encontrado" })
    }
    res.status(200).send(`${usuarioBorrado} Borrado exitosamente`);

}