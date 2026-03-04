import type { SafeModuleConfig } from './types';
import { CHAIN_IDS } from './types';

/**
 * Safe Configuration Helper
 */
export class SafeConfig {
  /**
   * Validate Safe configuration
   */
  static validate(config: SafeModuleConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate signers
    if (!config.signers || config.signers.length === 0) {
      errors.push('At least one signer is required');
    }

    if (config.signers && config.signers.length > 20) {
      errors.push('Maximum 20 signers allowed');
    }

    // Validate addresses
    if (config.signers) {
      config.signers.forEach((signer, index) => {
        if (!/^0x[a-fA-F0-9]{40}$/.test(signer)) {
          errors.push(`Invalid address at index ${index}: ${signer}`);
        }
      });

      // Check for duplicates
      const uniqueSigners = new Set(config.signers.map(s => s.toLowerCase()));
      if (uniqueSigners.size !== config.signers.length) {
        errors.push('Duplicate signers detected');
      }
    }

    // Validate threshold
    if (!config.threshold || config.threshold < 1) {
      errors.push('Threshold must be at least 1');
    }

    if (config.signers && config.threshold > config.signers.length) {
      errors.push('Threshold cannot exceed number of signers');
    }

    // Validate chain
    if (!config.chain || !CHAIN_IDS[config.chain]) {
      errors.push(`Invalid chain: ${config.chain}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get chain ID from chain name
   */
  static getChainId(chain: SafeModuleConfig['chain']): number {
    return CHAIN_IDS[chain];
  }

  /**
   * Estimate gas for Safe deployment
   */
  static estimateDeploymentGas(config: SafeModuleConfig): bigint {
    // Base deployment cost + per-signer cost
    const baseGas = 150000n;
    const perSignerGas = 5000n;
    return baseGas + (BigInt(config.signers.length) * perSignerGas);
  }

  /**
   * Generate recommended configurations
   */
  static getRecommendedConfig(
    scenario: 'personal' | 'small-team' | 'core-team' | 'large-dao'
  ): Partial<SafeModuleConfig> {
    switch (scenario) {
      case 'personal':
        return {
          threshold: 1,
          chain: 'optimism', // Lower gas costs
        };
      
      case 'small-team':
        return {
          threshold: 2,
          chain: 'optimism',
        };
      
      case 'core-team':
        return {
          threshold: 3,
          chain: 'ethereum',
        };
      
      case 'large-dao':
        return {
          threshold: 5,
          chain: 'ethereum',
        };
    }
  }
}
