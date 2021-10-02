const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const User = require("../../modules/userSchema")
const jwt = require("jsonwebtoken")

router.post("/login", (req, res) => {
  const { registrationEmail, password } = req.body

  User.find({ registrationEmail })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        })
      }
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          })
        }
        if (result) {
          const token = jwt.sign(
            {
              registrationEmail: user[0].registrationEmail,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          )
          return res.status(200).json({
            message: "Auth successful",
            data: user,
            token,
            status: 200
          })
        }
        return res.status(401).json({
          message: "Auth failed",
        })
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json({
        message: "Error finding user",
        error: err,
      })
    })
})

module.exports = router
