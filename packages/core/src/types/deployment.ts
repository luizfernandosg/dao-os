/**
 * Deployment Workflow Types
 */

export interface DeploymentWorkflow {
  id: string;
  name: string;
  description: string;
  steps: DeploymentStep[];
  status: WorkflowStatus;
  createdAt: number;
  startedAt?: number;
  completedAt?: number;
}

export type WorkflowStatus =
  | 'draft'
  | 'ready'
  | 'in_progress'
  | 'paused'
  | 'completed'
  | 'failed';

export interface DeploymentStep {
  id: string;
  name: string;
  description: string;
  type: StepType;
  config: Record<string, unknown>;
  status: StepStatus;
  dependencies: string[]; // Step IDs that must complete first
  result?: StepResult;
}

export type StepType =
  | 'deploy_contract'
  | 'configure_module'
  | 'create_safe'
  | 'mint_hats'
  | 'setup_governance'
  | 'fund_treasury'
  | 'register_dao'
  | 'custom';

export type StepStatus =
  | 'pending'
  | 'ready'
  | 'in_progress'
  | 'completed'
  | 'failed'
  | 'skipped';

export interface StepResult {
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
  transactionHash?: string;
  gasUsed?: string;
  timestamp: number;
}

/**
 * Deployment Transaction
 */
export interface DeploymentTransaction {
  hash: string;
  from: string;
  to?: string;
  value: string;
  data: string;
  chainId: number;
  status: 'pending' | 'confirmed' | 'failed';
  blockNumber?: number;
  gasUsed?: string;
  timestamp: number;
}
