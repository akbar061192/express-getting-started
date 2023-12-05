const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "akbar") {
    req.user = { name: "akbar", id: 6 };
    next();
  } else {
    res.status(401).json({ error: "Unauthorized User" });
  }
};

module.exports = authorize;
