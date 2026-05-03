import { err, ok } from 'neverthrow';
import type { DbClient } from '../shared/client.js';
import type { TablesInsert } from '../shared/database.types.js';

export function createProjectsCtx(client: DbClient) {
  return {
    async fetchProjects() {
      const { data, error } = await client.from('projects').select();
      if (error) return err({ error });
      return ok(data);
    },
    async fetchActiveProjects() {
      const { data, error } = await client
        .from('projects')
        .select()
        .eq('visibility', 'public');
      if (error) return err({ error });
      return ok(data);
    },
    async createProject(payload: TablesInsert<'projects'>) {
      const { data, error } = await client
        .from('projects')
        .insert(payload)
        .select()
        .single();
      if (error) return err({ error });
      return ok(data);
    },
  };
}
