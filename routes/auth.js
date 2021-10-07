const passport = require("passport")
const express = require("express")
const router = express.Router()
const Login = require("../models/Login")

// @desc Auth with google
// @route GET /

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

// @desc Login/Dashboard
// @route GET / dashboard

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/template")
  }
)

router.post("/signup", (req, res) => {
  res.status(200).json({
    data: req.body,
  })
})

// @desc    Logout user
// @route   /auth/logout
router.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/")
})

module.exports = router
