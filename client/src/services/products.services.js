import { api } from "../services/index";

export const fetchProducts = async (search, category) => {
  const response = await api.get("/products", {
    params: {
      search,
      category,
    },
  });
  return response.data;
};

export const addProduct = async (payload) => {
  const response = await api.post("/products", payload);
  return response.data.data;
};
