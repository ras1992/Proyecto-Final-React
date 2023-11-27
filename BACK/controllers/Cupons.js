const db_cupons = require('../models/Cupons')

const obtenerCupones = async (req, res) => {
    const resultado = await db_cupons.find({}).sort({ level: 1 })
    res.status(200).json(resultado)
}

// Read unique
const obtenerCupon = async (req, res) => {
    const { id } = req.params
    const resultado = await db_cupons.findById(id)
    if (!resultado) {
        return res.status(404).json({ error: 'no se encontro la informacion' })
    }
    res.status(200).json(resultado)
}

// Write
const cargarCupon = async (req, res) => {
    const { title, level, stars, discount, colorTicket } = req.body
    let datosVacios = []

    if (!title) {
        datosVacios.push('title')
    }
    if (!level) {
        datosVacios.push('level')
    }
    if (!stars) {
        datosVacios.push('stars')
    }
    if (discount) {
        datosVacios.push('discount')
    }
    if (!colorTicket) {
        datosVacios.push('colorTicket')
    }

    if (datosVacios.length > 0) {
        console.log(datosVacios)
        return res.status(400).json({ error: 'Por favor ingrese los datos de los campos ', datosVacios })
    }

    try {
        const resultado = await db_cupons.create(
          { title, level, stars, discount, colorTicket }
        )
        res.status(200).json(resultado)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete
const eliminarCupon = async (req, res) => {

    const { id } = req.params
    const resultado = await db_cupons.findOneAndDelete({ _id: id })

    if (!resultado) {
        return res.status(400).json({ error: 'no se puedo eliminar' })
    }

    res.status(200).json(resultado)
}

// Update
const actualizarCupon = async (req, res) => {
    const { id } = req.params
    const resultado = await db_cupons.findOneAndUpdate({ _id: id }, { ...req.body })
    res.status(200).json(resultado)
    console.log(resultado)
}

module.exports = {
    
    obtenerCupones,
    obtenerCupon,
    cargarCupon,
    eliminarCupon,
    actualizarCupon,

}