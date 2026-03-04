import type { Node } from 'reactflow';

interface ConfigurationPanelProps {
  node: Node;
  onClose: () => void;
}

export function ConfigurationPanel({ node, onClose }: ConfigurationPanelProps) {
  return (
    <aside className="configuration-panel">
      <div className="panel-header">
        <h2>Configure Module</h2>
        <button onClick={onClose} className="close-btn">
          ×
        </button>
      </div>

      <div className="panel-body">
        <div className="module-info">
          <h3>{node.data?.instance?.moduleId || 'Module'}</h3>
          <div className="status-badge">{node.data?.status || 'designed'}</div>
        </div>

        <div className="config-form">
          {/* Configuration form will be rendered here based on module type */}
          <p className="placeholder">
            Configuration UI for {node.data?.instance?.moduleId}
          </p>
        </div>
      </div>

      <div className="panel-footer">
        <button className="btn-secondary" onClick={onClose}>
          Cancel
        </button>
        <button className="btn-primary">Save</button>
      </div>
    </aside>
  );
}
