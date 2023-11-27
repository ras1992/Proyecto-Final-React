const mongoose = require('mongoose')

const compraSchema=new mongoose.Schema({
   
    usuarioId: {
        type: String,
        required: [true, 'Por favor ingrese id usuario'],
    },
    carritoId: {
        type: String,
        required: [true, 'Por favor ingrese id carrito'],
    },
    carritoProductos: {
        type: Array,
        required: [true, 'Por favor ingrese productos'],
    },
    delivery: {
        type: Boolean,
        required: [true, 'Por favor ingrese id carrito'],
    },
    pagado: {
        type: Number,
        required: [true, 'Por favor ingrese valor total carrito - sin delivery'],
    },
    descuento: {
        type: Number,
        required: [true, 'Por favor ingrese valor descuento'],
    },
    cupon: {
        type: String,
        required: [true, 'Por favor ingrese id cupon'],
    }
}
,{
    timestamps:true
})

module.exports=mongoose.model('ventaproductos',compraSchema);
