//Consumo mis modelos de BBDD. 
const { Activity } = require('../db');

const getActivities = async function () {
    
  try{
    //Este método Populate hace toda la magia en Mongoose....es la mejor herramienta 
    //a falta de una tabla intermedia del modelo relacional de BBDD. Necesito primero haber utilizado
    //referencias en la definición de mis modelos...
    //El segundo parámetro del popule indica con qué campos me quedo...es opcional, sino viene todo.
    const resp = await Activity.find({}).populate("countries",["_id","name"]);
    return resp;
  }catch{
    throw new Error("Error al intentar traer actividades de la base local!")
  }    
    
  }
    
//Por ultimo, voy a exportar mi funcion para consumirla luego desde la ruta
module.exports = getActivities;
