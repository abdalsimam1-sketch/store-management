const express = require("express");
const dashBoardRouter = express.Router();
const { authMiddleware } = require("../middleware/auth.middleware");
const { roleMiddleware } = require("../middleware/role.middleware");
const {
  getCashierDash,
  getAdminDash,
} = require("../controllers/dashboard.controller");

dashBoardRouter.use(authMiddleware);

dashBoardRouter.get("/admin", roleMiddleware("admin"), getAdminDash);
dashBoardRouter.get("/cashier", roleMiddleware("cashier"), getCashierDash);

module.exports = { dashBoardRouter };
