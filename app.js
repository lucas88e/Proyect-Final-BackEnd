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

const allowedOrigins = [
  'https://proyect-final-front.pages.dev',
  'http://localhost:5173', // Agrega localhost como un origen permitido
];


const app = express();
dotenv.config();

// Configuración de sesión
app.use(session({
  secret: process.env.jwtPrivateKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));
app.use(helmet())


app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir solicitudes desde cualquier origen permitido
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

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
