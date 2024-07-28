const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema({
   nombre:{type:String,required:true},
   descripcion: {type:String, required:true},
   imagen: {type:String},
   categoria: {type: String, enum: ["Hogar","Ropa","Electronica","Mascotas"]},
   talla:{type:String,enum:["XS","S","M","L","XL"]},
   precio: {type:Number,required:true},
   fecha: {type:Date,default: Date.now}, 
   fechaFinal:{type: Date, 
      default: function() {
         let fechaActual = new Date();
         let fechaFinal = new Date (fechaActual)
         fechaFinal.setDate(fechaFinal.getDate()+7)  // Sumarle una semana en dias
         return fechaFinal
      
  } 
 }
})
const Product = mongoose.model("Product",ProductSchema)


module.exports = Product
