const express = require('express');
const dotenv = require('dotenv');
const router = require("./routes/routesUser")
const  {dbConnection}  = require('./config/db');
const productRoutes = require("./routes/routesProduct.js")



const app = express();
const bodyParser = require('body-parser');

const cors = require('cors');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/",router)
app.use("/", productRoutes)


dotenv.config();

const PORT = process.env.PORT || 5000;

dbConnection()


app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})
