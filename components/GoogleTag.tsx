"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  configureGoogleTag,
  GOOGLE_TAG_ID,
  initializeGoogleTag,
  type GoogleConsentPreferences,
  updateGoogleConsent,
} from "@/lib/analytics/google-tag";

function isPrivatePath(pathname: string) {
  return (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login")
  );
}

export function GoogleTag() {
  const pathname = usePathname();
  const privatePath = isPrivatePath(pathname);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    if (privatePath) {
      setAnalyticsAllowed(false);
      return;
    }

    const storedConsent = initializeGoogleTag();
    setAnalyticsAllowed(storedConsent.analytics === true);

    function handleConsentUpdate(event: Event) {
      const preferences =
        event instanceof CustomEvent
          ? (event.detail as GoogleConsentPreferences)
          : initializeGoogleTag();

      updateGoogleConsent(preferences);
      setAnalyticsAllowed(preferences.analytics === true);
    }

    window.addEventListener("cookie_consent_updated", handleConsentUpdate);
    return () => window.removeEventListener("cookie_consent_updated", handleConsentUpdate);
  }, [privatePath]);

  if (privatePath || !analyticsAllowed) return null;

  return (
    <Script
      id="floxant-google-tag"
      src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
      strategy="afterInteractive"
      onLoad={() => {
        configureGoogleTag();
      }}
      onReady={() => {
        configureGoogleTag();
      }}
    />
  );
}
