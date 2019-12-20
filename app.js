const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const config = require("./config/config");

const app = express();

// MongoDB Atlas - Cloud DBaaS for MongoDB
// String of DB connection
const url = config.dbURL;

const options = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 5,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(url, options);
mongoose.set("useCreateIndex", true);

// Some events for Mongo to stay listening and report if something different happened

mongoose.connection.on("connected", () => {
  console.log("Application connected on database =D");
});

mongoose.connection.on("disconnected", () => {
  console.log("Application disconnected from database.");
});

mongoose.connection.on("error", err => {
  console.log(`Error on connection with database: ${err}`);
});

// Body Parser
// Get requested object as JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
const indexRoute = require("./routes/index");
const usersRoute = require("./routes/users");

app.use("/", indexRoute);
app.use("/users", usersRoute);

const port = 3000;
app.listen(port);

module.exports = app;
