
"use strict";
const filmModel = require('../models/films')
const Responses = require('../constants/response.json')

exports.addFilm = async (req, res, next) => {
    

    try {
        let rbody = req.body;
        if(rbody.isAdmin == "N" ){
            res.status(401).json({ data: ["Authorisation required for this request."] }); return;
        }
        let dataSet = await new filmModel(rbody).save()
        if (!dataSet) {
            throw {
                message: "Error while user registeration"
            }
        } else {
            res.status(Responses.Regis.code).send(Responses.Regis.data);
            return
        }




    } catch (error) {
        console.error("Film registration catch block:::::", error)
        res.send({
            status: "FAIL",
            message: error.message,
            data: error
        })
    }


}
