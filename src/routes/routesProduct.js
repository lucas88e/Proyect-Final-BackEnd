

const express = require('express');
const router = express.Router();
const {crearProducto,mostrarProducto,crearCategoria,categorias,pujas,pujaExitosa,mostrarProductoId,actualizarProducto, borrarProducto,mostrarCategoria} = require('../controllers/productController');
router.post("/crear",crearProducto)
router.get("/productos",mostrarProducto)
router.get("/productos/:id",mostrarProductoId)
router.patch("/productos/:id", actualizarProducto)
router.delete("/borrar/:id",borrarProducto)
router.get("/categorias/:categorias",categorias)
router.get("/categorias",mostrarCategoria)

router.post("/crearCategoria",crearCategoria)
router.get("/pujas",pujas)
router.get("/pujaExitosa",pujaExitosa)
module.exports = router;