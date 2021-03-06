const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Users = require("../models/user");
const config = require("../config/config");

// Auxiliar functions

const createUserToken = userId => {
  return jwt.sign({ id: userId }, config.jwtPassword, {
    expiresIn: config.jwtExpiresIn
  });
};

// Routes

router.get("/", async (req, res) => {
  try {
    const users = await Users.find({});
    return res.send(users);
  } catch (error) {
    return res.status(500).send({ error: "Error querying users..." });
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send({ error: "Insufficient data..." });

  try {
    if (await Users.findOne({ email }))
      return res.status(400).send({ error: "User already registered!" });

    const user = await Users.create(req.body);
    user.password = undefined;

    return res.status(201).send({ user, token: createUserToken(user.id) });
  } catch (error) {
    return res.status(500).send({ error: "Error searching user..." });
  }
});

router.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send({ error: "Insufficient data..." });

  try {
    const user = await Users.findOne({ email }).select("+password");
    if (!user) return res.status(400).send({ error: "Unregistered user!" });

    const password_ok = await bcrypt.compare(password, user.password);
    if (!password_ok)
      return res.status(401).send({ error: "Authentication error..." });

    user.password = undefined;
    return res.send({ user, token: createUserToken(user.id) });
  } catch (error) {
    return res.status(500).send({ error: "Error searching user..." });
  }
});

module.exports = router;
