import { Handle, Position, type NodeProps } from 'reactflow';

// Simplified formatters for now
const formatAddress = (address: string): string => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const formatCurrency = (amount: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
};

/**
 * Safe React Flow Node
 * 
 * Visual representation in the DAO composer
 */
export function SafeNode({ data }: NodeProps) {
  const { instance, status } = data;
  const config = instance.config;
  const deployment = instance.deploymentInfo;

  return (
    <div className="module-node safe-node" data-status={status}>
      <Handle type="target" position={Position.Top} className="handle-input" />

      <div className="node-header">
        <div className="node-icon">🔒</div>
        <div className="node-title">
          <div className="node-type">GNOSIS SAFE</div>
          <div className="node-status">
            <span className={`status-indicator ${status}`}>●</span>
            {status}
          </div>
        </div>
      </div>

      <div className="node-body">
        {deployment?.address ? (
          <div className="deployment-info">
            <div className="info-row">
              <span className="label">Address:</span>
              <code className="value">{formatAddress(deployment.address)}</code>
            </div>
            {deployment.balance !== undefined && (
              <div className="info-row balance">
                <span className="label">Balance:</span>
                <span className="value">{formatCurrency(deployment.balance)} ETH</span>
              </div>
            )}
          </div>
        ) : (
          <div className="config-info">
            <div className="info-row">
              <span className="label">Signers:</span>
              <span className="value">{config.signers?.length || 0}</span>
            </div>
            <div className="info-row">
              <span className="label">Threshold:</span>
              <span className="value">
                {config.threshold}/{config.signers?.length || 0}
              </span>
            </div>
            <div className="info-row">
              <span className="label">Chain:</span>
              <span className="value">{config.chain}</span>
            </div>
          </div>
        )}
      </div>

      {data.metrics && (
        <div className="node-metrics">
          <div className="metric">
            <span className="metric-label">Activity:</span>
            <div className="metric-bar">
              <div
                className="metric-fill"
                style={{ width: `${data.metrics.activity * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="handle-output" />
    </div>
  );
}
