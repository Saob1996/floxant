import { ShieldCheck } from "lucide-react";

import { germanText, germanizeDeep } from "@/lib/german-text";

const included = germanizeDeep([
  "Preispositionen und Leistungsumfang organisatorisch einordnen",
  "offene Zusatzkosten oder fehlende Angaben sichtbar machen",
  "Rueckfragen fuer Reinigung, Umzug, Entruempelung oder PV-Reinigung formulieren",
  "naechsten sinnvollen Kontaktweg empfehlen",
]);

const excluded = germanizeDeep([
  "keine Rechtsberatung",
  "keine Preisgarantie",
  "keine Garantie, dass es guenstiger wird",
  "keine Bewertung oder Diffamierung anderer Anbieter",
]);

export function OfferCheckScopeBoundary() {
  return (
    <section className="px-4 py-12 sm:px-6" data-component="OfferCheckScopeBoundary">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
        <BoundaryList title="Was FLOXANT prüft" items={included} tone="positive" />
        <BoundaryList title="Was FLOXANT nicht verspricht" items={excluded} tone="caution" />
      </div>
    </section>
  );
}

function BoundaryList({ title, items, tone }: { title: string; items: string[]; tone: "positive" | "caution" }) {
  const classes = tone === "positive" ? "border-emerald-200 bg-emerald-50 text-emerald-950" : "border-amber-200 bg-amber-50 text-amber-950";
  return (
    <article className={`rounded-lg border p-6 ${classes}`}>
      <h3 className="text-2xl font-black tracking-normal">{germanText(title, title)}</h3>
      <div className="mt-5 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm font-bold leading-7">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{germanText(item, item)}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
