const express = require("express");
const { validateUser } = require("../controllers/auth");

const router = express.Router();

router.post("/", validateUser);

module.exports = router;
