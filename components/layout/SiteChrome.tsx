"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { Footer } from "@/components/Footer";
import { FloxNavigation } from "@/components/FloxNavigation";
import MobileFloatingContact from "@/components/MobileFloatingContact";
import { WhatsAppButton } from "@/components/WhatsAppButton";

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
      {!isDuesseldorfSection ? <FloxNavigation dic={{}} /> : null}
      <div id="main-content">{children}</div>
      {!isDuesseldorfSection ? <Footer /> : null}
      {!isDuesseldorfSection ? <MobileFloatingContact /> : null}
      {!isDuesseldorfSection ? <WhatsAppButton /> : null}
    </>
  );
}
