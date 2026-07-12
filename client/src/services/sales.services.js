import { api } from "./index";

export const fetchStoreSales = async () => {
  const response = await api.get("/sales");
  return response.data;
};
