require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const passport = require("passport")
const cookieSession = require("cookie-session")
require("./passportSetup")

/*
IMPORT ROUTES
*/
const logout = require("./api/routes/auth/logout")

/*
IMPORT ROUTES
*/
const isLoggedIn = require("./api/middlewares/isloggedin")

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(
  cookieSession({
    name: "railerSession",
    keys: ["key1", "key2"],
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => res.send("Not loggedin"))
app.get("/failed", (req, res) => res.send("Login failed"))
// @ts-ignore
app.get("/good", isLoggedIn, (req, res) =>
  res.send(`Welcome Mr ${req.user.displayName}`)
)

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/good")
  }
)

app.use("/auth", logout)

module.exports = app
