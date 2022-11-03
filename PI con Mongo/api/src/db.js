require('dotenv').config();
//const { Sequelize } = require('sequelize');
//const fs = require('fs');
//const path = require('path');
const mongoose = require('mongoose');
const { DB_USER,  DB_PASSWORD} = process.env;
//const modelPlayer = require('./Models/Player.js');
//const modelTeam = require('./Models/Team.js');
//const { PassThrough } = require('stream');


const conexion = mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusterhenryapp.o2gpmak.mongodb.net/?retryWrites=true&w=majority`)
.then((result) => console.log("conexion exitosa a la BBDD"))
.catch((err) => console.log(err));

const CountrySchema = mongoose.Schema(
  { _id: String,
    name: {type: String, required: true},
    flagImg: {type: String, required: true},
    continent: {type: String, required: true},
    subregion: String,
    capital: {type: String, required: true},
    area: Number,
    population: Number
  },
  );

//nombre del modelo, luego el esquema....y luego la coleccion. Si no pongo nada como 3er parametro, 
//se va a tomar el nombre del modelo (Country en este caso) y se va a pluralizar (countries es mi coleccion)
//esto YA es mi modelo
const Country = mongoose.model("Country",CountrySchema) 

//console.log("modelos",mongoose.models)

//const basename = path.basename(__filename);

//const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
/* fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  }); */

// Injectamos la conexion (sequelize) a todos los modelos
//modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
//let entries = Object.entries(sequelize.models);
//let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
//sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
//console.log(sequelize.models) //{ Country: country, Activity: activity }
//const { Country, Activity } = sequelize.models;

// Aca vendrian las relaciones
//Le saco esos timestamps feos...que en mi caso puntual no sirven pa nada!
/* const TablaRelacion = sequelize.define("Country-Activity", {}, { timestamps: false });
Country.belongsToMany(Activity,{through: TablaRelacion});
Activity.belongsToMany(Country,{through: TablaRelacion}); */


module.exports = {
  ...mongoose.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: conexion,     // para importar la conexión { conn } = require('./db.js');
};