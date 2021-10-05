const express = require("express")
const router = express.Router()
const { ensureAuth } = require("../middlewares/auth")
const Story = require("../models/Story")

// @desc Show add page
// @route GET / stories/app

router.get("/add", (req, res) => {
  res.render("stories/add")
})

module.exports = router
