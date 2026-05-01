import type { Tables } from '@issue-tracker/backend/shared';

export type Project = Tables<'projects'>;

export type ProjectVisibility = Project['visibility'];
