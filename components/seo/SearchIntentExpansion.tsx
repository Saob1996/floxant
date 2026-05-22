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

  const groups = [
    {
      title: "Direkte Suche",
      text: "Kurze Begriffe helfen beim Einstieg. Danach braucht der Auftrag aber Kontext, damit die Anfrage wirklich passt.",
      Icon: SearchCheck,
      items: profile.shortTail,
    },
    {
      title: "Konkrete Situationen",
      text: "Diese längeren Anfragen sind näher an einer echten Entscheidung und führen schneller zum passenden Kontaktweg.",
      Icon: ListChecks,
      items: profile.longTail,
    },
    {
      title: "Lokale Auslöser",
      text: "Ort, Zugang und Umgebung verändern den Aufwand oft stärker als die reine Leistungsbezeichnung.",
      Icon: MapPin,
      items: profile.localTriggers,
    },
    {
      title: "Preis und Aufwand",
      text: "Ein realistischer Rahmen entsteht erst, wenn die wichtigsten Kostentreiber gemeinsam betrachtet werden.",
      Icon: Banknote,
      items: profile.priceSignals,
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
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.65rem)] font-bold tracking-tight text-slate-950">
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
                className="flex min-h-[25rem] flex-col rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_20px_56px_rgba(15,23,42,0.07)]"
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

        <div className="mt-5 grid gap-4 rounded-[1.8rem] border border-blue-100 bg-[linear-gradient(135deg,#eff6ff,#ffffff)] p-5 shadow-sm shadow-slate-950/5 md:grid-cols-[1fr_auto] md:items-center">
          <p className="text-sm leading-7 text-slate-700">
            Der beste Klick ist der, der direkt zur passenden Hauptseite führt. Diese klaren Wege
            verbinden die Suchsituation mit Anfrage, Preisrahmen, Angebot oder Kontakt.
          </p>
          <div className="flex flex-wrap gap-2 md:justify-end">
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
