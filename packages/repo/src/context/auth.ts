import type { DbClient } from '../shared/client.js';

export function signIn(client: DbClient, email: string, password: string) {
  return client.auth.signInWithPassword({ email, password });
}

export function signUp(
  client: DbClient,
  email: string,
  password: string,
  fullname: string
) {
  return client.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: fullname },
    },
  });
}

export function signOut(client: DbClient) {
  return client.auth.signOut();
}
