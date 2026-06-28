const { NotFound } = require("../errors");

const routeNotFound = (req, res) => {
  throw new NotFound();
};

module.exports = routeNotFound;
