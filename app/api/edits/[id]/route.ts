import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { updateRequestStatus, deleteRequest } from '@/lib/edits-db';

const ADMIN_PW = process.env.EDITS_ADMIN_PASSWORD;
const AUTH_COOKIE = 'leuco_edits_auth';

async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value === ADMIN_PW;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }
  const { id } = await params;
  const body = await req.json();
  const validStatuses = ['open', 'in_progress', 'done'];
  if (!validStatuses.includes(body.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  const updated = await updateRequestStatus(
    parseInt(id, 10),
    body.status,
    body.admin_note || null
  );
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ request: updated });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }
  const { id } = await params;
  const deleted = await deleteRequest(parseInt(id, 10));
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
