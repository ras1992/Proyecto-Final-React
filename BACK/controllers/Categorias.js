const db_categorias = require('../models/Categorias')

const obtenerCategorias = async (req, res) => {
    const resultado = await db_categorias.find({})
    res.status(200).json(resultado)
}

// Read unique
const obtenerCategoria = async (req, res) => {
    console.log(req.params.id)
    const { id } = req.params
    const resultado = await db_categorias.findById(id)
    console.log(resultado)
    if (!resultado) {
        return res.status(404).json({ error: 'no se encontro la informacion' })
    }
    res.status(200).json(resultado)
}

// Write
const cargarCategoria = async (req, res) => {
    const { nombreCategoria, imgUrlCategoria, activeCategory, iconUrlCategoria } = req.body
    let datosVacios = []

    if (!nombreCategoria) {
        datosVacios.push('nombreCategoria')
    }
    if (!imgUrlCategoria) {
        datosVacios.push('imgUrlCategoria')
    }
    if (!iconUrlCategoria) {
        datosVacios.push('iconUrlCategoria')
    }
    if (!activeCategory) {
        datosVacios.push('activeCategory')
    }



    if (datosVacios.length > 0) {
        console.log(datosVacios)
        return res.status(400).json({ error: 'Por favor ingrese los datos de los campos ', datosVacios })
    }


    try {
        const resultado = await db_categorias.create({ nombreCategoria, imgUrlCategoria, activeCategory, iconUrlCategoria })
        res.status(200).json(resultado)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete
const eliminarCategoria = async (req, res) => {

    const { id } = req.params
    const resultado = await db_categorias.findOneAndDelete({ _id: id })

    if (!resultado) {
        return res.status(400).json({ error: 'no se puedo eliminar' })
    }

    res.status(200).json(resultado)

}

// Update
const actualizarCategoria = async (req, res) => {
    const { id } = req.params
    const resultado = await db_categorias.findOneAndUpdate({ _id: id }, { ...req.body })
    res.status(200).json(resultado)
    console.log(resultado)
}

module.exports = {
    
    obtenerCategorias,
    obtenerCategoria,
    cargarCategoria,
    eliminarCategoria,
    actualizarCategoria,

}