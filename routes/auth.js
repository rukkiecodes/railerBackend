const express = require("express")
const router = express.Router()

router.post("/signup", (req, res) => {
  res.status(200).json({
    message: "Signup"
  })
})

module.exports = router