const express = require("express");
const { people } = require("./data");

const app = express();

// app.use(express.static("./methods-public"));

// parse incoming form data for POST call's
app.use(express.urlencoded({ extended: false }));

//parse incoming json data for POST call's
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide a name" });
  }
  res.status(201).json({ success: true, person: name });
});

app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const findPerson = people.find((person) => person.id === Number(id));

  if (!findPerson) {
    return res
      .status(404)
      .json({ success: false, msg: `person id ${id} not found` });
  }

  const newPersonList = people.map((person) => {
    if (person.id === findPerson.id) {
      return {
        ...person,
        name: name,
      };
    }
    return person;
  });

  res.status(201).json({ success: true, data: newPersonList });
});

app.delete("/api/people/:id", (req, res) => {
  const { id } = req.params;

  const findPerson = people.find((person) => person.id === Number(id));

  if (!findPerson) {
    return res
      .status(404)
      .json({ success: false, msg: `person id ${id} not found` });
  }

  const transformedPeople = people.filter((people) => {
    return people.id !== Number(id);
  });

  res.status(200).json({
    success: true,
    msg: `person with id ${id} deleted`,
    data: transformedPeople,
  });
});

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`<h1>Welcome, ${name}</h1>`);
  }
  res.status(401).json({ user: "unauthorized" });
});

app.listen(5000, () => console.log("server is listening on port 5000"));
