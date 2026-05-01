import { err, ok } from 'neverthrow';
import type { DbClient } from '../shared/client.js';
import type { Session, User } from '../shared/auth-types.js';

type SupabaseUser = NonNullable<
  Awaited<ReturnType<DbClient['auth']['getUser']>>['data']['user']
>;
type SupabaseSession = NonNullable<
  Awaited<ReturnType<DbClient['auth']['signInWithPassword']>>['data']['session']
>;

function mapUser(u: SupabaseUser): User {
  return {
    id: u.id,
    ...(u.email !== undefined && { email: u.email }),
  };
}

function mapSession(u: SupabaseUser, s: SupabaseSession): Session {
  return {
    access_token: s.access_token,
    refresh_token: s.refresh_token,
    expires_in: s.expires_in,
    user: mapUser(u),
  };
}

export async function signIn(
  client: DbClient,
  email: string,
  password: string
) {
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return err({ message: error.message });
  return ok({
    user: mapUser(data.user),
    session: mapSession(data.user, data.session),
  });
}

export async function signUp(
  client: DbClient,
  email: string,
  password: string,
  fullname: string
) {
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: { data: { first_name: fullname } },
  });
  if (error) return err({ message: error.message });
  if (!data.user || !data.session)
    return err({ message: 'Sign up failed — confirm your email' });
  return ok({
    user: mapUser(data.user),
    session: mapSession(data.user, data.session),
  });
}

export async function signOut(client: DbClient) {
  return client.auth.signOut();
}

export async function getCurrentUser(client: DbClient) {
  const { data } = await client.auth.getUser();
  if (!data.user) return err({ message: 'Not authenticated' });
  return ok(mapUser(data.user));
}
