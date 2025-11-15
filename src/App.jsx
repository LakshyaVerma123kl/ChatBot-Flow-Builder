import React from "react";
import { ReactFlowProvider } from "reactflow";
import FlowBuilder from "./components/FlowBuilder";
import "reactflow/dist/style.css";

/**
 * App Component
 * Root component that wraps FlowBuilder with ReactFlowProvider
 * ReactFlowProvider enables React Flow context for all child components
 */
function App() {
  return (
    <ReactFlowProvider>
      <FlowBuilder />
    </ReactFlowProvider>
  );
}

export default App;
