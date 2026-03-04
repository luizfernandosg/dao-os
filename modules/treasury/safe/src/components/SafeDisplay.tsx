import type { ModuleInstance } from '@dao-os/core';
import type { SafeModuleConfig } from '../types';

// Simplified formatAddress for now
const formatAddress = (address: string): string => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

interface SafeDisplayProps {
  instance: ModuleInstance;
  compact?: boolean;
}

/**
 * Safe Display Component
 * 
 * Shows Safe information in dashboard or detail view
 */
export function SafeDisplay({ instance, compact = false }: SafeDisplayProps) {
  const config = instance.config as unknown as SafeModuleConfig;
  const deployment = instance.deploymentInfo;
  const status = instance.status;

  if (compact) {
    return (
      <div className="safe-display compact">
        <div className="safe-header">
          <div className="safe-icon">🔒</div>
          <div className="safe-info">
            <div className="safe-name">Gnosis Safe</div>
            {deployment?.address && (
              <div className="safe-address">{formatAddress(deployment.address)}</div>
            )}
          </div>
          <div className={`safe-status ${status}`}>{status}</div>
        </div>
        <div className="safe-config">
          <span className="config-item">
            {config.threshold}/{config.signers?.length || 0} signatures
          </span>
          <span className="config-item">{config.chain}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="safe-display full">
      <div className="safe-header">
        <h2>Gnosis Safe</h2>
        <div className={`status-badge ${status}`}>{status}</div>
      </div>

      {deployment?.address && (
        <div className="safe-section">
          <h3>Address</h3>
          <div className="address-display">
            <code>{deployment.address}</code>
            <button
              onClick={() => navigator.clipboard.writeText(deployment.address!)}
              className="copy-btn"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      <div className="safe-section">
        <h3>Configuration</h3>
        <div className="config-grid">
          <div className="config-item">
            <label>Signers:</label>
            <span>{config.signers?.length || 0}</span>
          </div>
          <div className="config-item">
            <label>Threshold:</label>
            <span>
              {config.threshold}/{config.signers?.length || 0}
            </span>
          </div>
          <div className="config-item">
            <label>Network:</label>
            <span>{config.chain}</span>
          </div>
        </div>
      </div>

      {config.signers && config.signers.length > 0 && (
        <div className="safe-section">
          <h3>Signers</h3>
          <div className="signers-list">
            {config.signers.map((signer: string, index: number) => (
              <div key={index} className="signer-item">
                <span className="signer-index">{index + 1}</span>
                <code className="signer-address">{formatAddress(signer)}</code>
              </div>
            ))}
          </div>
        </div>
      )}

      {deployment && (
        <div className="safe-section">
          <h3>Deployment Info</h3>
          <div className="deployment-info">
            {deployment.transactionHash && (
              <div className="info-item">
                <label>Transaction:</label>
                <code>{formatAddress(deployment.transactionHash)}</code>
              </div>
            )}
            {deployment.deployedAt && (
              <div className="info-item">
                <label>Deployed:</label>
                <span>{new Date(deployment.deployedAt).toLocaleString()}</span>
              </div>
            )}
            {deployment.deployedBy && (
              <div className="info-item">
                <label>Deployed By:</label>
                <code>{formatAddress(deployment.deployedBy)}</code>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
