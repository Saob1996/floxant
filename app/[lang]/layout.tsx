import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Outfit } from "next/font/google";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import "../globals.css";
import { cn } from "@/lib/utils";
import { JsonLd } from "../../components/JsonLd";
import { Footer } from "../../components/Footer";
import AuthProvider from "../../components/session-provider";
import { MotionProvider } from "../../components/MotionProvider";
import { Header } from "../../components/Header";
import UtmCapture from "@/components/UtmCapture";

import { getDictionary } from "../../get-dictionary";
import {
    i18n,
    isValidLocale,
    getDirFromLocale,
    type Locale,
} from "../../i18n-config";

const WhatsAppButton = dynamic(
    () =>
        import("../../components/WhatsAppButton").then((mod) => ({
            default: mod.WhatsAppButton,
        })),
    { loading: () => <div className="fixed bottom-6 end- z-50 h-14 w-14" /> }
);

const CookieBanner = dynamic(
    () =>
        import("../../components/CookieBanner").then((mod) => ({
            default: mod.CookieBanner,
        })),
    { loading: () => null }
);

const MobileFloatingContact = dynamic(
    () => import("../../components/MobileFloatingContact")
);

const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["300", "400", "500", "600", "700"],
});

const fontHeading = Outfit({
    subsets: ["latin"],
    variable: "--font-heading",
    weight: ["300", "400", "500", "600", "700", "800"],
});

export const runtime = "nodejs";
export const revalidate = 3600;

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    const locale = lang as Locale;

    const dict = (await getDictionary(locale)) as any;

    const title =
        dict?.metadata?.global_title || "Umzugsunternehmen Bayern | Umzug ✓ Reinigung ✓ Entrümpelung | FLOXANT";

    const description =
        dict?.metadata?.global_desc || "FLOXANT – Ihr Umzugsunternehmen in Regensburg & Bayern. Umzug, Entrümpelung & Reinigung zum Festpreis. Jetzt berechnen!";

    const canonical = `https://www.floxant.de/${locale}`;

    const languages: Record<string, string> = {
        "x-default": "https://www.floxant.de/de",
    };

    for (const l of i18n.locales) {
        languages[l] = `https://www.floxant.de/${l}`;
    }

    return {
        metadataBase: new URL("https://www.floxant.de"),
        title,
        description,
        keywords:
            dict?.metadata?.keywords || "FLOXANT",
        alternates: {
            canonical,
            languages,
        },
        other: {
            "geo.region": "DE-BY",
            "geo.placename": "Regensburg",
            "geo.position": "49.0134;12.1016",
            ICBM: "49.0134, 12.1016",
        },
        openGraph: {
            type: "website",
            url: canonical,
            title,
            description,
            siteName: "FLOXANT",
            locale: dict?.metadata?.og_locale || locale,
            countryName: "Germany",
            images: [
                {
                    url: "https://www.floxant.de/og.jpg",
                    width: 1200,
                    height: 630,
                    alt: dict?.metadata?.og_img_alt || "FLOXANT",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["https://www.floxant.de/og.jpg"],
        },
    };
}

export default async function RootLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    if (!isValidLocale(lang)) {
        notFound();
    }

    const locale = lang as Locale;
    const dict = await getDictionary(locale);
    const dir = getDirFromLocale(locale);

    return (
        <html lang={locale} dir={dir} suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased text-[15px] tracking-tight",
                    fontSans.variable,
                    fontHeading.variable
                )}
            >
                <AuthProvider>
                    <MotionProvider>
                        <JsonLd lang={locale} />
                        <UtmCapture />
                        <Header lang={locale} dic={dict} />
                        {children}
                        <WhatsAppButton dic={dict} />
                        <CookieBanner dic={dict} />
                        <Footer lang={locale} dic={dict} />
                        <MobileFloatingContact dic={dict} />
                    </MotionProvider>
                </AuthProvider>
            </body>
        </html>
    );
}