const express = require("express")
const router = express.Router()
const isLoggedIn = require("../../middlewares/isloggedin") //check if oAuth authenticated account is logged in

router.get("/good", isLoggedIn, (req, res) =>
  // @ts-ignore
  res.send(`Welcome`)
)

module.exports = router