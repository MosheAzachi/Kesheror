import { useNotification } from "../context/NotificationContext";

function Notification() {
  const { notification } = useNotification();

  if (!notification) return null;

  const notificationStyles = {
    info: "bg-blue-500",
    success: "bg-green-500",
    error: "bg-red-500",
  };

  return (
    <div
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-4 py-2 text-white rounded shadow-lg z-50 ${
        notificationStyles[notification.type]
      }`}
    >
      {notification.message}
    </div>
  );
}

export default Notification;
