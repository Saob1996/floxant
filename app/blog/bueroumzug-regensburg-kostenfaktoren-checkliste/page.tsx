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
  q: "Welche Angaben braucht FLOXANT für einen Büroumzug?",
  a: "Wichtig sind Anzahl der Arbeitsplätze, IT-Umfang, Archiv, Möbel, Etagen, Aufzug, Laufwege, Zeitfenster und mögliche Einschränkungen im laufenden Betrieb.",
 },
 {
  q: "Warum ist ein Büroumzug anders als ein Privatumzug?",
  a: "Beim Büroumzug zählen Betriebsunterbrechung, Daten- und IT-Struktur, Ansprechpartner, Reihenfolge, Beschriftung und Wiederaufnahme der Arbeit stärker als bei einem normalen Wohnungsumzug.",
 },
 {
  q: "Wie lässt sich ein Preisrahmen realistischer machen?",
  a: "Fotos, Inventarliste, Raumplan, Zeitfenster, Etagenangaben und eine grobe Arbeitsplatzanzahl verbessern die Vorprüfung deutlich.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog/bueroumzug-regensburg-kostenfaktoren-checkliste",
  title: "Büroumzug Regensburg | Kostenfaktoren & Checkliste",
  description:
   "Büroumzug in Regensburg realistisch vorbereiten: Arbeitsplätze, IT, Archiv, Zugang, Zeitfenster und Kostentreiber sauber prüfen.",
 });
}

export default function BueroumzugRegensburgBlogPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "Büroumzug in Regensburg",
    description: "Ratgeber zu Kostenfaktoren, Checkliste und Vorprüfung für Firmenumzüge in Regensburg.",
    path: "/blog/bueroumzug-regensburg-kostenfaktoren-checkliste",
    about: ["Büroumzug", "Firmenumzug", "Regensburg", "IT", "Archiv", "Arbeitsplätze"],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Büroumzug Regensburg", item: "/blog/bueroumzug-regensburg-kostenfaktoren-checkliste" },
   ]),
   buildArticleJsonLd({
    headline: "Büroumzug in Regensburg: Kostenfaktoren und Checkliste",
    description: "Ein FLOXANT Ratgeber für realistische Firmenumzüge mit Arbeitsplätzen, IT und Zeitfenster.",
    path: "/blog/bueroumzug-regensburg-kostenfaktoren-checkliste",
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
     { label: "Büroumzug Regensburg" },
    ]}
    date="21. April 2026"
    readTime="8 Min."
    title="Büroumzug in Regensburg: Kostenfaktoren und Checkliste"
    intro="Ein Büroumzug ist kein großer Privatumzug. Entscheidend sind Arbeitsplätze, IT, Archiv, Zeitfenster und die Frage, wie schnell ein Unternehmen wieder arbeitsfähig ist."
    sections={[
     {
      title: "Die wichtigsten Kostentreiber",
      paragraphs: [
       "Beim Büroumzug wirken mehrere Faktoren gleichzeitig. Neben Volumen und Strecke zählen vor allem Arbeitsplatzanzahl, IT, Archiv, Möbelmontage, Etagen, Aufzug und Laufwege.",
       "Auch Zeitfenster sind entscheidend. Ein Umzug außerhalb der Geschäftszeiten oder am Wochenende kann organisatorisch sinnvoll sein, muss aber sauber geplant werden.",
      ],
      bullets: [
       "Arbeitsplätze und Möbelmenge",
       "IT, Monitore, Kabel und sensible Ausstattung",
       "Akten, Archiv und Beschriftung",
       "Zeitfenster, Zugang, Aufzug und Laufwege",
      ],
     },
     {
      title: "Checkliste vor der Anfrage",
      paragraphs: [
       "Je strukturierter die Angaben, desto belastbarer wird die Vorprüfung. Eine kurze Inventarliste, Fotos und ein grober Raumplan helfen mehr als lange, unklare Nachrichten.",
       "Für FLOXANT ist außerdem wichtig, wer intern entscheidet, wer vor Ort erreichbar ist und welche Reihenfolge für die Wiederaufnahme der Arbeit sinnvoll ist.",
      ],
     },
     {
      title: "Warum Regensburg als Standort wichtig ist",
      paragraphs: [
       "Bei Firmenumzügen in Regensburg und Bayern beeinflussen Anfahrt, Parken, Innenstadtlage, Gebäudezugang und regionale Verfügbarkeit die Planung deutlich.",
       "Ein regionaler Anbieter kann Termine, Laufwege und Zusatzleistungen wie Firmenentsorgung oder Reinigung besser in einen Ablauf bringen.",
      ],
     },
    ]}
    highlightPoints={[
     "Büroumzug braucht klare Reihenfolge, nicht nur Transport.",
     "IT, Archiv und Arbeitsplatzanzahl sind zentrale Preisfaktoren.",
     "Eine gute Vorprüfung reduziert Betriebsunterbrechung.",
    ]}
    ctas={[
     { href: "/bueroumzug", label: "Büroumzug ansehen" },
     { href: "/firmenentsorgung", label: "Firmenentsorgung prüfen" },
     { href: "/rechner?service=umzug", label: "Preisrahmen starten" },
    ]}
    faqTitle="FAQ zum Büroumzug"
    faqItems={faqItems}
   />
  </>
 );
}
