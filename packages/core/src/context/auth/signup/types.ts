import type { Session, User } from '@supabase/supabase-js'

export type SignupInput = {
  fullname: string
  email: string
  password: string
  confirmPassword: string
}

export type SignupFieldErrors = {
  fullname?: string[]
  email?: string[]
  password?: string[]
  confirmPassword?: string[]
}

export type SignupValues = {
  fullname?: string
  email?: string
}

export type SignupState =
  | {
      success: false
      errors: SignupFieldErrors
      message: string
      values?: SignupValues
    }
  | {
      success: true
      errors: SignupFieldErrors
      message: string
      data: { user: User; session: Session }
      values?: SignupValues
    }
