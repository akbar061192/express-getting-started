const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("./public"));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "public", "index.html");
  res.sendFile(filePath);
});

app.all("*", (req, res) => {
  res.status(404).send("Not Found");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
