const mongoose=require('mongoose')
const bcrypt= require('bcrypt')
const {isEmail}=require('validator')

const userSchema=new mongoose.Schema({
    // login
    nombre:{
        type:String,
        required:[false,'Por favor ingrese un nombre'],
    },
    email:{
        type:String,
        required:[false,'Por favor ingrese un email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Porfavor ingrese un email valido']
    },
    password:{
        type:String,
        required:[false,'Por favor ingrese un password'],
        minLength:[6,'Ingrese un minimo de 6 digitos'],
    },

    // data user form in Checkout
    phone:{
        type:String,
        required:[false,'Por favor ingrese un nombre telefono'],
    },
    street:{
        type:String,
        required:[false,'Por favor ingrese dirección'],
    },
    house:{
        type:String,
        required:[false,'Por favor ingrese número de casa'],
    },
    entrance:{
        type:String,
        required:[false,'Por favor completar entrada'],
    },
    commentOrder:{
        type:String,
        required:[false,'Por favor ingrese comentario'],
    },
    housePrivate:{
        type:Boolean,
        required:[false,'Por favor seleccione si es propiedad privada'],
    },
    puntosCompras:{
        type:Number,
        required:[false,'Por favor seleccione puntos de compras'],
    },
    cuponesUsados:{
        type:Array,
        required:[false,'Por favor seleccione cupones usados'],
    }
},{
    timestamps:true
})

userSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(5);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

const User=mongoose.model('users',userSchema)

module.exports=User