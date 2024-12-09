import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [isCartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartLength = cart.length;
  const toggleCart = () => setCartOpen((prev) => !prev);
  const deleteItem = (_id) => setCart((prev) => prev.filter((item) => item._id !== _id));
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const isInCart = (productId) => cart.some((item) => item._id === productId);
  const addToCart = (product) => {
    setCart((prev) => {
      if (!prev.find((item) => item._id === product._id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        toggleCart,
        addToCart,
        cart,
        isInCart,
        cartLength,
        deleteItem,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
