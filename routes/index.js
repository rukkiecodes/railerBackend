const express = require("express")
const router = express.Router()
const { ensureAuth, ensureGuest } = require("../middlewares/auth")
const Story = require("../models/Story")

// @desc Login/Landing page
// @route GET /

router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  })
})

// @desc Login/Landing page
// @route GET /

router.get("/signup", ensureGuest, (req, res) => {
  res.render("signup", {
    layout: "signup",
  })
})

// @desc Login/Dashboard
// @route GET / dashboard

router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean()
    res.render("dashboard", {
      // @ts-ignore
      name: req.user.firstName,
      stories,
    })
  } catch (error) {
    console.error(error)
    res.render("error/500")
  }
})

module.exports = router
