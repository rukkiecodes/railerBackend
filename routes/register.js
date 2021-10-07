const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const Signup = require("../models/Signup")
const User = require("../models/User")

router.post("/", async (req, res) => {
  req.body._id = new mongoose.Types.ObjectId()
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      console.log("Google user exist")
      res.redirect("/signup")
    } else {
      console.log("Google user does not exist")
      try {
        let signup = await Signup.findOne({ email: req.body.email })
        if (signup) {
          console.log("User exist")
          res.redirect("/signup")
        } else {
          await bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              console.log(err)
            } else {
              signup = Signup.create({
                _id: req.body._id,
                name: req.body.name,
                email: req.body.email,
                password: hash,
              })
              res.redirect("/template")
            }
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
