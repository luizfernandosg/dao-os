import { SafeNode } from '@dao-os/module-safe/components';
import type { NodeTypes } from 'reactflow';

// Register all node types here
export const nodeTypes: NodeTypes = {
  'gnosis-safe': SafeNode,
  // Add more node types as modules are implemented
};
