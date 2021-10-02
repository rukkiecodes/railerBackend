require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const passport = require("passport")
const cookieSession = require("cookie-session")
const morgan = require("morgan")
const mongoose = require("mongoose")
require("./api/routes/auth/googleSetup")

/*
IMPORT ROUTES
*/
const logout = require("./api/routes/auth/logout")
const googleAuth = require("./api/routes/auth/googleAuth")
const googleCallback = require("./api/routes/auth/googleCallback")
const signup = require("./api/routes/auth/signup")
const login = require("./api/routes/auth/login")
const getProfile = require("./api/routes/auth/getProfile")
const getTemplates = require("./api/routes/template/getTemplates")

const uri =
  "mongodb://127.0.0.1:27017/railer"
  // `mongodb+srv://railer:${process.env.MONGOOSID}@railer.dmgui.mongodb.net/railer?retryWrites=true&w=majority`

mongoose.connect(uri)

const isLoggedIn = require("./api/middlewares/isloggedin")

app.use(morgan("dev"))
app.use("/uploads", express.static("uploads"))

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
app.use("/auth", signup)
app.use("/auth", login)
app.use("/auth", getProfile)

app.use("/template", getTemplates)

app.use((req, res, next) => {
  const error = new Error("Not found")
  // @ts-ignore
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
