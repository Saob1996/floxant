"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import { DeferredSiteWidgets } from "@/components/DeferredSiteWidgets";
import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/Footer";
import { PublicHeader } from "@/components/PublicHeader";
import { WebSiteJsonLd } from "@/components/seo/WebSiteJsonLd";

import { GlobalRequestCenter } from "@/components/GlobalRequestCenter";
import { EnglishFooter } from "@/components/english/EnglishFooter";
import { EnglishHeader } from "@/components/english/EnglishHeader";
import { AdsLandingFooter, AdsLandingHeader } from "@/components/ads/AdsLandingChrome";
import { GoogleReviews } from "@/components/GoogleReviews";
import { getPublicRouteContext } from "@/lib/public-route-context";

export function SiteChrome({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const routeContext = getPublicRouteContext(pathname);
  const hasOwnPublicFooter = pathname === "/private-client-service" || pathname === "/villenservice";
  const isDuesseldorfSection = pathname.startsWith("/duesseldorf");
  const isEnglishSection = pathname === "/en" || pathname.startsWith("/en/");
  const adsLandingKind =
    pathname === "/duesseldorf/reinigung/anfrage"
      ? "cleaning-duesseldorf"
      : pathname === "/umzug-regensburg/anfrage"
        ? "moving-regensburg"
        : null;
  const isAdsLanding = adsLandingKind !== null;

  useEffect(() => {
    document.documentElement.lang = isEnglishSection ? "en" : "de";
  }, [isEnglishSection]);

  const isPrivateSection =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/login");
  const usesDuesseldorfHeader =
    isDuesseldorfSection ||
    pathname === "/regensburg/reinigung" ||
    pathname === "/entsorgung-duesseldorf";

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        {isEnglishSection ? "Skip to main content" : "Direkt zum Inhalt springen"}
      </a>
      {!isPrivateSection ? <JsonLd lang={isEnglishSection ? "en" : "de"} /> : null}
      {!isPrivateSection && !isEnglishSection ? <WebSiteJsonLd /> : null}
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
      <div
        id="main-content"
        lang={isEnglishSection ? "en" : "de"}
        tabIndex={-1}
        className="min-h-[100svh]"
      >
        {children}
      </div>
      {!isPrivateSection && !isDuesseldorfSection && !hasOwnPublicFooter ? <GoogleReviews location={routeContext.location} english={isEnglishSection} /> : null}
      {isDuesseldorfSection ? null : isAdsLanding ? <AdsLandingFooter /> : isEnglishSection ? <EnglishFooter location={routeContext.location} /> : <Footer />}
      {!isEnglishSection && !isAdsLanding ? <GlobalRequestCenter /> : null}
      <DeferredSiteWidgets showFloatingContact={!isDuesseldorfSection && !isPrivateSection} />
    </>
  );
}
