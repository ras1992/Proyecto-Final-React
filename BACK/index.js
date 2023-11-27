require('dotenv').config()
const express = require('express')
const cors = require('cors')
const misrutas=require('./routes/routes')
const conectDB=require('./db/connect')



const app = express()


const URL_MG=process.env.DB_URL
const PORT=process.env.PORT

app.use(express.json())

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api/menu',misrutas)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
  });

const start=async()=>{
    try{
        await conectDB(URL_MG)
        console.log('Se conecto a la base de datos')
        app.listen(PORT,()=>{
            console.log('Se conecto al servidor')
        })
    }
    catch(error){
        console.log("Error: ",error)
    }
}
start()

