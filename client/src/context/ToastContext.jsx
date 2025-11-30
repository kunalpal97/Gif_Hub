import { createContext, useContext, useState, useEffect } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    // auto-hide after 3 seconds
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* TOAST UI */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white text-sm transition-all
            ${toast.type === "success" ? "bg-green-600" : ""}
            ${toast.type === "error" ? "bg-red-600" : ""}
            ${toast.type === "warning" ? "bg-yellow-600" : ""}
          `}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
