import type { Result } from 'neverthrow';
import type { Tables } from '@issue-tracker/backend/shared';

export type Project = Tables<'projects'>;

export type ProjectsFetchActivePort = {
  fetchActiveProjects(): Promise<
    Result<Project[], { error: { message: string } }>
  >;
};
