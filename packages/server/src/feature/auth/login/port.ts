import type { Result } from 'neverthrow';
import type { Session, User } from '@issue-tracker/backend/shared';

export type AuthSignInPort = {
  signIn(
    email: string,
    password: string
  ): Promise<Result<{ user: User; session: Session }, { message: string }>>;
};
