const express = require("express");
const router = express.Router();
const Auth = require("../controller/auth");

router.post("/", Auth.Verify);

module.exports = router;
