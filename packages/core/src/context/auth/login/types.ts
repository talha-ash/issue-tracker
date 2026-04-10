import type { Session, User } from '@supabase/supabase-js'

export type LoginInput = {
  email: string
  password: string
}

export type LoginFieldErrors = {
  email?: string[]
  password?: string[]
}

export type LoginValues = {
  email?: string
}

export type LoginState =
  | {
      success: false
      errors: LoginFieldErrors
      message: string
      values?: LoginValues
    }
  | {
      success: true
      errors: LoginFieldErrors
      message: string
      data: { user: User; session: Session }
      values?: LoginValues
    }
