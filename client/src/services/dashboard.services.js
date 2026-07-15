import { api } from "./index";

export const fetchAdminDash = async () => {
  const response = await api.get("/dashboard/admin");
  return response.data;
};

export const fetchCashierDash = async () => {
  const response = await api.get("/dashboard/cashier");
  return response.data;
};
