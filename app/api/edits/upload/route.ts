import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { put } from '@vercel/blob';

const CLIENT_PW = process.env.EDITS_CLIENT_PASSWORD;
const ADMIN_PW  = process.env.EDITS_ADMIN_PASSWORD;
const AUTH_COOKIE = 'leuco_edits_auth';

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const val = cookieStore.get(AUTH_COOKIE)?.value;
  return val === CLIENT_PW || val === ADMIN_PW;
}

// Max 10 MB per file
const MAX_BYTES = 10 * 1024 * 1024;

// Accept any image, PDF, or common video — check by prefix for flexibility
function isAllowedType(mimeType: string): boolean {
  if (mimeType.startsWith('image/')) return true;
  if (mimeType === 'application/pdf') return true;
  if (mimeType.startsWith('video/')) return true;
  return false;
}

export async function POST(req: NextRequest) {
  // Guard: token must be present
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('[edits/upload] BLOB_READ_WRITE_TOKEN is not set');
    return NextResponse.json(
      { error: 'Server misconfiguration: storage token missing.' },
      { status: 500 }
    );
  }

  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch (err) {
    console.error('[edits/upload] Failed to parse form data:', err);
    return NextResponse.json({ error: 'Could not parse file upload.' }, { status: 400 });
  }

  const file = formData.get('file');

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!isAllowedType(file.type)) {
    return NextResponse.json(
      { error: `File type not allowed: "${file.type}". Accepted: images, PDFs, videos.` },
      { status: 400 }
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max is 10 MB.` },
      { status: 400 }
    );
  }

  // Sanitize filename and prefix with timestamp
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const blobPath = `leuco-edits/${Date.now()}-${safeName}`;

  try {
    const blob = await put(blobPath, file, {
      access: 'private',
      addRandomSuffix: false,
    });
    return NextResponse.json({ url: blob.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[edits/upload] Blob upload failed:', message);
    return NextResponse.json(
      { error: `Upload failed: ${message}` },
      { status: 500 }
    );
  }
}
