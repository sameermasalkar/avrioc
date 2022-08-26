"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const config = require("./config/config");
require('./database/mongo.js');
const appLogger = require("./service/appLogger")(module);
const httpContext = require("express-http-context");
const helmet = require("helmet");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

const app = express();

app.use(helmet.xssFilter());


app.use(helmet.frameguard());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

//winston configuration
app.use(httpContext.middleware);
// Run the context for each request. Assign a unique identifier to each request
app.use((req, res, next) => {
    const uid = uuidv4();
    httpContext.set("reqId", uid);
    req.uid = uid;
    next();
});

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

// All review Routes
const reviewRoutes = require("./routers/reviews");
app.use("/", reviewRoutes);



//404 or invalid routes
app.use(function (req, res, next) {
    var err = new Error("Invalid routes or URL");
    err.status = 404;
    next(err);
});


//print error if occurrs
app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message;
    appLogger.error("Error while processing", message);
    res.status(status).json({ message: message });
    return
});

http.createServer(app).listen(8080, () => {
    appLogger.info("Server is listening on port: " + config.port.AppPortNumber);
});

module.exports = app;