import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { initEditsTable, getAllRequests, createRequest } from '@/lib/edits-db';

const CLIENT_PW = process.env.EDITS_CLIENT_PASSWORD;
const ADMIN_PW = process.env.EDITS_ADMIN_PASSWORD;
const AUTH_COOKIE = 'leuco_edits_auth';

async function getAuthLevel(): Promise<'none' | 'client' | 'admin'> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(AUTH_COOKIE)?.value;
  if (cookie === ADMIN_PW) return 'admin';
  if (cookie === CLIENT_PW) return 'client';
  return 'none';
}

export async function GET() {
  const auth = await getAuthLevel();
  if (auth === 'none') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await initEditsTable();
  const requests = await getAllRequests();
  return NextResponse.json({ requests, role: auth });
}

export async function POST(req: NextRequest) {
  const auth = await getAuthLevel();
  if (auth === 'none') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await initEditsTable();
  const body = await req.json();

  const validCategories = ['text_change', 'image_change', 'bug', 'feature', 'other'];
  if (!validCategories.includes(body.category)) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
  }
  if (!body.title || body.title.length > 100) {
    return NextResponse.json({ error: 'Title required, max 100 chars' }, { status: 400 });
  }
  if (!body.description) {
    return NextResponse.json({ error: 'Description required' }, { status: 400 });
  }
  if (!body.submitted_by || body.submitted_by.length > 50) {
    return NextResponse.json({ error: 'Submitted by required, max 50 chars' }, { status: 400 });
  }

  const created = await createRequest({
    category: body.category,
    title: body.title,
    description: body.description,
    page_url: body.page_url || null,
    submitted_by: body.submitted_by,
    attachments: Array.isArray(body.attachments) && body.attachments.length > 0
      ? JSON.stringify(body.attachments)
      : null,
  });
  return NextResponse.json({ request: created });
}
