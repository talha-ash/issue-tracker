import { ok } from 'neverthrow'
import type { ActionState } from '@issue-tracker/repo/shared'

export function success<
  TData,
  TErrors extends Record<string, string[] | undefined> = Record<string, never>,
  TValues = never,
>(
  data?: TData,
  message?: string,
  errors: TErrors = {} as TErrors,
) {
  return ok({ success: true, data, message, errors } as ActionState<TData, TErrors, TValues> & { success: true })
}

export function fail<
  TErrors extends Record<string, string[] | undefined>,
  TValues = never,
>(
  errors: TErrors,
  message: string,
  values?: TValues,
): ActionState<never, TErrors, TValues> {
  if (values !== undefined) {
    return { success: false, errors, message, values }
  }
  return { success: false, errors, message }
}
