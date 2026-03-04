/**
 * Constants used across DAO OS
 */

/**
 * Supported Chains
 */
export const SUPPORTED_CHAINS = {
  ETHEREUM: {
    id: 1,
    name: 'Ethereum',
    network: 'mainnet',
    rpcUrl: 'https://eth.llamarpc.com',
    explorerUrl: 'https://etherscan.io',
  },
  OPTIMISM: {
    id: 10,
    name: 'Optimism',
    network: 'optimism',
    rpcUrl: 'https://mainnet.optimism.io',
    explorerUrl: 'https://optimistic.etherscan.io',
  },
  GNOSIS: {
    id: 100,
    name: 'Gnosis',
    network: 'gnosis',
    rpcUrl: 'https://rpc.gnosischain.com',
    explorerUrl: 'https://gnosisscan.io',
  },
  POLYGON: {
    id: 137,
    name: 'Polygon',
    network: 'polygon',
    rpcUrl: 'https://polygon-rpc.com',
    explorerUrl: 'https://polygonscan.com',
  },
  BASE: {
    id: 8453,
    name: 'Base',
    network: 'base',
    rpcUrl: 'https://mainnet.base.org',
    explorerUrl: 'https://basescan.org',
  },
  ARBITRUM: {
    id: 42161,
    name: 'Arbitrum',
    network: 'arbitrum',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    explorerUrl: 'https://arbiscan.io',
  },
  CELO: {
    id: 42220,
    name: 'Celo',
    network: 'celo',
    rpcUrl: 'https://forno.celo.org',
    explorerUrl: 'https://celoscan.io',
  },
} as const;

/**
 * Module Categories
 */
export const MODULE_CATEGORIES = {
  TREASURY: 'treasury',
  GOVERNANCE: 'governance',
  FUNDING: 'funding',
  IDENTITY: 'identity',
  COORDINATION: 'coordination',
  DAO2DAO: 'dao2dao',
} as const;

/**
 * Module Status
 */
export const MODULE_STATUS = {
  DESIGNED: 'designed',
  CONFIGURED: 'configured',
  DEPLOYED: 'deployed',
  ACTIVE: 'active',
  ARCHIVED: 'archived',
} as const;

/**
 * DAO States
 */
export const DAO_STATES = {
  FORMATION: 'formation',
  GROWTH: 'growth',
  STABLE: 'stable',
  DECLINE: 'decline',
  TRANSITION: 'transition',
} as const;

/**
 * Theme Options
 */
export const THEMES = {
  FUNCTIONAL: 'functional',
  DAOCORE: 'daocore',
} as const;

/**
 * Standards
 */
export const STANDARDS = {
  EIP_4824: 'EIP-4824', // DAO Identity
  DAOIP_5: 'DAOIP-5', // Grant Pools
  EIP_1271: 'EIP-1271', // Smart Contract Signatures
  ERC_1155: 'ERC-1155', // Multi Token Standard
  ERC_20: 'ERC-20', // Fungible Token Standard
  ERC_721: 'ERC-721', // NFT Standard
} as const;

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  SAFE_API: 'https://safe-transaction-mainnet.safe.global',
  OPENGRANTS: process.env.OPENGRANTS_API_URL || 'https://api.opengrants.org',
  SNAPSHOT: 'https://hub.snapshot.org/graphql',
} as const;

/**
 * Default Configuration
 */
export const DEFAULTS = {
  THEME: THEMES.FUNCTIONAL,
  ALLOW_THEME_SWITCH: true,
  ANIMATION_SPEED: 0.5,
  SHOW_LABELS: true,
  SHOW_METRICS: true,
} as const;

/**
 * Validation Limits
 */
export const LIMITS = {
  MAX_MODULES: 50,
  MAX_CONNECTIONS: 200,
  MAX_SIGNERS: 20,
  MIN_THRESHOLD: 1,
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
} as const;

/**
 * Time Windows (in seconds)
 */
export const TIME_WINDOWS = {
  DAY: 86400,
  WEEK: 604800,
  MONTH: 2592000,
  YEAR: 31536000,
} as const;
