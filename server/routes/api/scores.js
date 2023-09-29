const express = require("express");
const router = express.Router();

const Scores = require("../../controller/scores");

router.get("/leaderboard/:event_id", Scores.Leaderboard)
router.post("/create", Scores.Create);
router.post("/update", Scores.Update)
router.post("/delete", Scores.Delete)

module.exports = router;
