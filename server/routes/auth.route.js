const express = require("express");
const authRouter = express.Router();
const {
  login,
  register,
  addCashier,
  deleteCashier,
} = require("../controllers/auth.controller");

const { authMiddleware } = require("../middleware/auth.middleware");
const { roleMiddleware } = require("../middleware/role.middleware");

authRouter.post("/login", login);

authRouter.post("/register", register);

authRouter.post(
  "/add-cashier",
  authMiddleware,
  roleMiddleware("admin"),
  addCashier,
);

authRouter.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteCashier,
);

module.exports = { authRouter };
