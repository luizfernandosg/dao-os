import type { Node, Edge } from 'reactflow';

interface ValidationPanelProps {
  nodes: Node[];
  edges: Edge[];
}

export function ValidationPanel({ nodes, edges }: ValidationPanelProps) {
  const issues = validateArchitecture(nodes, edges);
  const hasIssues = issues.length > 0;

  return (
    <div className={`validation-panel ${hasIssues ? 'has-issues' : 'valid'}`}>
      <div className="validation-header">
        <span className="validation-icon">
          {hasIssues ? '⚠️' : '✓'}
        </span>
        <span className="validation-title">
          {hasIssues ? 'Architecture Issues' : 'Architecture Valid'}
        </span>
      </div>

      {hasIssues && (
        <div className="validation-issues">
          {issues.map((issue, index) => (
            <div key={index} className={`issue ${issue.severity}`}>
              <div className="issue-message">{issue.message}</div>
              {issue.suggestion && (
                <div className="issue-suggestion">{issue.suggestion}</div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="validation-stats">
        <div className="stat">
          <span className="stat-label">Modules:</span>
          <span className="stat-value">{nodes.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Connections:</span>
          <span className="stat-value">{edges.length}</span>
        </div>
      </div>
    </div>
  );
}

interface ValidationIssue {
  message: string;
  severity: 'error' | 'warning';
  suggestion?: string;
}

function validateArchitecture(nodes: Node[], edges: Edge[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Check for at least one treasury module
  const hasTreasury = nodes.some((node) =>
    node.data?.instance?.moduleId?.includes('safe')
  );

  if (!hasTreasury && nodes.length > 0) {
    issues.push({
      message: 'No treasury module found',
      severity: 'warning',
      suggestion: 'Add a Gnosis Safe or other treasury module',
    });
  }

  // Check for isolated nodes
  const connectedNodeIds = new Set<string>();
  edges.forEach((edge) => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  const isolatedNodes = nodes.filter(
    (node) => !connectedNodeIds.has(node.id) && nodes.length > 1
  );

  if (isolatedNodes.length > 0) {
    issues.push({
      message: `${isolatedNodes.length} isolated module(s)`,
      severity: 'warning',
      suggestion: 'Connect all modules to show relationships',
    });
  }

  // Check for circular dependencies
  // (Simplified check - in production would use proper graph algorithms)
  if (edges.length > nodes.length) {
    issues.push({
      message: 'Possible circular dependencies detected',
      severity: 'warning',
      suggestion: 'Review module connections',
    });
  }

  return issues;
}
