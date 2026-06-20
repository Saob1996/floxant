import { Metadata } from "next";

import { BlogArticlePage } from "@/components/blog/BlogArticlePage";
import { generatePageSEO } from "@/lib/seo";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildWebPageJsonLd,
} from "@/lib/structured-data";

const faqItems = [
  {
    q: "Worauf sollten Büro und Praxis bei einer Reinigungsfirma in Regensburg achten?",
    a: "Wichtig sind feste Ansprechpartner, klare Zugangszeiten, sauber definierte Flächen, erreichbare Rückmeldung und eine B2B-taugliche Vorprüfung statt eines zu schnellen Pauschalversprechens.",
  },
  {
    q: "Warum passt nicht jede Reinigungsfirma zu Büro, Praxis oder Verwaltung?",
    a: "Weil gewerbliche Objekte andere Abläufe haben als kleine Privataufträge. Turnus, Zutritt, Randzeiten, Schlüssel, Verantwortlichkeiten und Qualitätskontrolle müssen sauber abgestimmt sein.",
  },
  {
    q: "Ist eine eigene Seite für gewerbliche Reinigung sinnvoll?",
    a: "Ja. Gewerbliche Kunden finden schneller die passenden Informationen: Flächen, Turnus, Randzeiten, Schlüssel, Ansprechpartner und Rückmeldung.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/reinigungsfirma-regensburg-buero-praxis-auswahl",
    title: "Reinigungsfirma in Regensburg für Büro und Praxis auswählen | FLOXANT",
    description:
      "Wie Unternehmen, Praxen und Verwaltungen in Regensburg eine passende Reinigungsfirma bewerten: Turnus, Ansprechpartner, Zugang, Qualitätskontrolle und B2B-Fit.",
  });
}

export default function BlogReinigungsfirmaRegensburgAuswahlPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Reinigungsfirma in Regensburg für Büro und Praxis auswählen",
        description:
          "Ratgeber für Unternehmen, Praxen und Verwaltungen, die eine passende B2B-Reinigungsfirma in Regensburg suchen.",
        path: "/blog/reinigungsfirma-regensburg-buero-praxis-auswahl",
        about: ["Reinigungsfirma Regensburg", "Büroreinigung", "Praxisreinigung", "B2B Reinigung"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        { name: "Reinigungsfirma Regensburg auswählen", item: "/blog/reinigungsfirma-regensburg-buero-praxis-auswahl" },
      ]),
      buildArticleJsonLd({
        headline: "Reinigungsfirma in Regensburg für Büro und Praxis auswählen",
        description:
          "Ein FLOXANT Leitfaden zu Turnus, Ansprechpartnern, Zugängen und B2B-Passung für gewerbliche Reinigung in Regensburg.",
        path: "/blog/reinigungsfirma-regensburg-buero-praxis-auswahl",
        datePublished: "2026-04-27",
      }),
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogArticlePage
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: "Reinigungsfirma Regensburg auswählen" },
        ]}
        date="27. April 2026"
        readTime="7 Min."
        title="Reinigungsfirma in Regensburg für Büro und Praxis auswählen"
        intro="Bei gewerblicher Reinigung reicht ein schneller Klick selten aus. Wer Büro, Praxis oder Verwaltung verantwortet, braucht eine Firma, die Zugang, Turnus, Ansprechpartner und Qualitätsanspruch wirklich sauber einordnet."
        sections={[
          {
            title: "Warum B2B-Reinigung anders entschieden wird",
            paragraphs: [
              "In Büro, Praxis oder Verwaltung geht es nicht nur um Quadratmeter. Entscheidend sind Öffnungszeiten, Schlüssel, sensible Bereiche, feste Ansprechpartner und ein Ablauf, der den Betrieb nicht stört.",
              "Darum ist eine klare Vorprüfung oft wertvoller als ein pauschales Onlineversprechen. Sie zeigt früh, ob Objekt, Turnus und Leistung wirklich zusammenpassen.",
            ],
          },
          {
            title: "Welche Hinweise für eine passende Reinigungsfirma sprechen",
            paragraphs: [
              "Schon vor dem ersten Angebot lässt sich gut erkennen, ob die Ausrichtung stimmt. Gute B2B-Anbieter fragen gezielt und trennen gewerbliche Anforderungen sauber von privaten Einzelfällen.",
            ],
            bullets: [
              "Klare Ansprechpartner statt wechselnder Kontaktwege",
              "Saubere Fragen zu Turnus, Flächen und Zugangszeiten",
              "Eindeutige Abgrenzung zwischen B2B und privaten Kleinaufträgen",
              "Realistische Einschätzung statt zu billiger Schnellzusage",
            ],
          },
          {
            title: "Was in Regensburg besonders hilft",
            paragraphs: [
              "Lokale Firmen können Rückfragen, Besichtigungen und Objektabstimmung oft schneller organisieren. Für Hausverwaltungen, Praxen, Hotels und größere Büroflächen ist das im Alltag ein echter Vorteil.",
              "Oder freundlich gesagt: lieber gleich sauber abstimmen, dann läuft der Rest deutlich entspannter.",
            ],
          },
        ]}
        highlightPoints={[
          "Gewerbliche Reinigung braucht klare Zuständigkeit und B2B-Fit.",
          "Turnus, Zutritt und Qualitätskontrolle sind wichtiger als ein Schnellpreis.",
          "Eine gute Informationsseite hilft schon vor der Anfrage, passende Objekte und wichtige Eckdaten zu erkennen.",
        ]}
        ctas={[
          { href: "/praxisreinigung-regensburg", label: "Praxisreinigung prüfen" },
          { href: "/gewerbereinigung-regensburg", label: "B2B-Reinigungsseite öffnen" },
          { href: "/buchung", label: "Direkt anfragen" },
        ]}
        faqTitle="FAQ zur Auswahl einer Reinigungsfirma in Regensburg"
        faqItems={faqItems}
      />
    </>
  );
}
