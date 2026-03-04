/**
 * Visualization Types for React Flow and D3
 */

/**
 * Overlay Modes for system-wide visualizations
 */
export type OverlayMode =
  | 'heat-map' // Activity concentration
  | 'energy-flow' // Resource transformation (available → active)
  | 'entropy' // Organizational coordination/alignment
  | 'equilibrium'; // System balance

/**
 * Flow Edge Data
 */
export interface FlowEdgeData {
  // Capital flow
  amount?: number;
  velocity?: number; // Rate of flow
  
  // Activity flow
  activityLevel?: number; // 0-1
  memberCount?: number;
  
  // Coordination
  entropyLevel?: number; // 0-1 (high = chaotic, low = aligned)
  alignment?: number; // 0-1
  
  // Visual properties
  intensity?: number; // 0-1
  temperature?: number; // Heat visualization
  
  // Labels
  label?: string;
  sublabel?: string;
}

/**
 * Node Position (React Flow)
 */
export interface NodePosition {
  x: number;
  y: number;
}

/**
 * Visual Node Data
 */
export interface VisualNodeData {
  moduleInstance: any; // ModuleInstance
  status: string;
  metrics?: {
    activity: number;
    coordination: number;
    flow: number;
  };
}

/**
 * React Flow Node
 */
export interface ReactFlowNode {
  id: string;
  type: string;
  position: NodePosition;
  data: VisualNodeData;
}

/**
 * React Flow Edge
 */
export interface ReactFlowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  data?: FlowEdgeData;
  animated?: boolean;
}

/**
 * Fund Flow Visualization Data
 */
export interface FundFlowData {
  nodes: ReactFlowNode[];
  edges: ReactFlowEdge[];
  totalFlow: number;
  activeFlows: number;
}

/**
 * Visualization Config
 */
export interface VisualizationConfig {
  showLabels: boolean;
  showMetrics: boolean;
  animationSpeed: number; // 0-1
  theme: 'functional' | 'daocore';
  overlayMode?: OverlayMode;
}

/**
 * Heat Zone (for activity heat maps)
 */
export interface HeatZone {
  x: number;
  y: number;
  radius: number;
  intensity: number; // 0-1
  moduleId: string;
}

/**
 * Energy Flow Visualization Data
 */
export interface EnergyFlowVisualization {
  potential: number; // Available resources
  kinetic: number; // Active work
  transformation: number; // Rate of conversion
  efficiency: number; // How much potential becomes impact
}

/**
 * Entropy Visualization Data
 */
export interface EntropyVisualization {
  overall: number; // 0-1 (0 = perfect order, 1 = chaos)
  byModule: {
    moduleId: string;
    entropy: number;
    alignment: number;
  }[];
}

/**
 * Equilibrium Indicators
 */
export interface EquilibriumIndicators {
  inflows: number;
  outflows: number;
  balance: number; // 0-1 (1 = perfect equilibrium)
  trend: 'accumulating' | 'balanced' | 'depleting';
}
