import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { cn } from "@/lib/utils";
import { generatePageSEO, viewport } from "@/lib/seo";
import { MotionProvider } from "@/components/MotionProvider";
import UtmCapture from "@/components/UtmCapture";
import { CookieBanner } from "@/components/CookieBanner";
import { ConversionEventReporter } from "@/components/ConversionEventReporter";
import { GoogleAdsTag } from "@/components/GoogleAdsTag";
import { WebVitalsReporter } from "@/components/WebVitalsReporter";
import { SiteChrome } from "@/components/layout/SiteChrome";

export { viewport };

export const runtime = "nodejs";
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "",
    title: "FLOXANT | Düsseldorf Reinigung und Regensburg Umzug & Übergabe",
    description:
      "FLOXANT trennt klar nach Region: Düsseldorf für Gewerbe-, Büro- und Praxisreinigung. Regensburg für Umzug, Entrümpelung, Haushaltsauflösung, Endreinigung und Übergabe.",
  });
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="de" dir="ltr" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased text-foreground flox-site-light",
        )}
      >
        <a href="#main-content" className="skip-to-content">
          Direkt zum Inhalt springen
        </a>
        <MotionProvider>
          <WebVitalsReporter />
          <GoogleAdsTag />
          <ConversionEventReporter />
          <UtmCapture />
          <SiteChrome>{children}</SiteChrome>
          <CookieBanner />
        </MotionProvider>
      </body>
    </html>
  );
}

