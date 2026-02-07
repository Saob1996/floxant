import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    metadataBase: new URL("https://floxant.de"),
    title: {
        default: "Floxant – Umzug & Reinigung in Bayern",
        template: "%s | Floxant Bayern"
    },
    description: "Professioneller Umzugs- und Reinigungsservice in Bayern. Jetzt Anfrage stellen.",
    keywords: [
        "Umzug Bayern",
        "Umzug München",
        "Umzug Nürnberg",
        "Umzugsunternehmen Bayern",
        "Umzugsfirma",
        "Privatumzug",
        "Firmenumzug",
        "Reinigungsfirma Bayern",
        "Entsorgung Bayern",
        "Wohnungsauflösung",
        "Floxant"
    ],
    authors: [{ name: "Floxant Service GmbH", url: "https://floxant.de" }],
    creator: "Floxant Service GmbH",
    publisher: "Floxant Service GmbH",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "de_DE",
        url: "https://floxant.de",
        title: "Floxant | Premium Umzug & Reinigung in Berlin",
        description: "Der neue Standard für Umzug und Reinigung. Stressfrei, diskret und professionell. Fordern Sie jetzt Ihr unverbindliches Angebot an.",
        siteName: "Floxant",
        images: [
            {
                url: "/og-image.jpg", // Make sure this file exists in public/
                width: 1200,
                height: 630,
                alt: "Floxant Premium Services",
                type: "image/jpeg",
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Floxant | Premium Umzug & Reinigung",
        description: "Der neue Standard für Umzug und Reinigung in Berlin. Stressfrei & professionell.",
        images: ["/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        // google: "pending-verification-id", 
    },
    icons: {
        icon: "/logo_v10.png",
        apple: "/logo_v10.png",
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de" suppressHydrationWarning>
            <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
                <JsonLd />
                {children}
                <WhatsAppButton />
                <CookieBanner />
                <Footer />
            </body>
        </html>
    );
}
