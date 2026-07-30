import Link from "next/link";
import { ArrowRight, CheckCircle2, Home, PackageOpen, ShieldCheck } from "lucide-react";

export function RegensburgClearanceDecisionGuide() {
  const choices = [
    {
      icon: PackageOpen,
      title: "Entrümpelung",
      text: "Passt, wenn vor allem bestimmte Räume, Möbel oder Restmengen entfernt werden sollen. Menge, Material, Etage, Laufweg und gewünschter Endzustand stehen im Mittelpunkt.",
      href: "/regensburg/entruempelung",
      label: "Entrümpelung ansehen",
    },
    {
      icon: Home,
      title: "Wohnungsauflösung",
      text: "Passt, wenn eine ganze Wohnung nach Auszug, Nachlass oder Leerstand geordnet aufgelöst wird. Freigaben, persönliche Dinge, Ansprechpartner und Übergabeziel gehören dazu.",
      href: "/regensburg/wohnungsaufloesung",
      label: "Wohnungsauflösung ansehen",
    },
  ] as const;

  return (
    <section className="border-y border-slate-200 bg-white px-5 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-cyan-800">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Welche Leistung passt?
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 sm:text-5xl">
            Entrümpelung und Wohnungsauflösung klar unterscheiden
          </h2>
          <p className="mt-4 text-base font-semibold leading-8 text-slate-700">
            Beide Leistungen können sich überschneiden, haben aber nicht dieselbe Aufgabe. Beschreiben Sie, ob einzelne
            Mengen entfernt oder eine Wohnung vollständig geordnet werden soll. Eine rechtliche Freigabe, Bewertung oder
            Nachlassberatung ersetzt FLOXANT nicht.
          </p>
          <ul className="mt-6 grid gap-3 text-sm font-bold leading-7 text-slate-700">
            {[
              "Fotos von Räumen, Gegenständen, Treppen und Laufwegen ergänzen",
              "klar festhalten, was bleibt und was entfernt werden soll",
              "Endzustand, Termin, Schlüsselweg und Ansprechpartner nennen",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-700" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {choices.map(({ icon: Icon, title, text, href, label }) => (
            <article key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              <Icon className="h-7 w-7 text-cyan-700" aria-hidden="true" />
              <h3 className="mt-4 text-2xl font-black tracking-normal text-slate-950">{title}</h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{text}</p>
              <Link href={href} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-black text-cyan-800">
                {label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
