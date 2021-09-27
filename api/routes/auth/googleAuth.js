const passport = require("passport")
const express = require("express")
const router = express.Router()

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

module.exports = router
