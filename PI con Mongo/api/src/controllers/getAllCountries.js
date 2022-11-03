//Consumo mi modelo de BBDD. Solo necesito Country en este caso
const { Country } = require('../db');

//voy a definir una funcion
const getAllCountries = async function () {
    
  try{
    const resp = await Country.find({});
    //const resp = await Country.find({}).select('name -_id');
    //const resp = await Country.find({}).sort([["name", -1]]).exec();
    return resp;
  }catch{
    throw new Error("Error al intentar traer paises de la base local!")
  }    
    
  }
    
//Por ultimo, voy a exportar mi funcion para consumirla luego desde la ruta
module.exports = getAllCountries;
