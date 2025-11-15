import React from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getSmoothStepPath,
} from "reactflow";
import { X } from "lucide-react";

/**
 * EdgeEditButton Component
 * Custom edge component with a delete button
 *
 * Props:
 * @param {string} id - Unique identifier for the edge
 * @param {string} sourceX - X coordinate of the source
 * @param {string} sourceY - Y coordinate of the source
 * @param {string} targetX - X coordinate of the target
 * @param {string} targetY - Y coordinate of the target
 * @param {string} sourcePosition - Position of the source handle
 * @param {string} targetPosition - Position of the target handle
 * @param {Object} style - Custom styles for the edge
 * @param {Object} markerEnd - Marker configuration for the edge end
 * @param {Object} data - Additional data including delete handler
 */
const EdgeEditButton = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) => {
  // Calculate the path for smooth step edge
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      {/* The edge line itself */}
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />

      {/* Delete button positioned at the center of the edge */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <button
            onClick={() => data.onDelete(id)}
            className="bg-white border-2 border-red-500 text-red-600 hover:bg-red-50 rounded-full p-1 shadow-md transition-colors"
            title="Delete edge"
          >
            <X size={14} />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default EdgeEditButton;
