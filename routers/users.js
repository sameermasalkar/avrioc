const express = require("express"),
router = express.Router();
const userController = require("../controllers/users");

router.post("/v1/user", userController.addUser);

module.exports = router;