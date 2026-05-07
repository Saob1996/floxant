"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/Footer";
import { FloxNavigation } from "@/components/FloxNavigation";
import { WebSiteJsonLd } from "@/components/seo/WebSiteJsonLd";

const MobileFloatingContact = dynamic(() => import("@/components/MobileFloatingContact"), {
  ssr: false,
});

const WhatsAppButton = dynamic(
  () => import("@/components/WhatsAppButton").then((mod) => mod.WhatsAppButton),
  { ssr: false },
);

const PlanGekipptTrigger = dynamic(
  () => import("@/components/PlanGekipptTrigger").then((mod) => mod.PlanGekipptTrigger),
  { ssr: false },
);

export function SiteChrome({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isDuesseldorfSection = pathname.startsWith("/duesseldorf");

  return (
    <>
      {!isDuesseldorfSection ? <JsonLd lang="de" /> : null}
      {!isDuesseldorfSection ? <WebSiteJsonLd /> : null}
      {!isDuesseldorfSection ? <FloxNavigation dic={{}} /> : null}
      <div id="main-content">{children}</div>
      {!isDuesseldorfSection ? <Footer /> : null}
      {!isDuesseldorfSection ? <MobileFloatingContact /> : null}
      {!isDuesseldorfSection ? <WhatsAppButton /> : null}
      <PlanGekipptTrigger />
    </>
  );
}
