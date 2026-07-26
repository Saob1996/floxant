import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Building2,
  Check,
  MapPin,
  PackageOpen,
  Route,
  Sofa,
  Sparkles,
  Truck,
} from "lucide-react";

const moveTypes = [
  { title: "Kleiner Umzug", text: "Wenige Möbel oder Kartons mit genauer Stückliste.", icon: Boxes },
  { title: "Wohnungsumzug", text: "Hausrat, Kartons, Etagen, Laufwege und Zeitfenster.", icon: Building2 },
  { title: "Familienumzug", text: "Mehrere Räume und ein abgestimmter Ablauf mit klaren Eigenleistungen.", icon: Truck },
  { title: "Möbeltransport", text: "Einzelstücke oder Teilmengen mit Maßen und Zugangsfotos.", icon: Sofa },
] as const;

const combinations = [
  ["Umzug + Reinigung", "/umzug-mit-reinigung"],
  ["Umzug + Entrümpelung", "/regensburg/umzug-reinigung"],
  ["Räumung + Reinigung", "/regensburg/entruempelung"],
  ["Umzug + Möbelmontage", "/regensburg/umzug"],
  ["Umzug + Klaviertransport", "/klaviertransport-regensburg"],
] as const;

export function RegensburgAuthorityModules() {
  return (
    <section aria-labelledby="regensburg-route-heading" className="border-y border-slate-200 bg-slate-50 px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-cyan-900">Von Regensburg nach …</p>
            <h2 id="regensburg-route-heading" className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
              Start, Ziel und Zugang zuerst klären.
            </h2>
            <p className="mt-4 font-medium leading-8 text-slate-700">
              Sie können einen Umzug innerhalb Regensburgs, aus Regensburg oder nach
              Regensburg anfragen. Umzüge mit Start oder Ziel im bedienten Regensburger
              Gebiet können auch über längere Strecken von bis zu ungefähr 500 km
              angefragt werden.
            </p>
          </div>
          <ol className="grid gap-3 sm:grid-cols-5">
            {[
              ["Start", "Ort oder PLZ"],
              ["Ziel", "Ort oder PLZ"],
              ["Etagen", "beide Gebäude"],
              ["Aufzug", "ja, nein, unklar"],
              ["Zeitraum", "Wunsch oder Spanne"],
            ].map(([title, text], index) => (
              <li key={title} className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-sm font-black text-cyan-200">{index + 1}</span>
                <p className="mt-3 font-black text-slate-950">{title}</p>
                <p className="mt-1 text-xs font-bold leading-5 text-slate-600">{text}</p>
                {index < 4 ? <Route className="absolute -right-5 top-4 z-10 hidden h-5 w-5 text-cyan-700 sm:block" aria-hidden="true" /> : null}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h3 className="text-2xl font-black text-slate-950">Welcher Umzugstyp passt zu Ihrer Anfrage?</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {moveTypes.map(({ title, text, icon: Icon }) => (
                <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-100 text-cyan-950">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h4 className="mt-4 font-black text-slate-950">{title}</h4>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-700">{text}</p>
                </article>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/regensburg/umzug" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-black text-white">
                Alle Umzugstypen
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/umzug-regensburg/anfrage" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-black text-slate-950">
                Anfrage in zwei Schritten
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <article className="rounded-3xl bg-slate-950 p-6 text-white">
              <p className="text-sm font-black uppercase tracking-[0.1em] text-cyan-200">Leistungen kombinieren</p>
              <h3 className="mt-3 text-2xl font-black">Ein Ablauf statt unklarer Einzelaufträge.</h3>
              <div className="mt-5 grid gap-2">
                {combinations.map(([label, href]) => (
                  <Link key={label} href={href} prefetch={false} className="flex min-h-11 items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-bold text-white outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-200">
                    {label}
                    <ArrowRight className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </article>
            <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
              <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.1em] text-emerald-900">
                <PackageOpen className="h-5 w-5" aria-hidden="true" />
                Übergabe-Ready
              </p>
              <h3 className="mt-3 text-2xl font-black text-emerald-950">Vor dem Schlüsseltermin prüfen.</h3>
              <ul className="mt-4 grid gap-2 text-sm font-bold leading-6 text-emerald-950 sm:grid-cols-2">
                {["Räume leer oder Restpunkte notiert", "Reinigung getrennt abgestimmt", "Schlüsselweg geklärt", "Fotos ohne sensible Daten", "Termin und Ansprechpartner bestätigt", "Zusatzaufgaben ausdrücklich benannt"].map((item) => (
                  <li key={item} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-medium leading-5 text-emerald-900">Organisatorische Checkliste, keine rechtliche Beratung oder Abnahmegarantie.</p>
            </article>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-blue-950">
          <MapPin className="h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="font-semibold">Für eine erste Prüfung reichen Start, Ziel, Etagen, Aufzug, Umfang und gewünschter Zeitraum.</p>
          <Sparkles className="ml-auto h-5 w-5 shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
