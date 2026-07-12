const { prisma } = require("../db/prisma");
const { NotFound, BadRequest } = require("../errors");

const addSale = async (req, res) => {
  const { userId, storeId } = req.user;
  const { items } = req.body;
  let total = 0;
  let saleItemData = [];
  for (let i = 0; i < items.length; i++) {
    let product = await prisma.product.findFirst({
      where: { id: items[i].productId, storeId },
    });
    if (!product) {
      throw new NotFound();
    }
    if (product.stockQuantity < items[i].quantity) {
      throw new BadRequest();
    }

    let lineTotal = product.price * items[i].quantity;
    total += lineTotal;

    saleItemData.push({
      productId: items[i].productId,
      unitPrice: product.price,
      quantity: items[i].quantity,
    });
  }

  const sale = await prisma.$transaction(async (tx) => {
    const newSale = await tx.sale.create({
      data: {
        total,
        cashierId: userId,
        storeId,
        items: { create: saleItemData },
      },
    });
    for (const item of items) {
      const newStockQuantity = await tx.product.update({
        where: { id: item.productId, storeId },
        data: { stockQuantity: { decrement: item.quantity } },
      });
    }
    return newSale;
  });
  res.status(201).json({ success: true, message: "Sale complete", data: sale });
};
const getStoreSales = async (req, res) => {
  const { storeId } = req.user;
  const sales = await prisma.sale.findMany({
    where: { storeId },
    include: { items: { include: { product: true } }, cashier: true },
  });
  res.status(200).json({ success: true, message: "Sales Found", data: sales });
};
const getCashierSales = async (req, res) => {
  const { userId, storeId } = req.user;
  const sales = await prisma.sale.findMany({
    where: { cashierId: userId, storeId },
    include: { items: { include: { product: true } } },
  });
  res.status(200).json({ success: true, message: "Sales found", data: sales });
};

module.exports = { getCashierSales, getStoreSales, addSale };
