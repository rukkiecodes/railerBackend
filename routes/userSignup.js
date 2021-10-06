const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")

router.post("/", (req, res) => {
  console.log(req.body)
  res.send(req.body)
})

module.exports = router