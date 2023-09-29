const express = require("express");
const router = express.Router();

const Leaderboard = require("../../controller/leaderboard");

router.get("/current", Leaderboard.Current);
router.get("/current/standings", Leaderboard.CurrentStandings);
router.get("/events", Leaderboard.AllEvents);
router.get("/events/:event_id", Leaderboard.OneEvent);
router.get("/overall", Leaderboard.OverallStandings);
router.get("/:event_id/standings", Leaderboard.CurrentStandings);

module.exports = router;
