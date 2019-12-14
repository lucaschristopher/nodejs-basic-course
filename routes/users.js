const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const Users = require("../models/user");

router.get("/", (req, res) => {
  Users.find({}, (err, data) => {
    if (err) return res.send({ error: "Error querying users..." });
    return res.send(data);
  });
});

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.send({ error: "Insufficient data..." });

  Users.findOne({ email }, (err, data) => {
    if (err) return res.send({ error: "Error searching user..." });
    if (data) return res.send({ error: "User already registered!" });

    Users.create(req.body, (err, data) => {
      if (err) return res.send({ error: "Error creating user..." });

      data.password = undefined;
      return res.send(data);
    });
  });
});

router.post("/auth", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.send({ error: "Insufficient data..." });

  Users.findOne({ email }, (err, data) => {
    if (err) return res.send({ error: "Error searching user..." });
    if (!data) return res.send({ error: "Unregistered user!" });

    bcrypt.compare(password, data.password, (err, same) => {
      if (!same) return res.send({ error: "Authentication error..." });

      data.password = undefined;
      return res.send(data);
    });
  }).select("+password");
});

module.exports = router;
