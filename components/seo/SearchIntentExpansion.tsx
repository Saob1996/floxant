import Link from "next/link";
import { ArrowRight, Banknote, ListChecks, MapPin, SearchCheck } from "lucide-react";

import {
  buildSearchIntentProfile,
  type SearchIntentLink,
} from "@/lib/search-intent-keywords";
import { cn } from "@/lib/utils";

type SearchIntentExpansionProps = {
  route?: string;
  city?: string;
  serviceName?: string;
  market?: "regensburg" | "duesseldorf";
  relatedLinks?: readonly SearchIntentLink[];
  className?: string;
};

export function SearchIntentExpansion({
  route,
  city,
  serviceName,
  market,
  relatedLinks,
  className,
}: SearchIntentExpansionProps) {
  const profile = buildSearchIntentProfile({ route, city, serviceName, market, relatedLinks });
  const localLabel = `${profile.serviceName} in ${profile.city}`;

  const groups = [
    {
      title: "Anliegen kurz schildern",
      text: "Sie müssen nicht wissen, wie die Leistung fachlich heißt. Beschreiben Sie einfach, was vor Ort passieren soll und bis wann eine Rückmeldung hilft.",
      Icon: SearchCheck,
      items: [
        `${localLabel} unverbindlich anfragen`,
        "Ort oder PLZ nennen",
        "Objekt und gewünschtes Ergebnis beschreiben",
        "Termin, Deadline oder Rückrufwunsch angeben",
      ],
    },
    {
      title: "Aus welchem Anlass?",
      text: "Oft beginnt die Anfrage mit einem konkreten Moment: Auszug, Übergabe, Terminnot, Leerstand, laufende Reinigung oder einem Angebot, das geprüft werden soll.",
      Icon: ListChecks,
      items: [
        "Auszug, Übergabe oder Mieterwechsel vorbereiten",
        "laufende Reinigung oder einmalige Hilfe anfragen",
        "kurzfristigen Termin auf Machbarkeit prüfen lassen",
        "vorhandenes Angebot sachlich prüfen lassen",
      ],
    },
    {
      title: "Ort, Zugang und Fotos",
      text: "Adresse, Etage, Laufweg, Parken, Schlüsselweg und Zeitfenster entscheiden oft darüber, ob ein Einsatz sinnvoll geplant werden kann.",
      Icon: MapPin,
      items: [
        "Stadtteil, Straße oder PLZ senden",
        "Etage, Aufzug, Laufweg und Parken nennen",
        "Zugang, Schlüsselweg oder Ansprechpartner klären",
        "Fotos von Räumen, Böden, Treppenhaus oder Restmengen ergänzen",
      ],
    },
    {
      title: "Budget oder Angebot",
      text: "Ein Preisrahmen wird erst hilfreich, wenn Umfang, Zustand, Zugang, Termin und gewünschtes Ergebnis zusammen betrachtet werden.",
      Icon: Banknote,
      items: [
        "Fläche, Räume, Volumen oder Menge grob angeben",
        "Zustand und besondere Stellen ehrlich beschreiben",
        "Budgetrahmen optional nennen",
        "vorhandenes Angebot als Foto, PDF oder Text senden",
      ],
    },
  ];

  return (
    <section id="suchanliegen" className={cn("flox-section py-16", className)}>
      <div className="flox-shell">
        <div className="mb-8 grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <div className="flox-kicker">
              <SearchCheck className="h-4 w-4" />
              {profile.eyebrow}
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-normal text-slate-950 md:text-5xl">
              {profile.title}
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-700 lg:ml-auto">
            {profile.intro}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {groups.map((group) => {
            const Icon = group.Icon;
            return (
              <article
                key={group.title}
                className="flex min-h-[22rem] min-w-0 flex-col rounded-[1rem] border border-slate-200 bg-white p-6 shadow-[0_20px_56px_rgba(15,23,42,0.07)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-blue-100 bg-blue-50 text-blue-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-950">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{group.text}</p>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-slate-800">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <div className="mt-5 grid gap-4 rounded-[1.8rem] border border-blue-100 bg-[linear-gradient(135deg,#eff6ff,#ffffff)] p-5 shadow-sm shadow-slate-950/5 md:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
          <p className="max-w-3xl text-sm leading-7 text-slate-700">
            Am schnellsten wird es klar, wenn Sie den Weg wählen, der gerade zu Ihrer Situation
            passt: Anfrage senden, Budget nennen, Angebot prüfen oder Fotos per WhatsApp schicken.
          </p>
          <div className="flex flex-wrap gap-2 xl:justify-end">
            {profile.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-xs font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
              >
                {link.label}
                <ArrowRight className="h-3.5 w-3.5 text-blue-700" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
