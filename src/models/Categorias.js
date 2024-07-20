const mongoose = require("mongoose")
const CategoriasSchema = new mongoose.Schema({
    categoria: {type: String,enum: ["Hogar","Ropa","Electrónica","Mascotas"], required: true},
   descripcion: {type:String, required:true},
   imagen: {type:String},
 
})
const Categorias = mongoose.model("Categorias",CategoriasSchema)


module.exports = Categorias