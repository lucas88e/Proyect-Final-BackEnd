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
const compression = require("compression")


const app = express();
dotenv.config();

// Configuración de sesión
app.use(session({
  secret: process.env.jwtPrivateKey||"secreto",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));
console.log(process.env.jwtPrivateKey)
app.use(helmet());
app.use(cors({
  origin: 'https://your-frontend-domain.com', // Reemplaza con el dominio de tu frontend en producción
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar la carpeta public para servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(compression())

app.use("/", router);
app.use("/", productRoutes);

const PORT = process.env.PORT || 5000;

dbConnection();

app.listen(PORT, () => {
  console.log(`Servidor lanzado en el puerto http://localhost:${PORT}`);
});
