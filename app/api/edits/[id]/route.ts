import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { updateRequestStatus, deleteRequest, addAttachmentsToRequest, removeAttachmentFromRequest } from '@/lib/edits-db';
import { del } from '@vercel/blob';

const CLIENT_PW = process.env.EDITS_CLIENT_PASSWORD;
const ADMIN_PW  = process.env.EDITS_ADMIN_PASSWORD;
const AUTH_COOKIE = 'leuco_edits_auth';

async function getAuthLevel(): Promise<'none' | 'client' | 'admin'> {
  const cookieStore = await cookies();
  const val = cookieStore.get(AUTH_COOKIE)?.value;
  if (val === ADMIN_PW) return 'admin';
  if (val === CLIENT_PW) return 'client';
  return 'none';
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthLevel();
  if (auth === 'none') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const numId = parseInt(id, 10);
  const body = await req.json();

  // Adding attachments — allowed for both client and admin
  if (Array.isArray(body.add_attachments) && body.add_attachments.length > 0) {
    const updated = await addAttachmentsToRequest(numId, body.add_attachments);
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ request: updated });
  }

  // Removing a single attachment — allowed for both client and admin
  if (typeof body.remove_attachment === 'string' && body.remove_attachment) {
    const updated = await removeAttachmentFromRequest(numId, body.remove_attachment);
    if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    // Best-effort: delete from Blob storage (non-fatal if it fails)
    try {
      await del(body.remove_attachment);
    } catch (err) {
      console.warn('[edits/[id]] Blob delete failed (non-fatal):', err);
    }
    return NextResponse.json({ request: updated });
  }

  // Status / admin note changes — admin only
  if (auth !== 'admin') {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }

  const validStatuses = ['open', 'in_progress', 'done'];
  if (!validStatuses.includes(body.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }
  const updated = await updateRequestStatus(
    numId,
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
  const auth = await getAuthLevel();
  if (auth !== 'admin') {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 });
  }
  const { id } = await params;
  const deleted = await deleteRequest(parseInt(id, 10));
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
