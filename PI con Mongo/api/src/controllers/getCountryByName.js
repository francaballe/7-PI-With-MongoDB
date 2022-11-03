//Consumo mi modelo de BBDD. Creo que voy a necesitar ambos modelos....
const { Country, Activity } = require('../db');
const { Op } = require("sequelize");

//voy a definir una funcion
const getCountryByName = async function (countryName) {
    
  //Uso tanto await aca como en la ruta solo a los efectos de poder hacer un console.log aca...
  try{
    console.log("hice click: " + countryName)
    const resp = await Country.find({ name: new RegExp(countryName, 'i') })
    //Es un tanto conceptual. Si no encuentro algo, en realidad NO es un error...
    if (!resp.length) return ("Ningún País coincide con los datos informados...") 
    
    return resp;
    
  }catch(unError){
    throw new Error(unError.message)
  }    
    
  }
    
//Por ultimo, voy a exportar mi funcion para consumirla luego desde la ruta
module.exports = getCountryByName;
