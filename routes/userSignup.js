const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const Signup = require("../models/Signup")

router.post("/", async (req, res) => {
  req.body._id = new mongoose.Types.ObjectId()
  try {
    let user = await Signup.findOne({ email: req.body.email })
    if (user) {
      console.log("User exist")
    } else {
      await bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          console.log(err)
        } else {
          user = Signup.create({
            _id: req.body._id,
            name: req.body.name,
            email: req.body.email,
            password: hash,
          })
        }
      })
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
