const mongoose = require('mongoose')

const carritoSchema=new mongoose.Schema({
    usuarioId:{
        type:String,
        required:[true,'Por favor ingrese la id del usuario'],
    },
    productoId:{
        type:String,
        required:[true,'Por favor ingrese la id del producto'],
    },
    quantity:{
        type:Number,
        required:[true,'Por favor ingrese la cantidad de producto'],
    }
}
,{
    timestamps:true
})

module.exports=mongoose.model('carrito',carritoSchema);