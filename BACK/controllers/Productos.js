const db_productos = require('../models/Productos')


const obtenerProductos = async (req, res) => {
    const resultado = await db_productos.find({})
    res.status(200).json(resultado)
}

const obtenerProductosIdCategoria = async (req, res) => {
    console.log(req.params.id)
    const { id } = req.params
    const resultado = await db_productos.find({ categoriaProducto: id })
    console.log(resultado)
    if (!resultado) {
        return res.status(404).json({ error: 'no se encontro la informacion' })
    }
    res.status(200).json(resultado)
}

// Read unique
const obtenerProducto = async (req, res) => {
    console.log(req.params.id)
    const { id } = req.params
    const resultado = await db_productos.findById(id)
    console.log(resultado)
    if (!resultado) {
        return res.status(404).json({ error: 'no se encontro la informacion' })
    }
    res.status(200).json(resultado)
}

// Write
const cargarProducto = async (req, res) => {
    const { nombreProducto, categoriaProducto, ingredientesProducto, pesoProducto, valorProducto, ofertaDescuentoProducto, stockProducto, imgUrlProducto, pointProducto } = req.body
    let datosVacios = []

    if (!nombreProducto) {
        datosVacios.push('nombreProducto')
    }
    if (!categoriaProducto) {
        datosVacios.push('categoriaProducto')
    }
    if (!ingredientesProducto) {
        datosVacios.push('ingredientesProducto')
    }
    if (!pesoProducto) {
        datosVacios.push('pesoProducto')
    }
    if (!valorProducto) {
        datosVacios.push('valorProducto')
    }
    if (ofertaDescuentoProducto) {
        datosVacios.push('ofertaDescuentoProducto')
    }
    if (!stockProducto) {
        datosVacios.push('stockProducto')
    }
    if (!imgUrlProducto) {
        datosVacios.push('imgUrlProducto')
    }
    if (!pointProducto) {
        datosVacios.push('pointProducto')
    }

    if (datosVacios.length > 0) {
        console.log(datosVacios)
        return res.status(400).json({ error: 'Por favor ingrese los datos de los campos ', datosVacios })
    }

    try {
        const resultado = await db_productos.create(
            { nombreProducto, categoriaProducto, ingredientesProducto, pesoProducto, valorProducto, ofertaDescuentoProducto, stockProducto, imgUrlProducto, pointProducto }
        )
        res.status(200).json(resultado)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete
const eliminarProducto = async (req, res) => {

    const { id } = req.params
    const resultado = await db_productos.findOneAndDelete({ _id: id })

    if (!resultado) {
        return res.status(400).json({ error: 'no se puedo eliminar' })
    }

    res.status(200).json(resultado)

}

// Update
const actualizarProducto = async (req, res) => {
    const { id } = req.params
    const resultado = await db_productos.findOneAndUpdate({ _id: id }, { ...req.body })
    res.status(200).json(resultado)
}

const actualizarStockProducto = async (req, res) => {
    const obCanasta = req.body.obCanasta;
    try {
        for (const item of obCanasta) {
            const resultado = await db_productos.findOneAndUpdate(
                { _id: item.productoId },
                {
                    $inc: {
                        "stockProducto": -parseInt(item.quantity, 10) || 0
                    }
                },
                { new: true }
            );
            console.log('Stock actualizado: ' + item.productoId)
        }
        res.status(200).json({ mensaje: 'Stock actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el stock:', error);
    }
}


module.exports = {

    obtenerProductos,
    obtenerProductosIdCategoria,
    obtenerProducto,
    cargarProducto,
    eliminarProducto,
    actualizarProducto,
    actualizarStockProducto,

}