/**
 * Module Connector Interface
 * 
 * All module integrations must implement this interface
 */
export interface ModuleConnector {
  /**
   * Deploy or initialize the module
   */
  deploy(config: ModuleConfig): Promise<DeploymentResult>;

  /**
   * Get current status of the module
   */
  getStatus(identifier: string): Promise<ModuleStatusResult>;

  /**
   * Execute an action on the module
   */
  execute(action: ModuleAction): Promise<ActionResult>;

  /**
   * Validate configuration before deployment
   */
  validateConfig(config: ModuleConfig): Promise<ValidationResult>;

  /**
   * Get available actions for this module
   */
  getAvailableActions(): ModuleAction[];
}

/**
 * Module Configuration (generic)
 */
export interface ModuleConfig {
  [key: string]: unknown;
}

/**
 * Deployment Result
 */
export interface DeploymentResult {
  success: boolean;
  address?: string;
  transactionHash?: string;
  chainId?: number;
  error?: string;
  data?: Record<string, unknown>;
}

/**
 * Module Status Result
 */
export interface ModuleStatusResult {
  status: 'active' | 'inactive' | 'error' | 'pending';
  data: Record<string, unknown>;
  lastUpdated: number;
  error?: string;
}

/**
 * Module Action
 */
export interface ModuleAction {
  id: string;
  name: string;
  description: string;
  parameters: ActionParameter[];
  requiredPermissions?: string[];
}

/**
 * Action Parameter
 */
export interface ActionParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'address' | 'array' | 'object';
  required: boolean;
  description: string;
  default?: unknown;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    options?: unknown[];
  };
}

/**
 * Action Result
 */
export interface ActionResult {
  success: boolean;
  transactionHash?: string;
  data?: Record<string, unknown>;
  error?: string;
}

/**
 * Validation Result
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

/**
 * Validation Error
 */
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

/**
 * Validation Warning
 */
export interface ValidationWarning {
  field: string;
  message: string;
  code: string;
}
