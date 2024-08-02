const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try {
        // await mongoose.connect("mongodb://127.0.0.1:27017/ProjectBreak")
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Base de datos conectada con éxito');
    } catch (error) {
        console.error(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
};

module.exports = 
   {dbConnection,} 
