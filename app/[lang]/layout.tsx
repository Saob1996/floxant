import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Outfit } from "next/font/google";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import "../globals.css";
import { cn } from "@/lib/utils";
import { generatePageSEO, viewport } from "@/lib/seo";
export { viewport };
import { JsonLd } from "../../components/JsonLd";
import { Footer } from "../../components/Footer";
import AuthProvider from "../../components/session-provider";
import { MotionProvider } from "../../components/MotionProvider";
import { FloxNavigation as Header } from "../../components/FloxNavigation";
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
    { loading: () => <div className="fixed bottom-6 right-6 z-[70] h-14 w-14" /> }
);

const CookieBanner = dynamic(
    () =>
        import("../../components/CookieBanner").then((mod) => ({
            default: mod.CookieBanner,
        })),
    { loading: () => null }
);

const MobileFloatingContact = dynamic(
    () => import("../../components/MobileFloatingContact"),
    { loading: () => null }
);

const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

const fontHeading = Outfit({
    subsets: ["latin"],
    variable: "--font-heading",
    weight: ["300", "400", "500", "600", "700", "800"],
    display: "swap",
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

    const locale: Locale = lang;
    const dict = await getDictionary(locale);

    const title =
        dict.metadata.global_title ||
        "Umzugsunternehmen Bayern | Umzug, Reinigung & Entrümpelung | FLOXANT";

    const description =
        dict.metadata.global_desc ||
        "FLOXANT – Ihr Partner für Umzug, Entrümpelung und Reinigung in Regensburg und ganz Bayern zum Festpreis.";

    return generatePageSEO({
        lang: locale,
        path: "",
        title,
        description,
    });
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

    const locale: Locale = lang;
    const dict = await getDictionary(locale);
    const dir = getDirFromLocale(locale);

    return (
        <html lang={locale} dir={dir} suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased text-foreground",
                    fontSans.variable,
                    fontHeading.variable
                )}
            >
                <AuthProvider>
                    <MotionProvider>
                        <JsonLd lang={locale} />
                        <UtmCapture />
                        <Header lang={locale} dic={dict} />
                        <main id="main-content">{children}</main>
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