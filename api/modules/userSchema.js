// @ts-nocheck
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
})

module.exports = mongoose.model("User", userSchema)
