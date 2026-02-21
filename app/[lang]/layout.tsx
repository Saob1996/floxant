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

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

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
            canonical: `https://floxant.de/${lang}`,
            languages: {
                'de': 'https://floxant.de/de',
                'en': 'https://floxant.de/en',
                'ar': 'https://floxant.de/ar',
                'tr': 'https://floxant.de/tr',
                'ru': 'https://floxant.de/ru',
                'uk': 'https://floxant.de/uk',
                'pl': 'https://floxant.de/pl',
                'ro': 'https://floxant.de/ro',
                'bg': 'https://floxant.de/bg',
                'es': 'https://floxant.de/es',
                'fr': 'https://floxant.de/fr',
                'it': 'https://floxant.de/it',
                'fa': 'https://floxant.de/fa',
                'zh': 'https://floxant.de/zh',
                'vi': 'https://floxant.de/vi',
                'ko': 'https://floxant.de/ko',
                'ja': 'https://floxant.de/ja',
                'x-default': 'https://floxant.de/de'
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
