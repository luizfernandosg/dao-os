/**
 * Module Category Types
 */
export type ModuleCategory =
  | 'treasury'
  | 'governance'
  | 'funding'
  | 'identity'
  | 'coordination'
  | 'dao2dao';

/**
 * Module Status Types
 */
export type ModuleStatus =
  | 'designed'
  | 'configured'
  | 'deployed'
  | 'active'
  | 'archived';

/**
 * Connector Type
 */
export type ConnectorType = 'onchain' | 'api' | 'manual';

/**
 * Chain Information
 */
export interface Chain {
  id: number;
  name: string;
  network: string;
  rpcUrl?: string;
  explorerUrl?: string;
}

/**
 * API Endpoint Configuration
 */
export interface APIEndpoint {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  auth?: {
    type: 'bearer' | 'api-key' | 'oauth';
    config: Record<string, unknown>;
  };
}

/**
 * Smart Contract Information
 */
export interface ContractInfo {
  address: string;
  abi: unknown[];
  chainId: number;
  deployedAt?: number;
}

/**
 * Prerequisite for Module
 */
export interface Prerequisite {
  type: 'module' | 'contract' | 'account' | 'permission';
  description: string;
  moduleId?: string;
  required: boolean;
}

/**
 * Module Example
 */
export interface Example {
  name: string;
  description: string;
  config: Record<string, unknown>;
  useCases: string[];
}

/**
 * Module Tutorial
 */
export interface Tutorial {
  title: string;
  description: string;
  steps: TutorialStep[];
  estimatedTime: number; // in minutes
}

export interface TutorialStep {
  title: string;
  content: string;
  codeExample?: string;
}

/**
 * Module Integration
 */
export interface Integration {
  targetModule: string;
  type: 'required' | 'optional' | 'recommended';
  description: string;
}

/**
 * DAO Module Specification
 */
export interface DAOModule {
  id: string;
  name: string;
  category: ModuleCategory;
  description: string;
  provider: string;
  version: string;

  // Visual representation
  icon: string;
  color: string;

  // Integration
  connectorType: ConnectorType;
  networks: Chain[];
  apis: APIEndpoint[];
  contracts?: ContractInfo[];

  // Configuration
  configSchema: Record<string, unknown>; // JSON Schema
  defaultConfig: Record<string, unknown>;

  // Requirements & Dependencies
  dependencies: string[]; // Other module IDs
  prerequisites: Prerequisite[];

  // Documentation
  documentation: string;
  examples: Example[];
  tutorials: Tutorial[];

  // Interoperability
  standards: string[]; // EIP-4824, DAOIP-5, etc.
  integrations: Integration[];
}

/**
 * Module Instance (deployed/configured module)
 */
export interface ModuleInstance {
  instanceId: string;
  moduleId: string;
  config: Record<string, unknown>;
  status: ModuleStatus;
  deploymentInfo?: DeploymentInfo;
  connections: Connection[];
  createdAt: number;
  updatedAt: number;
}

/**
 * Deployment Information
 */
export interface DeploymentInfo {
  address?: string;
  transactionHash?: string;
  chainId?: number;
  deployedAt: number;
  deployedBy: string;
  gasUsed?: string;
}

/**
 * Connection between modules
 */
export interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
  type: ConnectionType;
  data?: Record<string, unknown>;
}

export type ConnectionType = 
  | 'capital-flow'
  | 'permission'
  | 'data-sync'
  | 'trigger'
  | 'governance';
