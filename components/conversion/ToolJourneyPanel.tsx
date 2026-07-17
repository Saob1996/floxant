import Link from "next/link";
import { ArrowRight, ClipboardCheck, Compass, FileText } from "lucide-react";

type ToolJourneyPanelProps = {
  locale?: "de" | "en";
  region?: "duesseldorf" | "regensburg" | "both";
  intent?: "overview" | "cleaning" | "moving" | "clearance" | "quote";
};

const iconById = {
  finder: Compass,
  brief: FileText,
  check: ClipboardCheck,
} as const;

export function ToolJourneyPanel({ locale = "de", region = "both", intent = "overview" }: ToolJourneyPanelProps) {
  const isGerman = locale === "de";
  const routes = isGerman
    ? { finder: "/leistungsfinder", brief: "/objektbrief", check: "/angebotscheck" }
    : { finder: "/en/service-finder", brief: "/en/create-request", check: "/en/quote-check" };
  const titles = isGerman
    ? { finder: "Leistung einordnen", brief: "Anfragebrief erstellen", check: "Angebotsumfang prüfen" }
    : { finder: "Find the service", brief: "Create a request brief", check: "Check a quote scope" };
  const descriptions = isGerman ? {
    overview: {
      finder: "Region, Aufgabe und Auftragssituation auswählen, ohne dutzende Leistungsseiten durchsuchen zu müssen.",
      brief: "Ort, Umfang, Zugang und Termin in einen kopierbaren Anfragebrief bringen.",
      check: "Ein vorhandenes Angebot anhand klar getrennter Leistungsdetails auf offene Angaben prüfen.",
    },
    cleaning: {
      finder: "Unterscheiden Sie einmalige, regelmäßige, private und gewerbliche Reinigung.",
      brief: "Objektart, Fläche, Bereiche, Turnus und Zugang geordnet für die Anfrage vorbereiten.",
      check: "Leistungsumfang, Material, Zeitfenster und Zusatzpositionen eines Angebots klären.",
    },
    moving: {
      finder: "Umzug und passende Ergänzungen für Regensburg sachlich einordnen.",
      brief: "Start, Ziel, Etagen, Möbelumfang, Zugang und Termin strukturiert zusammenstellen.",
      check: "Umfang, Montage, Verpackung und mögliche Zusatzpositionen vor der Zusage klären.",
    },
    clearance: {
      finder: "Räumung, Entrümpelung und Wohnungsauflösung anhand des Anliegens unterscheiden.",
      brief: "Bereiche, Inventar, Zugang, Endzustand und Termin in einem Anfragebrief festhalten.",
      check: "Enthaltene Arbeiten, Entsorgungsgrenzen und Zusatzleistungen nachvollziehen.",
    },
    quote: {
      finder: "Prüfen, welche Hauptleistung hinter dem vorhandenen Angebot steht.",
      brief: "Fehlende Objekt- und Auftragsdaten für eine konkrete Rückfrage zusammenstellen.",
      check: "Zwölf sachlich getrennte Bereiche markieren und passende Rückfragen erzeugen.",
    },
  } : {
    overview: {
      finder: "Choose the region, type of work and request situation without searching through dozens of pages.",
      brief: "Turn location, scope, access and timing into a request brief you can review and copy.",
      check: "Review an existing quote for open scope details before you decide.",
    },
    cleaning: {
      finder: "Distinguish between one-off, recurring, private and business cleaning.",
      brief: "Organise the property type, area, required tasks, frequency and access.",
      check: "Clarify service scope, materials, time windows and possible extras in a quote.",
    },
    moving: {
      finder: "Match a Regensburg move with relevant existing service information.",
      brief: "Structure the origin, destination, floors, furniture, access and preferred date.",
      check: "Clarify scope, assembly, packing and possible extra positions before accepting.",
    },
    clearance: {
      finder: "Distinguish clearance, house clearance and related cleaning needs.",
      brief: "Organise areas, inventory, access, final condition and timing in one brief.",
      check: "Review included work, disposal boundaries and possible additional services.",
    },
    quote: {
      finder: "Identify the main service behind an existing quote.",
      brief: "Collect missing property and request details for a specific follow-up.",
      check: "Mark twelve distinct scope areas and generate practical follow-up questions.",
    },
  };
  const order = intent === "overview" ? ["finder", "brief", "check"] as const : intent === "quote" ? ["check", "brief", "finder"] as const : ["brief", "check", "finder"] as const;
  const regionLabel = region === "duesseldorf" ? "Düsseldorf" : region === "regensburg" ? "Regensburg" : isGerman ? "Düsseldorf und Regensburg" : "Düsseldorf and Regensburg";

  return (
    <section className="border-y border-slate-200 bg-slate-50 px-5 py-14 sm:px-8 lg:px-10" aria-labelledby={`tool-journey-${locale}-${region}-${intent}`}>
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-blue-700">{isGerman ? `Nächster Schritt · ${regionLabel}` : `Next step · ${regionLabel}`}</p>
        <h2 id={`tool-journey-${locale}-${region}-${intent}`} className="mt-3 max-w-4xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
          {isGerman ? "Nicht mehr suchen als nötig: passend einordnen und vorbereiten." : "Spend less time searching: match and prepare the request."}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {order.map((id, index) => {
            const Icon = iconById[id];
            return (
              <article key={id} className={`flex flex-col rounded-2xl border p-6 ${index === 0 ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white"}`}>
                <Icon className="h-6 w-6 text-blue-700" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-black text-slate-950">{titles[id]}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{descriptions[intent][id]}</p>
                <Link href={routes[id]} className="mt-auto inline-flex min-h-12 items-center gap-2 pt-5 text-sm font-black text-blue-700 hover:underline">
                  {titles[id]} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
