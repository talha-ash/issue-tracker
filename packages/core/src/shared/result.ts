import type { ActionState } from './action-state.js'

export function ok<
  TData,
  TErrors extends Record<string, string[] | undefined> = Record<string, never>,
  TValues = never,
>(
  data: TData,
  message: string,
  errors: TErrors = {} as TErrors,
): ActionState<TData, TErrors, TValues> {
  return { success: true, data, message, errors }
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
