import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { JsonLd } from "../../components/JsonLd";
import { Footer } from "../../components/Footer";
import dynamic from "next/dynamic";
import AuthProvider from "../../components/session-provider";
import { MotionProvider } from "../../components/MotionProvider";
import { i18n, type Locale } from "../../i18n-config";
import { getDictionary } from "../../get-dictionary";
import { Header } from "../../components/Header";
import UtmCapture from '@/components/UtmCapture';

const WhatsAppButton = dynamic(
    () => import("../../components/WhatsAppButton").then(mod => ({ default: mod.WhatsAppButton })),
    { loading: () => <div className="fixed bottom-6 right-6 z-50 h-14 w-14" /> }
);

const CookieBanner = dynamic(
    () => import("../../components/CookieBanner").then(mod => ({ default: mod.CookieBanner })),
    { loading: () => null }
);

const MobileFloatingContact = dynamic(
    () => import("../../components/MobileFloatingContact")
);

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans", weight: ["300", "400", "500", "600", "700"] });
const fontHeading = Outfit({ subsets: ["latin"], variable: "--font-heading", weight: ["300", "400", "500", "600", "700", "800"] });

// Node.js runtime — consolidates all page functions
export const runtime = 'nodejs';
// ISR: cache pages for 1 hour, then revalidate
export const revalidate = 3600;

// Define valid locale params — required for ISR caching
// Without this, [lang] is treated as fully dynamic (no cache)
export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;

    const title = lang === 'de' 
        ? "Umzugsunternehmen Bayern | 100% Festpreis & Kosten-Rechner | FLOXANT" 
        : "FLOXANT – Premium Moving & Service in Bavaria";
    const description = lang === 'de'
        ? 'Ihr Umzugsunternehmen für Bayern (München, Nürnberg, Regensburg). Entrümpelung & Reinigung zum Festpreis. Jetzt online berechnen oder via WhatsApp anfragen!'
        : 'Professional moving and cleaning services in Bavaria. Regensburg, Munich, Nuremberg. Transparent pricing, fast online estimates and direct WhatsApp support.';

    const canonical = `https://www.floxant.de/${lang}`;

    // hreflang for all locales + x-default
    const languages: Record<string, string> = {
        'x-default': 'https://www.floxant.de/de',
    };
    for (const l of i18n.locales) {
        languages[l] = `https://www.floxant.de/${l}`;
    }

    return {
        metadataBase: new URL('https://www.floxant.de'),
        title: title,
        description,
        alternates: { canonical, languages },
        openGraph: {
            type: 'website',
            url: canonical,
            title,
            description,
            siteName: 'FLOXANT',
            locale: lang === 'de' ? 'de_DE' : lang,
            images: [{
                url: 'https://www.floxant.de/og.jpg',
                width: 1200,
                height: 630,
                alt: 'FLOXANT – Umzug & Reinigung in Bayern',
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['https://www.floxant.de/og.jpg'],
        },
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
    var dict = await getDictionary(locale);

    // Set dir="rtl" for Arabic and Farsi
    const dir = (lang === 'ar' || lang === 'fa') ? 'rtl' : 'ltr';

    return (
        <html lang={lang} dir={dir} suppressHydrationWarning>
            <body className={cn("min-h-screen bg-background font-sans antialiased text-[15px] tracking-tight", fontSans.variable, fontHeading.variable)}>
                <AuthProvider>
                    <MotionProvider>
                        <JsonLd lang={lang} />
                        <UtmCapture />
                        <Header dic={dict} />
                        {children}
                        <WhatsAppButton dic={dict} />
                        <CookieBanner />
                        <Footer lang={lang} dic={dict} />
                        <MobileFloatingContact />
                    </MotionProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
