const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

router.get("/", auth, (req, res) => {
  console.log(res.locals.authData);
  return res.send({ message: "Alright with the root's GET method." });
});

router.post("/", (req, res) => {
  return res.send({ message: "Alright with the root's POST method." });
});

module.exports = router;
