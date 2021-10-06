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
// @route GET /signup

router.get("/signup", ensureGuest, (req, res) => {
  res.render("auth/signup", {
    layout: "signup",
  })
})

// @desc Forgot password
// @route GET /forgotPassword

router.get("/forgotPassword", ensureGuest, (req, res) => {
  res.render("auth/forgotPassword", {
    layout: "forgotPassword",
  })
})

// @desc template page
// @route GET /template

router.get("/template", (req, res) => {
  const templates = JSON.parse(fs.readFileSync("templates.json", "utf8"))
  res.render("template", {
    templates
  })
})

// @desc codeEditor page
// @route GET /template

router.get("/codeEditor", (req, res) => {
  res.render("codeEditor")
})

// @desc emailEditor page
// @route GET /template

router.get("/emailEditor", (req, res) => {
  res.render("emailEditor")
})

module.exports = router
