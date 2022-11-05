//Consumo mis modelos de BBDD. 
const { Activity,Country } = require('../db');

const getActivities = async function () {
    
  try{
    const resp = await Activity.find({});
    //const resp = await Country.find({});
    //const resp = await Activity.findAll({include:Country})    //el include equivale al join en SQL.
    // No me acuerdo si hace un right join, inner join, left join. 
    //Buscar en la documentación oficial de sequelize.
    return resp;
  }catch{
    throw new Error("Error al intentar traer actividades de la base local!")
  }    
    
  }
    
//Por ultimo, voy a exportar mi funcion para consumirla luego desde la ruta
module.exports = getActivities;
