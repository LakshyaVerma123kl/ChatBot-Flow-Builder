import React from "react";

/**
 * ErrorNotification Component
 * Displays error messages to the user
 *
 * Props:
 * @param {string} message - The error message to display
 * @param {Function} onClose - Callback to close the notification
 *
 * Features:
 * - Fixed position at top center of screen
 * - Manual close button
 * - Auto-dismiss after timeout (handled by parent)
 */
const ErrorNotification = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-3">
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-red-700 hover:text-red-900"
        aria-label="Close notification"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
        </svg>
      </button>
    </div>
  );
};

export default ErrorNotification;
