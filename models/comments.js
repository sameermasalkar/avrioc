const mongoose = require("mongoose");
const autoIncrementc = require('mongoose-sequence')
const connect = require('../database/mongo')
const connection = connect.db
const AutoIncrement = autoIncrementc(connection);

const commentSchema = new mongoose.Schema(
    {
        comment_id: {
            type: Number
        },
        film_id: {
            type: Number,

        },
        comment: {
            type: String
        },
        user_id: {
            type: Number

        }

    },
    { timestamps: true }
);



commentSchema.plugin(AutoIncrement, {

    inc_field: 'comment_id',
    start_seq: 1000
});

module.exports = mongoose.model("comments", commentSchema);


