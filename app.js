const express = require("express");
const app = express();

app.get("/", (req, res) => {
  let { name, age } = req.query;
  return res.send({
    message: `You send a message with name ${name} and age ${age}.`
  });
});

app.post("/", (req, res) => {
  return res.send({ message: "All ok with POST method" });
});

const port = 3000;
app.listen(port);

module.exports = app;
