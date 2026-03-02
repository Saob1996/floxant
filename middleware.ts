import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Inline locale list — no external imports needed
const LOCALES = ['de', 'en', 'ar', 'tr', 'ru', 'uk', 'pl', 'ro', 'bg', 'es', 'fr', 'it', 'fa', 'zh', 'vi', 'ko', 'ja'] as const;
const DEFAULT_LOCALE = 'de';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip if pathname already has a valid locale prefix
    const hasLocale = LOCALES.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (hasLocale) {
        return NextResponse.next();
    }

    // No locale found — permanent redirect to /de/...
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url, 308);
}

export const config = {
    matcher: [
        /*
         * Run middleware ONLY on page routes.
         * Exclude:
         * - api routes (/api/...)
         * - Next.js internals (/_next/...)
         * - Static files (anything with a file extension like .png, .xml, .ico, .css, .js)
         * - robots.txt, sitemap files
         */
        '/((?!api|_next|static|.*\\..*|favicon\\.ico|sitemap.*\\.xml|robots\\.txt).*)',
    ],
};
