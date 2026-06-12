import type { Metadata } from "next";

import { DuesseldorfServicePage } from "@/components/duesseldorf/DuesseldorfServicePage";
import { buildDuesseldorfCleaningMetadata } from "@/lib/duesseldorf-cleaning";

export async function generateMetadata(): Promise<Metadata> {
  return buildDuesseldorfCleaningMetadata({
    path: "/duesseldorf/wohnungsreinigung",
    title: "Wohnungsreinigung Düsseldorf | Wohnung reinigen lassen",
    description:
      "Wohnungsreinigung in Düsseldorf für bewohnte oder leere Wohnungen: Stadtteil, Fläche, Zustand und Fotos senden, Preisrahmen unverbindlich prüfen lassen.",
  });
}

const wohnungsreinigungCustomerIntentItems = [
  {
    searchPhrase: "Wohnung reinigen lassen Düsseldorf",
    title: "Bewohnte oder leere Wohnung direkt einordnen",
    answer:
      "Für eine schnelle Rückmeldung helfen Stadtteil, Fläche, Räume, Küche, Bad, Böden, Zugang, Terminwunsch und Fotos vom aktuellen Zustand.",
    href: "#anfrage-checkliste",
    cta: "Angaben vorbereiten",
    signal: "Wohnung reinigen lassen",
  },
  {
    searchPhrase: "Wohnungsreinigung Düsseldorf Kosten",
    title: "Kosten hängen am echten Zustand",
    answer:
      "Quadratmeter allein reichen selten. Küche, Bad, Bodenart, Fensterbereiche, Verschmutzung, Etage, Parken und Zeitfenster verändern den Preisrahmen.",
    href: "/duesseldorf/vielleicht-guenstiger",
    cta: "Budget prüfen",
    signal: "Kosten und Preisrahmen",
  },
  {
    searchPhrase: "Putzfirma Wohnung Düsseldorf WhatsApp",
    title: "Fotos per WhatsApp sparen Rückfragen",
    answer:
      "Bilder von Küche, Bad, Boden, Fenstern, Ecken und Zugang zeigen schneller, ob normale Reinigung, Grundreinigung oder Endreinigung passt.",
    href: "#kontakt",
    cta: "Fotos senden",
    signal: "WhatsApp und Fotos",
  },
  {
    searchPhrase: "Reinigung vor Auszug Düsseldorf",
    title: "Auszug und Übergabe sauber vorbereiten",
    answer:
      "Bei Auszug, Nachmietertermin oder Schlüsselübergabe zählen Termin, Zielzustand, Restmengen, Küche, Bad, Böden und erreichbare Fensterbereiche besonders.",
    href: "/duesseldorf/endreinigung",
    cta: "Übergabe prüfen",
    signal: "Auszug und Übergabe",
  },
  {
    searchPhrase: "Bewohnte Wohnung reinigen lassen",
    title: "Alltag, Räume und Prioritäten klar nennen",
    answer:
      "Bei bewohnten Wohnungen helfen Prioritäten: Bad, Küche, Staub, Böden, Oberflächen, schwer zugängliche Stellen oder nur einzelne Räume.",
    href: "#anfrage-checkliste",
    cta: "Prioritäten senden",
    signal: "Bewohnte Wohnung",
  },
  {
    searchPhrase: "Grundreinigung Wohnung Düsseldorf",
    title: "Stärkere Verschmutzung separat einschätzen",
    answer:
      "Wenn normale Wohnungsreinigung nicht reicht, sollten Problemstellen, Material, Rückstände und gewünschtes Ergebnis mit Fotos geprüft werden.",
    href: "/duesseldorf/grundreinigung",
    cta: "Grundreinigung ansehen",
    signal: "Grundreinigung Wohnung",
  },
] as const;

const wohnungsreinigungRequestFields = [
  {
    field: "Stadtteil & Zugang",
    title: "Ort, Etage und Parken nennen",
    text: "Düsseldorfer Stadtteil oder PLZ, Etage, Aufzug, Schlüsselweg, Parkmöglichkeit und Ansprechpartner machen die Rückmeldung konkreter.",
  },
  {
    field: "Wohnungstyp",
    title: "Bewohnt, leer oder möbliert?",
    text: "Kurz sagen, ob die Wohnung leer, bewohnt, möbliert, vor Einzug, nach Auszug oder vor einer Besichtigung gereinigt werden soll.",
  },
  {
    field: "Räume & Fläche",
    title: "Quadratmeter und Zimmer helfen",
    text: "Fläche, Zimmerzahl, Küche, Bad, Gäste-WC, Balkon, Flur und Nebenflächen zeigen, wie groß der Auftrag wirklich ist.",
  },
  {
    field: "Zustand & Problemstellen",
    title: "Küche, Bad, Böden und Ecken zeigen",
    text: "Fotos von Kalk, Fett, Staub, Bodenrändern, Fensterbereichen, Sockelleisten oder schwer erreichbaren Stellen sparen Rückfragen.",
  },
  {
    field: "Termin & Ziel",
    title: "Einzug, Auszug oder Alltag?",
    text: "Terminwunsch, Schlüsselübergabe, Nachmietertermin, regelmäßige Reinigung oder einmalige Reinigung direkt nennen.",
  },
  {
    field: "Budget & Fotos",
    title: "Preisrahmen ehrlich prüfen",
    text: "Ein Budget oder vorhandenes Angebot hilft bei der Einordnung. Fotos bleiben der schnellste Weg für eine realistische Einschätzung.",
  },
] as const;

const wohnungsreinigungSnippetAnswerItems = [
  {
    query: "Was kostet Wohnungsreinigung in Düsseldorf?",
    title: "Preisrahmen nur mit Zustand sinnvoll",
    answer:
      "Die Kosten hängen von Fläche, Zustand, Küche, Bad, Böden, Fensterbereichen, Zugang und Termin ab. Fotos und ein Budget machen die Einschätzung schneller.",
    href: "/duesseldorf/vielleicht-guenstiger",
    cta: "Preisrahmen prüfen",
    signals: ["Wohnungsreinigung Düsseldorf Kosten", "Wohnung reinigen lassen Düsseldorf Preis"],
  },
  {
    query: "Wie frage ich Wohnungsreinigung per WhatsApp an?",
    title: "Stadtteil, Räume und Fotos senden",
    answer:
      "Senden Sie Stadtteil oder PLZ, Fläche, Räume, Termin, Zugang, Fotos und den gewünschten Zielzustand. So kann FLOXANT schneller prüfen, ob die Anfrage passt.",
    href: "#kontakt",
    cta: "WhatsApp öffnen",
    signals: ["Putzfirma WhatsApp Düsseldorf", "Wohnungsreinigung Fotos senden"],
  },
  {
    query: "Passt Wohnungsreinigung vor Übergabe?",
    title: "Übergabe braucht klare Prioritäten",
    answer:
      "Vor Übergabe oder Besichtigung sind Küche, Bad, Böden, Fensterbereiche, Ecken, Türen, Schalter und Terminfenster besonders wichtig.",
    href: "/duesseldorf/endreinigung",
    cta: "Übergabe vorbereiten",
    signals: ["Reinigung vor Übergabe Düsseldorf", "Endreinigung Wohnung Düsseldorf"],
  },
  {
    query: "Bewohnte oder leere Wohnung reinigen lassen?",
    title: "Der Wohnungstyp verändert den Ablauf",
    answer:
      "Bei bewohnten Wohnungen zählen Prioritäten und erreichbare Bereiche. Bei leeren Wohnungen zählen Zustand, Übergabetermin, Rückstände und Nebenflächen stärker.",
    href: "#anfrage-checkliste",
    cta: "Angaben prüfen",
    signals: ["Bewohnte Wohnung reinigen lassen", "Leere Wohnung reinigen Düsseldorf"],
  },
] as const;

const wohnungsreinigungFaqItems = [
  {
    q: "Was kostet Wohnungsreinigung in Düsseldorf?",
    a: "Ein seriöser Preisrahmen hängt von Fläche, Zustand, Küche, Bad, Böden, Fensterbereichen, Zugang, Termin und gewünschtem Ergebnis ab. Fotos und ein Budget helfen bei der ersten Einordnung.",
  },
  {
    q: "Reinigt FLOXANT auch bewohnte Wohnungen?",
    a: "Ja, bewohnte Wohnungen können nach Absprache geprüft werden. Wichtig sind Prioritäten, erreichbare Bereiche, Räume, Zustand, Terminfenster und Fotos.",
  },
  {
    q: "Welche Fotos sollte ich senden?",
    a: "Hilfreich sind Fotos von Küche, Bad, Böden, Fensterbereichen, Ecken, Zugang, Etage und auffälligen Problemstellen. Bitte keine sensiblen Unterlagen oder Zugangscodes senden.",
  },
  {
    q: "Ist Wohnungsreinigung vor Auszug oder Übergabe möglich?",
    a: "Ja, wenn Termin, Schlüsselzugang, Zustand, gewünschtes Ergebnis und Fotos rechtzeitig geklärt werden. Für starke Rückstände oder knappe Übergaben kann Endreinigung die passendere Einordnung sein.",
  },
  {
    q: "Kann Wohnungsreinigung mit Umzug oder Entrümpelung kombiniert werden?",
    a: "Ja, wenn Umfang, Termin und Zugang passen. Reinigung, Umzug, Entrümpelung und Entsorgung werden getrennt geprüft und über eigene Düsseldorfer Seiten sauber eingeordnet.",
  },
] as const;

const wohnungsreinigungRelatedLinks = [
  { href: "/duesseldorf/endreinigung", label: "Endreinigung vor Übergabe" },
  { href: "/duesseldorf/grundreinigung", label: "Grundreinigung bei stärkerem Zustand" },
  { href: "/reinigung-moeblierte-wohnung-duesseldorf", label: "Möblierte Wohnung oder Apartment" },
  { href: "/duesseldorf/reinigung-stadtteile-umgebung", label: "Stadtteil und Umgebung prüfen" },
  { href: "/duesseldorf/vielleicht-guenstiger", label: "Kosten oder Angebot prüfen" },
  { href: "/duesseldorf/umzug", label: "Umzug Düsseldorf prüfen" },
  { href: "/duesseldorf/entruempelung", label: "Entrümpelung Düsseldorf prüfen" },
  { href: "/duesseldorf/entsorgung", label: "Entsorgung separat klären" },
] as const;

export default function DuesseldorfWohnungsreinigungPage() {
  return (
    <DuesseldorfServicePage
      path="/duesseldorf/wohnungsreinigung"
      metaDescription="Wohnungsreinigung in Düsseldorf für bewohnte oder leere Wohnungen: Stadtteil, Fläche, Zustand und Fotos senden, Preisrahmen unverbindlich prüfen lassen."
      kicker="FLOXANT Wohnungsreinigung Düsseldorf"
      title="Wohnungsreinigung in Düsseldorf"
      serviceLabel="Wohnungsreinigung"
      description="Wenn Wohnungen in Düsseldorf sauber, nachvollziehbar und ohne überladene Service-Mischung gereinigt werden sollen."
      contentSections={[
        {
          title: "Wohnungsreinigung mit Blick auf den echten Zustand",
          paragraphs: [
            "Bei einer Wohnungsreinigung in Düsseldorf reicht eine reine Quadratmeterzahl selten aus. Eine leere Wohnung nach Auszug, eine bewohnte Wohnung mit Alltagsverschmutzung oder eine möblierte Einheit vor neuer Nutzung haben sehr unterschiedliche Anforderungen. FLOXANT fragt deshalb nach Küche, Bad, Böden, Fenstern, Nebenflächen, Zugang und Fotos.",
            "Besonders hilfreich sind kurze Bilder von den Bereichen, die Ihnen wichtig sind. So lässt sich schneller erkennen, ob eine normale Reinigung reicht, ob punktuell Grundreinigung sinnvoll ist oder ob Entsorgung getrennt geprüft werden sollte.",
          ],
        },
        {
          title: "Für Einzug, Auszug und Übergabe in Düsseldorf",
          paragraphs: [
            "Viele Kunden fragen an, weil eine Wohnung vor Übergabe, Neuvermietung oder Einzug wieder stimmig aussehen soll. Dann zählen Terminfenster, Schlüsselzugang, Parkmöglichkeit, Etage und ein realistisches Ergebnis stärker als ein pauschales Versprechen.",
            "Wenn Umzug, Entrümpelung oder Entsorgung dazugehört, wird das getrennt über die passenden Düsseldorfer Seiten eingeordnet. So bleibt die Wohnungsreinigung selbst verständlich und das Angebot nachvollziehbar.",
          ],
        },
      ]}
      bullets={[
        "Geeignet für laufende Wohnungsreinigung, punktuelle Intensivreinigung oder kurze Vorbereitungen vor Terminen.",
        "Küche, Bad, Oberflächen und typische Alltagsbereiche werden je nach Bedarf abgestimmt.",
        "Die Anfrage bleibt bewusst lokal und auf Reinigung fokussiert.",
      ]}
      localFocus={["Altstadt", "Flingern", "Bilk", "Oberbilk", "Düsseltal", "Meerbusch"]}
      priceLogic={[
        "Fläche, Zustand, Küche, Bad, Bodenart, Fensterbereiche und gewünschtes Ergebnis bestimmen den Aufwand.",
        "Fotos von stark genutzten Bereichen verkürzen Rückfragen und machen den Preisrahmen realistischer.",
        "Bei Auszug oder Übergabe sind Termin, Zugang, Etage und Schlüsselregelung besonders wichtig.",
      ]}
      customerIntentItems={wohnungsreinigungCustomerIntentItems}
      requestFieldItems={wohnungsreinigungRequestFields}
      snippetAnswerItems={wohnungsreinigungSnippetAnswerItems}
      faqItems={wohnungsreinigungFaqItems}
      relatedLinks={wohnungsreinigungRelatedLinks}
    />
  );
}
