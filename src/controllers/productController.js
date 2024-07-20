const Product = require("../models/Product")
const Categorias = require("../models/Categorias")

const crearProducto =async  (req,res) =>{
  const productData = {
    ...req.body,

  }
  const createProduct = await Product.create(productData)
  res.status(201).send(createProduct)
}
const crearCategoria =async  (req,res) =>{
    const categoriasData = {
      ...req.body,
  
    }
    const createCategoria = await Categorias.create(categoriasData)
    res.status(201).send(createCategoria)
  }

const mostrarProducto = async (req,res)=>{
const product = await Product.find()
res.status(201).send(product)
}
const mostrarCategoria = async (req,res)=>{
    const categoria = await Categorias.find()
    res.status(201).send(categoria)
    }
    


const mostrarProductoId = async (req,res) =>{
    try{
    const id = req.params.id;
    const product = await Product.findById(id);
    res.status(201).send(product)
} catch (error) {
    console.log(error)
}
}
 
const actualizarProducto = async (req,res)=>{
    const id = req.params.id;

    const productoActualizado = await Product.findByIdAndUpdate(
        id,
        req.body,
        {new:true})
    if(!productoActualizado){
        return res.json({error: "Error producto no encontrado"})
    }
    res.status(201).send(`${productoActualizado} actualizado exitosamente`)
    }
    
    const borrarProducto = async (req, res,) => {
    
        const id = req.params.id
        const productoBorrado = await Product.findByIdAndDelete(id)
        if (!productoBorrado) {
            return res.json({ error: "Producto no encontrado" })
        }
        res.status(200).send(`${productoBorrado} Borrado exitosamente`);
  
}

const categorias = async (req, res) => {
    try {
        const categorias = req.params.categorias;
        const categoriasArray = categorias.split(',');
    
        // Buscar productos que coincidan con las categorías
        const todasCategorias = await Product.find({ Categoria: { $in: categoriasArray } });
        
        res.status(200).send(todasCategorias);
    } catch (error) {
        console.error("Error fetching products by categories:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

    const pujas = (req,res)=>{
        res.send("Pujas actuales")


    }
    const pujaExitosa = (req,res)=>{
        res.send("Enhorabuena Puja exitosa")


    }
module.exports = {crearProducto,mostrarProducto,mostrarProductoId,actualizarProducto,borrarProducto,categorias,pujaExitosa,pujas,mostrarCategoria,crearCategoria}