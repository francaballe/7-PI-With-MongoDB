//Consumo mi modelo de BBDD. Voy a necesitar los 2 modelos...
const { Country, Activity } = require('../db');
const { findById } = require('../models/Country');


//voy a definir una funcion
const createActivity = async function (data) {

    //console.log(data)
    const {name,difficulty,duration,season,countries} = data;
    
    //Validación de datos...
    if ((typeof(name)==="string") && (name.length===0)){
      throw new Error("Error: El nombre de actividad debe ser un texto no vacío.")
    }
    
    if ((difficulty!==1)&&(difficulty!==2)&&(difficulty!==3)
    &&(difficulty!==4)&&(difficulty!==5)){
      throw new Error("Error: La dificultad debe estar comprendida entre 1 y 5.")
    }

    if (typeof(duration)!=="number")
      throw new Error("Error: La duración debe ser un número entero (horas).")
    else  //si efectivamente ES un numero
      if (!((duration>0) && (Number.isInteger(duration))))
      throw new Error("Error: La duración debe ser un número entero (horas).")

    const toUpperSeason = season.toUpperCase(); 
    if ((toUpperSeason!=="WINTER")&&(toUpperSeason!=="SUMMER")&&(toUpperSeason!=="SPRING")&&(toUpperSeason!=="FALL")){
      throw new Error("Error: Estación del año incorrecta.")
    }

    for (let i=0;i<countries.length;i++){
      try{
        let resp = await Country.findById(countries[i])
        if (!resp) throw new Error(`El País ${countries[i]} no fue encontrado en la base local!`)
      }
      catch(unError){
        throw new Error(unError.message)
      }
    }

    //Tomé la decisión arbitraria de crear una nueva actividad cada vez, sin controlar si ya existe una similar.
    //Es lo que más tiene sentido por cómo está planteado el problema.
    //console.log(data) //ojo, aca tengo tambien countries que NO es de la tabla activities
    //en countries tengo un array solo con el ID de cada pais, nada más.
    try{

      //const newActivity =  await Activity.create({name,difficulty,duration,season,countries:_idAndNameCountries});
      const newActivity =  await Activity.create({name,difficulty,duration,season,countries});
      
      //Esto NO va a quedar en la BBDD grabado con estos campos...y mejor, porque sería espacio desperdiciado.
      //es mas conveniente utilizarlo en getActivities
      //const unaActividad = await Activity.findById(newActivity._id).populate("countries",["_id","name"]);
      
      //A su vez, va a ser de mi interes recorrer el array de paises y hacer la referencia cruzada, es decir, 
      //insertar en mi colleccion "Countries" el ID de la nueva actividad, pero ojo, cada país ya podría tener
      //otras actividades, con lo cual me va a interesar hacer un push a ese array, y no pisar sus valores actuales.
      for (let i=0; i<countries.length; i++){
        const unPais = await Country.findById(countries[i]);
        unPais.activities.push(newActivity._id);
        /* console.log("soy un pais:", unPais); */
        await unPais.save();
      }

      return newActivity;
    }
    catch(unError){
      throw new Error(unError.message)
    }
    
  }
    
//Por ultimo, voy a exportar mi funcion para consumirla luego desde la ruta
module.exports = createActivity;
