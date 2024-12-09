import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useOrder } from "../context/OrderContext"; // Assuming you have an OrderContext
import { useNotification } from "../context/NotificationContext";

function CheckoutPage() {
  const { cart, totalPrice, clearCart, cartLength } = useCart();
  const navigate = useNavigate();
  const { createOrder } = useOrder();
  const { showNotification } = useNotification();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  // State for form fields
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    const { fullName, phoneNumber, address } = formData;
    try {
      const orderData = {
        items: cart.map((item) => item._id),
        fullName,
        phoneNumber,
        address,
        totalPrice,
        paymentMethod,
      };
      const message = await createOrder(orderData); // Assuming `createOrder` is in OrderContext
      showNotification(message, "success");
      clearCart();
      navigate("/"); // Redirect after successful order placement
    } catch (error) {
      showNotification(error.message || "שגיאה ביצירת ההזמנה", "error");
    }
  };

  return (
    <div className="page-container">
      <h1 className="text-center">עמוד תשלום</h1>

      <div className="grid gap-6 mt-4">
        {/* Cart Summary */}
        <div className="shadow-md rounded p-4 bg-gray-100">
          <h2 className="text-lg font-bold mb-4">סיכום הזמנה</h2>
          {cartLength > 0 ? (
            <>
              <ul className="divide-y divide-gray-300">
                {cart.map((item) => (
                  <li key={item._id} className="flex justify-between items-center py-2">
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <p className="text-sm font-bold text-[#8B0000]">₪{item.price}</p>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-4 border-t pt-2">
                <span className="font-bold text-lg">סה"כ:</span>
                <span className="text-lg font-bold text-[#8B0000]">₪{totalPrice}</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col">
              <span className="text-gray-600">סל הקניות שלך ריק - הכנס מוצרים כדי להמשיך</span>
              <div>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => navigate("/shop")}
                >
                  עבור לחנות
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Details */}
        <div className="shadow-md rounded p-4 bg-gray-100">
          <h2 className="text-lg font-bold">פרטי משלוח</h2>
          <form className="grid gap-4 mt-4">
            <input
              name="fullName"
              type="text"
              placeholder="שם מלא"
              className="w-full p-2 border rounded"
              value={formData.fullName}
              onChange={handleChange}
            />
            <input
              name="phoneNumber"
              type="tel"
              placeholder="מספר טלפון"
              className="w-full p-2 border rounded text-right"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <input
              name="address"
              type="text"
              placeholder="כתובת"
              className="w-full p-2 border rounded"
              value={formData.address}
              onChange={handleChange}
            />
          </form>
        </div>

        {/* Payment Options */}
        <div className="shadow-md rounded p-4 bg-gray-100">
          <h2 className="text-lg font-bold">אפשרויות תשלום</h2>
          <div className="flex gap-4 mt-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                className="form-radio"
                value="creditCard"
                defaultChecked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>כרטיס אשראי</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                className="form-radio"
                value="paypal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>פייפאל</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                className="form-radio"
                value="cash"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>תשלום במזומן</span>
            </label>
          </div>
        </div>

        {/* Order Review */}
        <div className="flex justify-between mt-4">
          <button className="primary px-4 py-2" onClick={() => navigate("/shop")}>
            חזרה לחנות
          </button>
          <button className="secondary px-4 py-2" onClick={handlePlaceOrder}>
            בצע הזמנה
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
