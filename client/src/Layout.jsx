import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";

function Layout() {
  return (
    <div className="flex flex-col gap-y-8 max-w-7xl m-auto border-gray-300 border mb-2">
      <Header />
      <Cart />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
