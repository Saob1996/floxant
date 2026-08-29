"use client";

import dynamic from "next/dynamic";

const MobileFloatingContact = dynamic(() => import("@/components/MobileFloatingContact"), {
  ssr: false,
});

export function DeferredSiteWidgets({ showFloatingContact }: { showFloatingContact: boolean }) {
  return showFloatingContact ? <MobileFloatingContact /> : null;
}
