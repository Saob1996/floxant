import Link from "next/link";
import { ArrowRight } from "lucide-react";

type LocalSearchService =
  | "umzug"
  | "reinigung"
  | "entruempelung"
  | "bueroumzug"
  | "klaviertransport"
  | "seniorenumzug"
  | "wohnungsaufloesung";

type LocalSearchIntent = {
  title: string;
  text: string;
  href: string;
  label: string;
};

function localSearchIntents({
  service,
  city,
  currentHref,
}: {
  service: LocalSearchService;
  city: string;
  currentHref: string;
}): LocalSearchIntent[] {
  switch (service) {
    case "reinigung":
      return [
        {
          title: `Reinigung nach Umzug ${city}`,
          text: "Nach Auszug oder Einzug sind Küche, Bad, Böden, Fensterbereiche, Zustand und Übergabetermin entscheidend. Fotos machen die Antwort schneller.",
          href: currentHref,
          label: "Reinigung anfragen",
        },
        {
          title: `Putzfirma ${city} ohne langes Suchen`,
          text: "Kunden können einfach sagen, was gereinigt werden soll: Wohnung, Büro, Treppenhaus, Praxis oder Objekt. FLOXANT sortiert den passenden Einstieg.",
          href: currentHref,
          label: "Passenden Einstieg wählen",
        },
        {
          title: `Reinigung für Firmen ${city}`,
          text: "Für Büro, Praxis, Laden, Objekt oder Treppenhaus zählen Fläche, Turnus, Zeitfenster, Zugang und Fotos. So wird aus Suche eine klare Anfrage.",
          href:
            city === "Düsseldorf"
              ? "/duesseldorf/bueroreinigung"
              : city === "Regensburg"
                ? "/bueroreinigung-regensburg"
                : currentHref,
          label: "Firmenreinigung prüfen",
        },
        {
          title: `Angebot Reinigung ${city}`,
          text: "Ein Reinigungsangebot wird erst klar, wenn Fläche, Objektart, Zustand, Zugang, Termin, Fotos und gewünschtes Ergebnis zusammenpassen.",
          href: "/angebot-guenstiger-pruefen",
          label: "Angebot prüfen",
        },
        ...(city === "Regensburg"
          ? [
              {
                title: "Praxisreinigung Regensburg",
                text: "Empfang, Wartebereich, Büro, Personalraum und Sanitär werden nach Fläche, Turnus, Zeitfenster und Fotos eingeordnet.",
                href: "/praxisreinigung-regensburg",
                label: "Praxis anfragen",
              },
              {
                title: "Treppenhausreinigung Regensburg",
                text: "Für Hausverwaltung, Mietshaus oder WEG helfen Eingänge, Etagen, Kellerflur, Turnus, Zugang und Fotos.",
                href: "/treppenhausreinigung-regensburg",
                label: "Treppenhaus prüfen",
              },
            ]
          : []),
        {
          title: `Reinigung ${city} sofort Termin`,
          text: "Kurzfristige Termine werden nach Machbarkeit geprüft. Ort, Fotos, Deadline, Zugang und Prioritäten sollten direkt mitgesendet werden.",
          href: "/notfallreinigung-24h",
          label: "Machbarkeit prüfen",
        },
      ];
    case "entruempelung":
      return [
        {
          title: `Entrümpelungsfirma finden ${city}`,
          text: "Entscheidend sind Menge, Material, Etage, Zugang, Fotos und ob danach Reinigung oder Übergabe vorbereitet werden soll.",
          href: currentHref,
          label: "Entrümpelung prüfen",
        },
        {
          title: `Angebot Entrümpelung ${city}`,
          text: "Ein vorhandenes Angebot wird klarer, wenn Menge, Entsorgungsweg, Laufweg, Zusatzkosten und Termin zusammen geprüft werden.",
          href: "/angebot-guenstiger-pruefen",
          label: "Angebot prüfen",
        },
        {
          title: `Entrümpelung ${city} Angebot prüfen`,
          text: "Wenn schon ein Preis vorliegt, zählen Räume, Menge, Zugang, Freigabe, Fotos, Entsorgung, Endzustand und ob danach Reinigung gebraucht wird.",
          href:
            city === "Regensburg"
              ? "/blog/entruempelung-regensburg-angebot-haushaltsaufloesung-pruefen"
              : "/angebot-guenstiger-pruefen",
          label: "Angebot einordnen",
        },
        {
          title: "Nach Räumung sauber abschließen",
          text: "Wenn die Fläche anschließend übergeben wird, sollten Räumung, Fotos, Reinigung und Schlüssel in derselben Reihenfolge geplant werden.",
          href: "/blog/entruempelungsfirma-finden-regensburg-germering",
          label: "Ratgeber lesen",
        },
        {
          title: `Praxisentrümpelung ${city}`,
          text: "Bei Praxisräumen zählen Freigabe, Möbel, Akten, Wartebereich, Keller, Zugang, Fotos und die Frage, ob danach gereinigt oder übergeben werden soll.",
          href: city === "Nürnberg" ? "/blog/praxisentruempelung-nuernberg-richtig-anfragen" : currentHref,
          label: city === "Nürnberg" ? "Praxis-Ratgeber" : "Praxisfall prüfen",
        },
        {
          title: `Haushaltsauflösung ${city}`,
          text: "Bei Haushalt, Nachlass oder Wohnungsauflösung sollten Räume, Keller, Menge, Fotos, Ansprechpartner, Termin und Endzustand früh geklärt werden.",
          href: city === "Regensburg" ? "/wohnungsaufloesung-regensburg" : currentHref,
          label: "Auflösung einordnen",
        },
        {
          title: "Haushalt auflösen lassen",
          text: "Wenn nicht klar ist, ob Entrümpelung, Entsorgung, Nachlassräumung oder Reinigung gebraucht wird, reicht eine kurze Beschreibung mit Fotos.",
          href:
            city === "Neutraubling"
              ? "/wohnungsaufloesung-neutraubling"
              : city === "Regensburg"
                ? "/wohnungsaufloesung-regensburg"
                : currentHref,
          label: "Haushalt schildern",
        },
        {
          title: `Hausauflösung ${city} einfach starten`,
          text: "Nicht jedes Detail muss sofort perfekt sein. Zimmer, Keller, Fotos, grobe Menge und Termin reichen für den ersten sinnvollen Schritt.",
          href: city === "Regensburg" ? "/blog/haushaltsaufloesung-regensburg-container-mieten-alternative" : currentHref,
          label: "Ersten Schritt klären",
        },
        {
          title: `Container mieten ${city} oder Abholung?`,
          text: "Nicht jeder Fall braucht einen Container. FLOXANT prüft, ob Kleinmengen, Tragearbeit, Entsorgung, Zugang und Reinigung danach sinnvoller zusammenpassen.",
          href: "/kleinmengen-entsorgung",
          label: "Entsorgung prüfen",
        },
      ];
    case "bueroumzug":
      return [
        {
          title: `Büroumzug ${city} Angebot`,
          text: "Bei Büro- und Firmenumzug zählen Arbeitsplätze, IT-nahe Bereiche, Zeitfenster, Zugang, Etage und ein Ablauf, der den Betrieb nicht unnötig stört.",
          href: currentHref,
          label: "Büroumzug prüfen",
        },
        {
          title: `Firmenumzug ${city}`,
          text: "FLOXANT nimmt Teamgröße, Möbel, Kartons, sensible Bereiche, Ansprechpartner und Terminfenster getrennt auf, damit der Umzug planbar bleibt.",
          href: currentHref,
          label: "Firmenumzug ansehen",
        },
        {
          title: `Büroumzug ${city} einfach buchen`,
          text: "Arbeitsplätze, Möbel, Kartons, Etage, Zeitfenster und Ansprechpartner senden. FLOXANT prüft den Ablauf ohne lange Vorbesprechung.",
          href: currentHref,
          label: "Büro-Umzug starten",
        },
        {
          title: `Büroumzug ${city} mit Entsorgung`,
          text: "Wenn alte Möbel, Akten, Technik oder Restmengen mit weg sollen, kann der Firmenumzug direkt mit Entsorgung eingeordnet werden.",
          href: "/firmenentsorgung",
          label: "Entsorgung mitdenken",
        },
        {
          title: "Vorhandenes Angebot einordnen",
          text: "Wenn bereits ein Preis vorliegt, können Umfang, Zusatzleistungen, Zeitfenster und offene Punkte praktisch geprüft werden.",
          href: "/angebot-guenstiger-pruefen",
          label: "Angebot prüfen",
        },
      ];
    case "klaviertransport":
      return [
        {
          title: `Klaviertransport ${city}`,
          text: "Bei Klavier, Piano oder schwerem Instrument zählen Etage, Gewicht, Wege, Schutz, Fahrzeug und Termin besonders stark.",
          href: currentHref,
          label: "Transport prüfen",
        },
        {
          title: "Preisrahmen realistisch klären",
          text: "Fotos von Instrument, Treppe, Hauseingang und Zielort helfen, falsche Pauschalpreise zu vermeiden.",
          href: "/angebot-guenstiger-pruefen",
          label: "Angebot prüfen",
        },
        {
          title: "Mit Umzug kombinieren",
          text: "Wenn Möbel, Kartons und Instrument zusammen geplant werden sollen, wird der Ablauf getrennt nach Aufwand aufgenommen.",
          href: "/umzug",
          label: "Umzug ansehen",
        },
      ];
    case "seniorenumzug":
      return [
        {
          title: `Umzug im Alter ${city}`,
          text: "Für Senioren und Angehörige zählen Ruhe, klare Termine, Abbau, Tragen, Übergabe und ein Ansprechpartner, der die Lage nicht unnötig verkompliziert.",
          href: currentHref,
          label: "Seniorenumzug prüfen",
        },
        {
          title: `Umzugshelfer für Senioren ${city}`,
          text: "Wenn Hilfe beim Packen, Tragen, Sortieren oder bei der Wohnungsübergabe gebraucht wird, sollten Umfang, Fotos und Termin früh geklärt werden.",
          href: "/blog/umzug-im-alter-erlangen-bamberg-fuerth",
          label: "Ratgeber öffnen",
        },
        {
          title: "Angebot oder Preisrahmen schon vorhanden",
          text: "Ein vorhandenes Angebot kann nach Umfang, Laufwegen, Zusatzleistungen und Termin praktisch geprüft werden, ohne Preisgarantie.",
          href: "/angebot-guenstiger-pruefen",
          label: "Angebot prüfen",
        },
      ];
    case "wohnungsaufloesung":
      return [
        {
          title: `Wohnungsauflösung ${city}`,
          text: "Bei Wohnungsauflösung zählen Freigabe, Restmengen, Keller, Balkon, Fotos, Zugang und die Frage, ob danach gereinigt werden muss.",
          href: currentHref,
          label: "Wohnungsauflösung prüfen",
        },
        {
          title: `Haushaltsauflösung ${city}`,
          text: "FLOXANT trennt Räumung, Entsorgung, Übergabe und mögliche Endreinigung, damit nicht am Schluss ein wichtiger Punkt offen bleibt.",
          href: "/wohnungsaufloesung-bayern",
          label: "Ablauf ansehen",
        },
        {
          title: "Angebot oder fremde Einschätzung prüfen",
          text: "Wenn bereits ein Preis oder eine Zusage vorliegt, können Umfang, Menge, Zusatzkosten und Termin praktisch eingeordnet werden.",
          href: "/angebot-guenstiger-pruefen",
          label: "Angebot prüfen",
        },
      ];
    case "umzug":
    default:
      return [
        {
          title: `Günstiger Umzug ${city}`,
          text: "Preiswert ist nur hilfreich, wenn Volumen, Etage, Laufweg, Haltezone, Termin und Zusatzleistungen realistisch im Angebot stehen.",
          href: "/blog/guenstiger-umzug-angebot-preiswert-pruefen",
          label: "Preislogik lesen",
        },
        {
          title: `Umzug ${city} direkt starten`,
          text: "Sie müssen nicht alles perfekt vorbereiten. Start, Ziel, grobe Menge, Termin und Fotos reichen für die erste sinnvolle Prüfung.",
          href: "/buchung#buchungssystem",
          label: "Jetzt Anfrage senden",
        },
        {
          title: `Umzugsservice Angebot ${city}`,
          text: "FLOXANT prüft Ort, Strecke, Möbelmenge, Zugang, Helferbedarf, Rückfahrt und Übergabe, bevor ein Angebot sinnvoll verglichen wird.",
          href: "/angebot-guenstiger-pruefen",
          label: "Angebot prüfen",
        },
        {
          title: `Umzug mit Abbau ${city}`,
          text: "Wenn Schrank, Bett, Küchenmodule oder Büromöbel abgebaut werden müssen, sollten Fotos und Anzahl direkt mitgesendet werden.",
          href: currentHref,
          label: "Abbau mit angeben",
        },
        {
          title: `Komplettumzug ${city}`,
          text: "Transport, Tragen, Abbau, Reinigung, Restmengen und Übergabe können als Ablauf zusammen gedacht werden, wenn die Eckdaten klar sind.",
          href: "/umzug-mit-reinigung",
          label: "Komplettweg ansehen",
        },
        {
          title: `Umzug ${city} preiswert planen`,
          text: "Manchmal wird es günstiger, wenn Leistungen sauber getrennt, Fotos gesendet oder Strecke und Rückfahrt besser geplant werden.",
          href: currentHref,
          label: "Lokale Seite nutzen",
        },
        {
          title: `Umzug ${city} Festpreis`,
          text: "Ein Festpreis ist nur belastbar, wenn Volumen, Etage, Laufweg, Haltezone, Termin, Zusatzleistungen und Fotos vorab wirklich geprüft sind.",
          href: "/angebot-guenstiger-pruefen",
          label: "Festpreis prüfen",
        },
        {
          title: `Umzugsangebot ${city} prüfen`,
          text: "Ein Angebot wird vergleichbar, wenn Start/Ziel, Volumen, Fotos, Etage, Laufweg, Strecke, Haltezone, Termin und Zusatzleistungen sichtbar sind.",
          href:
            city === "München"
              ? "/blog/umzugsangebot-muenchen-pruefen-festpreis-guenstiger"
              : "/angebot-guenstiger-pruefen",
          label: "Angebot prüfen",
        },
        {
          title: `Umzug organisieren ${city}`,
          text: "Wer den Umzug noch sortiert, sollte zuerst Start/Ziel, Volumen, Zeitfenster, Helferbedarf, Reinigung, Entsorgung und Übergabe in eine klare Reihenfolge bringen.",
          href: "/blog/umzug-planen-schritt-fuer-schritt",
          label: "Ablauf planen",
        },
        {
          title: `Fernumzug ${city}`,
          text: "Bei längeren Strecken entscheiden Route, Rückfahrt, Ladevolumen, Terminfenster, Zugang und die Frage, ob Reinigung oder Entrümpelung mitgedacht werden muss.",
          href: "/blog/fernumzug-bayern-nrw-tipps",
          label: "Fernumzug lesen",
        },
      ];
  }
}

export function LocalSeoSearchIntentBridge({
  service,
  city,
  currentHref,
}: {
  service: LocalSearchService;
  city: string;
  currentHref: string;
}) {
  const intents = localSearchIntents({ service, city, currentHref });

  return (
    <section className="flox-section px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 max-w-3xl">
          <div className="text-[10px] font-black uppercase tracking-normal text-blue-700">
            Häufige Suchwege
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-slate-950 md:text-4xl">
            Wählen, klicken, kurz schildern: Anfrage in {city} starten
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Viele Kunden suchen nicht nach einer perfekten Fachbezeichnung, sondern nach
            schneller Hilfe, Preis, Angebot, Reinigung, Umzug, Auflösung oder einem Termin.
            Diese Einstiege sind bewusst einfach formuliert und führen direkt zu Anfrage,
            Preisrahmen oder Angebotsprüfung.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {intents.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-[0.95rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-950/10"
            >
              <h3 className="text-lg font-black leading-snug text-slate-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                {item.label}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
