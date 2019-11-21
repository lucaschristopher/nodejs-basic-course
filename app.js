const express = require("express");
const app = express();

const indexRoute = require("./routes/index");
const usersRoute = require("./routes/users");

app.use("/", indexRoute);
app.use("/users", usersRoute);

const port = 3000;
app.listen(port);

module.exports = app;
