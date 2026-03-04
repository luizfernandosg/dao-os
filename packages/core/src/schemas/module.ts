import { z } from 'zod';

export const ModuleCategorySchema = z.enum([
  'treasury',
  'governance',
  'funding',
  'identity',
  'coordination',
  'dao2dao',
]);

export const ModuleStatusSchema = z.enum([
  'designed',
  'configured',
  'deployed',
  'active',
  'archived',
]);

export const ConnectorTypeSchema = z.enum(['onchain', 'api', 'manual']);

export const ChainSchema = z.object({
  id: z.number(),
  name: z.string(),
  network: z.string(),
  rpcUrl: z.string().optional(),
  explorerUrl: z.string().optional(),
});

export const APIEndpointSchema = z.object({
  url: z.string().url(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  auth: z
    .object({
      type: z.enum(['bearer', 'api-key', 'oauth']),
      config: z.record(z.unknown()),
    })
    .optional(),
});

export const ContractInfoSchema = z.object({
  address: z.string(),
  abi: z.array(z.unknown()),
  chainId: z.number(),
  deployedAt: z.number().optional(),
});

export const PrerequisiteSchema = z.object({
  type: z.enum(['module', 'contract', 'account', 'permission']),
  description: z.string(),
  moduleId: z.string().optional(),
  required: z.boolean(),
});

export const ExampleSchema = z.object({
  name: z.string(),
  description: z.string(),
  config: z.record(z.unknown()),
  useCases: z.array(z.string()),
});

export const TutorialStepSchema = z.object({
  title: z.string(),
  content: z.string(),
  codeExample: z.string().optional(),
});

export const TutorialSchema = z.object({
  title: z.string(),
  description: z.string(),
  steps: z.array(TutorialStepSchema),
  estimatedTime: z.number(),
});

export const IntegrationSchema = z.object({
  targetModule: z.string(),
  type: z.enum(['required', 'optional', 'recommended']),
  description: z.string(),
});

export const DAOModuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: ModuleCategorySchema,
  description: z.string(),
  provider: z.string(),
  version: z.string(),
  icon: z.string(),
  color: z.string(),
  connectorType: ConnectorTypeSchema,
  networks: z.array(ChainSchema),
  apis: z.array(APIEndpointSchema),
  contracts: z.array(ContractInfoSchema).optional(),
  configSchema: z.record(z.unknown()),
  defaultConfig: z.record(z.unknown()),
  dependencies: z.array(z.string()),
  prerequisites: z.array(PrerequisiteSchema),
  documentation: z.string(),
  examples: z.array(ExampleSchema),
  tutorials: z.array(TutorialSchema),
  standards: z.array(z.string()),
  integrations: z.array(IntegrationSchema),
});

export const ConnectionTypeSchema = z.enum([
  'capital-flow',
  'permission',
  'data-sync',
  'trigger',
  'governance',
]);

export const ConnectionSchema = z.object({
  id: z.string(),
  sourceId: z.string(),
  targetId: z.string(),
  type: ConnectionTypeSchema,
  data: z.record(z.unknown()).optional(),
});

export const DeploymentInfoSchema = z.object({
  address: z.string().optional(),
  transactionHash: z.string().optional(),
  chainId: z.number().optional(),
  deployedAt: z.number(),
  deployedBy: z.string(),
  gasUsed: z.string().optional(),
});

export const ModuleInstanceSchema = z.object({
  instanceId: z.string(),
  moduleId: z.string(),
  config: z.record(z.unknown()),
  status: ModuleStatusSchema,
  deploymentInfo: DeploymentInfoSchema.optional(),
  connections: z.array(ConnectionSchema),
  createdAt: z.number(),
  updatedAt: z.number(),
});
