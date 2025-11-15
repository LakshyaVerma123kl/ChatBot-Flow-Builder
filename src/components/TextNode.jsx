import React from "react";
import { Handle, Position } from "reactflow";
import { MessageSquare, X } from "lucide-react";

/**
 * TextNode Component
 * Custom node component for displaying text messages in the flow
 *
 * Props:
 * @param {Object} data - Node data containing the label text and delete handler
 * @param {boolean} selected - Whether the node is currently selected
 * @param {string} id - Unique identifier for the node
 *
 * Features:
 * - Visual indicator for selection state
 * - Delete button to remove the node
 * - Source handle (right) - only one outgoing edge allowed
 * - Target handle (left) - multiple incoming edges allowed
 */
const TextNode = ({ data, selected, id }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md border-2 transition-all ${
        selected ? "border-blue-500" : "border-gray-200"
      }`}
      style={{ minWidth: "250px", position: "relative" }}
    >
      {/* Target Handle - Left side (incoming connections) */}
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        style={{
          width: "12px",
          height: "12px",
          background: "#6b7280",
          border: "2px solid white",
          left: "-6px",
        }}
      />

      {/* Node Header */}
      <div className="bg-teal-200 px-4 py-2 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-teal-700" />
          <span className="text-sm font-semibold text-gray-800">
            Send Message
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              data.onDelete(id);
            }}
            className="text-red-600 hover:text-red-800 hover:bg-red-100 rounded p-1 transition-colors"
            title="Delete node"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Node Body - Displays the message text */}
      <div className="px-4 py-3 bg-white rounded-b-lg">
        <p className="text-sm text-gray-700">{data.label}</p>
      </div>

      {/* Source Handle - Right side (outgoing connections) */}
      <Handle
        type="source"
        position={Position.Right}
        id="source"
        style={{
          width: "12px",
          height: "12px",
          background: "#6b7280",
          border: "2px solid white",
          right: "-6px",
        }}
      />
    </div>
  );
};

export default TextNode;
