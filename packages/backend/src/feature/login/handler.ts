
export function login(client, {email, password}){  
  const { data, error } = await signInWithPassword(client, input.email, input.password)
  if (data.user) {
    return ok(
      data,
      'Login successful',
    )
  }
  return fail(
    {},
    error ? error.message : 'Login failed',
    { email: input.email },
  )
}