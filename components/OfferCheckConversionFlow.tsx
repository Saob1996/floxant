"use client";

import { useCallback, useState } from "react";
import { Scale, UploadCloud } from "lucide-react";

import { OfferCheckForm } from "@/components/OfferCheckForm";
import { ClarityCheckTool } from "@/components/tools/ClarityCheckTool";
import type { ClarityCheckResult } from "@/lib/clarity-check";

export function OfferCheckConversionFlow() {
  const [scannerResult, setScannerResult] = useState<ClarityCheckResult | null>(null);
  const handleResultChange = useCallback((result: ClarityCheckResult) => {
    setScannerResult(result);
  }, []);

  return (
    <>
      <section id="klarheitscheck" className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <ClarityCheckTool
            locale="de"
            contactHref="/kontakt?service=angebot-pruefen&intent=klarheitscheck&source=klarheitscheck"
            formTargetId="angebotscheck-form"
            onResultChange={handleResultChange}
          />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Zweite Einschaetzung</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Scanner-Ergebnis, Angebot oder Fotos an FLOXANT senden
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Nutzen Sie den Scanner ohne Upload oder senden Sie direkt PDF, Screenshot, Angebotstext und Fotos.
              FLOXANT prueft organisatorisch und praktisch, welche Punkte vor einer Zusage geklaert sein sollten.
            </p>
            {scannerResult?.completed ? (
              <div className="mt-6 rounded-[1.5rem] border border-blue-200 bg-blue-50 p-5 text-sm leading-7 text-blue-950">
                <p className="font-black">Uebernommenes Scanner-Ergebnis</p>
                <p className="mt-2">
                  {scannerResult.scoreLabel}. Dieses Ergebnis wird beim ausdrücklichen Absenden als Klarheitscheck-Zusammenfassung in der bestehenden Angebotsanfrage gespeichert.
                </p>
              </div>
            ) : null}
            <div className="mt-6 grid gap-3 text-sm leading-7 text-slate-700">
              <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
                <UploadCloud className="mb-2 h-5 w-5 text-blue-700" />
                Angebote und Fotos werden nur für Ihre Anfrage genutzt. Sensible Daten können Sie nach persönlicher Abstimmung ergänzen.
              </div>
              <div className="rounded-[1.25rem] border border-slate-200 bg-white p-4">
                <Scale className="mb-2 h-5 w-5 text-blue-700" />
                Der Scanner ist praktische Orientierung vor der Zusage, keine Rechtsberatung und keine
                Anbieterbewertung.
              </div>
            </div>
          </div>
          <OfferCheckForm redFlagResult={scannerResult} />
        </div>
      </section>
    </>
  );
}
