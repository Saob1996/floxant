import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

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
  title = "Vertrauen durch pruefbare Schritte",
  intro = "FLOXANT zeigt konkrete Anfrage-, Pruef- und Rueckfragepunkte und keine Sterne, Garantien oder erfundenen Referenzen.",
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
            Trust Proof
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal sm:text-5xl">{title}</h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{intro}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {signals.map((signal) => (
            <article key={signal.key} className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <ShieldCheck className="h-5 w-5 text-blue-700" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-black text-slate-950">{signal.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-7 text-slate-700">{signal.shortText}</p>
              {signal.needsManualProof ? (
                <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold leading-5 text-amber-950">
                  Manuelle Pruefung bleibt offen: echte GBP-, Review- oder Standortdaten werden nicht geraten.
                </p>
              ) : null}
              <Link href={signal.cta.href} className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                {signal.cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
