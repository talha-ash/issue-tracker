import type { User, Session, ActionState } from '@issue-tracker/backend/shared';

export type SignupInput = {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignupFieldErrors = {
  fullname?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
};

export type SignupValues = {
  fullname?: string;
  email?: string;
};

export type SignupState = ActionState<
  { user: User; session: Session },
  SignupFieldErrors,
  SignupValues
>;
