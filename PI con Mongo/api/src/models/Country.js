const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema(
  { _id: String,
    name: {type: String, required: true},
    flagImg: {type: String, required: true},
    continent: {type: String, required: true},
    subregion: String,
    capital: {type: String, required: true},
    area: Number,
    population: Number,
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity" //Esta es la forma de hacer las cosas con Mongoose y BBDD no relacionales.
      }
    ]
  },
  {versionKey: false}
  );

const Country = mongoose.model("Country",CountrySchema) 

module.exports = Country;
