import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const CLIENT_PW = process.env.EDITS_CLIENT_PASSWORD;
const ADMIN_PW  = process.env.EDITS_ADMIN_PASSWORD;
const AUTH_COOKIE = 'leuco_edits_auth';

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const val = cookieStore.get(AUTH_COOKIE)?.value;
  return val === CLIENT_PW || val === ADMIN_PW;
}

/**
 * GET /api/edits/file?url=<encoded-blob-url>
 *
 * Auth-gated proxy for private Vercel Blob files.
 * Fetches the blob using the server-side BLOB_READ_WRITE_TOKEN
 * and streams it back to the authenticated browser.
 */
export async function GET(req: NextRequest) {
  if (!(await isAuthed())) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const url = req.nextUrl.searchParams.get('url');
  if (!url) {
    return new NextResponse('Missing url param', { status: 400 });
  }

  // Only proxy Vercel Blob URLs
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return new NextResponse('Invalid URL', { status: 400 });
  }
  if (!parsed.hostname.endsWith('blob.vercel-storage.com')) {
    return new NextResponse('URL not allowed', { status: 400 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return new NextResponse('Storage not configured', { status: 500 });
  }

  try {
    const blobRes = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      // Tell Next.js not to cache this at the edge per-user
      cache: 'no-store',
    });

    if (!blobRes.ok) {
      return new NextResponse('File not found', { status: 404 });
    }

    const contentType = blobRes.headers.get('content-type') || 'application/octet-stream';

    return new NextResponse(blobRes.body, {
      headers: {
        'Content-Type': contentType,
        // Allow browser to cache for 1 hour but treat as private (user-specific)
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[edits/file] Proxy failed:', message);
    return new NextResponse('Failed to fetch file', { status: 502 });
  }
}
