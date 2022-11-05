const { Country } = require('../db');


const getCountryById = async function (countryId) {
    
  try{
    //ambas (findById y FindOne) hacen casi lo mismo, pero la documentación recomienda utilizar este método.
    const resp = await Country.findById(countryId.toUpperCase())
    .populate("activities",["_id","name","season"]);
    //const resp = await Country.findOne({_id : countryId.toUpperCase()});
    
    if (!resp) throw new Error("Ningún País coincide con el Id informado...")
  
    return resp;

  }catch(unError){
    throw new Error(unError.message)
  }    
    
  }
    
//Por ultimo, voy a exportar mi funcion para consumirla luego desde la ruta
module.exports = getCountryById;
