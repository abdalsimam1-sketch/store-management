import { api } from "./index";

export const fetchStoreSales = async () => {
  const response = await api.get("/sales");
  return response.data;
};

export const createSale = async (payload) => {
  const response = await api.post("/sales", payload);
  return response.data;
};

export const fetchCashierSales = async () => {
  const response = await api.get("sales/cashier-sales");
  return response.data;
};
