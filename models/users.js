const mongoose = require("mongoose");
const autoIncrementc = require('mongoose-sequence')
const connect = require('../database/mongo')
const connection = connect.db
const AutoIncrement = autoIncrementc(connection);

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
        type: String,
        enum: ["Y", "N"]
    },
    emailid : {
        type: String, 
        lowercase: true
        
    },
    password: {
        type: String
    }
   
  },
  { timestamps: true }
);

userSchema.index({ emailid: 1 }, { unique: true });

userSchema.plugin(AutoIncrement, {
    
    inc_field: 'user_id',
    start_seq: 1000
});

module.exports = mongoose.model("users", userSchema);