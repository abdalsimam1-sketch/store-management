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
