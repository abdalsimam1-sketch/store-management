import { useState } from "react";

export const useCart = () => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const increase = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  const remove = (id) => {
    const exists = cart.find((item) => item.id === id);
    if (exists) {
      setCart(cart.filter((item) => item.id !== id));
    }
  };
  const decrease = (id) => {
    const exists = cart.find((item) => item.id === id);
    if (exists && exists.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      );
    } else if (exists && exists.quantity === 1) {
      remove(id);
    }
  };
  const clearCart = () => {
    setCart([]);
  };
  const total = (cart) => {
    return cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };
  return { cart, setCart, increase, decrease, clearCart, remove, total };
};
