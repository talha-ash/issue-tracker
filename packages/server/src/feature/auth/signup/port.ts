import type { Result } from 'neverthrow';
import type { Session, User } from '@issue-tracker/backend/shared';

export type AuthSignUpPort = {
  signUp(
    email: string,
    password: string,
    fullname: string
  ): Promise<Result<{ user: User; session: Session }, { message: string }>>;
};
