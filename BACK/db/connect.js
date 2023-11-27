const mongoose = require('mongoose');

const conectDB = (url) => {
    return mongoose.connect(url, {
        // Configuraciones adicionales de conexión si las tienes
    });
}

module.exports = conectDB;