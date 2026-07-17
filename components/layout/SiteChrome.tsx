"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { DeferredSiteWidgets } from "@/components/DeferredSiteWidgets";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/Footer";
import { PublicHeader } from "@/components/PublicHeader";
import { RegionalRouteNotice } from "@/components/RegionalRouteNotice";
import { WebSiteJsonLd } from "@/components/seo/WebSiteJsonLd";

import { GlobalRequestCenter } from "@/components/GlobalRequestCenter";
import { EnglishFooter } from "@/components/english/EnglishFooter";
import { EnglishHeader } from "@/components/english/EnglishHeader";

export function SiteChrome({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isDuesseldorfSection = pathname.startsWith("/duesseldorf");
  const isEnglishSection = pathname === "/en" || pathname.startsWith("/en/");
  const isPrivateSection =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/login");
  const usesDuesseldorfHeader =
    isDuesseldorfSection ||
    pathname === "/regensburg/reinigung" ||
    pathname === "/entsorgung-duesseldorf";

  return (
    <>
      {!isDuesseldorfSection && !isPrivateSection ? <JsonLd lang={isEnglishSection ? "en" : "de"} /> : null}
      {!isDuesseldorfSection && !isPrivateSection && !isEnglishSection ? <WebSiteJsonLd /> : null}
      {isEnglishSection ? (
        <EnglishHeader />
      ) : (
        <PublicHeader
          dic={{}}
          variant={usesDuesseldorfHeader ? "duesseldorf" : "default"}
        />
      )}
      {!isEnglishSection ? <RegionalRouteNotice pathname={pathname} /> : null}
      <div id="main-content" tabIndex={-1} className="min-h-[100svh]">
        {children}
      </div>
      {isEnglishSection ? <EnglishFooter /> : !isDuesseldorfSection ? <Footer /> : null}
      {!isEnglishSection ? <GlobalRequestCenter /> : null}
      <DeferredSiteWidgets showFloatingContact={!isDuesseldorfSection && !isPrivateSection && !isEnglishSection} />
    </>
  );
}
