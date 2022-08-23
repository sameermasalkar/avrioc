"use strict";
const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const Responses = require('../constants/response.json')


exports.login = async (req, res, next) => {

    try {
        let rbody = req.body;
        let userdata = await userModel.findOne({emailid: rbody.emailid.toLowerCase() }).exec()
        if (userdata) {
            if (bcrypt.compareSync(rbody.password, userdata.password)) {}
        }else{
            console.log("No such user", rbody.emailid);
            res.status(Responses.noUserFound.code).send(Responses.noUserFound.data)
        }

    }catch(error){
        console.error("User login catch block:::::", error)
        res.send({
            status: "FAIL",
            message: error.message,
            data: error.data
        })
    }
}