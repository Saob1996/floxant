"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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

export function DeferredSiteWidgets({ showFloatingContact }: { showFloatingContact: boolean }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    const activate = () => setReady(true);
    const timeout = window.setTimeout(activate, 15000);
    const events: Array<keyof WindowEventMap> = ["scroll", "pointerdown", "keydown", "touchstart"];

    for (const eventName of events) {
      window.addEventListener(eventName, activate, { once: true, passive: true });
    }

    return () => {
      window.clearTimeout(timeout);
      for (const eventName of events) {
        window.removeEventListener(eventName, activate);
      }
    };
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      {showFloatingContact ? <MobileFloatingContact /> : null}
      {showFloatingContact ? <WhatsAppButton /> : null}
      <PlanGekipptTrigger />
    </>
  );
}
