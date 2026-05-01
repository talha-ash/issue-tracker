import type { User, Session, ActionState } from '@issue-tracker/backend/shared';

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginFieldErrors = {
  email?: string[];
  password?: string[];
};

export type LoginValues = {
  email?: string;
};

export type LoginState = ActionState<
  { user: User; session: Session },
  LoginFieldErrors,
  LoginValues
>;
