const express = require("express")
const router = express.Router()
const isLoggedIn = require("../../middlewares/isloggedin") //check if oAuth authenticated account is logged in
const { ensureAuth } = require("../../middlewares/isloggedin")

router.get("/good", ensureAuth, (req, res) =>
  // @ts-ignore
  res.send(`Welcome`)
)

module.exports = router