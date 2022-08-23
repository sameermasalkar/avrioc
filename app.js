"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const config = require("./config/config");
require('./database/mongo.js');
const userRoutes = require("./routers/users");
const loginRoutes = require("./routers/login");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send({ "message": "Welcome to our api" });
});

// All Users Routes
app.use("/", userRoutes);

// All Users Routes
app.use("/", loginRoutes);


//404 or invalid routes
app.use(function (req, res, next) {
    var err = new Error("Invalid routes");
    err.status = 404;
    next(err);
});


//print error if occurrs
app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

http.createServer(app).listen(8080, () => {
    console.log("Server is listening on port", config.port.AppPortNumber);
});

module.exports = app;