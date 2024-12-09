import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showNotification } = useNotification();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const message = await login({ email, password });
      showNotification(message, "success");
      navigate("/");
    } catch (error) {
      showNotification(error.message || "שגיאה בשרת", "error");
    }
  };

  return (
    <div className="page-container">
      <h1 className="text-center">התחברות</h1>
      <form className="bg-gray-100 px-6 py-4 rounded shadow w-full max-w-lg mx-auto" onSubmit={handleLogin}>
        <label htmlFor="email">אימייל</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="הכנס אימייל"
        />
        <label htmlFor="password">סיסמא</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="הכנס סיסמא"
        />
        <button type="submit" className="secondary w-full py-3">
          התחבר
        </button>
        <p className="text-center text-sm mt-4 text-gray-600">
          אין לך חשבון?{" "}
          <Link to="/register" className="text-[#8B0000] underline">
            הרשם כאן
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
