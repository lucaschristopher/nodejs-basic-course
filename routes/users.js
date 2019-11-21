const express = require("express");
const router = express.Router();

const Users = require("../models/user");

router.get("/", (req, res) => {
  Users.find({}, (err, data) => {
    if (err) return res.send({ error: "Error querying users..." });
    return res.send(data);
  });
});

router.post("/create", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.send({ error: "Insufficient data..." });

  Users.findOne({ email }, (err, data) => {
    if (err) return res.send({ error: "Error searching user..." });
    if (data) return res.send({ error: "User already registered!" });
  });

  Users.create(req.body, (err, data) => {
    if (err) return res.send({ error: "Error creating user..." });

    return res.send(data);
  });
});

module.exports = router;
