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
import { SiteChrome } from "@/components/layout/SiteChrome";

export { viewport };

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "",
    title: "FLOXANT | Reinigung Düsseldorf & Services Regensburg",
    description:
      "FLOXANT für Reinigung in Düsseldorf sowie Reinigung, Umzug, Entrümpelung und Übergabe in Regensburg. Ort, Umfang, Termin und Fotos senden.",
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
        <MotionProvider>
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

