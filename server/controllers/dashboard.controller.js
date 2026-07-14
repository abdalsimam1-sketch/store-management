const { prisma } = require("../db/prisma");
const { getDayRange } = require("../utils/getDayRange");

const getAdminDash = async (req, res) => {
  const { storeId } = req.user;
  const { startOfToday, startOfTommorow } = getDayRange();

  const [todaySales, lowStocks, lowStocksCount, recentSales] =
    await Promise.all([
      prisma.sale.aggregate({
        where: {
          storeId,
          createdAt: { gte: startOfToday, lt: startOfTommorow },
        },
        _sum: { total: true },
        _count: true,
      }),

      prisma.product.findMany({
        where: { storeId, stockQuantity: { lte: 10 } },
        orderBy: { stockQuantity: "asc" },
        take: 5,
      }),

      prisma.product.count({
        where: { storeId, stockQuantity: { lte: 10 } },
      }),

      prisma.sale.findMany({
        where: { storeId },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          cashier: { select: { fullName: true } },
          items: true,
        },
      }),
    ]);
  res.status(200).json({
    success: true,
    message: "Dashboard Found",
    data: {
      todaySales,
      lowStocks,
      lowStocksCount,
      recentSales,
    },
  });
};
const getCashierDash = async (req, res) => {};

module.exports = { getAdminDash, getCashierDash };
