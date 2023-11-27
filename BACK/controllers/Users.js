const db_users = require('../models/Users')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET
const iv = process.env.IV_CRYPTO
const key = process.env.KEY


// Encriptado
const crypto = require('crypto');

// const encriptado = (plaintext) => {
//     const cipher = crypto.createCipheriv(
//         "aes-256-gcm",
//         Buffer.from(key, 'base64'),
//         Buffer.from(iv, 'base64')
//     );
//     let ciphertext = cipher.update(plaintext, 'utf8', 'base64');
//     ciphertext += cipher.final('base64');
//     const tag = cipher.getAuthTag();
//     return { ciphertext, tag, iv };
// }

// const decryptSymmetric = (ciphertext, tag) => {
//     const decipher = crypto.createDecipheriv(
//         "aes-256-gcm",
//         Buffer.from(key, 'base64'),
//         Buffer.from(iv, 'base64')
//     );
//     decipher.setAuthTag(Buffer.from(tag, 'base64'));
//     let decrypted = decipher.update(ciphertext, 'base64', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }

const register_get = async (req, res) => {
    const datos = await db_users.find({})
    res.status(200).json(datos)
}

const register_getEmail = async (req, res) => {
    const { email } = req.params
    const datos = await db_users.find({ email: email })
    if (!datos) {
        return res.status(404).json({ error: 'no se encontro la informacion' })
    }
    res.status(200).json(datos)
}

const register_getOne = async (req, res) => {
    console.log(req.params.id)
    const { id } = req.params
    const resultado = await db_users.findById(id)
    console.log(resultado)
    if (!resultado) {
        return res.status(404).json({ error: 'no se encontro la informacion' })
    }
    res.status(200).json(resultado)
}

//resepcion respuesta de usuario
const register_post = async (req, res) => {
    console.log("recibido: ", req.body)
    const { email, nombre, password,
        phone,
        street,
        house,
        entrance,
        commentOrder,
        housePrivate } = req.body


    const existingUser = await db_users.find({ email });

    if (existingUser[0]) {
        // Si ya existe, actualizar dato de usuario
        const idUser = existingUser[0]._id.toString()
        try {
            const user = await db_users.findOneAndUpdate(
                { _id: idUser, email },
                {
                    $set: {
                        phone,
                        street,
                        house,
                        entrance,
                        commentOrder,
                        housePrivate,
                    }
                }
            );
            res.status(201).json(user)
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else {
        try {
            const user = await db_users.create({
                email, password, nombre,
                phone: "",
                street: "",
                house: "",
                entrance: "",
                commentOrder: "",
                housePrivate: false,
                puntosCompras: 500,
                cuponesUsados: []
            })
            res.status(201).json(user)
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

const login = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)

    try {
        const datos = await db_users.findOne({ email })
        console.log(datos)

        if (!datos) {
            return res.status(401).json({ mensaje: 'credenciales invalidas' })
        }
        const passwordValido = await bcrypt.compare(password, datos.password)

        if (!passwordValido) {
            return res.status(401).json({ mensaje: 'credenciales invalidas' })
        }

        const data = { userId: datos._id, nombre: datos.nombre, email: datos.email, }

        // const ciphertext = encriptado(JSON.stringify(data));
        // console.log("Encriptado", ciphertext, iv);

        // crea token
        const token = jwt.sign(data, jwtSecret)

        // envia a cookie
        res.cookie('token-session', token, { expiresIn: '2h' });

        res.status(201).json("LoginOK")
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ mensaje: 'usuario YA ESTA registrado', })

        }
        res.status(500).json({ mensaje: 'error interno del servidor', })
    }
}
const logOut = (req, res) => {
    res.clearCookie("token-session")
    res.json("sessionClose");
}

const verifyToken = (req, res, next) => {
    const tokens = req.headers.cookie;
    if (!tokens) {
        return res.status(401).json({ message: 'No se proporcionó un token de sesión.' });
    }
    const token = tokens.match(/token-session=([^;]+)/)[1];

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
};

const actualizarPass = async (req, res) => {
    const userId = req.user.userId;
    const newPassword = req.body.password;

    try {
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const resultado = await db_users.findOneAndUpdate(
            { _id: userId },
            { $set: { password: hashedPassword } },
            { new: true }
        );

        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



const userIdToken = (req, res) => {
    const informacionUsuario = req.user;
    res.json({ usuario: informacionUsuario });
}

const actualizarCuponUsado = async (req, res) => {
    const userId = req.user;
    const { cuponId, puntosSumados } = req.body


    if(cuponId!="nada"){
        try {
            const user = await db_users.findOneAndUpdate(
                { _id: userId.userId },
                {
                    $addToSet: {
                        "cuponesUsados": cuponId
                    },
                    $inc: {
                        "puntosCompras": parseInt(puntosSumados, 10) || 0
                    }
                },
                { new: true }
            );
            res.status(201).json(user)
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else {
        try {
            const user = await db_users.findOneAndUpdate(
                { _id: userId.userId },
                {

                    $inc: {
                        "puntosCompras": parseInt(puntosSumados, 10) || 0
                    }
                },
                { new: true }
            );
            res.status(201).json(user)
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
   
}

module.exports = {

    register_get,
    register_post,
    register_getOne,
    register_getEmail,
    login,
    logOut,
    actualizarCuponUsado,

    verifyToken,
    userIdToken,

    actualizarPass,

}