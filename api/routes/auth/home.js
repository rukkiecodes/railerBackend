const express = require("express")
const router = express.Router()

router.get("/", (req, res) => res.send("Not loggedin"))

module.exports = router
