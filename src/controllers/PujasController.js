const Pujas = require("../models/Pujas")
const User = require("../models/userModel")

const mostrarPujas = async (req, res) => {
    try {
      const pujas = await Pujas.find({}).populate("user").exec();
      res.status(200).send(pujas);
    } catch (err) {
      res.status(500).send({ error: "Error al mostrar las pujas" });
    }
  };
const crearPuja =async  (req,res) =>{
        const pujaData = {
          ...req.body,
          user: req.user._id, 
      
        }
        const crearPuja = await Pujas.create(pujaData)
        res.status(201).send(crearPuja)
      }

module.exports = {mostrarPujas,crearPuja}