
"use strict";
const userModel = require('../models/users')

exports.addUser = async (req, res, next) => {
    console.error("Inside user registration");
    
    try{
    let rbody = req.body;
    res.send({status: "ok"})
}catch(error){
    console.error("User registration catch block:::::", err)
    res.send({
        status: "fail",
        message: err.message,
        data: err.data
    })
}

    
}
