const express = require('express')
const router = express.Router()
const cors = require('cors')

//Categorias
const {
    obtenerCategorias,
    obtenerCategoria,
    cargarCategoria,
    eliminarCategoria,
    actualizarCategoria
} = require('../controllers/Categorias')

//Productos
const {
    obtenerProductos,
    obtenerProductosIdCategoria,
    obtenerProducto,
    cargarProducto,
    eliminarProducto,
    actualizarProducto,
    actualizarStockProducto
} = require('../controllers/Productos')

//Carritos
const {
    obtenerCarrito,
    cargarCarrito,
    eliminarCarritoIdUser,
    eliminarCarritoIdProduct,
    actualizarCarrito
} = require('../controllers/Carrito')

//Utilitario
const {
    finalizarCompra
} = require('../controllers/Compra')

//Usuarios
const {
    register_get,
    register_post,
    register_getOne,
    register_getEmail,
    login,
    logOut,
    actualizarCuponUsado,

    verifyToken,
    userIdToken,

    actualizarPass,
} = require('../controllers/Users')

//Cupones
const {
    obtenerCupones,
    obtenerCupon,
    cargarCupon,
    eliminarCupon,
    actualizarCupon,
} = require('../controllers/Cupons')


router.get('/obtenerCategorias', obtenerCategorias)

router.get('/obtenerCategoria/:id', obtenerCategoria)

router.post('/cargarCategoria', cargarCategoria)

router.delete('/eliminarCategoria/:id', eliminarCategoria)

router.patch('/actualizarCategoria/:id', actualizarCategoria)

// Productos

router.get('/obtenerProductos', obtenerProductos)

router.get('/obtenerProductosCategoria/:id', obtenerProductosIdCategoria)

router.get('/obtenerProducto/:id', obtenerProducto)

router.post('/cargarProducto', cargarProducto)

router.delete('/eliminarProducto/:id', eliminarProducto)

router.patch('/actualizarProducto/:id', actualizarProducto)

router.patch('/actualizarRestarStockProducto', actualizarStockProducto)

// Carrito

router.get('/obtenerCarrito/:usuarioId', obtenerCarrito)

router.post('/cargarCarrito', cargarCarrito)

router.delete('/eliminarCarritoUser', verifyToken, eliminarCarritoIdUser)

router.delete('/eliminarCarritoUserProducto', eliminarCarritoIdProduct)

router.patch('/actualizarCarrito', actualizarCarrito)

router.post('/finalizarCompra', finalizarCompra)

// Users

router.get('/registerUser_get', register_get)

router.get('/registerUser_getOne/:id', register_getOne)

router.get('/register_getEmail/:email', register_getEmail)

router.post('/registerUser_add', register_post)

router.get('/userId', verifyToken, userIdToken)


router.post('/login', cors({
    origin: 'http://localhost:5173',
    credentials: true,
}), login)

router.get('/logout', verifyToken, logOut)

router.post('/agregarCuponUsado',verifyToken, actualizarCuponUsado)

router.post('/changePass', verifyToken, actualizarPass)

// Cupons

router.get('/obtenerCupones', obtenerCupones)

router.get('/obtenerCupon/:id', obtenerCupon)

router.post('/cargarCupon', cargarCupon)

router.delete('/eliminarCupon/:id', eliminarCupon)

router.patch('/actualizarCupon/:id', actualizarCupon)



module.exports = router