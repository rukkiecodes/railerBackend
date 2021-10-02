const mongoose = require("mongoose")

const uri = "mongodb://127.0.0.1:27017/railer"
// `mongodb+srv://railer:${process.env.MONGOOSID}@railer.dmgui.mongodb.net/railer?retryWrites=true&w=majority`

mongoose.connect(uri)