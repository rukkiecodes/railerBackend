const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const Signup = require("../models/Signup")
const User = require("../models/User")

router.post("/", async (req, res) => {
  try {
    const user = await Signup.findOne({ email: req.body.email })
    if (user) {
      bcrypt.compare(req.body.password, user.password, (error, result) => {
        if (error) {
          console.log("Auth failed")
          res.send("Auth failed")
        }
        if (result) {
          console.log("Auth successful")
          res.redirect("/template")
        }
      })
    } else {
      console.log("Auth failed")
      res.send("Auth failed")
    }
  } catch (error) {}
})

module.exports = router
