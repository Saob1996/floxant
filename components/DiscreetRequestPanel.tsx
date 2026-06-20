import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

const discreetSituations = [
  "diskreter Umzug",
  "diskrete Entruempelung",
  "Haushaltsaufloesung nach Todesfall",
  "Trennung/Scheidung",
  "Seniorenumzug",
  "sensible Wohnungssituation",
] as const;

export function DiscreetRequestPanel() {
  const href = "/kontakt?service=diskret-service&city=deutschland&intent=diskret-service&source=discreet";

  return (
    <section className="px-4 py-12 sm:px-6" data-component="DiscreetRequestPanel">
      <div className="mx-auto grid max-w-7xl gap-7 rounded-lg border border-stone-200 bg-white p-6 shadow-sm shadow-stone-950/5 md:p-8 lg:grid-cols-[0.84fr_1.16fr]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal text-stone-600">
            <ShieldCheck className="h-4 w-4" />
            Diskret anfragen
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-stone-950">
            Ruhige Anfrage ohne private Details im ersten Schritt.
          </h2>
          <p className="mt-4 text-base leading-8 text-stone-700">
            Ort, Zeitraum, grober Umfang und bevorzugter Kontaktweg reichen. FLOXANT prueft praktische Machbarkeit ohne Rechtsberatung, Konfliktloesung oder Sicherheitsversprechen.
          </p>
          <Link
            href={href}
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-stone-950 px-5 text-sm font-black text-white transition hover:bg-stone-800"
            data-event="seo_cta_click"
            data-service="diskret-service"
            data-city="deutschland"
            data-page-intent="diskret-service"
            data-priority="p0"
            data-cta-label="Diskret anfragen"
            data-destination={href}
          >
            Diskret anfragen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {discreetSituations.map((item) => (
            <div key={item} className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm font-bold leading-6 text-stone-700">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
