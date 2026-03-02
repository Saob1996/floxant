import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DEFAULT_LOCALE = 'de';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Root path → redirect to /de
    if (pathname === '/') {
        const url = request.nextUrl.clone();
        url.pathname = `/${DEFAULT_LOCALE}`;
        return NextResponse.redirect(url, 308);
    }

    // Already has locale prefix → pass through
    return NextResponse.next();
}

export const config = {
    // Strict positive matcher — ONLY page routes, NO negative lookahead
    // Middleware runs ONLY on these explicit patterns:
    //   /           → root redirect to /de
    //   /de/...     → pass through
    //   /en/...     → pass through
    //   etc.
    matcher: [
        '/',
        '/(de|en|ar|tr|ru|uk|pl|ro|bg|es|fr|it|fa|zh|vi|ko|ja)/:path*',
    ],
};
