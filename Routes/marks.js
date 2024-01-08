const express = require("express");
const router = express.Router();
const marksController = require("../Controllers/marks");

router.post("/add_marks", marksController.addMarks);
router.delete("/delete_marks_by_id/:id", marksController.deleteMarksByID);

module.exports = router;
