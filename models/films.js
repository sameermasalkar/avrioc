const mongoose = require("mongoose");
const autoIncrementc = require('mongoose-sequence')
const connect = require('../database/mongo')
const connection = connect.db
const AutoIncrement = autoIncrementc(connection);

const filmSchema = new mongoose.Schema(
  {
    film_id: {
        type: Number
    },
    fname: {
        type: String,
        required: [true, "name is a required Field"]
    },
    description: {
        type: String
    },
    genere: [],
    rating : {
        type: Number,
        default : 0
        
    },
    release_date: {
        type: String
    },
    country: {
        type: String
    }
   
  },
  { timestamps: true }
);

filmSchema.index({film_id : 1 })

filmSchema.plugin(AutoIncrement, {
    
    inc_field: 'film_id',
    start_seq: 1000
});

module.exports = mongoose.model("films", filmSchema);


