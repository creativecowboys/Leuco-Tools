import { NextRequest, NextResponse } from 'next/server';

const CLIENT_PW = process.env.EDITS_CLIENT_PASSWORD;
const ADMIN_PW = process.env.EDITS_ADMIN_PASSWORD;
const AUTH_COOKIE = 'leuco_edits_auth';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const password = body.password as string;

  if (password !== CLIENT_PW && password !== ADMIN_PW) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const role = password === ADMIN_PW ? 'admin' : 'client';
  const res = NextResponse.json({ role });
  res.cookies.set(AUTH_COOKIE, password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
