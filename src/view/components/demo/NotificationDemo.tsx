import React from "react";
import { useNotification } from "../notifications/NotificationProvider";
import {
  FiBell,
  FiCheckCircle,
  FiAlertTriangle,
  FiInfo,
  FiXCircle,
} from "react-icons/fi";

const NotificationDemo: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();

  return (
    <div className="card bg-base-200 shadow-lg">
      <div className="card-body">
        <h2 className="card-title">
          <FiBell className="text-primary" />
          Notification System Demo
        </h2>
        <p className="text-sm text-base-content/70 mb-4">
          Try out different notification types to see how user feedback works in
          the application.
        </p>

        <div className="grid grid-cols-2 gap-2">
          <button
            className="btn btn-success btn-sm"
            onClick={() => showSuccess("Operation completed successfully!")}
          >
            <FiCheckCircle className="w-4 h-4 mr-1" />
            Success
          </button>

          <button
            className="btn btn-error btn-sm"
            onClick={() => showError("Something went wrong. Please try again.")}
          >
            <FiXCircle className="w-4 h-4 mr-1" />
            Error
          </button>

          <button
            className="btn btn-warning btn-sm"
            onClick={() =>
              showWarning("Please check your input before proceeding.")
            }
          >
            <FiAlertTriangle className="w-4 h-4 mr-1" />
            Warning
          </button>

          <button
            className="btn btn-info btn-sm"
            onClick={() =>
              showInfo("Algorithm changed to Breadth-First Search")
            }
          >
            <FiInfo className="w-4 h-4 mr-1" />
            Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDemo;
