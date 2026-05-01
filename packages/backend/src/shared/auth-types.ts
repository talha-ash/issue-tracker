export type User = {
  id: string;
  email?: string;
};

export type Session = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: User;
};
