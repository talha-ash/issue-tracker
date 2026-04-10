import type { DbClient } from '../../../shared/client.js'

export function signUp(client: DbClient, email: string, password: string, fullname: string) {
  return client.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: fullname },
    },
  })
}
