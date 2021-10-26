const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")

const User = require("../models/User")

router.post("/signup", async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })

    if (user) {
      console.log("User exists")
      res.status(409).json({
        message: "Auth failed",
      })
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          res.status(409).json({
            message: "Auth failed",
          })
        } else {
          let newUser = {
            _id: new mongoose.Types.ObjectId(),
            email,
            password: hash,
          }
          user = User.create(newUser)

          res.status(201).json({
            message: "Auth successful",
          })
        }
      })
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
