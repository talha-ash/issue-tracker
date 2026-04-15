export function validateLoginFormData(input: LoginInput):
  (Ok<true, never> | Err<never, { errors: LoginFieldErrors, message: string }>) {

  const result = v.safeParse(LoginSchema, input)
  if (!result.success) {
    const flat = v.flatten<typeof LoginSchema>(result.issues)
    return err({
      errors: flat.nested as LoginFieldErrors,
      message: 'Please fix the errors',
    })

  }

  return ok(true)

  
}