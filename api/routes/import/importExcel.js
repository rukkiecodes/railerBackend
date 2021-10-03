const express = require("express")
const router = express.Router()
const excelToJson = require("convert-excel-to-json")
const multer = require("multer")
const mongoose = require("mongoose")
const Email = require("../../modules/emailScheme")
const User = require("../../modules/userSchema")

//MULTER CONFIGURATION
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/")
  },

  filename: (req, file, callback) => {
    callback(null, file.originalname)
  },
})

//STORAGE INITALIZATION
const upload = multer({
  storage,
})

const email_expression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

router.post("/excel", upload.single("organisationEXCEL"), (req, res) => {
  const { id, registrationEmail } = req.body

  const result = excelToJson({
    // @ts-ignore
    sourceFile: `uploads/${req.file.originalname}`,
  })
  var test_array = []
  for (let key in result) {
    result[key].filter((obj) => {
      Object.keys(obj).forEach((key) => {
        test_array.push(obj[key])
      })
    })
  }
  const found = test_array.filter((value) => email_expression.test(value))
  const unique_email = [...new Set(found)]

  const email = new Email({
    id,
    emails: unique_email,
  })
  email
    .save()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send(err)
    })
})

module.exports = router
