const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const morgan = require("morgan")
const exphbs = require("express-handlebars")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const connectDB = require("./config/db")
const reload = require("reload")
// const livereload = require("livereload")
// const connectLivereload = require("connect-livereload")

// Load config
dotenv.config({ path: "./config/config.env" })

// Passport config
require("./config/passport")(passport)

connectDB()

const publicDirectory = path.join(__dirname, "public")
const viewsDirectory = path.join(__dirname, "views")
// const livereloadServer = livereload.createServer()
// livereloadServer.watch([publicDirectory, viewsDirectory])

// livereloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     livereloadServer.refresh("/")
//   }, 100)
// })

const app = express()

// app.use(connectLivereload())

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Handlebars
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", ".hbs")

// Session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_LOCAL_URL,
    }),
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use("/", require("./routes/index"))
app.use("/auth", require("./routes/auth"))
app.use("/stories", require("./routes/stories"))

// Static folder
app.use(express.static(publicDirectory))
app.use(express.static(viewsDirectory))

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>
  console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
reload(app)