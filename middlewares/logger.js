const logger = (req, res, next) => {
  console.log(req.url, req.method, new Date().getFullYear());
  next();
};

module.exports = logger;
