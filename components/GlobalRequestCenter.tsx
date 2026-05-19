"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { InquiryIntentModal } from "@/components/inquiry/InquiryIntentModal";
import type { InquiryIntent, InquiryRegion } from "@/components/inquiry/inquiry-config";

type RequestCenterDetail = {
  intent?: InquiryIntent | "anfrage" | "budget" | "rechner" | "upload";
  service?: "umzug" | "reinigung" | "entsorgung" | "move" | "cleaning" | "clearance";
  region?: InquiryRegion;
};

const requestCenterEventName = "floxant:open-request-center";

function normalizeIntent(detail: RequestCenterDetail): InquiryIntent {
  if (detail.intent === "move" || detail.service === "umzug" || detail.service === "move") return "move";
  if (detail.intent === "cleaning" || detail.service === "reinigung" || detail.service === "cleaning") return "cleaning";
  if (detail.intent === "clearance" || detail.service === "entsorgung" || detail.service === "clearance") return "clearance";
  if (detail.intent === "offer-check" || detail.intent === "upload") return "offer-check";
  return "express";
}

export function openRequestCenter(detail: RequestCenterDetail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(requestCenterEventName, { detail }));
}

export function GlobalRequestCenter() {
  const pathname = usePathname();
  const [intent, setIntent] = useState<InquiryIntent | null>(null);
  const [region, setRegion] = useState<InquiryRegion | undefined>();
  const [open, setOpen] = useState(false);

  const isPrivatePath =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/login");

  useEffect(() => {
    if (isPrivatePath) return;

    function handleOpen(event: Event) {
      const detail = (event as CustomEvent<RequestCenterDetail>).detail || {};
      setIntent(normalizeIntent(detail));
      setRegion(detail.region);
      setOpen(true);
    }

    window.addEventListener(requestCenterEventName, handleOpen);
    return () => window.removeEventListener(requestCenterEventName, handleOpen);
  }, [isPrivatePath]);

  if (isPrivatePath) return null;

  return (
    <InquiryIntentModal
      intent={intent}
      open={open}
      initialRegion={region}
      onClose={() => setOpen(false)}
    />
  );
}
