//Consumo mi modelo de BBDD. Voy a necesitar los 2 modelos...
const { Country, Activity } = require('../db');


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
    //en countries tengo solo el ID de cada pais, nada más.
    try{

      //tal vez me convenga antes armar este countries que le paso acá abajo, y pasarle luego directamente
      //lo que quiero, o sea, un array de objetos con _id y name...
      const _idAndNameCountries = [];
      for (let i=0;i<countries.length;i++){
        //console.log(countries[i]) //ARG y luego MEX //me voy a quedar sólo con _id y nombre del país.
        const unPais = await Country.findById(countries[i]).select("_id name");
        _idAndNameCountries.push(unPais)
      }
      
      //const newActivity =  await Activity.create({name,difficulty,duration,season,_idAndNameCountries});
      //el create lo uso por object literals para todos los campos, menos para el último.
      const newActivity =  await Activity.create({name,difficulty,duration,season,countries:_idAndNameCountries});
      console.log(newActivity)

      //ver si esta bien retornar esto...pero diria que en principio si...aunque innecesario.
      //desde mi ruta solo voy a devolver un OK.
      return newActivity;
    }
    catch(unError){
      throw new Error(unError.message)
    }
    
  }
    
//Por ultimo, voy a exportar mi funcion para consumirla luego desde la ruta
module.exports = createActivity;
