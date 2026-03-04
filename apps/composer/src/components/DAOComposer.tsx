import React, { useCallback } from 'react';
import ReactFlow, {
  Node,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type NodeChange,
  type EdgeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import type { DAOConfig } from '@dao-os/core';
import { ModulePalette } from './ModulePalette';
import { ConfigurationPanel } from './ConfigurationPanel';
import { ValidationPanel } from './ValidationPanel';
import { nodeTypes } from './nodes';
import { edgeTypes } from './edges';
import { useComposerStore } from '../store/composerStore';

interface DAOComposerProps {
  config: DAOConfig;
  onChange: (config: DAOConfig) => void;
}

export function DAOComposer({ config: _config, onChange: _onChange }: DAOComposerProps) {
  const { nodes, edges, setNodes, setEdges, selectedNode, setSelectedNode } =
    useComposerStore();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes(applyNodeChanges(changes, nodes));
    },
    [nodes, setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges(applyEdgeChanges(changes, edges));
    },
    [edges, setEdges]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges(addEdge(connection, edges));
    },
    [edges, setEdges]
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  return (
    <div className="dao-composer">
      <ModulePalette />

      <div className="composer-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>

      {selectedNode && (
        <ConfigurationPanel
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}

      <ValidationPanel nodes={nodes} edges={edges} />
    </div>
  );
}
