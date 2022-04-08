"use strict";

var express = require("express");
var ContactController = require("../controllers/contact");

var router = express.Router();

router.get("/home", ContactController.home);
router.post("/test", ContactController.test);

module.exports = router;
