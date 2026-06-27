const { CustomError } = require("../errors");

const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error instanceof CustomError) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: "Internal server error" });
};

module.exports = errorHandler;
