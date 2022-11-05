require('dotenv').config();
const { DB_USER,  DB_PASSWORD} = process.env;
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusterhenryapp.o2gpmak.mongodb.net/?retryWrites=true&w=majority`)
.then((result) => console.log("Conexion exitosa a la BBDD"))
.catch((err) => console.log(err));

module.exports = {
  Country : require("./models/Country.js"),
  Activity : require("./models/Activity.js")
};