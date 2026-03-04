import { useState, useEffect } from 'react';
import type { SafeModuleConfig } from '../types';
import { SafeConfig } from '../config';

interface SafeConfigComponentProps {
  config: SafeModuleConfig;
  onChange: (config: SafeModuleConfig) => void;
  onValidate: (valid: boolean) => void;
}

/**
 * Safe Configuration Component
 * 
 * UI for configuring a Gnosis Safe module
 */
export function SafeConfigComponent({
  config,
  onChange,
  onValidate,
}: SafeConfigComponentProps) {
  const [signers, setSigners] = useState<string[]>(config.signers || ['']);
  const [threshold, setThreshold] = useState<number>(config.threshold || 1);
  const [chain, setChain] = useState<SafeModuleConfig['chain']>(config.chain || 'optimism');
  const [errors, setErrors] = useState<string[]>([]);

  // Validate on changes
  useEffect(() => {
    const newConfig: SafeModuleConfig = {
      signers: signers.filter(s => s.trim() !== ''),
      threshold,
      chain,
    };

    const validation = SafeConfig.validate(newConfig);
    setErrors(validation.errors);
    onValidate(validation.valid);

    if (validation.valid) {
      onChange(newConfig);
    }
  }, [signers, threshold, chain, onChange, onValidate]);

  const addSigner = () => {
    setSigners([...signers, '']);
  };

  const removeSigner = (index: number) => {
    const newSigners = signers.filter((_, i) => i !== index);
    setSigners(newSigners.length > 0 ? newSigners : ['']);
  };

  const updateSigner = (index: number, value: string) => {
    const newSigners = [...signers];
    newSigners[index] = value;
    setSigners(newSigners);
  };

  const loadRecommended = (scenario: 'personal' | 'small-team' | 'core-team' | 'large-dao') => {
    const recommended = SafeConfig.getRecommendedConfig(scenario);
    if (recommended.threshold) setThreshold(recommended.threshold);
    if (recommended.chain) setChain(recommended.chain);
  };

  return (
    <div className="safe-config">
      <div className="config-section">
        <h3>Recommended Configurations</h3>
        <div className="quick-configs">
          <button onClick={() => loadRecommended('personal')}>Personal</button>
          <button onClick={() => loadRecommended('small-team')}>Small Team</button>
          <button onClick={() => loadRecommended('core-team')}>Core Team</button>
          <button onClick={() => loadRecommended('large-dao')}>Large DAO</button>
        </div>
      </div>

      <div className="config-section">
        <h3>Signers</h3>
        <p className="help-text">Ethereum addresses that can sign transactions</p>
        {signers.map((signer, index) => (
          <div key={index} className="signer-row">
            <input
              type="text"
              value={signer}
              onChange={(e) => updateSigner(index, e.target.value)}
              placeholder="0x..."
              className="address-input"
            />
            {signers.length > 1 && (
              <button onClick={() => removeSigner(index)} className="remove-btn">
                Remove
              </button>
            )}
          </div>
        ))}
        <button onClick={addSigner} className="add-btn">
          + Add Signer
        </button>
      </div>

      <div className="config-section">
        <h3>Threshold</h3>
        <p className="help-text">Number of signatures required to execute transactions</p>
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(parseInt(e.target.value) || 1)}
          min={1}
          max={signers.filter(s => s.trim() !== '').length}
          className="threshold-input"
        />
        <div className="threshold-display">
          {threshold} of {signers.filter(s => s.trim() !== '').length} signatures required
        </div>
      </div>

      <div className="config-section">
        <h3>Network</h3>
        <p className="help-text">Blockchain network for deployment</p>
        <select
          value={chain}
          onChange={(e) => setChain(e.target.value as SafeModuleConfig['chain'])}
          className="chain-select"
        >
          <option value="ethereum">Ethereum</option>
          <option value="optimism">Optimism (recommended for lower gas)</option>
          <option value="gnosis">Gnosis</option>
          <option value="polygon">Polygon</option>
          <option value="base">Base</option>
          <option value="arbitrum">Arbitrum</option>
        </select>
      </div>

      {errors.length > 0 && (
        <div className="errors">
          <h4>Configuration Errors:</h4>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="config-summary">
        <h4>Estimated Deployment Gas:</h4>
        <p>{SafeConfig.estimateDeploymentGas({ signers: signers.filter(s => s.trim()), threshold, chain }).toString()} gas units</p>
      </div>
    </div>
  );
}
