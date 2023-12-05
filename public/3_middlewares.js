const express = require("express");
const logger = require("../middlewares/logger");
const authorize = require("../middlewares/authorize");
const morgan = require("morgan");

const app = express();

// app.use([logger, authorize]);
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/about", (req, res) => {
  res.send("about page");
});

app.get("/api/products", (req, res) => {
  res.send("products");
});

app.get("/api/items", (req, res) => {
  console.log(req.user);
  res.send("items");
});

app.listen(5000, () => console.log("server is listening on port 5000"));
