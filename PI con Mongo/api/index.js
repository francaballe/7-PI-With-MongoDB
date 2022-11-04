const server = require('./src/app.js');
const axios = require("axios");
require('dotenv').config();
const { PORT } = process.env;
const { Country } = require('./src/db.js');


//Consulta a la apirest externa de paises...
const fetchDataAsync = async () =>{
  const response = await axios.get("https://restcountries.com/v3/all")
  const newArray = response.data.map(unPais => ({
    "_id":unPais.cca3, //No puedo hacer manejo de errores en la PK...se supone que siempre existe desde la API
    "name":unPais.hasOwnProperty("name") ? unPais.name.common : "Not Available",
    "flagImg":unPais.hasOwnProperty("flags") ? unPais.flags[0] : "Flag Not Available",
    "continent":unPais.hasOwnProperty("continents") ? unPais.continents[0] : "Not Available",
    "subregion":unPais.hasOwnProperty("subregion") ? unPais.subregion : "Not Available",
    "capital":unPais.hasOwnProperty("capital") ? unPais.capital[0] : "Not Available",
    "area":unPais.hasOwnProperty("area") ? unPais.area : null,
    "population":unPais.hasOwnProperty("population") ? unPais.population : null
  }));
  //Country.create(newArray[2]) //de esta forma tengo timestamps; con los insert no.
  try{
    //va a dar error por ID duplicado de todos modos, pero prosigue y ejecuta el resto del codigo gracias al ordered: false
    const resp = await Country.collection.insertMany(newArray,{ ordered: false },function(err,result) {
    //console.log(err.writeErrors[0].err.code)
      if (err.writeErrors.some(error => error.code === 11000)){
        console.log("Error de llave duplicada. Lo puedo ignorar.")
      }else{
        console.log("un error diferente a PK duplicada!")
      }

    })
  }catch (unError){
    console.log("Error:",unError)
  }
  
};

fetchDataAsync();


// Syncing all the models at once.
/* conn.sync().then(() => {*/
  server.listen(PORT, () => {
    console.log(`Listening at ${PORT}`); // eslint-disable-line no-console
  });

  