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
    q: "Was bedeutet Leer-Rückfahrt nach Regensburg?",
    a: "Eine Leer-Rückfahrt entsteht, wenn ein Fahrzeug nach einem Auftrag ohnehin Richtung Regensburg fährt und noch freie Kapazität hat. Diese Kapazität kann für passende Teilmengen genutzt werden.",
  },
  {
    q: "Für welche Gegenstände ist das geeignet?",
    a: "Geeignet sind zum Beispiel Möbel, Kartons, Büroinventar, Paletten, Messeausstattung und einzelne Transportmengen. Nicht geeignet sind Gefahrstoffe oder genehmigungspflichtige Sonderabfälle.",
  },
  {
    q: "Ist eine Leer-Rückfahrt immer günstiger?",
    a: "Nicht automatisch. Der Vorteil entsteht nur, wenn Datum, Route, Volumen, Ladeaufwand und möglicher Umweg sinnvoll zusammenpassen.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/leer-rueckfahrt-regensburg-firmen-moebeltransport",
    title: "Leer-Rückfahrt Regensburg | Firmen, Möbel & Teiltransport",
    description:
      "Wann eine Leer-Rückfahrt Richtung Regensburg für Firmen, Möbel, Büroinventar und Teilmengen sinnvoll ist und wie FLOXANT fair vorprüft.",
  });
}

export default function LeerRueckfahrtRegensburgBlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Leer-Rückfahrt nach Regensburg",
        description: "Ratgeber zur fairen Nutzung freier Rückfahrten für Möbel, Firmeninventar und Teiltransporte.",
        path: "/blog/leer-rueckfahrt-regensburg-firmen-moebeltransport",
        about: ["Leer-Rückfahrt", "Beiladung", "Möbeltransport", "Büroinventar", "Regensburg"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        { name: "Leer-Rückfahrt Regensburg", item: "/blog/leer-rueckfahrt-regensburg-firmen-moebeltransport" },
      ]),
      buildArticleJsonLd({
        headline: "Leer-Rückfahrt nach Regensburg: fairer Transport für Firmen und Möbel",
        description: "Ein FLOXANT Ratgeber zu Rücktransport, Beiladung, freier Kapazität und fairer Vorprüfung.",
        path: "/blog/leer-rueckfahrt-regensburg-firmen-moebeltransport",
        datePublished: "2026-04-21",
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
          { label: "Leer-Rückfahrt Regensburg" },
        ]}
        date="21. April 2026"
        readTime="7 Min."
        title="Leer-Rückfahrt nach Regensburg: fairer Transport für Firmen und Möbel"
        intro="Freie Fahrzeugkapazität auf Rückfahrten kann für Kunden sehr sinnvoll sein. Wichtig ist aber, dass daraus kein Lockpreis entsteht: Route, Datum, Volumen, Zugang und Umweg müssen realistisch zusammenpassen."
        sections={[
          {
            title: "Wann eine Leer-Rückfahrt sinnvoll ist",
            paragraphs: [
              "Eine Rückfahrt ist besonders interessant, wenn ein Fahrzeug nach einem Auftrag ohnehin Richtung Regensburg unterwegs ist und noch Platz hat. Dann können Möbel, Kartons, Büroinventar oder Teilmengen mitgenommen werden, ohne eine komplett neue Tour zu planen.",
              "Für Firmen ist das praktisch, wenn einzelne Büromöbel, Archivkartons, Messematerial oder Ausstattung von einem Standort zurück in den Raum Regensburg müssen.",
            ],
          },
          {
            title: "Welche Faktoren den Preis beeinflussen",
            paragraphs: [
              "Der faire Preis hängt nicht nur von der Strecke ab. Entscheidend sind Ladeort, Zielort, Volumen, Gewicht, Etage, Laufweg, Zeitfenster und ob ein Umweg zur geplanten Route entsteht.",
              "FLOXANT prüft deshalb nicht pauschal, sondern anhand der konkreten Rückfahrt. Nur wenn die Route wirklich passt, kann der Vorteil einer freien Kapazität sauber genutzt werden.",
            ],
            bullets: [
              "Route: liegt der Abholort sinnvoll auf dem Rückweg?",
              "Datum: passt die Anfrage zur geplanten Fahrt?",
              "Kapazität: reicht Platz und Zuladung für die Menge?",
              "Aufwand: wie komplex sind Zugang, Etage und Ladezeit?",
            ],
          },
          {
            title: "Grenzen der Rückfahrt",
            paragraphs: [
              "Nicht jede Anfrage ist geeignet. Wenn der Umweg zu groß ist, das Volumen nicht passt oder der Termin zu eng liegt, ist ein normaler Transport ehrlicher.",
              "Auch Sonderabfälle, Gefahrstoffe und nicht transportfähige Materialien gehören nicht in diesen Service. Die Leer-Rückfahrt ist für reguläre Transportgüter gedacht.",
            ],
          },
        ]}
        highlightPoints={[
          "Leer-Rückfahrt lohnt sich nur, wenn Route und Datum passen.",
          "Firmen können Büroinventar und Teilmengen sinnvoll mitgeben.",
          "Der Preis bleibt eine faire Vorprüfung, kein pauschales Versprechen.",
        ]}
        ctas={[
          { href: "/leerfahrt-rueckfahrt", label: "Leer-Rückfahrt ansehen" },
          { href: "/beiladung", label: "Beiladung vergleichen" },
          { href: "/rechner?service=umzug", label: "Transport einordnen" },
        ]}
        faqTitle="FAQ zur Leer-Rückfahrt"
        faqItems={faqItems}
      />
    </>
  );
}
