/**
 * System Metrics Types
 * 
 * Metrics for visualizing organizational dynamics through flow and coordination
 */

/**
 * Flow Rates (velocity of resource movement)
 */
export interface FlowRates {
  inflow: number; // Resources coming into the system per time period
  outflow: number; // Resources leaving the system per time period
  allocationRate: number; // Rate of allocating available resources to active work
  completionRate: number; // Rate of completing active work to delivered impact
  netFlow: number; // Inflow - outflow
}

/**
 * Heat Map (activity intensity across modules)
 */
export interface HeatMap {
  [moduleId: string]: {
    intensity: number; // 0-1 normalized intensity
    absolute: number; // Raw activity metric
    trend: 'increasing' | 'decreasing' | 'stable';
  };
}

/**
 * System Metrics (comprehensive organizational state)
 */
export interface SystemMetrics {
  // Resource states
  available: number; // Unallocated treasury, dormant capabilities
  active: number; // Running grants, ongoing projects, active work
  total: number; // Sum of available and active
  
  // Percentages
  availablePercent: number;
  activePercent: number;
  
  // Coordination
  coordination: number; // 0-1 score (high = aligned, low = fragmented)
  memberActivity: number; // Active participation rate
  roleClarity: number; // How well-defined roles are
  
  // System balance
  balance: number; // Flow equilibrium (0-1, where 1 = perfect balance)
  
  // Flow rates
  flowRates: FlowRates;
  
  // Activity
  activityIntensity: HeatMap;
  
  // State
  state: 'formation' | 'growth' | 'stable' | 'decline' | 'transition';
  
  // Efficiency
  efficiency: number; // Impact per unit of available resources
  
  // Timestamp
  timestamp: number;
}

/**
 * Coordination Factors
 */
export interface CoordinationFactors {
  memberActivity: number; // 0-1
  roleClarity: number; // 0-1
  proposalVelocity: number; // 0-1
  resourceConcentration: number; // 0-1
}

/**
 * Activity Data Point
 */
export interface ActivityDataPoint {
  moduleId: string;
  timestamp: number;
  value: number;
  type: 'transaction' | 'vote' | 'proposal' | 'allocation' | 'completion';
}

/**
 * Trend Data
 */
export interface TrendData {
  metric: string;
  dataPoints: {
    timestamp: number;
    value: number;
  }[];
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

/**
 * Module Activity Stats
 */
export interface ModuleActivityStats {
  moduleId: string;
  moduleName: string;
  totalTransactions: number;
  totalVolume: number;
  activeUsers: number;
  lastActivity: number;
  activityScore: number; // 0-1 normalized
}
