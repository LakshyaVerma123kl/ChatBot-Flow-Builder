import React from "react";

/**
 * SaveButton Component
 * Button to trigger flow validation and saving
 *
 * Props:
 * @param {Function} onClick - Callback function when button is clicked
 *
 * Features:
 * - Triggers validation of the flow
 * - Shows error if validation fails
 * - Saves the flow if validation passes
 */
const SaveButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
    >
      Save Changes
    </button>
  );
};

export default SaveButton;
