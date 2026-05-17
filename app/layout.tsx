import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { cn } from "@/lib/utils";
import { generatePageSEO, viewport } from "@/lib/seo";
import AuthProvider from "@/components/session-provider";
import { MotionProvider } from "@/components/MotionProvider";
import UtmCapture from "@/components/UtmCapture";
import { getDictionary } from "@/get-dictionary";
import { CookieBanner } from "@/components/CookieBanner";
import { ConversionEventReporter } from "@/components/ConversionEventReporter";
import { WebVitalsReporter } from "@/components/WebVitalsReporter";
import { SiteChrome } from "@/components/layout/SiteChrome";

export { viewport };

export const runtime = "nodejs";
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary("de");
  const title =
    dict.metadata.global_title ||
    "FLOXANT | Umzug, Reinigung und Entrümpelung in Regensburg und Bayern";
  const description =
    dict.metadata.global_desc ||
    "FLOXANT organisiert Umzug, Reinigung und Entrümpelung in Regensburg und Bayern mit klarer Einschätzung, sauberer Einsatzplanung und belastbaren Anfragen.";

  return generatePageSEO({
    lang: "de",
    path: "",
    title,
    description,
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
        <AuthProvider>
          <MotionProvider>
            <WebVitalsReporter />
            <ConversionEventReporter />
            <UtmCapture />
            <SiteChrome>{children}</SiteChrome>
            <CookieBanner />
          </MotionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

