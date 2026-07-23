import { ShieldCheck } from "lucide-react";

export function OfferCheckTrustWithoutGuarantee() {
  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5" data-component="OfferCheckTrustWithoutGuarantee">
      <ShieldCheck className="h-5 w-5 text-blue-700" />
      <h3 className="mt-4 text-lg font-black text-slate-950">Vertrauen ohne Garantie-Sprache</h3>
      <p className="mt-2 text-sm leading-7 text-slate-700">
        FLOXANT prüft sachlich, ob Umfang, Aufwand und nächster Schritt nachvollziehbar sind. Es gibt keine Rechtsberatung, keine Preisgarantie und keine Zusage, dass jedes Angebot günstiger wird.
      </p>
    </aside>
  );
}
