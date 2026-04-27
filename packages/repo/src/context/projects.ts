import { err, ok } from 'neverthrow';
import type { DbClient } from '../shared/client.js';
import type { TablesInsert } from '../shared/database.types.js';

export async function fetchProjects(client: DbClient) {
  const { data, error } = await client.from('projects').select();
  if (error) return err({ error });
  return ok(data);
}

export async function createProject(
  client: DbClient,
  payload: TablesInsert<'projects'>
) {
  const { data, error } = await client
    .from('projects')
    .insert(payload)
    .select()
    .single();
  if (error) return err({ error });
  return ok(data);
}
