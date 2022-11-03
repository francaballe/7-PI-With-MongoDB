// Exportamos una funcion que define el modelo
const mongoose = require('mongoose');

// Luego le injectamos la conexion a sequelize.
module.exports = () => {
  
  const CountrySchema = mongoose.Schema(
    { _id: String,
      name: {type: String, required: true},
      flagImg: {type: String, required: true},
      continent: {type: String, required: true},
      subregion: String,
      capital: {type: String, required: true},
      area: Number,
      population: Number
    }
    );

}