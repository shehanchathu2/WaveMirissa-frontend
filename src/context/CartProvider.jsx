import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // use your existing AuthContext

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch cart when user logs in
  useEffect(() => {
    if (!user) {
      setCart(null);
      return;
    }

    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8080/cart/${user.id}`);
          setCart(res.data);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  // Calculate total items
    const itemCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
    

  return (
    <CartContext.Provider value={{ cart, setCart, itemCount, loading, error }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
