const { Country } = require('../db');


const getCountryById = async function (countryId) {
    
  try{
    const resp = await Country.findById(countryId.toUpperCase());//ambas hacen casi lo mismo, pero la documentación recomienda utilizar este método.
    //const resp = await Country.findOne({_id : countryId.toUpperCase()});
    if (!resp) throw new Error("Ningún País coincide con el Id informado...")
    
    //este getActivities es metodo automatico de sequelize...se llama igual al que creé pero es casualidad.
    //const allActivities = await resp.getActivities();
    //console.log(allActivities.length) //Cantidad de actividades por Pais
    
    /* resp.dataValues.activities = [];
    if (allActivities.length){
      for (let i=0;i<allActivities.length;i++){
        resp.dataValues.activities.push({
        "Id":allActivities[i].getDataValue("Id"),
        "name":allActivities[i].getDataValue("name"),
        "season":allActivities[i].getDataValue("season")})
      }
    } */

    return resp;
  }catch(unError){
    throw new Error(unError.message)
  }    
    
  }
    
//Por ultimo, voy a exportar mi funcion para consumirla luego desde la ruta
module.exports = getCountryById;
