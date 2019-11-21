const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send({ message: "Alright with the root's GET method." });
});

router.post("/", (req, res) => {
  return res.send({ message: "Alright with the root's POST method." });
});

module.exports = router;
