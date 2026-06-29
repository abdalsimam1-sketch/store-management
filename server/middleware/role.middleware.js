const { Forbidden } = require("../errors");

const roleMiddleware = (role) => {
  return (req, res, next) => {
    if (role !== req.user.role) {
      throw new Forbidden();
    } else {
      next();
    }
  };
};

module.exports = { roleMiddleware };
