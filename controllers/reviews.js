
"use strict";
const reviewModel = require('../models/reviews');
const Responses = require('../constants/response.json');
const filmModel = require('../models/films');
const appLogger = require("../service/appLogger")(module);



exports.addReview = async (req, res, next) => {


    try {
        let rbody = req.body;
        if (rbody.IsReviewer == "N") {
            res.status(401).json({ data: ["Authorisation required for this request."] }); return;
        }
        appLogger.info("Request to add review for film id: " + req.body.film_id)

        let isFilm = await filmModel.findOne({
            film_id: req.body.film_id

        }, {
            film_id: 1,
            rating: 1
        })

        if (!isFilm) {
            res.status(Responses.noUserFound.code).send(Responses.noUserFound.data);
            return

        }

        let updateRating;

        if (isFilm.rating == 0) {
            updateRating = await filmModel.findOneAndUpdate({ film_id: req.body.film_id }, { rating: parseInt(Math.round(req.body.rating)) });
        } else {
            let avg = (parseInt(isFilm.rating) + parseInt(req.body.rating)) / 2;
            console.log(avg, isFilm.rating, req.body.rating)
            updateRating = await filmModel.findOneAndUpdate({ film_id: req.body.film_id }, { rating: parseInt(Math.round(avg)) });
        }

        let dataSet = await new reviewModel(rbody).save()
        if (!dataSet || !updateRating) {
            appLogger.debug("Error while review registeration: ", dataSet, updateRating)
            throw {
                message: "Error while review registeration"
            }
        } else {
            appLogger.info("Review  added for film : " + req.body.film_id)
            res.status(Responses.Regis.code).send(Responses.Regis.data);
            return
        }




    } catch (error) {
        //console.error("Review registration catch block:::::", error)
        appLogger.error("Review registration catch block::::: ", error)
        res.send({
            status: "FAIL",
            message: error.message,
            data: error
        })
    }


}


exports.updateReview = async (req, res, next) => {
    try {

        appLogger.info("Request to update review for review id: " + req.body.review_id)
        let isReview = await reviewModel.findOne({
            review_id: req.body.review_id

        });
        

        if (isReview) {
            if (isReview.user_id == req.body.user_id || req.body.isAdmin == "Y") {

                let isFilm = await filmModel.findOne({
                    film_id: isReview.film_id

                }, {
                    film_id: 1,
                    rating: 1
                })
                
                if (!isFilm) {
                    res.status(Responses.noUserFound.code).send(Responses.noUserFound.data);
                    return

                }

                let updateRating;

                if (isFilm.rating == 0) {
                    updateRating = await filmModel.findOneAndUpdate({ film_id: isReview.film_id }, { rating: parseInt(Math.round(req.body.rating)) });
                } else {
                    let avg = (parseInt(isFilm.rating) + parseInt(req.body.rating)) / 2;
                    //console.log(avg, isFilm.rating, req.body.rating)
                    updateRating = await filmModel.findOneAndUpdate({ film_id: isReview.film_id }, { rating: parseInt(Math.round(avg)) });
                }

                let dataSet = await reviewModel.findOneAndUpdate({ review_id: isReview.review_id }, { rating: parseInt(Math.round(req.body.rating)), review: req.body.review });


                if (!dataSet || !updateRating) {
                    appLogger.debug("Error while review registeration: ", dataSet, updateRating)
                    throw {
                        message: "Error while review registeration"
                    }
                } else {
                    appLogger.info("Review  updated for film : " + isReview.film_id)
                    res.status(Responses.Regis.code).send(Responses.Regis.data);
                    return
                }


            } else {
                res.status(401).json({ data: ["Authorisation required for this request."] }); return;
            }
        } else {
            res.status(Responses.noUserFound.code).send(Responses.noUserFound.data);
            return
        }


    } catch (error) {
        //console.error("Review updation catch block:::::", error)
        appLogger.error("Review updation catch block::::: ", error)
        res.send({
            status: "FAIL",
            message: error.message,
            data: error
        })
    }
}

exports.getAllReviewsofFilm = async (req, res, next) => {
    try {
        appLogger.info("Request to get all reviews for film id: " + req.params.film_id)
        let isFilms = await reviewModel.find({
            film_id: req.params.film_id

        })

        if (!isFilms.length) {
            res.status(Responses.noUserFound.code).send(Responses.noUserFound.data);
            return

        }

        res.status(200).send({
            status: "SUCCESS",
            data: isFilms

        });
        return



    } catch (error) {
        //console.error("Review updation catch block:::::", error)
        appLogger.error("getAllReviewsofFilm catch block:::::", error)
        res.send({
            status: "FAIL",
            message: error.message,
            data: error
        })
    }
}

exports.getReview = async (req, res, next) => {
    try {
        appLogger.info("Request to get a review for review id: " + req.params.review_id)

        let isReview = await reviewModel.find({
            review_id: req.params.review_id

        })

        if (!isReview.length) {
            res.status(Responses.noUserFound.code).send(Responses.noUserFound.data);
            return

        }

        res.status(200).send({
            status: "SUCCESS",
            data: isReview

        });
        return



    } catch (error) {
        //console.error("Review updation catch block:::::", error)
        appLogger.error("getReview catch block:::::", error)
        res.send({
            status: "FAIL",
            message: error.message,
            data: error
        })
    }
}