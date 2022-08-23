
"use strict";
const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const BCRYPT_SALT_ROUNDS = bcrypt.genSaltSync(10)
const Responses = require('../constants/response.json')

exports.addUser = async (req, res, next) => {
    console.error("Inside user registration");

    try {
        let rbody = req.body;

        //Check duplicate email id
        let IsUser = await userModel.findOne({
            emailid: req.body.emailid

        }, {
            _id: 1
        })
        console.log("EmailID duplicate check", IsUser)
        if (IsUser) {
            res.status(Responses.emailExists.code).send(Responses.emailExists.data);
            return

        }

        rbody.password = bcrypt.hashSync(rbody.password, BCRYPT_SALT_ROUNDS)


        let dataSet = await new userModel(rbody).save()
        if (!dataSet) {
            throw {
                message: "Error while user registeration"
            }
        } else {
            res.status(Responses.userRegis.code).send(Responses.userRegis.data);
        }




    } catch (error) {
        console.error("User registration catch block:::::", error)
        res.send({
            status: "FAIL",
            message: error.message,
            data: error.data
        })
    }


}
