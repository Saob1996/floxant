"use client";

import MobileFloatingContact from "@/components/MobileFloatingContact";

export function DeferredSiteWidgets({ showFloatingContact }: { showFloatingContact: boolean }) {
  return showFloatingContact ? <MobileFloatingContact /> : null;
}
