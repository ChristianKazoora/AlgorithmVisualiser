import React, { createContext, useContext, ReactNode } from "react";
import toast, { Toaster, ToastOptions } from "react-hot-toast";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiXCircle,
  FiInfo,
} from "react-icons/fi";

export interface NotificationContextType {
  showSuccess: (message: string, options?: ToastOptions) => void;
  showError: (message: string, options?: ToastOptions) => void;
  showWarning: (message: string, options?: ToastOptions) => void;
  showInfo: (message: string, options?: ToastOptions) => void;
  showCustom: (
    message: string,
    type: "success" | "error" | "warning" | "info",
    options?: ToastOptions
  ) => void;
  dismiss: (toastId?: string) => void;
  dismissAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-success text-success-content shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FiCheckCircle className="h-6 w-6" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">{message}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-success-content/20">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium hover:bg-success-content/10 focus:outline-none"
            >
              <FiXCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      ),
      {
        duration: 4000,
        ...options,
      }
    );
  };

  const showError = (message: string, options?: ToastOptions) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-error text-error-content shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-6 w-6" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">{message}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-error-content/20">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium hover:bg-error-content/10 focus:outline-none"
            >
              <FiXCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
        ...options,
      }
    );
  };

  const showWarning = (message: string, options?: ToastOptions) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-warning text-warning-content shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-6 w-6" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">{message}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-warning-content/20">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium hover:bg-warning-content/10 focus:outline-none"
            >
              <FiXCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        ...options,
      }
    );
  };

  const showInfo = (message: string, options?: ToastOptions) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-info text-info-content shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FiInfo className="h-6 w-6" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">{message}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-info-content/20">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium hover:bg-info-content/10 focus:outline-none"
            >
              <FiXCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      ),
      {
        duration: 4000,
        ...options,
      }
    );
  };

  const showCustom = (
    message: string,
    type: "success" | "error" | "warning" | "info",
    options?: ToastOptions
  ) => {
    switch (type) {
      case "success":
        showSuccess(message, options);
        break;
      case "error":
        showError(message, options);
        break;
      case "warning":
        showWarning(message, options);
        break;
      case "info":
        showInfo(message, options);
        break;
    }
  };

  const dismiss = (toastId?: string) => {
    toast.dismiss(toastId);
  };

  const dismissAll = () => {
    toast.dismiss();
  };

  const value: NotificationContextType = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showCustom,
    dismiss,
    dismissAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Toaster
        position="bottom-left"
        toastOptions={{
          className: "",
          duration: 4000,
          style: {
            background: "transparent",
            boxShadow: "none",
          },
        }}
      />
    </NotificationContext.Provider>
  );
};
