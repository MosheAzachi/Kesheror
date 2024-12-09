import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>{children}</NotificationContext.Provider>
  );
}
