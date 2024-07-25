const express = require('express');
const dotenv = require('dotenv');
const router = require("./routes/routesUser")
const  {dbConnection}  = require('./config/db');
const productRoutes = require("./routes/routesProduct.js")
const session = require("express-session")
const helmet = require("helmet")






const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');
app.use(session({
  secret:process.env.jwtPrivateKey,
  resave:false,
  saveUninitialized:true,
  cookie:{secure:true}
}))

app.use(helmet())
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",router)
app.use("/", productRoutes)


dotenv.config();

const PORT = process.env.PORT || 5000;

dbConnection()


app.listen(PORT, () => {
  console.log(`Servidor lanzado en el puerto http://localhost:${PORT}`)
})
