const express = require("express");
const router = express.Router();
const excelToJson = require("convert-excel-to-json");
const multer = require("multer");

router.post("/excel", (req, res) => {
  res.status(200).json({
    message: "Excel"
  })
})

module.exports = router;
