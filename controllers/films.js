
"use strict";
const filmModel = require('../models/films')
const Responses = require('../constants/response.json')
const appLogger = require("../service/appLogger")(module);

exports.addFilm = async (req, res, next) => {
    

    try {
        let rbody = req.body;
        appLogger.info("Film registration request body " + JSON.stringify(rbody));

        if(rbody.isAdmin == "N" ){
           
            res.status(401).json({ data: ["Authorisation required for this request."] }); return;
        }
        let dataSet = await new filmModel(rbody).save()
        if (!dataSet) {
            appLogger.error("Error while film registeration ", dataSet);
            throw {
                message: "Error while film registeration"
            }
        } else {
            res.status(Responses.Regis.code).send(Responses.Regis.data);
            return
        }




    } catch (error) {
        //console.error("Film registration catch block:::::", error)
        appLogger.error("Film registration catch block::::: ", error);
        res.send({
            status: "FAIL",
            message: error.message,
            data: error
        })
    }


}
