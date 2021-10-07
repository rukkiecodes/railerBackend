// @ts-nocheck
const mongoose = require("mongoose")

const loginSchema = new mongoose.Schema({
  active: { type: Boolean, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Signup" },
  googleUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  activeTime: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Login", loginSchema)
