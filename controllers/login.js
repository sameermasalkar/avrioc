"use strict";
const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const Responses = require('../constants/response.json')
const jwt = require('jsonwebtoken')
const config = require("../config/config");
const mutils = require("../service/utlis");

exports.login = async (req, res, next) => {

    try {
        let rbody = req.body;
        let userdata = await userModel.findOne({ emailid: rbody.emailid.toLowerCase() }).exec();
        if (userdata) {
            if (bcrypt.compareSync(rbody.password, userdata.password)) {
                let token_data = {
                    name: userdata.name,
                    emailid: userdata.emailid,
                    IsReviewer: userdata.IsReviewer,
                    user_id : userdata.user_id,
                    isAdmin : userdata.isAdmin
                }
                
                token_data = await mutils.encryptdata(JSON.stringify(token_data));
                
                const token = jwt.sign({ tokendata: token_data }, config.jwt.secret, { expiresIn: config.jwt.tokenLife })
                const Refreshtoken = jwt.sign({ tokendata: token_data }, config.jwt.refresh_secret, { expiresIn: config.jwt.refresh_tokenLife })

                res.status(200).send({
                    status: "SUCCESS",
                    message: "Logged in successfully",
                    token: token,
                    Refreshtoken: Refreshtoken

                })
                return
            } else {
                //for secuity reasons
                res.status(Responses.credsNotMatch.code).send(Responses.credsNotMatch.data);
                return

            }
        } else {
            console.log("No such user", rbody.emailid);
            //for secuity reasons
            res.status(Responses.credsNotMatch.code).send(Responses.credsNotMatch.data)
            return
        }

    } catch (error) {
        console.error("User login catch block:::::", error)
        res.send({
            status: "FAIL",
            message: error.message,
            data: error
        })
    }
}

exports.logout = async (req, res, next) => {

}

exports.refreshtoken = async (req, res, next) => {
    try {
        let token = req.headers['refresh_token']
        let decoded = await jwt.verify(token, config.jwt.refresh_secret);
        
        const newtoken = jwt.sign({ tokendata: decoded.tokendata }, config.jwt.secret, { expiresIn: config.jwt.tokenLife })
        console.log("new token generated")
        res.status(200).send({
            status: "SUCCESS",
            
            token: newtoken
            
        })
        return
        
    } catch (error) {
        console.error("refresh token catch block:::::", error)
        res.status(500).send({
            status: "FAIL",
            message: error.message,
            data: error
        })
    }
}