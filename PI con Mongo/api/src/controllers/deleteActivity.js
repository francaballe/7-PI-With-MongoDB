//Veamos si en principio me alcanza solo con Activity...
const { Activity } = require('../db');

const deleteActivity = async function (_id) {
    //console.log(_id)
    try{  
      
      const toDeleteActivity = await Activity.findById(_id);
      if (toDeleteActivity){
        await Activity.deleteOne({_id: _id}); //creo que también puedo usar o.literals.
        //return `Activity deleted successfully (_id:${_id})`;
        return _id;
      }
      else return "Id to be deleted not found!"; 

    }
    catch(unError){
      throw new Error(unError.message)
    }
    
  }
    
//Por ultimo, voy a exportar mi funcion para consumirla luego desde la ruta
module.exports = deleteActivity;
