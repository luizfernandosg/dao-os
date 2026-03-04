/**
 * Connector Error Classes
 */

export class ConnectorError extends Error {
  public readonly code: string;
  public readonly context?: Record<string, unknown>;

  constructor(message: string, code: string = 'CONNECTOR_ERROR', context?: Record<string, unknown>) {
    super(message);
    this.name = 'ConnectorError';
    this.code = code;
    this.context = context;
    
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ConnectorError);
    }
  }
}

export class DeploymentError extends ConnectorError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'DEPLOYMENT_ERROR', context);
    this.name = 'DeploymentError';
  }
}

export class ConfigurationError extends ConnectorError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'CONFIGURATION_ERROR', context);
    this.name = 'ConfigurationError';
  }
}

export class NetworkError extends ConnectorError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'NETWORK_ERROR', context);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends ConnectorError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'VALIDATION_ERROR', context);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ConnectorError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 'NOT_FOUND', context);
    this.name = 'NotFoundError';
  }
}
