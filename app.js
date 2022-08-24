"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const config = require("./config/config");
require('./database/mongo.js');




const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send({ "message": "Welcome to our api" });
});


const requestHandler = require("./service/requestHandler");
app.all("*", requestHandler);

// All Users Routes
const userRoutes = require("./routers/users");
app.use("/", userRoutes);

// All login Routes
const loginRoutes = require("./routers/login");
app.use("/", loginRoutes);

// All film Routes
const filmRoutes = require("./routers/films");
app.use("/", filmRoutes);


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