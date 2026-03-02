import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Only root path reaches here (see matcher below)
    const url = request.nextUrl.clone();
    url.pathname = '/de';
    return NextResponse.redirect(url, 308);
}

export const config = {
    // Middleware runs ONLY on root path = 1 edge binding
    matcher: ['/'],
};
