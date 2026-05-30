"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

import { GOOGLE_ADS_ID } from "@/lib/google-ads-conversions";

type ConsentState = {
  marketing?: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readMarketingConsent() {
  if (typeof window === "undefined") return false;

  try {
    const raw = window.localStorage.getItem("cookie_consent");
    if (!raw) return false;
    if (raw === "all") return true;
    if (!raw.startsWith("{")) return false;

    const parsed = JSON.parse(raw) as ConsentState;
    return parsed.marketing === true;
  } catch {
    return false;
  }
}

export function GoogleAdsTag() {
  const [marketingAllowed, setMarketingAllowed] = useState(false);
  const googleAdsId = GOOGLE_ADS_ID.trim();

  useEffect(() => {
    setMarketingAllowed(readMarketingConsent());

    function handleConsentUpdate(event: Event) {
      const detail = event instanceof CustomEvent ? (event.detail as ConsentState) : undefined;
      setMarketingAllowed(detail?.marketing === true || readMarketingConsent());
    }

    window.addEventListener("cookie_consent_updated", handleConsentUpdate);
    return () => window.removeEventListener("cookie_consent_updated", handleConsentUpdate);
  }, []);

  if (!googleAdsId || !marketingAllowed) return null;

  return (
    <>
      <Script
        id="google-ads-gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAdsId)}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${googleAdsId}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}

