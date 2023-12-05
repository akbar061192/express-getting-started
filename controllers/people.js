const { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide a name" });
  }
  res.status(201).json({ success: true, person: name });
};

const updatePerson = (req, res) => {
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
};

const deletePerson = (req, res) => {
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
};

module.exports = { getPeople, createPerson, updatePerson, deletePerson };
