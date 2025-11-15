import React, { useState } from "react";

/**
 * SettingsPanel Component
 * Displays settings for the selected node
 * Replaces the NodesPanel when a node is selected
 *
 * Props:
 * @param {Object} selectedNode - The currently selected node object
 * @param {Function} onUpdateNode - Callback to update node data
 * @param {Function} onClose - Callback to close the settings panel
 *
 * Features:
 * - Back button to return to NodesPanel
 * - Text editing for the selected node
 * - Real-time updates as user types
 */
const SettingsPanel = ({ selectedNode, onUpdateNode, onClose }) => {
  // Local state for text input
  const [text, setText] = useState(selectedNode?.data?.label || "");

  /**
   * Handles text change in the textarea
   * Updates both local state and parent component
   */
  const handleTextChange = (e) => {
    setText(e.target.value);
    onUpdateNode(selectedNode.id, e.target.value);
  };

  return (
    <div
      className="bg-white border-l border-gray-200 p-4"
      style={{ width: "280px" }}
    >
      {/* Header with back button */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800"
          aria-label="Back to nodes panel"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
          </svg>
        </button>
        <h3 className="text-sm font-semibold text-gray-700">Message</h3>
      </div>

      {/* Text Input Field */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-2">
          Text
        </label>
        <textarea
          value={text}
          onChange={handleTextChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows="4"
          placeholder="Enter your message..."
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
