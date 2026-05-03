import type { Result } from 'neverthrow';
import type { User, TablesInsert, Tables } from '@issue-tracker/backend/shared';

export type Project = Tables<'projects'>;

export type AuthGetCurrentUserPort = {
  getCurrentUser(): Promise<Result<User, { message: string }>>;
};

export type ProjectsCreatePort = {
  createProject(
    payload: TablesInsert<'projects'>
  ): Promise<Result<Project, { error: { message: string } }>>;
};
