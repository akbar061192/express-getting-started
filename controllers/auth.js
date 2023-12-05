const validateUser = (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`<h1>Welcome, ${name}</h1>`);
  }
  res.status(401).json({ user: "unauthorized" });
};

module.exports = { validateUser };
