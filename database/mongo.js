"use strict";
const mongoose = require('mongoose')
const config = require('../config/config')

const password = encodeURIComponent(config.db.password);
mongoose.Promise = global.Promise
//const mongoDbUrl = `mongodb://${config.db.username}:${password}@${config.db.serverIP}`

const mongoDbUrl = `mongodb+srv://${config.db.username}:${password}@${config.db.serverIP}`
mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true
})

const db = mongoose.connection

// CONNECTION EVENTS
// When successfully connected
db.on('connected', function () {
    console.log('Mongoose default connection open to ' + config.db.serverIP)
})


// If the connection throws an error
db.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err)
})

// When the connection is disconnected
db.on('disconnected', function () {
    console.log('Mongoose default connection disconnected')
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    db.close(function () {
        console.log(
            'Mongoose default connection disconnected through app termination'
        )
        process.exit(0)
    })
})

module.exports = {
    db
}