// @ts-nocheck
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  registrationEmail: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  id: { type: String },
  name: { type: String },
  given_name: { type: String },
  family_name: { type: String },
  picture: { type: String },
  email: { type: String },
  email_verified: { type: String },
  locale: { type: String },
})

module.exports = mongoose.model("User", userSchema)
