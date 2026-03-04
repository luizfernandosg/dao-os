import type { ModuleInstance } from './module';

/**
 * DAO Identity (EIP-4824)
 */
export interface DAOIdentity {
  name: string;
  description: string;
  daoURI: string; // EIP-4824 URI
  membersURI?: string;
  proposalsURI?: string;
  activityLogURI?: string;
  governanceURI?: string;
  contractsURI?: string[];
}

/**
 * DAO Configuration
 */
export interface DAOConfig {
  identity: DAOIdentity;
  modules: ModuleInstance[];
  theme?: 'functional' | 'daocore';
  defaultTheme?: 'functional' | 'daocore';
  allowThemeSwitch?: boolean;
  customization?: {
    primaryColor?: string;
    logo?: string;
    banner?: string;
  };
}

/**
 * DAO State
 */
export type DAOState =
  | 'formation'
  | 'growth'
  | 'stable'
  | 'decline'
  | 'transition';

/**
 * Complete DAO Object
 */
export interface DAO {
  id: string;
  config: DAOConfig;
  state: DAOState;
  chain: number;
  createdAt: number;
  updatedAt: number;
  
  // Computed properties
  treasury?: {
    totalBalance: number;
    allocatedBalance: number;
    unallocatedBalance: number;
  };
  
  grants?: Grant[];
  projects?: Project[];
  members?: Member[];
  
  // Helper methods
  hasModule: (moduleId: string) => boolean;
  getModule: (instanceId: string) => ModuleInstance | undefined;
  getSafeAddress: () => string | undefined;
  getTopHatId: () => string | undefined;
}

/**
 * Grant
 */
export interface Grant {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: string;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  recipient: string;
  startDate: number;
  endDate?: number;
  milestones?: Milestone[];
}

/**
 * Milestone
 */
export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: number;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
}

/**
 * Project
 */
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in_progress' | 'completed' | 'archived';
  budget: number;
  spent: number;
  team: string[];
  startDate: number;
  endDate?: number;
}

/**
 * DAO Member
 */
export interface Member {
  address: string;
  roles: Role[];
  joinedAt: number;
  votingPower?: number;
  hats?: string[];
}

/**
 * Role
 */
export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  wearers?: string[];
}

/**
 * Permission
 */
export interface Permission {
  id: string;
  name: string;
  description: string;
  scope: string;
}

/**
 * DAO Blueprint (export format)
 */
export interface DAOBlueprint {
  version: string;
  name: string;
  description: string;
  modules: {
    moduleId: string;
    config: Record<string, unknown>;
  }[];
  connections: {
    source: string;
    target: string;
    type: string;
  }[];
  metadata: {
    createdAt: number;
    createdBy: string;
    tags: string[];
  };
}
