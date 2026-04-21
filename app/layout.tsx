import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { generatePageSEO, viewport } from "@/lib/seo";
export { viewport };
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/Footer";
import AuthProvider from "@/components/session-provider";
import { MotionProvider } from "@/components/MotionProvider";
import { FloxNavigation } from "@/components/FloxNavigation";
import UtmCapture from "@/components/UtmCapture";
import { getDictionary } from "@/get-dictionary";
import { CookieBanner } from "@/components/CookieBanner";
import MobileFloatingContact from "@/components/MobileFloatingContact";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const fontHeading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const runtime = "nodejs";
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary("de");
  const title =
    dict.metadata.global_title ||
    "FLOXANT | Umzug, Reinigung und Entrümpelung in Regensburg und Bayern";
  const description =
    dict.metadata.global_desc ||
    "FLOXANT organisiert Umzug, Reinigung und Entrümpelung in Regensburg und Bayern mit klarer Vorprüfung, sauberer Einsatzplanung und belastbaren Anfragen.";

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
  const dict = await getDictionary("de");

  return (
    <html lang="de" dir="ltr" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased text-foreground",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <a href="#main-content" className="skip-to-content">
          Direkt zum Inhalt springen
        </a>
        <AuthProvider>
          <MotionProvider>
            <JsonLd lang="de" />
            <UtmCapture />
            <FloxNavigation dic={dict} />
            <div id="main-content">{children}</div>
            <CookieBanner dic={dict} />
            <Footer dic={dict} />
            <MobileFloatingContact dic={dict} />
            <WhatsAppButton dic={dict} />
          </MotionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
