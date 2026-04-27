import type { Project } from '../types.js';
import type { ActionState } from '@issue-tracker/repo/shared';

export type CreateProjectInput = Omit<
  Project,
  'id' | 'created_at' | 'updated_at' | 'owner_id' | 'description'
> & { description: string };

export type CreateProjectFieldErrors = {
  name?: string[];
  key?: string[];
  description?: string[];
  visibility?: string[];
};

export type CreateProjectValues = {
  name?: string;
  key?: string;
  description?: string;
  visibility?: Project['visibility'];
};

export type CreateProjectState = ActionState<
  Project,
  CreateProjectFieldErrors,
  CreateProjectValues
>;
