require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const passport = require("passport")
const cookieSession = require("cookie-session")
const morgan = require("morgan")
require("./api/routes/auth/googleSetup")
require("./api/controllers/connection") //mongo db connection

//IMPORT AUTH ROUTES
const auth = {
  signup: require("./api/routes/auth/signup"),
  login: require("./api/routes/auth/login"),
  getProfile: require("./api/routes/auth/getProfile"),
  logout: require("./api/routes/auth/logout"),
  googleAuth: require("./api/routes/auth/googleAuth"),
  googleCallback: require("./api/routes/auth/googleCallback"),
  home: require("./api/routes/auth/home"),
  failedLogin: require("./api/routes/auth/failedLogin"),
  googleAuthSuccess: require("./api/routes/auth/googleAuthSuccess"),
}

//IMPORT TEMPLATE ROUTES
const template = {
  getTemplates: require("./api/routes/template/getTemplates"),
}

//IMPORT FOLE IMPORTATION ROUTES
const fileImportation = {
  importExcel: require("./api/routes/import/importExcel"),
}

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

app.use(auth.home)
app.use(auth.failedLogin)
app.use(auth.googleAuthSuccess)
app.use("/auth", [
  auth.googleAuth,
  auth.googleCallback,
  auth.logout,
  auth.signup,
  auth.login,
  auth.getProfile
])

app.use("/template", [template.getTemplates])
app.use("/import", [fileImportation.importExcel])

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
