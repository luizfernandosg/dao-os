import { create } from 'zustand';
import type { Node, Edge } from 'reactflow';
import type { DAOModule, ModuleInstance } from '@dao-os/core';
import { generateId } from '@dao-os/core';

interface ComposerState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setSelectedNode: (node: Node | null) => void;
  addModule: (module: DAOModule) => void;
  removeNode: (nodeId: string) => void;
  updateNodeData: (nodeId: string, data: any) => void;
}

export const useComposerStore = create<ComposerState>((set) => ({
  nodes: [],
  edges: [],
  selectedNode: null,

  setNodes: (nodes) => set({ nodes }),
  
  setEdges: (edges) => set({ edges }),
  
  setSelectedNode: (node) => set({ selectedNode: node }),

  addModule: (module) => {
    const instance: ModuleInstance = {
      instanceId: generateId(),
      moduleId: module.id,
      config: module.defaultConfig,
      status: 'designed',
      connections: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const newNode: Node = {
      id: instance.instanceId,
      type: module.id,
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
      },
      data: {
        instance,
        status: 'designed',
      },
    };

    set((state) => ({
      nodes: [...state.nodes, newNode],
    }));
  },

  removeNode: (nodeId) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    }));
  },

  updateNodeData: (nodeId, data) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
    }));
  },
}));
