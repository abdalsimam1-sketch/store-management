const express = require("express");
const productRouter = express.Router();
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const { roleMiddleware } = require("../middleware/role.middleware");

productRouter.use(authMiddleware);

//add product
productRouter.post("/", roleMiddleware("admin"), addProduct);

//get all products with filtering
productRouter.get("/", getProducts);

//update product
productRouter.patch("/:id", roleMiddleware("admin"), updateProduct);

//delete product
productRouter.delete("/:id", roleMiddleware("admin"), deleteProduct);

module.exports = { productRouter };
