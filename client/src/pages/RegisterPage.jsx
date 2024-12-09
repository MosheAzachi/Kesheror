import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";
function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const message = await register({ name, email, password });
      showNotification(message, "success");
      navigate("/");
    } catch (error) {
      showNotification(error.message || "שגיאה בהרשמה, נסה שוב", "error");
    }
  };

  return (
    <div className="page-container">
      <h1 className="text-center">הרשמה</h1>
      <form className="bg-gray-100 px-6 py-4 rounded shadow w-full max-w-lg mx-auto" onSubmit={handleRegister}>
        <label htmlFor="fullName">שם מלא</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="הכנס שם מלא"
        />
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
        <button type="submit" className="w-full py-3 secondary">
          הירשם
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
