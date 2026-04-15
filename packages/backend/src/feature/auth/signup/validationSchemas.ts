import * as v from 'valibot'

export const SignupSchema = v.pipe(
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
