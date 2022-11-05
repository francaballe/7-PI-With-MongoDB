const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema(
  { /* _id: String, */ //voy a dejar que MongoDB ponga un ID por si mismo
    name: String,
    difficulty: {
      type: String, 
      enum : ["1", "2", "3", "4", "5"],
    },
    duration: Number,
    season: {
      type: String, 
      enum : ["Winter", "Summer", "Spring", "Fall"],
    },
      countries: [
      {
        type: String, 
        ref: "Country"  //Esta es la forma de hacer las cosas con Mongoose y BBDD no relacionales.
      }
    ]
  },
  {versionKey: false}
  );

const Activity = mongoose.model("Activity",ActivitySchema) 

module.exports = Activity;
