import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { germanText } from "@/lib/german-text";
import { selectTrustSignals, type TrustLocationKey, type TrustProofType } from "@/lib/trust-proof";

type TrustProofPanelProps = {
  title?: string;
  intro?: string;
  serviceKey?: string;
  locationKey?: TrustLocationKey;
  signatureServiceKey?: string;
  proofType?: TrustProofType;
  allowedPage?: string;
  maxItems?: number;
  className?: string;
};

export function TrustProofPanel({
  title = "Vertrauen durch prüfbare Schritte",
  intro = "Sie sehen, welche Angaben helfen, was wir prüfen und welche Grenzen für die Leistung gelten.",
  serviceKey,
  locationKey,
  signatureServiceKey,
  proofType,
  allowedPage,
  maxItems = 4,
  className = "",
}: TrustProofPanelProps) {
  const signals = selectTrustSignals({
    serviceKey,
    locationKey,
    signatureServiceKey,
    proofType,
    allowedPage,
    limit: maxItems,
  });

  if (!signals.length) return null;

  return (
    <section className={`bg-white px-5 py-14 text-slate-950 sm:px-8 lg:px-10 ${className}`} data-component="TrustProofPanel">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-blue-700">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Was Sie erwarten können
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{germanText(title, title)}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{germanText(intro, intro)}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {signals.map((signal) => (
            <article
              key={signal.key}
              className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm"
              data-risk-level={signal.riskLevel}
              data-visible-if-data-confirmed={signal.visibleIfDataConfirmed}
            >
              <ShieldCheck className="h-5 w-5 text-blue-700" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-black text-slate-950">{germanText(signal.title, signal.title)}</h3>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{germanText(signal.shortText, signal.shortText)}</p>
              <Link href={signal.cta.href} className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                {germanText(signal.cta.label, signal.cta.label)}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
