const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require("../../modules/userSchema")

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body

  User.find({ email })
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
              name,
              email,
              password: hash,
            })
            user
              .save()
              .then((user) => {
                res.status(201).json({
                  message: "User created",
                  data: user,
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
