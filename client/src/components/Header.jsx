import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import MenuLink from "./MenuLink";
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useCart } from "../context/CartContext";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toggleCart, cart, cartLength } = useCart();
  const { showNotification } = useNotification();

  const handleLogout = async () => {
    try {
      const message = await logout();
      showNotification(message, "success");
    } catch (error) {
      showNotification(error.message || "שגיאה בשרת", "error");
    }
  };

  return (
    <header className="flex flex-col gap-y-4">
      {user ? (
        <div className="flex justify-between py-2 px-8 bg-[#8B0000]">
          <div className="flex gap-4">
            <button className="primary" onClick={handleLogout}>
              התנתקות
            </button>
            <button className="primary" onClick={() => navigate("/personal")}>
              אזור אישי
            </button>
          </div>
          <div
            className="flex select-none cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={toggleCart}
          >
            {cart && <span className="bg-white text-black text-center rounded-full px-2 self-start">{cartLength}</span>}
            <GiShoppingBag size={40} className="text-white" />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 bg-[#8B0000] py-2 px-8">
          <button className="primary" onClick={() => navigate("/login")}>
            התחברות
          </button>
          <button className="primary" onClick={() => navigate("/register")}>
            הרשמה
          </button>
        </div>
      )}
      <div className="flex justify-center">
        <Link to={"/"}>
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <ul className="menu inline-flex flex-wrap bg-[#8B0000]">
        <MenuLink to={"/"}>דף הבית</MenuLink>
        <MenuLink to={"/profile"}>פרופיל</MenuLink>
        <MenuLink to={"/gallery"}>גלריה</MenuLink>
        <MenuLink to={"/shop"}>חנות המוצרים</MenuLink>
        <MenuLink to={"/contact"}>צור קשר</MenuLink>
      </ul>
    </header>
  );
}

export default Header;
