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
  q: "Was beeinflusst Umzugskosten in Regensburg am stärksten?",
  a: "Besonders relevant sind Volumen, Stockwerke, Laufwege, Parksituation, Strecke und Zusatzleistungen wie Montage oder Verpackung.",
 },
 {
  q: "Warum ist ein Preisband oft sinnvoller als eine einzelne Zahl?",
  a: "Viele Umzüge verändern sich noch durch genaue Inventarlisten, Zugangssituationen oder Terminfragen. Ein sauberer Orientierungsrahmen ist deshalb ehrlicher als eine scheinbar exakte Zahl.",
 },
 {
  q: "Wann sollte ich den Rechner statt einer offenen Anfrage nutzen?",
  a: "Wenn Sie Aufwand, Umfang und Zusatzleistungen strukturiert erfassen wollen. Dadurch wird die spätere Abstimmung deutlich präziser.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog/umzug-kosten-regensburg",
  title: "Umzugskosten in Regensburg realistisch einordnen | FLOXANT",
  description:
   "Welche Faktoren prägen Umzugskosten in Regensburg? FLOXANT erklärt Strecke, Volumen, Stockwerke, Laufwege und Zusatzleistungen ohne Lockpreis-Sprache.",
 });
}

export default function BlogUmzugKosten() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Umzugskosten Regensburg", item: "/blog/umzug-kosten-regensburg" },
   ]),
   buildWebPageJsonLd({
    name: "Umzugskosten in Regensburg realistisch einordnen",
    description: "Ein FLOXANT Artikel über die wichtigsten Kostentreiber für Umzüge in Regensburg.",
    path: "/blog/umzug-kosten-regensburg",
    about: ["Umzugskosten", "Regensburg", "Umzug", "Preisrahmen"],
   }),
   buildArticleJsonLd({
    headline: "Umzugskosten in Regensburg: Was Sie realistisch einplanen sollten",
    description: "Die wichtigsten Faktoren für Umzugskosten in Regensburg sauber erklärt.",
    path: "/blog/umzug-kosten-regensburg",
    datePublished: "2026-04-12",
    dateModified: "2026-04-20",
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
     { label: "Umzugskosten Regensburg" },
    ]}
    date="12. April 2026"
    readTime="8 Min."
    title="Umzugskosten in Regensburg: Was Sie realistisch einplanen sollten"
    intro="Ein Umzug in Regensburg ist selten nur eine Frage von Transportkilometern. In der Praxis prägen vor allem Volumen, Zugangssituation, Parksituation und Zusatzleistungen den Aufwand. Wer diese Faktoren kennt, kann Angebote deutlich besser einordnen."
    sections={[
     {
      title: "Die wichtigsten Kostentreiber bei einem Umzug in Regensburg",
      paragraphs: [
       "In der Realität entscheidet nicht nur die Entfernung zwischen Start und Ziel. Ein Umzug innerhalb Regensburgs kann aufwendiger sein als eine längere Strecke, wenn der Zugang schwierig ist oder viel Demontage nötig wird.",
      ],
      bullets: [
       "Volumen und Inventarumfang",
       "Stockwerke, Aufzug und Treppenhaus",
       "Laufwege und Parksituation",
       "Montage, Verpackung und zusätzliche Leistungen",
      ],
     },
     {
      title: "Warum Regensburg oft anders kalkuliert wird als das Umland",
      paragraphs: [
       "In zentralen Lagen spielen begrenzte Ladezonen, enge Zufahrten und historische Gebäudestrukturen eine Rolle. Im Umland sind die Wege auf dem Grundstück häufig kürzer, dafür können Strecken und Anfahrten länger werden.",
      ],
     },
     {
      title: "Wie Sie selbst zu einer besseren Ersteinschätzung kommen",
      paragraphs: [
       "Wer vorab Zimmerzahl, grobe Inventarmenge, Stockwerke, Laufwege und Zusatzleistungen kennt, bekommt eine wesentlich plausiblere Vorprüfung. Genau deshalb ist ein strukturierter Rechner meist hilfreicher als eine sehr offene Kontaktanfrage.",
      ],
     },
    ]}
    highlightPoints={[
     "Ein glaubwürdiger Umzugspreis in Regensburg braucht immer Kontext.",
     "Preisrahmen sind für die Vorprüfung ehrlicher als harte Einzelzahlen.",
     "Mit strukturierten Angaben wird die spätere Abstimmung deutlich präziser.",
    ]}
    ctas={[
     { href: "/rechner", label: "Zum Rechner" },
     { href: "/anfrage-mit-preisrahmen", label: "Preisvorstellung senden" },
     { href: "/umzug", label: "Umzug ansehen" },
    ]}
    faqTitle="FAQ zu Umzugskosten in Regensburg"
    faqItems={faqItems}
   />
  </>
 );
}
