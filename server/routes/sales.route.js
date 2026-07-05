const express = require("express");
const salesRouter = express.Router();
const { authMiddleware } = require("../middleware/auth.middleware");
const { roleMiddleware } = require("../middleware/role.middleware");
const {
  getCashierSales,
  getStoreSales,
  addSale,
} = require("../controllers/sales.controller");

salesRouter.use(authMiddleware);

//get my store sales with the cashier ,the items in the sales and the price
salesRouter.get("/", roleMiddleware("admin"), getStoreSales);

//add new sale
salesRouter.post("/", roleMiddleware("cashier"), addSale);

//get cashier's sales
salesRouter.get("/cashier-sales", roleMiddleware("cashier"), getCashierSales);

module.exports = { salesRouter };
