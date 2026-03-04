/**
 * Gnosis Safe Module Types
 */

export interface SafeModuleConfig {
  signers: string[];
  threshold: number;
  chain: 'ethereum' | 'optimism' | 'gnosis' | 'polygon' | 'base' | 'arbitrum';
  saltNonce?: string;
}

export interface SafeInfo {
  address: string;
  owners: string[];
  threshold: number;
  nonce: number;
  version: string;
  modules: string[];
}

export interface SafeBalance {
  tokenAddress: string | null; // null for native token
  token: {
    name: string;
    symbol: string;
    decimals: number;
    logoUri?: string;
  };
  balance: string;
  fiatBalance: string;
  fiatConversion: string;
}

export interface SafeTransaction {
  to: string;
  value: string;
  data: string;
  operation: 0 | 1; // 0 = CALL, 1 = DELEGATECALL
  safeTxGas: string;
  baseGas: string;
  gasPrice: string;
  gasToken: string;
  refundReceiver: string;
  nonce: number;
}

export interface SafeSignature {
  signer: string;
  data: string;
  submittedAt: number;
}

export interface SafeMultisigTransaction {
  safe: string;
  to: string;
  value: string;
  data: string;
  operation: 0 | 1;
  gasToken: string;
  safeTxGas: number;
  baseGas: number;
  gasPrice: string;
  refundReceiver: string | null;
  nonce: number;
  executionDate: string | null;
  submissionDate: string;
  modified: string;
  blockNumber: number | null;
  transactionHash: string | null;
  safeTxHash: string;
  proposer: string;
  executor: string | null;
  isExecuted: boolean;
  isSuccessful: boolean | null;
  ethGasPrice: string | null;
  maxFeePerGas: string | null;
  maxPriorityFeePerGas: string | null;
  gasUsed: number | null;
  fee: string | null;
  origin: string | null;
  dataDecoded: any | null;
  confirmationsRequired: number;
  confirmations: SafeSignature[];
  trusted: boolean;
  signatures: string | null;
}

export const CHAIN_IDS = {
  ethereum: 1,
  optimism: 10,
  gnosis: 100,
  polygon: 137,
  base: 8453,
  arbitrum: 42161,
} as const;

export const SAFE_API_URLS = {
  ethereum: 'https://safe-transaction-mainnet.safe.global',
  optimism: 'https://safe-transaction-optimism.safe.global',
  gnosis: 'https://safe-transaction-gnosis-chain.safe.global',
  polygon: 'https://safe-transaction-polygon.safe.global',
  base: 'https://safe-transaction-base.safe.global',
  arbitrum: 'https://safe-transaction-arbitrum.safe.global',
} as const;
