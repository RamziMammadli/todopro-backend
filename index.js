const express = require("express");
// const env = require("dotenv");

// import route
const todoSchema = require("./models/todo");

// initializes express app
const app = express();

// application database connection establishment
const connectDatabase = require("./connect/connect");
connectDatabase();

// parse requests of content-type - application/json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sets default route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to TODO Node.js application backend." });
});

app.listen(8080);