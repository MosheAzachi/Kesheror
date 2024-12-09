import { Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import GalleryPage from "./pages/GalleryPage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import Notification from "./components/Notification";
import PageNotFound from "./pages/PageNotFound";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./context/AuthContext";
import PersonalPage from "./pages/PersonalPage";
import AdminPage from "./pages/AdminPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const { user, loading } = useAuth();
  if (loading) return <></>;
  return (
    <>
      <Notification />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
          <Route path="/register" element={user ? <Navigate to="/" replace /> : <RegisterPage />} />
          <Route
            path="/personal"
            element={user ? user.role === "admin" ? <AdminPage /> : <PersonalPage /> : <Navigate to="/login" replace />}
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
