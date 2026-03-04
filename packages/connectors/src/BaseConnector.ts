import type {
  ModuleConnector,
  ModuleConfig,
  DeploymentResult,
  ModuleStatusResult,
  ModuleAction,
  ActionResult,
  ValidationResult,
} from '@dao-os/core';
import { ConnectorError } from './errors';

/**
 * Base Connector Class
 * 
 * Provides common functionality for all module connectors
 */
export abstract class BaseConnector implements ModuleConnector {
  protected readonly moduleId: string;
  protected readonly provider: string;

  constructor(moduleId: string, provider: string) {
    this.moduleId = moduleId;
    this.provider = provider;
  }

  /**
   * Deploy or initialize the module
   */
  abstract deploy(config: ModuleConfig): Promise<DeploymentResult>;

  /**
   * Get current status of the module
   */
  abstract getStatus(identifier: string): Promise<ModuleStatusResult>;

  /**
   * Execute an action on the module
   */
  abstract execute(action: ModuleAction): Promise<ActionResult>;

  /**
   * Validate configuration before deployment
   */
  async validateConfig(config: ModuleConfig): Promise<ValidationResult> {
    const errors: ValidationResult['errors'] = [];
    const warnings: ValidationResult['warnings'] = [];

    // Basic validation - can be overridden
    if (!config || typeof config !== 'object') {
      errors.push({
        field: 'config',
        message: 'Configuration must be a valid object',
        code: 'INVALID_CONFIG',
      });
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Get available actions for this module
   */
  abstract getAvailableActions(): ModuleAction[];

  /**
   * Handle errors consistently
   */
  protected handleError(error: unknown, context: string): never {
    if (error instanceof ConnectorError) {
      throw error;
    }
    
    const message = error instanceof Error ? error.message : String(error);
    throw new ConnectorError(
      `${this.provider} ${context}: ${message}`,
      'CONNECTOR_ERROR',
      { moduleId: this.moduleId, context, originalError: error }
    );
  }

  /**
   * Log messages (can be overridden to use custom logger)
   */
  protected log(level: 'info' | 'warn' | 'error', message: string, data?: any): void {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${this.provider}] [${level.toUpperCase()}]`;
    
    if (level === 'error') {
      console.error(prefix, message, data || '');
    } else if (level === 'warn') {
      console.warn(prefix, message, data || '');
    } else {
      console.log(prefix, message, data || '');
    }
  }

  /**
   * Retry logic with exponential backoff
   */
  protected async retry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delayMs: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt < maxRetries) {
          const delay = delayMs * Math.pow(2, attempt);
          this.log('warn', `Attempt ${attempt + 1} failed, retrying in ${delay}ms`, {
            error: lastError.message,
          });
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
    
    throw new ConnectorError(
      `Failed after ${maxRetries + 1} attempts`,
      'MAX_RETRIES_EXCEEDED',
      { originalError: lastError! }
    );
  }
}
