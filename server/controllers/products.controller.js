const { BadRequest, NotFound } = require("../errors");
const { prisma } = require("../db/prisma");

const addProduct = async (req, res) => {
  const { productName, price, stockQuantity, category } = req.body;
  const { userId, storeId } = req.user;

  if (
    !productName ||
    price === undefined ||
    stockQuantity === undefined ||
    !category
  ) {
    throw new BadRequest();
  }

  const product = await prisma.product.create({
    data: {
      productName,
      price,
      stockQuantity: Number(stockQuantity),
      category,
      storeId,
      adminId: userId,
    },
  });
  res.status(201).json({
    success: true,
    message: "Product added successfully",
    data: { product },
  });
};
const getProducts = async (req, res) => {
  const { search, category, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const { storeId } = req.user;
  const products = await prisma.product.findMany({
    where: {
      storeId,
      category: category || undefined,
      productName: {
        contains: search,
        mode: "insensitive",
      },
    },
    skip: Number(skip),
    take: Number(limit),
  });
  res
    .status(200)
    .json({ success: true, message: "Products found", data: { products } });
};
const updateProduct = async (req, res) => {
  const { storeId } = req.user;
  const { id } = req.params;
  const { productName, price, stockQuantity, category } = req.body;

  let product = await prisma.product.findFirst({ where: { storeId, id } });
  if (!product) {
    throw new NotFound();
  }
  product = await prisma.product.update({
    data: { productName, price, stockQuantity, category },
    where: { storeId, id },
  });

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: { product },
  });
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { storeId } = req.user;
  let product = await prisma.product.findFirst({ where: { storeId, id } });
  if (!product) {
    throw new NotFound();
  }
  product = await prisma.product.delete({ where: { storeId, id } });
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: { product },
  });
};

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
