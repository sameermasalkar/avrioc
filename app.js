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

http.createServer(app).listen(8080, () => {
    console.log("Server is listening on port", config.port.AppPortNumber);
});

module.exports = app;