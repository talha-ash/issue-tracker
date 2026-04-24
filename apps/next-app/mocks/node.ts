import { setupServer } from 'msw/node';
import { http, HttpResponse, passthrough } from 'msw';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const MOCK_USER_ID = '00000000-0000-0000-0000-000000000001';
const MOCK_SESSION_ID = '00000000-0000-0000-0000-000000000002';

function base64url(input: string) {
  return Buffer.from(input).toString('base64url');
}

function createMockJwt(email: string, now: number) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    aud: 'authenticated',
    exp: now + 3600,
    iat: now,
    iss: `${SUPABASE_URL}/auth/v1`,
    sub: MOCK_USER_ID,
    email,
    role: 'authenticated',
    aal: 'aal1',
    session_id: MOCK_SESSION_ID,
    is_anonymous: false,
    app_metadata: { provider: 'email', providers: ['email'] },
    user_metadata: {},
  };
  return `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}.${base64url('signature')}`;
}

function buildMockUser(email: string, now: number) {
  return {
    id: MOCK_USER_ID,
    aud: 'authenticated',
    role: 'authenticated',
    email,
    email_confirmed_at: new Date(now * 1000).toISOString(),
    phone: '',
    confirmed_at: new Date(now * 1000).toISOString(),
    last_sign_in_at: new Date(now * 1000).toISOString(),
    app_metadata: { provider: 'email', providers: ['email'] },
    user_metadata: {},
    identities: [],
    created_at: new Date(now * 1000).toISOString(),
    updated_at: new Date(now * 1000).toISOString(),
  };
}

export const server = setupServer(
  http.post(`${SUPABASE_URL}/auth/v1/token`, async ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('grant_type') !== 'password') {
      return passthrough();
    }

    const body = (await request.json()) as { email: string; password: string };
    const now = Math.floor(Date.now() / 1000);

    return HttpResponse.json({
      access_token: createMockJwt(body.email, now),
      token_type: 'bearer',
      expires_in: 3600,
      expires_at: now + 3600,
      refresh_token: 'mock-refresh-token',
      user: buildMockUser(body.email, now),
    });
  }),

  http.get(`${SUPABASE_URL}/auth/v1/user`, () => {
    const now = Math.floor(Date.now() / 1000);
    return HttpResponse.json(buildMockUser('test@example.com', now));
  })
);

