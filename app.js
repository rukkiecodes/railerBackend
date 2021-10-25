const path = require("path")
const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const connectDB = require("./config/db")

// Load config
dotenv.config({ path: "./config/config.env" })

connectDB()

const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Static folder
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "uploads")))

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
