const db_carrito = require('../models/Carrito')

const obtenerCarrito = async (req, res) => {
    const { usuarioId } = req.params
    const resultado = await db_carrito.find({ usuarioId: usuarioId })
    console.log(resultado)
    if (!resultado) {
        return res.status(404).json({ error: 'no se encontro la informacion' })
    }
    res.status(200).json(resultado)
}


// Write
const cargarCarrito = async (req, res) => {
    const { usuarioId, productoId, quantity, option } = req.body;
    let datosVacios = [];

    if (!usuarioId) {
        datosVacios.push("usuarioId");
    }
    if (!productoId) {
        datosVacios.push("productoId");
    }
    if (!quantity) {
        datosVacios.push("quantity");
    }

    if (datosVacios.length > 0) {
        console.log(datosVacios);
        return res
            .status(400)
            .json({ error: "Por favor ingrese los datos de los campos ", datosVacios });
    }

    try {
        // Buscar si ya existe el producto para el usuario
        const existingCartItem = await db_carrito.find({
            usuarioId,
            productoId,
        });

        if (existingCartItem[0] && option) {
            // Si ya existe, actualizar la cantidad
            await db_carrito.findOneAndUpdate(
                { productoId, usuarioId },
                { $set: { quantity: existingCartItem[0].quantity + quantity } }
            );

            res.status(200).json(existingCartItem)
        } else {
            // Si no existe, crear un nuevo registro
            const resultado = await db_carrito.create({
                usuarioId,
                productoId,
                quantity,
            });
            res.status(200).json(resultado);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete
const eliminarCarritoIdUser = async (req, res) => {
    const userId  = req.user
    console.log(userId)
    const resultado = await db_carrito.deleteMany({ usuarioId: userId.userId })

    if (!resultado) {
        return res.status(400).json({ error: 'no se puedo eliminar' })
    }

    res.status(200).json("Eliminado Carrito - Compra Exitosa")

}

const eliminarCarritoIdProduct = async (req, res) => {

    const { usuarioId, productoId } = req.body
    const resultado = await db_carrito.findOneAndDelete({ productoId: productoId, usuarioId: usuarioId })

    if (!resultado) {
        return res.status(400).json({ error: 'no se puedo eliminar' })
    }

    res.status(200).json(resultado)

}

// Update
const actualizarCarrito = async (req, res) => {
    const { usuarioId, productoId } = req.body
    const resultado = await db_carrito.findOneAndUpdate({ productoId: productoId, usuarioId: usuarioId }, { ...req.body })
    res.status(200).json(resultado)
    console.log(resultado)
}

module.exports = {

    obtenerCarrito,
    cargarCarrito,
    eliminarCarritoIdUser,
    eliminarCarritoIdProduct,
    actualizarCarrito,

}