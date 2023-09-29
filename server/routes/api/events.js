const express = require("express");
const router = express.Router();

const Events = require("../../controller/events");

router.get("/", Events.findAll)
router.get("/stats", Events.Stats);
router.get("/current", Events.Current);
router.get("/search", Events.Search);
router.post("/create", Events.Create);
router.put("/current", Events.UpdateCurrent);
router.get("/selections", Events.Selections);

router.put("/update/:event_id", Events.Update);
router.delete("/delete/:event_id", Events.Delete);
router.get("/:event_id/competitors", Events.findCompetitors);
router.get("/:event_id/", Events.findOne);
module.exports = router;
