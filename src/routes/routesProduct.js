

const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth.js")
const { crearProducto, mostrarProducto, crearCategoria, actualizarCategoria, categorias, pujas, pujaExitosa, mostrarProductoId, actualizarProducto, borrarProducto, mostrarCategoria } = require('../controllers/productController');
const {mostrarPujas,crearPuja} = require("../controllers/PujasController.js")

router.post("/crear", crearProducto)

router.get("/productos", mostrarProducto)
router.get("/productos/:id", auth, mostrarProductoId)
router.patch("/productos/:id",auth, actualizarProducto)
router.delete("/borrar/:id", borrarProducto)
router.get("/categorias/:categorias", categorias)
router.get("/categorias", mostrarCategoria)

router.post("/crearCategoria", crearCategoria)
router.patch("/categorias/:id", actualizarCategoria)

// Rutas Pujas
router.post("/crearPuja",auth,crearPuja)

router.get("/pujas",auth, mostrarPujas)
router.get("/pujaExitosa", pujaExitosa)
module.exports = router;