const express = require("express");
const router = express.Router();
const fs = require("fs")

router.get("/templates", (req, res) => {
  const obj = JSON.parse(fs.readFileSync("templates.json", "utf8"))
  res.status(200).json({
    data: obj,
  })
})

module.exports = router;
