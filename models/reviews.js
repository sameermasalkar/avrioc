const mongoose = require("mongoose");
const autoIncrementc = require('mongoose-sequence')
const connect = require('../database/mongo')
const connection = connect.db
const AutoIncrement = autoIncrementc(connection);

const reviewSchema = new mongoose.Schema(
  {
    review_id: {
        type: Number
    },
    film_id: {
        type: Number,

    },
    rating: {
        type: Number,

    },
    review: {
        type: String
    },
    user_id: {
        type: Number

    }
   
  },
  { timestamps: true }
);



reviewSchema.plugin(AutoIncrement, {
    
    inc_field: 'review_id',
    start_seq: 1000
});

module.exports = mongoose.model("reviews", reviewSchema);


