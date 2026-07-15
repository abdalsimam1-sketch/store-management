import { useState } from "react";
import { fetchProducts } from "../services/products.services";
import { CATEGORIES } from "../data.js/categories";
export const useProducts = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await fetchProducts(search, category);
      setProducts(data.data.products);
    } catch (error) {
      setError(error.response?.data?.products);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getProducts();
  };

  return {
    search,
    setSearch,
    category,
    setCategory,
    loading,
    setLoading,
    error,
    setError,
    products,
    setProducts,
    handleSubmit,
    getProducts,
  };
};
