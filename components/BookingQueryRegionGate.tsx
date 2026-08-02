"use client";

import type { ReactNode } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

type BookingQueryRegionGateProps = {
  defaultContent: ReactNode;
  duesseldorfContent: ReactNode;
};

function looksLikeDuesseldorf(value: string) {
  const normalized = value.trim().toLowerCase();
  return (
    normalized.includes("duesseldorf") ||
    normalized.includes("düsseldorf") ||
    /\b40[2-6]\d{2}\b/.test(normalized)
  );
}

function BookingQueryRegionGateInner({
  defaultContent,
  duesseldorfContent,
}: BookingQueryRegionGateProps) {
  const searchParams = useSearchParams();
  const queryRegion = [
    searchParams.get("region"),
    searchParams.get("city"),
    searchParams.get("standort"),
  ]
    .filter(Boolean)
    .join(" ");

  return looksLikeDuesseldorf(queryRegion) ? duesseldorfContent : defaultContent;
}

export function BookingQueryRegionGate(props: BookingQueryRegionGateProps) {
  return (
    <Suspense fallback={props.defaultContent}>
      <BookingQueryRegionGateInner {...props} />
    </Suspense>
  );
}
