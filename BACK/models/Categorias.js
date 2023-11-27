const mongoose = require('mongoose')

const categoriaProductosSchema=new mongoose.Schema({
    nombreCategoria:{
        type:String,
        required:[true,'Por favor ingrese un nombre del Categoria'],
    },
    imgUrlCategoria:{
        type:String,
        required:[true,'Por favor ingrese URL imagen'],
    },
    iconUrlCategoria:{
        type:String,
        required:[true,'Por favor ingrese URL imagen'],
    },
    activeCategory:{
        type:Boolean,
        required:[true,'Por favor completar si esta activa'],
    },
}
,{
    timestamps:true
})

module.exports=mongoose.model('categoriaProductos',categoriaProductosSchema);