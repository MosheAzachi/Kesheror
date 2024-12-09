import { useEffect, useState } from "react";
import { useOrder } from "../context/OrderContext";
import { useNotification } from "../context/NotificationContext";

function OrdersManagement() {
  const { orders, fetchOrders, setDelivered } = useOrder();
  const [selectedOrder, setSelectedOrder] = useState(null); // For showing order details
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleShipOrder = async (orderId) => {
    try {
      const message = await setDelivered(orderId);
      showNotification(message, "success");
      handleCloseModal();
    } catch (error) {
      showNotification(error.message || "שגיאה באישור שליחה", "error");
    }
  };

  return (
    <div className="shadow-md rounded overflow-hidden">
      <h2 className="text-center bg-[#8B0000] py-3 text-white">ניהול הזמנות</h2>
      <div className="p-4 bg-gray-50">
        <p className="text-sm text-gray-500">כאן תוכלו לצפות ולנהל את כל ההזמנות שבוצעו.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex  flex-col  gap-3 border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition"
            >
              <h3 className="text-md font-bold text-[#8B0000]">הזמנה - {order._id}</h3>
              <div className="flex justify-between">
                <p className="text-sm text-gray-700">
                  <strong>סה"כ:</strong> ₪{order.totalPrice}
                </p>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded ${
                    order.status === "Pending" ? "bg-yellow-200 text-yellow-800" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <button
                className="w-full text-sm bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                onClick={() => handleViewDetails(order)}
              >
                צפה בפרטים
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Order Details */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
          onClick={handleCloseModal}
        >
          <div className="bg-white p-4 w-full max-w-md rounded shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#8B0000]">פרטי הזמנה</h2>
              <button className="text-gray-600" onClick={handleCloseModal}>
                ✖
              </button>
            </div>
            <div className="mt-4">
              <p>
                <strong>מספר הזמנה:</strong> {selectedOrder._id}
              </p>
              <p>
                <strong>סטטוס:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>סכום כולל:</strong> ₪{selectedOrder.totalPrice}
              </p>
              <p>
                <strong>שם מלא:</strong> {selectedOrder.fullName}
              </p>
              <p>
                <strong>מספר טלפון:</strong> {selectedOrder.phoneNumber}
              </p>
              <p>
                <strong>כתובת:</strong> {selectedOrder.address}
              </p>
            </div>
            <div className="mt-4 bg-gray-100 p-2 rounded-lg">
              <h3 className="text-lg font-bold">מוצרים בהזמנה:</h3>
              <ul className="divide-y divide-gray-300">
                {selectedOrder.items.map((item) => (
                  <li key={item.product._id} className="py-2">
                    <p>
                      <strong>שם מוצר:</strong> {item.product.name}
                    </p>
                    <p>
                      <strong>מחיר:</strong> ₪{item.product.price}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              {selectedOrder.status !== "Delivered" && (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => handleShipOrder(selectedOrder._id)}
                >
                  הגדר כנשלח
                </button>
              )}
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleCloseModal}>
                סגור
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersManagement;
