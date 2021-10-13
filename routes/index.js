const express = require("express")
const router = express.Router()
const { ensureAuth, ensureGuest } = require("../middlewares/auth")
const Story = require("../models/Story")
const fs = require("fs")

// @desc template page
// @route GET /template
router.get("/", (req, res) => {
  const templates = JSON.parse(fs.readFileSync("templates.json", "utf8"))
  res.render("pages/template", {
    templates,
  })
})

// @desc Copy page
// @route GET /copy

router.get("/copy", ensureGuest, (req, res) => {
  res.render("pages/copy")
})

// @desc email editor page
// @route GET /emailEditor

router.get("/emailEditor", ensureGuest, (req, res) => {
  res.render("pages/emailEditor")
})

// @desc code editor page
// @route GET /emailEditor

router.get("/codeEditor", ensureGuest, (req, res) => {
  res.render("pages/codeEditor")
})

// @desc preview design
// @route GET /previewDesign

router.get("/previewDesign", ensureGuest, (req, res) => {
  res.render("pages/previewDesign")
})

// @desc Login/Landing page
// @route GET /

// router.get("/", ensureGuest, (req, res) => {
//   res.render("pages/login", {
//     layout: "login",
//   })
// })

// @desc signup
// @route GET /signup
// router.get("/signup", ensureGuest, (req, res) => {
//   res.render("components/auth/signup", {
//     layout: "signup",
//   })
// })

// @desc Forgot password
// @route GET /forgotPassword
// router.get("/forgotPassword", ensureGuest, (req, res) => {
//   res.render("components/auth/forgotPassword", {
//     layout: "forgotPassword",
//   })
// })


// @desc codeEditor page
// @route GET /template
// router.get("/codeEditor", (req, res) => {
//   res.render("components/codeEditor")
// })

// @desc emailEditor page
// @route GET /template
// router.get("/emailEditor", (req, res) => {
//   res.render("components/emailEditor")
// })

module.exports = router
