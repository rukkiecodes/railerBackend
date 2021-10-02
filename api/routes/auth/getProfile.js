const express = require("express")
const router = express.Router()

router.get("/profile", (req, res) => {
  res.status(200).json({
    message: "Get profile",
  })
})

module.exports = router
