const express = require("express");
const router = express.Router();

const Users = require("../../controller/users");

router.get("/search", Users.Search);
router.post("/create", Users.Create);

router.put("/update/:uuid", Users.Update)
router.delete("/delete/:uuid", Users.Delete)
router.get("/:event_id/eligible", Users.findEligible)

module.exports = router;
