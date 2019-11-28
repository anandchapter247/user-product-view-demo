const express = require("express");
const router = express.Router();
const { getProductViews } = require("../controller");

router.get("/", getProductViews);

module.exports = router;
