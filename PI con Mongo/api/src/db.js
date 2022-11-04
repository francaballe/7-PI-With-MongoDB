require('dotenv').config();
const { DB_USER,  DB_PASSWORD} = process.env;
const mongoose = require('mongoose');
//insolitamente, esta linea agrega el modelo a mongoose.models. No termino de comprender bien cómo.
const modelCountry = require('./models/Country.js');

const conexion = mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusterhenryapp.o2gpmak.mongodb.net/?retryWrites=true&w=majority`)
.then((result) => console.log("conexion exitosa a la BBDD"))
.catch((err) => console.log(err));

//console.log("modelos",mongoose.models)

module.exports = {
  ...mongoose.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  //conn: conexion,     // para importar la conexión { conn } = require('./db.js');
};