"use strict";

const jwt = require('jsonwebtoken')
const config = require("../config/config");
const mutils = require("../service/utlis");
const whitelistedroutes = require('../config/whitelistedroutes');

module.exports = async (req, res, next) => {
    let decoded = {};
    try {
        if ((req.headers['access_token'])) {
            const token = req.headers['access_token'];
            decoded = await jwt.verify(token, config.jwt.secret);
            
            
            if (decoded.tokendata) {
                decoded.tokendata = JSON.parse(await mutils.decryptdata(decoded.tokendata));
                
                req.body.user_id = decoded.tokendata.user_id;
                req.body.IsReviewer = decoded.tokendata.IsReviewer;
                req.body.isAdmin = decoded.tokendata.isAdmin;
            } else {
                res.status(401).json({ data: ["Authorisation required for this request."] }); return;
            }
        } else {

            let isWhitelistedRoute = false;
            if (whitelistedroutes['path']) {
                if (typeof req.path === "string") {
                    isWhitelistedRoute = whitelistedroutes['path'].indexOf(req.path) !== -1;
                } else {
                    isWhitelistedRoute = req.path.every((elem) => whitelistedroutes['path'].indexOf(elem) !== -1);
                }

                if (!isWhitelistedRoute) {
                    res.status(401).json({ data: ["Authorisation required for this request."] }); return;
                }
            }
        }


    } catch (error) {
        console.error("error in decoding", error)
        res.status(500).send({
            status: "FAIL",
            message: error.message,
            data: error
        })
        return

    }

    next();
}