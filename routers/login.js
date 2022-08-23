const express = require("express"),
router = express.Router();
const loginController = require("../controllers/login");

router.post("/v1/login", loginController.login);

module.exports = router;