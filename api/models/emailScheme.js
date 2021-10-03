// @ts-nocheck
const mongoose = require("mongoose")

module.exports = mongoose.model(
  "Email",
  mongoose.Schema({
    id: String,
    emails: { type: Array },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  })
)
