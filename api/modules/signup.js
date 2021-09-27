const mongoose = require("mongoose")

const signupSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
})

module.exports = mongoose.model("Signup", signupSchema)