import type { Metadata } from "next";

import { DuesseldorfServicePage } from "@/components/duesseldorf/DuesseldorfServicePage";
import { buildDuesseldorfCleaningMetadata } from "@/lib/duesseldorf-cleaning";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: "/duesseldorf/treppenhausreinigung",
    title: "Treppenhausreinigung Düsseldorf | Treppenreinigung & Hauseingang | FLOXANT",
    description:
      "Treppenhausreinigung Düsseldorf: Treppenreinigung, Reinigung Hauseingang, Hausflurreinigung, Turnus, Etagen und Angebot prüfen.",
  });
}

const treppenhausCustomerIntentItems = [
  {
    searchPhrase: "Treppenhausreinigung Düsseldorf",
    title: "Treppenhaus, Eingang und Etagen getrennt nennen",
    answer:
      "Für eine schnelle Rückmeldung helfen Stadtteil, Etagenzahl, Eingang, Flure, Aufzug, Kellerzugang, Turnus, Fotos und Ansprechpartner.",
    href: "#anfrage-checkliste",
    cta: "Objekt beschreiben",
    signal: "Treppenhaus",
  },
  {
    searchPhrase: "Treppenreinigung Düsseldorf",
    title: "Treppenreinigung ist mehr als Stufen",
    answer:
      "Geländer, Podeste, Laufwege, Hauseingang, Aufzugsvorraum und Kellerflur sollten gemeinsam beschrieben werden.",
    href: "#kontakt",
    cta: "Fotos senden",
    signal: "Treppenreinigung",
  },
  {
    searchPhrase: "Reinigung Hauseingang Düsseldorf",
    title: "Hauseingang prägt den ersten Eindruck",
    answer:
      "Für Hauseingänge zählen Boden, Briefkastenbereich, Glasnähe, Schmutzeintrag, Laub, Straße, Turnus und Zugang.",
    href: "/duesseldorf/gebaeudereinigung",
    cta: "Gebäude prüfen",
    signal: "Hauseingang",
  },
  {
    searchPhrase: "Hausflurreinigung Düsseldorf",
    title: "Hausflur und Kellerzugang mitdenken",
    answer:
      "Flure, Kellerzugang, Aufzug, Müllbereich und Laufwege verändern den Aufwand und sollten nicht im Sammelbegriff verschwinden.",
    href: "#anfrage-checkliste",
    cta: "Bereiche nennen",
    signal: "Hausflur",
  },
] as const;

const treppenhausRequestFields = [
  {
    field: "Ort & Objekt",
    title: "Stadtteil, Adresse und Objektart",
    text: "Düsseldorfer Stadtteil, Mehrfamilienhaus, WEG, Verwaltung, Gewerbeobjekt oder gemischtes Haus kurz nennen.",
  },
  {
    field: "Bereiche",
    title: "Eingang, Stufen, Flure, Aufzug",
    text: "Hauseingang, Treppen, Podeste, Geländer, Aufzugsvorraum, Kellerflur und Müllbereich getrennt aufführen.",
  },
  {
    field: "Turnus",
    title: "Wie oft soll gereinigt werden?",
    text: "Wöchentlich, zweiwöchentlich, monatlich, einmalig oder vor Besichtigung klar angeben.",
  },
  {
    field: "Zugang",
    title: "Schlüsselweg und Hausordnung",
    text: "Schlüssel, Ansprechpartner, Hausordnung, Zeitfenster, Parkmöglichkeit und Beschwerden direkt nennen.",
  },
  {
    field: "Fotos & Angebot",
    title: "Zustand und Vergleich sichtbar machen",
    text: "Fotos von Eingang, Stufen, Geländer, Fluren, Problemstellen oder ein vorhandenes Angebot beschleunigen die Prüfung.",
  },
] as const;

const treppenhausSnippetAnswerItems = [
  {
    query: "Was kostet Treppenhausreinigung in Düsseldorf?",
    title: "Kosten hängen an Etagen und Turnus",
    answer:
      "Kosten hängen von Etagen, Eingang, Fluren, Aufzug, Kellerzugang, Turnus, Verschmutzung, Zugang, Schlüsselweg und Fotos ab.",
    href: "/angebot-vergleichen-duesseldorf",
    cta: "Angebot prüfen",
    signals: ["Treppenhausreinigung Düsseldorf", "Treppenreinigung Düsseldorf Kosten"],
  },
  {
    query: "Was gehört zur Reinigung vom Hauseingang?",
    title: "Eingang, Laufwege und sichtbare Kontaktpunkte",
    answer:
      "Je nach Objekt zählen Boden, Briefkastenbereich, Glasnähe, Türbereich, Podeste, Geländer, Aufzugsvorraum und stark genutzte Laufwege.",
    href: "#anfrage-checkliste",
    cta: "Bereiche senden",
    signals: ["Reinigung Hauseingang Düsseldorf", "Hausflurreinigung Düsseldorf"],
  },
  {
    query: "Kann eine Hausverwaltung Treppenhausreinigung anfragen?",
    title: "Ja, mit Objektliste und Ansprechpartner",
    answer:
      "Hausverwaltungen senden am besten Objekt, Etagen, Turnus, Schlüsselweg, Hausordnung, Fotos und Ansprechpartner. Beschwerden können mit Fotos eingeordnet werden.",
    href: "/duesseldorf/hausverwaltung-reinigung",
    cta: "Verwaltung prüfen",
    signals: ["Hausverwaltung Treppenhausreinigung Düsseldorf", "Treppenhaus reinigen lassen Düsseldorf"],
  },
] as const;

const treppenhausFaqItems = [
  {
    q: "Was kostet Treppenhausreinigung in Düsseldorf?",
    a: "Der Preisrahmen hängt von Etagen, Hauseingang, Fluren, Aufzug, Kellerzugang, Turnus, Verschmutzung, Zugang, Schlüsselweg, Parken und Fotos ab.",
  },
  {
    q: "Ist Treppenreinigung das gleiche wie Treppenhausreinigung?",
    a: "Im Alltag wird es oft gleich genutzt. FLOXANT prüft aber konkret, ob nur Stufen gemeint sind oder auch Eingang, Geländer, Flure, Aufzugsvorraum und Kellerzugang dazugehören.",
  },
  {
    q: "Kann der Hauseingang mitgereinigt werden?",
    a: "Ja, wenn Hauseingang, Briefkastenbereich, Türbereich, Boden, Glasnähe, Schmutzeintrag und Turnus beschrieben werden. Fotos helfen besonders.",
  },
  {
    q: "Welche Angaben sollte eine Hausverwaltung senden?",
    a: "Hilfreich sind Objektadresse oder Stadtteil, Etagen, Eingänge, Flure, Turnus, Schlüsselregelung, Ansprechpartner, Hausordnung, Fotos und besondere Beschwerden.",
  },
  {
    q: "Kann ich ein Treppenhausreinigungsangebot prüfen lassen?",
    a: "Ja. Senden Sie Angebot, Etagen, Turnus, Bereiche, Zugang, Stadtteil, Fotos und offene Zusatzpositionen. FLOXANT prüft sachlich ohne Preisgarantie.",
  },
  {
    q: "Ist eine einmalige Treppenhausreinigung möglich?",
    a: "Eine einmalige Reinigung vor Besichtigung, nach Verschmutzung oder vor Übergabe kann nach Umfang, Fotos, Zugang und Termin geprüft werden.",
  },
] as const;

const treppenhausRelatedLinks = [
  { href: "/duesseldorf/reinigung", label: "Reinigung Düsseldorf" },
  { href: "/duesseldorf/gebaeudereinigung", label: "Gebäudereinigung Düsseldorf" },
  { href: "/duesseldorf/reinigung-heerdt", label: "Reinigung Heerdt" },
  { href: "/duesseldorf/hausverwaltung-reinigung", label: "Hausverwaltung-Reinigung" },
  { href: "/duesseldorf/gewerbeflaechen-reinigung", label: "Gewerbeflächen-Reinigung" },
  { href: "/angebot-vergleichen-duesseldorf", label: "Treppenhaus-Angebot prüfen" },
] as const;

export default function DuesseldorfTreppenhausreinigungPage() {
  return (
    <DuesseldorfServicePage
      path="/duesseldorf/treppenhausreinigung"
      metaDescription="Treppenhausreinigung Düsseldorf: Treppenreinigung, Reinigung Hauseingang, Hausflurreinigung, Turnus, Etagen und Angebot prüfen."
      kicker="FLOXANT Treppenhausreinigung Düsseldorf"
      title="Treppenhausreinigung in Düsseldorf für Treppen, Hausflur und Eingang"
      serviceLabel="Treppenhausreinigung"
      description="Für Treppenhäuser, Eingangsbereiche und gemeinschaftlich genutzte Flächen in Düsseldorf und nahen Orten."
      contentSections={[
        {
          title: "Treppenhausreinigung für Haus, Eingang und Laufwege",
          paragraphs: [
            "Treppenhausreinigung in Düsseldorf betrifft nicht nur Stufen. Eingangsbereich, Geländer, Briefkastenbereich, Aufzugsvorraum, Kellerzugang, Flure und sichtbare Laufwege prägen den Eindruck für Bewohner, Besucher und Hausverwaltung.",
            "Damit eine Anfrage schnell prüfbar ist, helfen Etagenzahl, Turnus, Objektart, Zugang, Fotos und Hinweise zu besonderen Verschmutzungen. Gerade in Mehrfamilienhäusern sind Hausordnung, Zeitfenster und Ansprechpartner wichtig.",
          ],
        },
        {
          title: "Regelmäßigkeit macht den Unterschied",
          paragraphs: [
            "Einmalige Reinigung vor einer Besichtigung ist anders zu planen als wöchentliche oder monatliche Treppenhausreinigung. Auch Herbstlaub, Straßenschmutz, Baustellenstaub oder hoher Publikumsverkehr verändern den Aufwand.",
            "FLOXANT prüft den Bedarf nach Objekt, Stadtteil, Etagen, Zugang und gewünschtem Ergebnis. So bleibt die Leistung klar auf gemeinschaftliche Reinigungsflächen fokussiert.",
          ],
        },
      ]}
      bullets={[
        "Sinnvoll für Eigentümer, Hausverwaltungen oder kleinere Objekte mit regelmäßigem Reinigungsbedarf.",
        "Laufwege, Etagen und sichtbare Eingangsflächen werden im Kontaktweg sauber eingeordnet.",
        "Keine Mischleistung, sondern klare Gebäudereinigung für gemeinschaftliche Bereiche.",
      ]}
      localFocus={["Derendorf", "Pempelfort", "Bilk", "Oberbilk", "Neuss", "Meerbusch"]}
      priceLogic={[
        "Etagen, Eingangsbereich, Aufzugsvorraum, Kellerzugang und gewünschter Turnus bestimmen den Aufwand.",
        "Hausordnung, Zugang, Ansprechpartner und Reinigungszeitfenster müssen vor Start klar sein.",
        "Fotos von Stufen, Geländer, Eingang und Laufwegen helfen bei einer schnellen Einschätzung.",
      ]}
      customerIntentItems={treppenhausCustomerIntentItems}
      requestFieldItems={treppenhausRequestFields}
      snippetAnswerItems={treppenhausSnippetAnswerItems}
      faqItems={treppenhausFaqItems}
      relatedLinks={treppenhausRelatedLinks}
    />
  );
}
