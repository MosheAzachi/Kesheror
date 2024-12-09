import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../services/apiClient";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error.message);
    }
  };

  const addProduct = async (product) => {
    try {
      const response = await axios.post("/api/products", product);
      setProducts([...products, response.data.product]);
      return response.data.message;
    } catch (error) {
      const message = error.response?.data?.message || "שגיאה בשרת";
      throw new Error(message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      return response.data.message;
    } catch (error) {
      const message = error.response?.data?.message || "שגיאה בשרת";
      throw new Error(message);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      const response = await axios.put(`/api/products/${id}`, product);
      setProducts(products.map((p) => (p._id === id ? { ...p, ...product } : p)));
      return response.data.message;
    } catch (error) {
      const message = error.response?.data?.message || "שגיאה בשרת";
      throw new Error(message);
    }
  };

  return (
    <ProductContext.Provider value={{ products, fetchProducts, deleteProduct, addProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
