import { api } from "../services/index";

export const login = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};
export const register = async (payload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const getUser = async () => {
  const response = await api.get("/auth");
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("token");
};
