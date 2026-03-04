import { z } from 'zod';
import { ModuleInstanceSchema } from './module';

export const DAOIdentitySchema = z.object({
  name: z.string(),
  description: z.string(),
  daoURI: z.string().url(),
  membersURI: z.string().url().optional(),
  proposalsURI: z.string().url().optional(),
  activityLogURI: z.string().url().optional(),
  governanceURI: z.string().url().optional(),
  contractsURI: z.array(z.string().url()).optional(),
});

export const DAOConfigSchema = z.object({
  identity: DAOIdentitySchema,
  modules: z.array(ModuleInstanceSchema),
  theme: z.enum(['functional', 'daocore']).optional(),
  defaultTheme: z.enum(['functional', 'daocore']).optional(),
  allowThemeSwitch: z.boolean().optional(),
  customization: z
    .object({
      primaryColor: z.string().optional(),
      logo: z.string().optional(),
      banner: z.string().optional(),
    })
    .optional(),
});

export const DAOStateSchema = z.enum([
  'formation',
  'growth',
  'stable',
  'decline',
  'transition',
]);

export const MilestoneSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  amount: z.number(),
  dueDate: z.number(),
  status: z.enum(['pending', 'in_progress', 'completed', 'overdue']),
});

export const GrantSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.enum(['draft', 'active', 'completed', 'cancelled']),
  recipient: z.string(),
  startDate: z.number(),
  endDate: z.number().optional(),
  milestones: z.array(MilestoneSchema).optional(),
});

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.enum(['planning', 'in_progress', 'completed', 'archived']),
  budget: z.number(),
  spent: z.number(),
  team: z.array(z.string()),
  startDate: z.number(),
  endDate: z.number().optional(),
});

export const PermissionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  scope: z.string(),
});

export const RoleSchema = z.object({
  id: z.string(),
  name: z.string(),
  permissions: z.array(PermissionSchema),
  wearers: z.array(z.string()).optional(),
});

export const MemberSchema = z.object({
  address: z.string(),
  roles: z.array(RoleSchema),
  joinedAt: z.number(),
  votingPower: z.number().optional(),
  hats: z.array(z.string()).optional(),
});

export const DAOBlueprintSchema = z.object({
  version: z.string(),
  name: z.string(),
  description: z.string(),
  modules: z.array(
    z.object({
      moduleId: z.string(),
      config: z.record(z.unknown()),
    })
  ),
  connections: z.array(
    z.object({
      source: z.string(),
      target: z.string(),
      type: z.string(),
    })
  ),
  metadata: z.object({
    createdAt: z.number(),
    createdBy: z.string(),
    tags: z.array(z.string()),
  }),
});
