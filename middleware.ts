import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// The one hostname allowed to be indexed. Everything else this app answers on
// — Vercel preview URLs, the *.vercel.app production alias, any future staging
// alias — serves the identical build and was competing with the real site in
// Google's index (verified 2026-09-04: leuco-tools.vercel.app returned 200 with
// the same ETag as www.shopleuco.com).
//
// We noindex rather than redirect on purpose: a 301 to production would make
// preview deployments unusable for review, and Google has to be able to crawl a
// page to see the noindex and drop it from the index.
const CANONICAL_HOST = 'www.shopleuco.com';

// Dev hosts are never crawlable, so leave them alone.
const LOCAL_HOSTS = ['localhost', '127.0.0.1'];

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    const host = (request.headers.get('host') ?? '').split(':')[0].toLowerCase();
    const isLocal = LOCAL_HOSTS.includes(host);

    if (host && host !== CANONICAL_HOST && !isLocal) {
        response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }

    return response;
}

export const config = {
    // Everything except Next internals and static files — the noindex header
    // only matters on HTML responses, and this keeps asset requests cheap.
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|txt|xml|woff2?)$).*)'],
};
