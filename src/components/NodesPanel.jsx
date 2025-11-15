import React from "react";
import { MessageSquare } from "lucide-react";

/**
 * NodesPanel Component
 * Displays available node types that can be dragged onto the canvas
 *
 * Features:
 * - Shows all available node types
 * - Drag and drop functionality
 * - Extensible design - easy to add new node types in the future
 *
 * Usage:
 * - Drag the Message node from this panel onto the canvas to create a new node
 */
const NodesPanel = () => {
  /**
   * Handles the start of drag operation
   * Sets the node type data to be transferred
   */
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="bg-white border-l border-gray-200 p-4"
      style={{ width: "280px" }}
    >
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Nodes Panel</h3>

      {/* Message Node - Draggable */}
      <div
        className="border-2 border-blue-500 rounded-lg p-3 cursor-move hover:bg-blue-50 transition-colors"
        onDragStart={(event) => onDragStart(event, "textNode")}
        draggable
      >
        <div className="flex flex-col items-center gap-2">
          <MessageSquare size={24} className="text-blue-500" />
          <span className="text-sm font-medium text-gray-700">Message</span>
        </div>
      </div>

      {/* Future node types can be added here */}
      {/* Example:
      <div
        className="border-2 border-blue-500 rounded-lg p-3 cursor-move hover:bg-blue-50 transition-colors mt-3"
        onDragStart={(event) => onDragStart(event, 'imageNode')}
        draggable
      >
        <div className="flex flex-col items-center gap-2">
          <ImageIcon size={24} className="text-blue-500" />
          <span className="text-sm font-medium text-gray-700">Image</span>
        </div>
      </div>
      */}
    </div>
  );
};

export default NodesPanel;
