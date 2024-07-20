const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema({
   nombre:{type:String,required:true},
   descripcion: {type:String, required:true},
   imagen: {type:String},
   categoria: {type: String, enum: ["Hogar","Ropa","Electrónica","Mascotas"]},
   talla:{type:String,enum:["XS","S","M","L","XL"]},
   precio: {type:String,required:true} 
})
const Product = mongoose.model("Product",ProductSchema)


module.exports = Product
