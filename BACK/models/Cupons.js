const mongoose = require('mongoose')

const cuponsSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Por favor ingrese titulo de Cupon'],
    },
    level:{
        type:Number,
        required:[true,'Por favor ingrese el nivel al que corresponde'],
    },
    stars:{
        type:Number,
        required:[true,'Por favor ingrese la cantidad de estrellas'],
    },
    discount:{
        type:Number,
        required:[true,'Por favor ingrese si el producto tiene un descuento 0-100'],
    },
    colorTicket:{
        type:String,
        required:[true,'Por favor ingrese el color en Hex'],
    }
}
,{
    timestamps:true
})

module.exports=mongoose.model('cupones',cuponsSchema);