const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.send({ message: "Alright with the users's GET method." });
});

router.post("/", (req, res) => {
  return res.send({ message: "Alright with the users's POST method." });
});

router.post("/create", (req, res) => {
  return res.send({ message: "Successfully created user!" });
});

module.exports = router;
