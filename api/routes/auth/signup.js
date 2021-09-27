const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Signup = require("../../modules/signup")

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body

  const user = new Signup({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password,
  })
  user
    .save()
    .then((user) => {
      console.log("User: ", user)
      res.status(200).json({
        data: {
          name,
          email,
          password,
        },
        user,
      })
    })
    .catch((error) => console.log("Error signin up: ", error))
})

module.exports = router
