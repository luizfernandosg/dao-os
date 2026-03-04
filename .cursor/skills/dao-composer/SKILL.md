---
name: dao-composer
description: Work with the DAO Composer visual interface using ReactFlow patterns. Use when developing the composer UI, working with flow diagrams, or implementing visual DAO configuration.
---

# DAO Composer Development

Develop the DAO Composer visual interface using ReactFlow.

## Overview

The DAO Composer is a React application built with Vite that uses ReactFlow for visual DAO configuration. It allows users to compose DAOs visually by connecting modules and configuring parameters.

## Location

```
apps/composer/
├── src/
│   ├── components/      # React components
│   ├── store/           # Zustand state management
│   ├── DAOComposer.tsx  # Main composer component
│   └── App.tsx
```

## ReactFlow Patterns

### Node Structure

Nodes represent DAO modules:

```typescript
interface DAONode {
  id: string;
  type: string;  // 'module' | 'config' | etc.
  position: { x: number; y: number };
  data: {
    label: string;
    module: ModuleConfig;
    // ... other data
  };
}
```

### Edge Structure

Edges represent connections between modules:

```typescript
interface DAOEdge {
  id: string;
  source: string;  // Source node id
  target: string;  // Target node id
  type?: string;   // Edge type
}
```

### Basic ReactFlow Setup

```typescript
import ReactFlow, { 
  Node, 
  Edge, 
  useNodesState, 
  useEdgesState 
} from 'reactflow';
import 'reactflow/dist/style.css';

function DAOComposer() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
    />
  );
}
```

## State Management

### Zustand Store

Store location: `apps/composer/src/store`

```typescript
interface ComposerStore {
  nodes: Node[];
  edges: Edge[];
  selectedNode: string | null;
  
  // Actions
  addNode: (node: Node) => void;
  removeNode: (id: string) => void;
  updateNode: (id: string, data: Partial<Node>) => void;
  // ... more actions
}
```

### Store Pattern

```typescript
import { create } from 'zustand';

export const useComposerStore = create<ComposerStore>((set) => ({
  nodes: [],
  edges: [],
  
  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node]
  })),
  
  // ... more actions
}));
```

## Component Patterns

### Custom Node Components

```typescript
import { NodeProps } from 'reactflow';

function ModuleNode({ data }: NodeProps) {
  return (
    <div className="module-node">
      <div className="node-header">{data.label}</div>
      <div className="node-content">
        {/* Module config UI */}
      </div>
    </div>
  );
}
```

### Node Types

Register custom nodes:

```typescript
const nodeTypes = {
  module: ModuleNode,
  config: ConfigNode,
  // ... other types
};

<ReactFlow nodeTypes={nodeTypes} ... />
```

## Adding Modules

### Module Registration

Modules are defined in `packages/core/src/types`:

```typescript
interface ModuleConfig {
  id: string;
  name: string;
  type: ModuleType;
  config: Record<string, any>;
}
```

### Adding to Canvas

```typescript
const addModule = useCallback((moduleType: string) => {
  const newNode: Node = {
    id: `module-${Date.now()}`,
    type: 'module',
    position: { x: 100, y: 100 },
    data: {
      label: moduleType,
      module: createModuleConfig(moduleType)
    }
  };
  
  setNodes((nodes) => [...nodes, newNode]);
}, [setNodes]);
```

## Connectors Integration

Link modules to connectors:

```typescript
import { SafeConnector } from '@dao-os/connectors';

// In component
const connector = new SafeConnector(config);
await connector.initialize();
const result = await connector.executeAction('transfer', params);
```

## Validation

### Configuration Validation

```typescript
import { validateModuleConfig } from '@dao-os/core';

const result = validateModuleConfig(config);
if (!result.valid) {
  console.error('Validation errors:', result.errors);
}
```

### Edge Validation

Ensure connections make sense:

```typescript
const canConnect = (connection: Connection): boolean => {
  // Check if source and target are compatible
  const sourceNode = nodes.find(n => n.id === connection.source);
  const targetNode = nodes.find(n => n.id === connection.target);
  
  return isCompatible(sourceNode, targetNode);
};
```

## Development Workflow

### Start Dev Server

```bash
pnpm --filter @dao-os/composer dev
```

### Build

```bash
pnpm --filter @dao-os/composer build
```

### Lint

```bash
pnpm --filter @dao-os/composer lint
```

## Styling

### CSS Modules

Styles in component files or separate `.module.css`:

```typescript
import styles from './DAOComposer.module.css';

<div className={styles.composer}>
  ...
</div>
```

### ReactFlow Styling

Override ReactFlow styles:

```css
.react-flow__node-module {
  background: var(--module-bg);
  border: 2px solid var(--module-border);
  padding: 1rem;
}
```

## Common Tasks

### Load DAO Configuration

```typescript
const loadDAO = async (daoId: string) => {
  const config = await loadDAOConfig(daoId);
  const nodes = configToNodes(config);
  const edges = configToEdges(config);
  
  setNodes(nodes);
  setEdges(edges);
};
```

### Export Configuration

```typescript
const exportDAO = () => {
  const config = nodesToConfig(nodes, edges);
  return config;
};
```

### Handle User Actions

```typescript
const onNodeClick = (event: React.MouseEvent, node: Node) => {
  setSelectedNode(node.id);
  // Open config panel, etc.
};

const onConnect = (connection: Connection) => {
  if (canConnect(connection)) {
    setEdges((edges) => addEdge(connection, edges));
  }
};
```

## Testing

Once tests are configured:

```bash
pnpm --filter @dao-os/composer test
```

## Troubleshooting

### ReactFlow Not Rendering

- Check CSS import: `import 'reactflow/dist/style.css'`
- Ensure container has height: `height: 100vh` or explicit height

### State Not Updating

- Verify Zustand store actions return new objects
- Check React DevTools for state changes
- Ensure immutable updates

### Performance Issues

- Use `memo` for custom nodes
- Implement `shouldComponentUpdate` logic
- Limit re-renders with careful state management
