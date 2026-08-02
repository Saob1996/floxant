"use client";

import { useEffect, type ReactNode } from "react";
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
import { AdsLandingFooter, AdsLandingHeader } from "@/components/ads/AdsLandingChrome";

export function SiteChrome({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isDuesseldorfSection = pathname.startsWith("/duesseldorf");
  const isEnglishSection = pathname === "/en" || pathname.startsWith("/en/");
  const adsLandingKind =
    pathname === "/duesseldorf/reinigung/anfrage"
      ? "cleaning-duesseldorf"
      : pathname === "/umzug-regensburg/anfrage"
        ? "moving-regensburg"
        : null;
  const isAdsLanding = adsLandingKind !== null;
  const hasFocusedEnquiryFlow = pathname === "/kontakt" || isAdsLanding;

  useEffect(() => {
    document.documentElement.lang = isEnglishSection ? "en" : "de";
  }, [isEnglishSection]);

  const isPrivateSection =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/login");
  const hasPageSpecificOrganizationSchema =
    isDuesseldorfSection || pathname === "/angebot-vergleichen-duesseldorf";
  const usesDuesseldorfHeader =
    isDuesseldorfSection ||
    pathname === "/regensburg/reinigung";

  return (
    <>
      <nav aria-label={isEnglishSection ? "Skip navigation" : "Sprungnavigation"}>
        <a href="#main-content" className="skip-to-content">
          {isEnglishSection ? "Skip to main content" : "Direkt zum Inhalt springen"}
        </a>
      </nav>
      {!hasPageSpecificOrganizationSchema && !isPrivateSection ? <JsonLd lang={isEnglishSection ? "en" : "de"} /> : null}
      {!isDuesseldorfSection && !isPrivateSection && !isEnglishSection ? <WebSiteJsonLd /> : null}
      {isAdsLanding ? (
        <AdsLandingHeader kind={adsLandingKind} />
      ) : isEnglishSection ? (
        <EnglishHeader />
      ) : (
        <PublicHeader
          dic={{}}
          variant={usesDuesseldorfHeader ? "duesseldorf" : "default"}
        />
      )}
      {!isEnglishSection && !isAdsLanding ? <RegionalRouteNotice pathname={pathname} /> : null}
      <div
        id="main-content"
        lang={isEnglishSection ? "en" : "de"}
        tabIndex={-1}
        className="min-h-[100svh]"
      >
        {children}
      </div>
      {isAdsLanding ? <AdsLandingFooter /> : isEnglishSection ? <EnglishFooter /> : !isDuesseldorfSection ? <Footer /> : null}
      {!isEnglishSection && !isAdsLanding ? <GlobalRequestCenter /> : null}
      <DeferredSiteWidgets showFloatingContact={!isDuesseldorfSection && !isPrivateSection && !isEnglishSection && !hasFocusedEnquiryFlow} />
    </>
  );
}
