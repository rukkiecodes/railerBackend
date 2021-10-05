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

// @desc signup
// @route GET /

router.get("/signup", ensureGuest, (req, res) => {
  res.render("signup", {
    layout: "signup",
  })
})

// @desc Forgot password
// @route GET /

router.get("/forgotPassword", ensureGuest, (req, res) => {
  res.render("forgotPassword", {
    layout: "forgotPassword",
  })
})

// @desc dashboard/template
// @route GET /

router.get("/dashboard/template", ensureGuest, (req, res) => {
  res.render("template")
})

// @desc Login/Dashboard
// @route GET / dashboard

router.get("/dashboard", async (req, res) => {
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
