require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const passport = require("passport")
const cookieSession = require("cookie-session")
const morgan = require("morgan")
require("./passportSetup")

/*
IMPORT ROUTES
*/
const logout = require("./api/routes/auth/logout")
const googleAuth = require("./api/routes/auth/googleAuth")
const googleCallback = require("./api/routes/auth/googleCallback")

/*
IMPORT ROUTES
*/
const isLoggedIn = require("./api/middlewares/isloggedin")

app.use(morgan("dev"))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }
  next()
})

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

app.get("/good", isLoggedIn, (req, res) =>
  // @ts-ignore
  res.send(`Welcome Mr ${req.user.displayName}`)
)

app.use("/auth", googleAuth)
app.use("/auth", googleCallback)
app.use("/auth", logout)

app.use((req, res, next) => {
  const error = new Error("Not found")
  error.status(404)
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
    },
  })
})

module.exports = app
