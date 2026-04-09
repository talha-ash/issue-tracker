'use server'

import { createServerSupabaseClient } from '@/lib/apiClient/server'
import { Session, User } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import * as v from 'valibot'

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

export type SignupState = {
    success: false
    errors: SignupFieldErrors
    message: string
    values?: SignupValues
} |
{
    success: true
    message: string
    errors: SignupFieldErrors
    data: {
        user: User,
        session: Session
    },
    values?: SignupValues
}

export type LoginFieldErrors = {
    email?: string[]
    password?: string[]
}

export type LoginValues = {
    email?: string
}

export type LoginState = {
    success: false
    errors: LoginFieldErrors
    message: string
    values?: LoginValues
} |
{
    success: true
    message: string
    errors: LoginFieldErrors
    data: {
        user: User,
        session: Session
    },
    values?: LoginValues
}

const SignupSchema = v.pipe(
    v.object({
        fullname: v.pipe(
            v.string('Full name is required'),
            v.trim(),
            v.minLength(2, 'Full name is too short'),
        ),
        email: v.pipe(
            v.string('Email is required'),
            v.trim(),
            v.email('Please enter a valid email'),
        ),
        password: v.pipe(
            v.string('Password is required'),
            v.minLength(8, 'Password must be at least 8 characters'),
        ),
        confirmPassword: v.string('Please confirm your password'),
    }),
    v.forward(
        v.partialCheck(
            [['password'], ['confirmPassword']],
            (input) => input.password === input.confirmPassword,
            'Passwords do not match',
        ),
        ['confirmPassword'],
    ),
)

export async function signupAction(
    _prev: SignupState,
    formData: FormData,
): Promise<SignupState> {
    const input = {
        fullname: formData.get('fullname') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    }

    const result = v.safeParse(SignupSchema, input)
    if (!result.success) {
        const flat = v.flatten<typeof SignupSchema>(result.issues)
        return {
            success: false,
            errors: (flat.nested ?? {}) as SignupFieldErrors,
            message: 'Please fix the errors',
            values: {
                fullname: input.fullname,
                email: input.email
            },
        }
    }

    // TODO: implement actual sign up via Supabase
    // const { fullname, email, password } = result.output

    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase.auth.signUp({
        email: input.email,
        password: input.password,
        options: {
            data: {
                first_name: input.fullname,

            }
        }

    })

    console.log("Error", error)
    console.log("data", data)
    if (data.user) {
        return {
            success: true,
            errors: {},
            message: 'Signup successful! Please check your email to confirm your account.',
            data: data as { user: User, session: Session }
        }
    }
    return {
        success: false,
        errors: {},
        message: error ? error.message : 'Signup failed',
        values: {
            fullname: input.fullname,
            email: input.email
        },
    }

}

const LoginSchema = v.object({
    email: v.pipe(
        v.string('Email is required'),
        v.trim(),
        v.email('Please enter a valid email'),
    ),
    password: v.pipe(
        v.string('Password is required'),
        v.minLength(1, 'Password is required'),
    ),
})

export async function loginAction(
    _prev: LoginState,
    formData: FormData,
): Promise<LoginState> {
    const input = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const result = v.safeParse(LoginSchema, input)
    if (!result.success) {
        const flat = v.flatten<typeof LoginSchema>(result.issues)
        return {
            success: false,
            errors: (flat.nested ?? {}) as LoginFieldErrors,
            message: 'Please fix the errors',
            values: { email: input.email },
        }
    }

    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase.auth.signInWithPassword({
        email: input.email,
        password: input.password,
    })

    console.log("Error", error)
    console.log("data", data)
    if (data.user) {
        return {
            success: true,
            errors: {},
            message: 'Login successful',
            data: data as { user: User, session: Session }
        }
    }
    return {
        success: false,
        errors: {},
        message: error ? error.message: 'Login failed',
        values: { email: input.email },
    }
}
