const express = require("express"),
router = express.Router();
const loginController = require("../controllers/login");

router.post("/v1/login", loginController.login);
router.get("/v1/logout", loginController.logout);
router.get("/v1/refreshtoken", loginController.refreshtoken);

module.exports = router;