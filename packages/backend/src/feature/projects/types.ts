import type { Tables } from '@issue-tracker/repo/shared';

export type Project = Tables<'projects'>;

export type ProjectVisibility = Project['visibility'];
