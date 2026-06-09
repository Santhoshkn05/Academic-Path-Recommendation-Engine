const express = require("express");
const router = express.Router();
const { recommend } = require("../controllers/recommendationController");

router.post("/", recommend);

module.exports = router;