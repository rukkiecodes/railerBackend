require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const passport = require("passport")
const cookieSession = require("cookie-session")
const morgan = require("morgan")
const session = require("express-session")

require("./api/config/connection") //mongo db connection
require("./api/config/passport")(passport)

const auth = require("./api/routes/auth/auth")
const googleAuthSuccess = require("./api/routes/auth/googleAuthSuccess")
const home = require("./api/routes/auth/home")

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
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", auth)
app.use(googleAuthSuccess)
app.use(home)

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

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server runing on port: ${port}`))
