const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const Signup = require("../models/Signup")
const User = require("../models/User")
const Login = require("../models/Login")

router.post("/", async (req, res) => {
  let signup = await Signup.findOne({ email: req.body.email })
  req.body.user = signup._id
  try {
    let loggedInUser = await Login.findOne({ user: req.body.user })
    if (loggedInUser) {
      try {
        await Login.updateOne(
          { user: req.body.user },
          { $set: { active: true, activeTime: new Date() } }
        )
        res.redirect("/template")
      } catch (error) {
        console.log(error)
      }
    } else {
      await Login.create({
        active: true,
        user: req.body.user,
        activeTime: new Date(),
      })
      bcrypt.compare(req.body.password, signup.password, (error, result) => {
        if (error) {
          console.log("Auth failed")
          res.redirect("/")
        }
        if (result) {
          console.log("Auth successful")
          res.redirect("/template")
        }
      })
    }
  } catch (error) {
    console.log("Signup: ", error)
  }
})

module.exports = router
