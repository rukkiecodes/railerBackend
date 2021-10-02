const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require("../../modules/userSchema")

router.post("/signup", (req, res) => {
  const { username, registrationEmail, password } = req.body

  User.find({ registrationEmail })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "email exists",
        })
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            })
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username,
              registrationEmail,
              password: hash,
            })
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User created",
                  data: result,
                })
              })
              .catch((err) => {
                res.status(400).json({
                  message: "Error creating account",
                  error: err,
                })
              })
          }
        })
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: "Error finding user",
        error: err,
      })
    })
})

module.exports = router
