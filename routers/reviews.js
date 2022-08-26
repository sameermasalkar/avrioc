const express = require("express"),
router = express.Router();
const reviewController = require("../controllers/reviews");

router.post("/v1/review", reviewController.addReview);
router.put("/v1/review", reviewController.updateReview);
router.get("/v1/reviews/:film_id", reviewController.getAllReviewsofFilm);
router.get("/v1/review/:review_id", reviewController.getReview);

module.exports = router;