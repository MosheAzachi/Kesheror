import React, { createContext, useContext, useState } from "react";
import axios from "../services/apiClient";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const createOrder = async (orderData) => {
    try {
      const response = await axios.post("/api/orders", orderData);
      setOrders((prevOrders) => [...prevOrders, response.data.order]);
      return response.data.message;
    } catch (error) {
      const message = error.response?.data?.message || "שגיאה ביצירת ההזמנה";
      throw new Error(message);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/orders");
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchUserOrders = async () => {
    try {
      const response = await axios.get("/api/orders/user-orders");
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const setDelivered = async (id) => {
    try {
      const response = await axios.patch(`/api/orders/${id}/delivered`);
      setOrders(orders.map((order) => (order._id === id ? { ...order, status: "Delivered" } : order)));
      return response.data.message;
    } catch (error) {
      const message = error.response?.data?.message || "שגיאה בשינוי סטטוס הזמנה";
      throw new Error(message);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, fetchOrders, setDelivered, fetchUserOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
