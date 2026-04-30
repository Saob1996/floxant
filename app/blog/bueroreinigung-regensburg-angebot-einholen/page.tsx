import type { Metadata } from "next";

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
    q: "Welche Angaben braucht FLOXANT für ein sauberes Angebot zur Büroreinigung?",
    a: "Am wichtigsten sind Fläche, gewünschter Turnus, Nutzung der Räume, Zugangszeiten, sensible Bereiche, Ansprechpartner vor Ort und gewünschter Leistungsumfang. Damit kann FLOXANT schneller prüfen, ob die Anfrage operativ und wirtschaftlich sauber passt.",
  },
  {
    q: "Warum reicht eine Quadratmeterzahl allein nicht aus?",
    a: "Weil Büroreinigung nicht nur von Größe abhängt. Nutzung, Frequenz, Küche, Sanitär, Besprechungsräume, Eingangsbereiche, Randzeiten und Objektzugang verändern Aufwand und Ablauf oft deutlich.",
  },
  {
    q: "Ist diese Art Anfrage auch für mehrere Büroeinheiten oder Verwaltungen geeignet?",
    a: "Ja. Wenn mehrere Etagen, Gebäude oder Ansprechpartner relevant sind, hilft eine strukturierte Anfrage sogar besonders, weil Turnus, Zugang und Zuständigkeit dann sauber zusammengeführt werden können.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/bueroreinigung-regensburg-angebot-einholen",
    title: "Büroreinigung in Regensburg anfragen: welche Angaben vor dem Angebot zählen",
    description:
      "Welche Angaben zu Fläche, Turnus, Zugang und Randzeiten aus einer Anfrage zur Büroreinigung schneller ein belastbares Angebot machen.",
    keywords: [
      "Büroreinigung Regensburg Angebot",
      "Büroreinigung anfragen Regensburg",
      "Gewerbereinigung Büro Regensburg",
      "Unterhaltsreinigung Regensburg Angebot",
      "B2B Reinigung Regensburg",
    ],
  });
}

export default function BlogBueroreinigungRegensburgAngebotEinholenPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Büroreinigung in Regensburg anfragen",
        description:
          "Ratgeber dazu, welche Angaben vor einem Angebot zur Büroreinigung in Regensburg wirklich zählen.",
        path: "/blog/bueroreinigung-regensburg-angebot-einholen",
        about: ["Büroreinigung", "Gewerbereinigung", "Regensburg", "Angebot", "B2B Anfrage"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        {
          name: "Büroreinigung in Regensburg anfragen",
          item: "/blog/bueroreinigung-regensburg-angebot-einholen",
        },
      ]),
      buildArticleJsonLd({
        headline: "Büroreinigung in Regensburg anfragen: welche Angaben vor dem Angebot zählen",
        description:
          "Ein FLOXANT Artikel dazu, wie Unternehmen und Objektverantwortliche ihre Anfrage zur Büroreinigung klarer und belastbarer vorbereiten.",
        path: "/blog/bueroreinigung-regensburg-angebot-einholen",
        datePublished: "2026-04-27",
      }),
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticlePage
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: "Büroreinigung in Regensburg anfragen" },
        ]}
        date="27. April 2026"
        readTime="6 Min."
        title="Büroreinigung in Regensburg anfragen: welche Angaben vor dem Angebot zählen"
        intro="Viele gewerbliche Reinigungsanfragen starten zu allgemein. Wenn Fläche, Turnus, Zugang und Verantwortlichkeiten gleich sauber genannt werden, entsteht schneller ein Angebot, das auch im Alltag wirklich trägt."
        sections={[
          {
            title: "Warum eine gute Anfrage bei Büroreinigung so viel ausmacht",
            paragraphs: [
              "Bei der Büroreinigung zählt nicht nur die Fläche. Entscheidend sind auch Nutzung, Frequenz, Randzeiten, Sanitärbereiche, Küchen, Besprechungsräume und der Zugang zum Objekt.",
              "Je klarer diese Punkte früh vorliegen, desto schneller kann FLOXANT Aufwand, Taktung und Zuständigkeit einordnen. Das spart Rückfragen und erhöht die Chance auf ein Angebot, das nicht nur auf dem Papier gut aussieht.",
            ],
          },
          {
            title: "Diese Angaben helfen vor dem Angebot am meisten",
            paragraphs: [
              "Eine gute B2B-Anfrage muss nicht lang sein. Sie sollte nur die wichtigsten Punkte sauber benennen.",
            ],
            bullets: [
              "Objektart und ungefähre Fläche",
              "Gewünschter Turnus: täglich, mehrfach pro Woche oder individuell",
              "Wichtige Bereiche: Arbeitsplätze, Küche, Sanitär, Empfang, Besprechungsräume",
              "Zugang und Zeiten: tagsüber, früh, spät oder außerhalb des Publikumsverkehrs",
              "Ansprechpartner, Entscheidungsweg und gewünschter Startzeitraum",
              "Besondere Anforderungen wie Schlüssel, Alarm, Hausverwaltung oder sensible Zonen",
            ],
          },
          {
            title: "Wann FLOXANT besonders gut passt",
            paragraphs: [
              "Besonders sinnvoll ist der direkte Weg zu FLOXANT, wenn feste Ansprechpartner, planbare Qualität und saubere Kommunikation wichtig sind. Das gilt für Büros, Kanzleien, Praxen, Hausverwaltungen und mehrere Einheiten gleichermaßen.",
              "Kurz gesagt: lieber von Anfang an gscheid einordnen, als später wegen unklarer Details wieder von vorn anfangen.",
            ],
          },
        ]}
        highlightPoints={[
          "Nicht nur Quadratmeter, sondern Nutzung und Zugang entscheiden über ein belastbares Angebot.",
          "Klare Ansprechpartner und Randzeiten helfen mehr als lange unstrukturierte Texte.",
          "Eine gute Büroreinigungs-Anfrage spart Rückfragen und macht die spätere Umsetzung stabiler.",
        ]}
        ctas={[
          { href: "/gewerbereinigung-regensburg", label: "Zur B2B-Reinigungsseite" },
          { href: "/buchung", label: "Direkt anfragen" },
          { href: "/kontakt", label: "Kontakt & Standort" },
        ]}
        faqTitle="FAQ zur Anfrage für Büroreinigung"
        faqItems={faqItems}
      />
    </>
  );
}
