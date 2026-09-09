import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";
import { cn } from "@/lib/utils";
import { generatePageSEO, viewport } from "@/lib/seo";
import { MotionProvider } from "@/components/MotionProvider";
import UtmCapture from "@/components/UtmCapture";
import { CookieBanner } from "@/components/CookieBanner";
import { ConversionEventReporter } from "@/components/ConversionEventReporter";
import { GoogleTag } from "@/components/GoogleTag";
import { SiteChrome } from "@/components/layout/SiteChrome";

export { viewport };

export async function generateMetadata(): Promise<Metadata> {
  const defaults = generatePageSEO({
    lang: "de",
    path: "",
    title: "FLOXANT | Reinigung Düsseldorf & Umzug Regensburg",
    description:
      "Reinigung in Düsseldorf sowie Umzug, Entrümpelung, Auflösung, Transport und Reinigung in Regensburg verständlich auswählen und direkt anfragen.",
  });
  // Canonical and language alternatives belong to each page, not the shared layout.
  return { ...defaults, alternates: undefined };
}

export default function RootLayout({
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
          <GoogleTag />
          <ConversionEventReporter />
          <UtmCapture />
          <CookieBanner />
          <SiteChrome>{children}</SiteChrome>
        </MotionProvider>
      </body>
    </html>
  );
}

