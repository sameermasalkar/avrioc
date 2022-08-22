const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment')
const connect = require('../database/connect')
const connection = connect.db
autoIncrement.initialize(connection);

const userSchema = new mongoose.Schema(
  {
    user_id: {
        type: Number
    },
    name: {
        type: String,
        required: [true, "name is a required Field"]
    },
    description: {
        type: String
    },
    IsReviewer: {
        type: Number,
        enum: ["Y", "N"]
    }
   
  },
  { timestamps: true }
);

userSchema.plugin(autoIncrement.plugin, {
    model: 'users',
    field: 'user_id',
    startAt: 1000
});

module.exports = mongoose.model("users", userSchema);