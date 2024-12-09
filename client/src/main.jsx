import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { NotificationProvider } from "./context/NotificationContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <OrderProvider>
          <CartProvider>
            <AuthProvider>
              <ProductProvider>
                <App />
              </ProductProvider>
            </AuthProvider>
          </CartProvider>
        </OrderProvider>
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>
);
