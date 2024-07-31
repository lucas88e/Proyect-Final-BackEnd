const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const router = require("./src/routes/routesUser.js");
const { dbConnection } = require('./src/config/db.js');
const productRoutes = require("./src/routes/routesProduct.js");
const session = require("express-session");
const helmet = require("helmet");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
dotenv.config();

// Configuración de sesión
app.use(session({
  secret: process.env.jwtPrivateKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar la carpeta public para servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use("/", router);
app.use("/", productRoutes);

const PORT = process.env.PORT || 5000;

dbConnection();

app.listen(PORT, () => {
  console.log(`Servidor lanzado en el puerto http://localhost:${PORT}`);
});
