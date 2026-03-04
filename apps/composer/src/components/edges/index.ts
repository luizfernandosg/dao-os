import { CapitalFlowEdge } from './CapitalFlowEdge';
import type { EdgeTypes } from 'reactflow';

// Register all edge types here
export const edgeTypes: EdgeTypes = {
  'capital-flow': CapitalFlowEdge,
  // Add more edge types as needed
};
