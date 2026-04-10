import type { DbClient } from '../../../shared/client.js'

export function signInWithPassword(client: DbClient, email: string, password: string) {
  return client.auth.signInWithPassword({ email, password })
}
