export type ActionState<
  TData = unknown,
  TErrors extends Record<string, string[] | undefined> = Record<string, never>,
  TValues = unknown,
> =
  | { success: false; errors: TErrors; message: string; values?: TValues }
  | { success: true; message?: string; data?: TData; values?: TValues };
