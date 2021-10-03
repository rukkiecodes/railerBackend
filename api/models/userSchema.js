// @ts-nocheck
const mongoose = require("mongoose")

module.exports = mongoose.model(
  "User",
  mongoose.Schema({
    googleId: { type: String, required: true },
    name: { type: String, required: true },
    given_name: { type: String, required: true },
    family_name: { type: String, required: true },
    picture: { type: String },
    email: { type: String, required: true },
    email_verified: { type: String, required: true },
    locale: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  })
)
