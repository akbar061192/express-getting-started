const express = require("express");
const people = require("./routes/people");
const auth = require("./routes/auth");

const app = express();

// middleware to load all static web files for UI painting
app.use(express.static("./methods-public"));

// parse incoming form data for POST call's
app.use(express.urlencoded({ extended: false }));

//parse incoming json data for POST call's
app.use(express.json());

// routes
app.use("/api/people", people);
app.use("/login", auth);

app.listen(5000, () => console.log("server is listening on port 5000"));
