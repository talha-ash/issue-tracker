import type { Session, User } from '@supabase/supabase-js'
import type { ActionState } from '../../../shared/action-state.js'

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

export type LoginState = ActionState<{ user: User; session: Session }, LoginFieldErrors, LoginValues>
