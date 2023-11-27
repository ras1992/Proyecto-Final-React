const db_compras = require('../models/Compra')

const finalizarCompra = async (req, res) => {

    const { usuarioId, carritoId, carritoProductos, delivery, pagado, descuento, cupon } = req.body;
    let datosVacios = [];

    if (!usuarioId) {
        datosVacios.push("usuarioId");
    }
    if (!carritoId) {
        datosVacios.push("carritoId");
    }
    if (!carritoProductos) {
        datosVacios.push("carritoProductos");
    }
    if (!pagado) {
        datosVacios.push("pagado");
    }

    if (!cupon) {
        datosVacios.push("cupon");
    }

    if (datosVacios.length > 0) {
        console.log(datosVacios);
        return res
            .status(400)
            .json({ error: "Por favor ingrese los datos de los campos ", datosVacios });
    }

    try {
        const resultado = await db_compras.create(
            {
            usuarioId,
            carritoId,
            carritoProductos,
            delivery,
            pagado,
            descuento,
            cupon,
        }
        )
        res.status(200).json("Subida la compra")
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {

    finalizarCompra

}
