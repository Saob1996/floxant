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

export function SiteChrome({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isDuesseldorfSection = pathname.startsWith("/duesseldorf");
  const usesDuesseldorfHeader =
    isDuesseldorfSection ||
    pathname === "/reinigung-moeblierte-wohnung-duesseldorf" ||
    pathname === "/entsorgung-duesseldorf";

  return (
    <>
      {!isDuesseldorfSection ? <JsonLd lang="de" /> : null}
      {!isDuesseldorfSection ? <WebSiteJsonLd /> : null}
      <PublicHeader
        dic={{}}
        variant={usesDuesseldorfHeader ? "duesseldorf" : "default"}
      />
      <RegionalRouteNotice pathname={pathname} />
      <div id="main-content">{children}</div>
      {!isDuesseldorfSection ? <Footer /> : null}
      <GlobalRequestCenter />
      <DeferredSiteWidgets showFloatingContact={!isDuesseldorfSection} />
    </>
  );
}
