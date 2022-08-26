const express = require("express"),
router = express.Router();
const filmController = require("../controllers/films");

router.post("/v1/film", filmController.addFilm);


module.exports = router;