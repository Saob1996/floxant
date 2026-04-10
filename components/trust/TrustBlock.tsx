"use client";

import React from "react";
import { Star, Users, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBlockProps {
  locationHint?: string;
  className?: string;
  dic?: any;
}

export default function TrustBlock({
  locationHint,
  className = "",
  dic,
}: TrustBlockProps) {
  const trust = dic?.trust || {};

  const locationText = locationHint?.trim()
    ? (trust.location_template || "").replace("{location}", locationHint.trim())
    : trust.location_generic || "";

  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-4 md:grid-cols-3",
        className
      )}
    >
      <TrustCard>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0B0D12] shadow-sm">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.5 12.27c0-.85-.08-1.68-.22-2.48H12v4.61h6.53c-.28 1.54-1.14 2.85-2.43 3.71v3.08h3.93c2.3-2.12 3.63-5.24 3.63-8.92z"
              fill="#4285F4"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.93-3.08c-1.07.72-2.45 1.15-4 1.15-3.07 0-5.67-2.07-6.6-4.86H1.34v3.2C3.33 21.46 7.37 24 12 24z"
              fill="#34A853"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.4 14.31A6.98 6.98 0 015 12c0-.8.14-1.58.4-2.31V6.49H1.34A11.97 11.97 0 000 12c0 1.93.46 3.77 1.34 5.51l4.06-3.2z"
              fill="#FBBC05"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 4.83c1.76 0 3.34.6 4.58 1.78l3.43-3.43C17.95 1.22 15.24 0 12 0 7.37 0 3.33 2.54 1.34 6.49l4.06 3.2c.93-2.79 3.53-4.86 6.6-4.86z"
              fill="#EA4335"
            />
          </svg>
        </div>

        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-0.5 text-yellow-400">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={12} fill="currentColor" />
            ))}
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
            {trust.google_reviews || ""}
          </p>
          <span className="text-[11px] leading-relaxed text-white/45">
            {trust.google_reviews_desc || ""}
          </span>
        </div>
      </TrustCard>

      <TrustCard>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-400/15 bg-blue-400/10 text-blue-300">
          <Users size={18} />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
            {trust.personal_consultation || ""}
          </p>
          <span className="text-[11px] leading-relaxed text-white/45">
            {trust.personal_consultation_desc || ""}
          </span>
        </div>
      </TrustCard>

      <TrustCard>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-400/15 bg-emerald-400/10 text-emerald-300">
          <MapPin size={18} />
        </div>

        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white">
              {trust.regional_active || ""}
            </p>
          </div>
          <span className="line-clamp-2 text-[11px] leading-relaxed text-white/45">
            {locationText}
          </span>
        </div>
      </TrustCard>
    </div>
  );
}

function TrustCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 rounded-[22px] border border-white/10 bg-[#11131A] p-4 transition-colors hover:bg-white/[0.03]">
      {children}
    </div>
  );
}