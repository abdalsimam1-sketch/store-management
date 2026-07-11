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

export const updateProduct = async (id, payload) => {
  const response = await api.patch(`/products/${id}`, payload);
  return response.data.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data.data;
};
