const express = require("express")
const { error } = require("npmlog")
const router = express.Router()
const User = require("../../modules/userSchema")

router.get("/profile", (req, res) => {
  const { registrationEmail } = req.body
  User.find({ registrationEmail })
    .exec()
    .then((data) => {
      return res.status(200).json({
        data,
      })
    })
    .catch((error) => {
      return res.status(400).json({
        error,
      })
    })
})

module.exports = router
