const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const PujasSchema = new mongoose.Schema({
   nombre:{type:String,required:true},
   user: { type: Schema.ObjectId, ref: "User",required: true },


 
})
const Pujas = mongoose.model("Pujas",PujasSchema)


module.exports = Pujas
