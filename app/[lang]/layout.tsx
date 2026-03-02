import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { JsonLd } from "../../components/JsonLd";
import { Footer } from "../../components/Footer";
import dynamic from "next/dynamic";
import AuthProvider from "../../components/session-provider";
import { MotionProvider } from "../../components/MotionProvider";
import { i18n, type Locale } from "../../i18n-config"; // Adjusted path (was ../../../)
import { getDictionary } from "../../get-dictionary"; // Adjusted path (was ../../)

const WhatsAppButton = dynamic(
    () => import("../../components/WhatsAppButton").then(mod => ({ default: mod.WhatsAppButton })),
    { loading: () => <div className="fixed bottom-6 right-6 z-50 h-14 w-14" /> }
);

const CookieBanner = dynamic(
    () => import("../../components/CookieBanner").then(mod => ({ default: mod.CookieBanner })),
    { loading: () => null }
);

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Force Node.js runtime — consolidates all page functions into one
// instead of creating separate Edge functions per route
export const runtime = 'nodejs';
// ISR: all pages render on demand, cache for 1 hour
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;

    // Basic metadata generation - in a real app, this would be dynamic per dictionary
    const title = lang === 'de' ? "Floxant – Umzug & Reinigung" : "Floxant – Moving & Cleaning";

    return {
        title: {
            default: title,
            template: `%s | Floxant (${lang.toUpperCase()})`
        },
        description: "Professional Moving & Cleaning Services.",
        alternates: {
            canonical: `https://www.floxant.de/${lang}`,
            languages: {
                'de': 'https://www.floxant.de/de',
                'en': 'https://www.floxant.de/en',
                'ar': 'https://www.floxant.de/ar',
                'tr': 'https://www.floxant.de/tr',
                'ru': 'https://www.floxant.de/ru',
                'uk': 'https://www.floxant.de/uk',
                'pl': 'https://www.floxant.de/pl',
                'ro': 'https://www.floxant.de/ro',
                'bg': 'https://www.floxant.de/bg',
                'es': 'https://www.floxant.de/es',
                'fr': 'https://www.floxant.de/fr',
                'it': 'https://www.floxant.de/it',
                'fa': 'https://www.floxant.de/fa',
                'zh': 'https://www.floxant.de/zh',
                'vi': 'https://www.floxant.de/vi',
                'ko': 'https://www.floxant.de/ko',
                'ja': 'https://www.floxant.de/ja',
            }
        },
        icons: {
            icon: '/icon.png',
            shortcut: '/icon.png',
            apple: '/icon.png',
        }
    };
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    // Cast to Locale for internal use if needed, or getDictionary handles string with fallback?
    // getDictionary expects Locale.
    // We should cast it.
    const locale = lang as Locale;
    const dict = await getDictionary(locale);

    // Set dir="rtl" for Arabic and Farsi
    const dir = (lang === 'ar' || lang === 'fa') ? 'rtl' : 'ltr';

    return (
        <html lang={lang} dir={dir} suppressHydrationWarning>
            <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
                <AuthProvider>
                    <MotionProvider>
                        <JsonLd lang={lang} />
                        {children}
                        <WhatsAppButton />
                        <CookieBanner />
                        <Footer lang={lang} dic={dict} />
                    </MotionProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
