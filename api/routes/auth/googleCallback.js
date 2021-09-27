const passport = require("passport")
const express = require("express")
const router = express.Router()

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/good")
  }
)

module.exports = router
