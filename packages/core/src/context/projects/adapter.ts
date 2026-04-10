import { err, ok } from 'neverthrow'
import type { DbClient } from '../../shared/client.js'

export async function fetchProjects(client: DbClient) {
  const { data, error } = await client.from('projects').select()
  if (error) return err({ error })
  return ok(data)
}
