const express = require("express")
const router = express.Router()
const { ensureAuth, ensureGuest } = require("../middlewares/auth")
const Story = require("../models/Story")
const fs = require("fs")

// @desc Login/Landing page
// @route GET /

router.get("/", ensureGuest, (req, res) => {
  res.render("auth/login", {
    layout: "login",
  })
})

// @desc signup
// @route GET /

router.get("/signup", ensureGuest, (req, res) => {
  res.render("auth/signup", {
    layout: "signup",
  })
})

// @desc Forgot password
// @route GET /

router.get("/forgotPassword", ensureGuest, (req, res) => {
  res.render("auth/forgotPassword", {
    layout: "forgotPassword",
  })
})

// @desc dashboard/template
// @route GET /

router.get("/template", (req, res) => {
  const templates = JSON.parse(fs.readFileSync("templates.json", "utf8"))
  console.log(templates)
  res.render("template", {
    templates
  })
})

module.exports = router
