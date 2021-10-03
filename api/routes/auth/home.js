const express = require("express")
const router = express.Router()
const { ensureGuest } = require("../../middlewares/isloggedin")

router.get("/", ensureGuest, (req, res) => res.send("Not loggedin"))

module.exports = router
