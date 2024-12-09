import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../services/apiClient";
import { useCart } from "./CartContext";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const { clearCart } = useCart();

  useEffect(() => {
    loadUser();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/auth");
      setUsers(response.data.users);
    } catch (error) {
      //console.error("Error fetching users:", error.message);
    }
  };

  const setAdmin = async (id) => {
    try {
      const response = await axios.patch(`/api/auth/${id}/set-admin`);
      fetchUsers();
      return response.data.message;
    } catch (error) {
      const message = error.response?.data?.message || "שגיאה בשרת";
      throw new Error(message);
    }
  };

  const register = async (formData) => {
    try {
      const response = await axios.post("/api/auth/register", formData);
      setUser(response.data.user);
      return response.data.message;
    } catch (error) {
      const message = error.response?.data?.message || "שגיאה בשרת";
      throw new Error(message);
    }
  };

  const login = async (formData) => {
    try {
      const response = await axios.post("/api/auth/login", formData);
      setUser(response.data.user);
      return response.data.message;
    } catch (error) {
      const message = error.response?.data?.message || "שגיאה בשרת";
      throw new Error(message);
    }
  };

  const loadUser = async () => {
    if (user) return;
    try {
      setLoading(true);
      //const response = await axios.get("/api/auth/me");
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to load user:", error);
      setUser(null);
      clearCart();
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/auth/logout");
      setUser(null);
      clearCart();
      return response.data.message;
    } catch (error) {
      const message = "שגיאה בעת ההתנתקות";
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`/api/auth/${id}`);
      fetchUsers();
      if (user._id === id) {
        setUser(null);
        clearCart();
      }
      return response.data.message;
    } catch (error) {
      const message = error.response?.data?.message || "שגיאה בשרת";
      throw new Error(message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, users, register, login, logout, loading, fetchUsers, setAdmin, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};
