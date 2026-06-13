import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export default function NotificationProvider({ children }) {
  const [message, setMessage] = useState("");

  const showNotification = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {message && (
        <div className="fixed top-5 right-5 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
}