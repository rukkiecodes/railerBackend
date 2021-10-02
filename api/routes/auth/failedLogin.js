const express = require("express")
const router = express.Router()

router.get("/failed", (req, res) => res.send("Login failed"))

module.exports = router