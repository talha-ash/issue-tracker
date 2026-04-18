import * as v from 'valibot';

export const LoginSchema = v.object({
  email: v.pipe(
    v.string('Email is required'),
    v.trim(),
    v.email('Please enter a valid email')
  ),
  password: v.pipe(
    v.string('Password is required'),
    v.minLength(1, 'Password is required')
  ),
});
