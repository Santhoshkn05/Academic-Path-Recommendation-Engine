const express = require("express");
const router = express.Router();
const {
    getSubmissions,
    deleteSubmission
} = require("../controllers/submissionController");

router.get("/", getSubmissions);
router.delete("/:id", deleteSubmission);

module.exports = router;