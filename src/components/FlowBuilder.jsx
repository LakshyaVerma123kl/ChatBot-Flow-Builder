import React, { useState, useCallback, useRef } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MarkerType,
  ConnectionLineType,
} from "reactflow";
import TextNode from "./TextNode";
import EdgeEditButton from "./EdgeEditButton";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import SaveButton from "./SaveButton";
import ErrorNotification from "./ErrorNotification";

/**
 * Node types configuration
 * Maps node type strings to their respective components
 */
const nodeTypes = {
  textNode: TextNode,
};

/**
 * Edge types configuration
 * Maps edge type strings to their respective components
 */
const edgeTypes = {
  customEdge: EdgeEditButton,
};

/**
 * FlowBuilder Component
 * Main component that orchestrates the entire flow builder
 *
 * Features:
 * - Manages nodes and edges state
 * - Handles drag and drop from nodes panel
 * - Validates connections (source handle can only have one outgoing edge)
 * - Node selection and editing
 * - Delete nodes and edges
 * - Flow validation and saving
 */
const FlowBuilder = () => {
  const reactFlowWrapper = useRef(null);

  // React Flow state management hooks
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // UI state
  const [selectedNode, setSelectedNode] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [nodeIdCounter, setNodeIdCounter] = useState(1);

  /**
   * Handles node deletion
   */
  const onDeleteNode = useCallback(
    (nodeId) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
      if (selectedNode?.id === nodeId) {
        setSelectedNode(null);
      }
    },
    [setNodes, setEdges, selectedNode]
  );

  /**
   * Handles edge deletion
   */
  const onDeleteEdge = useCallback(
    (edgeId) => {
      setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
    },
    [setEdges]
  );

  /**
   * Handles node click events
   * Sets the clicked node as selected to show settings panel
   */
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  /**
   * Handles pane click events (clicking on empty canvas)
   * Deselects any selected node
   */
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  /**
   * Handles edge connection between nodes
   * Validates that source handle can only have one outgoing edge
   */
  const onConnect = useCallback(
    (params) => {
      // Check if source handle already has an outgoing edge
      const sourceHasEdge = edges.some((edge) => edge.source === params.source);

      if (sourceHasEdge) {
        setErrorMessage(
          "A source handle can only have one outgoing connection!"
        );
        setTimeout(() => setErrorMessage(""), 3000);
        return;
      }

      // Add the new edge with custom styling and delete handler
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "customEdge",
            animated: true,
            style: { stroke: "#3b82f6", strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#3b82f6",
            },
            data: { onDelete: onDeleteEdge },
          },
          eds
        )
      );
    },
    [edges, setEdges, onDeleteEdge]
  );

  /**
   * Handles drag over event
   * Necessary for drop functionality to work
   */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  /**
   * Handles drop event when a node is dropped onto the canvas
   * Creates a new node at the drop position
   */
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      // Convert screen coordinates to flow coordinates
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Create new node with unique ID and delete handler
      const newNode = {
        id: `node_${nodeIdCounter}`,
        type,
        position,
        data: {
          label: `test message ${nodeIdCounter}`,
          onDelete: onDeleteNode,
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setNodeIdCounter((count) => count + 1);
    },
    [reactFlowInstance, nodeIdCounter, setNodes, onDeleteNode]
  );

  /**
   * Updates node data (text content)
   * Called from SettingsPanel when user edits text
   */
  const onUpdateNode = useCallback(
    (nodeId, newText) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                label: newText,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  /**
   * Validates and saves the flow
   * Validation rule: If more than one node exists,
   * only one node can have an empty target handle
   */
  const handleSave = useCallback(() => {
    // Check if there are more than one nodes
    if (nodes.length > 1) {
      // Find nodes without incoming edges (empty target handles)
      const nodesWithoutTarget = nodes.filter((node) => {
        return !edges.some((edge) => edge.target === node.id);
      });

      // If more than one node has no incoming connection, show error
      if (nodesWithoutTarget.length > 1) {
        setErrorMessage("Cannot save Flow");
        setTimeout(() => setErrorMessage(""), 3000);
        return;
      }
    }

    // Save successful - log to console and show alert
    console.log("Flow saved successfully!", { nodes, edges });
    alert("Flow saved successfully!");
  }, [nodes, edges]);

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Error Notification */}
      {errorMessage && (
        <ErrorNotification
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}

      {/* Header with Save Button */}
      <div className="bg-gray-100 border-b border-gray-200 px-6 py-3 flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-800">
          Chatbot Flow Builder
        </div>
        <SaveButton onClick={handleSave} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* React Flow Canvas */}
        <div className="flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            connectionLineStyle={{
              stroke: "#3b82f6",
              strokeWidth: 3,
            }}
            connectionLineType={ConnectionLineType.SmoothStep}
            defaultEdgeOptions={{
              type: "customEdge",
              animated: true,
            }}
            fitView
            deleteKeyCode={["Backspace", "Delete"]}
            attributionPosition="bottom-left"
          >
            <Background color="#e5e7eb" gap={16} />
            <Controls />
          </ReactFlow>
        </div>

        {/* Side Panel - Conditionally renders Nodes Panel or Settings Panel */}
        {selectedNode ? (
          <SettingsPanel
            selectedNode={selectedNode}
            onUpdateNode={onUpdateNode}
            onClose={() => setSelectedNode(null)}
          />
        ) : (
          <NodesPanel />
        )}
      </div>
    </div>
  );
};

export default FlowBuilder;
