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
  q: "Was ist Firmenentsorgung bei FLOXANT?",
  a: "Firmenentsorgung meint die Abholung und Entsorgung normaler Büro- und Gewerbegegenstände wie Möbel, Kartons, Regale, Aktenboxen oder Einrichtungsreste ohne Sonderabfall-Risiko.",
 },
 {
  q: "Welche Dinge sind ausgeschlossen?",
  a: "Ausgeschlossen sind Gefahrstoffe, Chemikalien, kontaminierte Materialien, Asbest, Flüssigkeiten und genehmigungspflichtige Sonderabfälle.",
 },
 {
  q: "Wann ist Firmenentsorgung sinnvoll?",
  a: "Sinnvoll ist sie bei Büroauflösung, Standortwechsel, Archivbereinigung, Möbeltausch, Renovierung oder nach einem Büroumzug.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog/firmenentsorgung-buero-inventar-regensburg",
  title: "Firmenentsorgung Regensburg | Büroinventar entsorgen",
  description:
   "Büroinventar, Möbel, Kartons und normale Gewerbegegenstände in Regensburg entsorgen lassen: was möglich ist und was FLOXANT vorprüft.",
 });
}

export default function FirmenentsorgungRegensburgBlogPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "Firmenentsorgung und Büroinventar in Regensburg",
    description: "Ratgeber zur Entsorgung normaler Büro- und Gewerbegegenstände ohne Sonderabfall-Risiko.",
    path: "/blog/firmenentsorgung-buero-inventar-regensburg",
    about: ["Firmenentsorgung", "Büroentsorgung", "Büroinventar", "Regensburg", "Gewerbe"],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Firmenentsorgung Regensburg", item: "/blog/firmenentsorgung-buero-inventar-regensburg" },
   ]),
   buildArticleJsonLd({
    headline: "Firmenentsorgung in Regensburg: Büroinventar sauber abholen lassen",
    description: "Ein FLOXANT Ratgeber zu Büroinventar, regulärer Gewerbeentsorgung und klarer Vorprüfung.",
    path: "/blog/firmenentsorgung-buero-inventar-regensburg",
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
     { label: "Firmenentsorgung Regensburg" },
    ]}
    date="21. April 2026"
    readTime="6 Min."
    title="Firmenentsorgung in Regensburg: Büroinventar sauber abholen lassen"
    intro="Wenn Büros umziehen, renoviert werden oder Inventar erneuert wird, bleiben oft Möbel, Kartons, Regale und Restmengen zurück. FLOXANT ordnet solche Firmenentsorgung klar und ohne Sonderabfall-Versprechen ein."
    sections={[
     {
      title: "Welche Gegenstände typischerweise passen",
      paragraphs: [
       "Für die reguläre Firmenentsorgung kommen vor allem Bürogegenstände infrage: Schreibtische, Stühle, Regale, Aktenschränke, Kartons, Verpackungen, Aktenboxen oder nicht mehr benötigtes Inventar.",
       "Wichtig ist, dass die Gegenstände transportfähig und regulär entsorgbar sind. FLOXANT prüft Menge, Zugang, Laufwege und ob Demontage notwendig ist.",
      ],
     },
     {
      title: "Welche Grenzen bewusst gelten",
      paragraphs: [
       "Nicht alles, was in einem Gewerbeobjekt steht, darf ohne spezielle Anforderungen entsorgt werden. Gefahrstoffe, Chemikalien, kontaminierte Materialien, Asbest oder Flüssigkeiten sind ausgeschlossen.",
       "Diese Grenze ist wichtig, weil sie Kunden schützt und den Service sauber positioniert. FLOXANT konzentriert sich auf reguläre Büro- und Gewerbegegenstände.",
      ],
      bullets: [
       "Geeignet: Möbel, Kartons, Regale und Büroinventar",
       "Geeignet: normale Einrichtungsreste und Verpackungen",
       "Nicht geeignet: Gefahrstoffe, Asbest und Chemikalien",
       "Nicht geeignet: genehmigungspflichtige Sonderabfälle",
      ],
     },
     {
      title: "Wie die Anfrage belastbarer wird",
      paragraphs: [
       "Fotos, eine grobe Mengenliste, Etagenangaben, Aufzug, Laufweg und Terminwunsch helfen bei der Vorprüfung. Bei größeren Büros ist außerdem wichtig, ob Demontage oder feste Zeitfenster nötig sind.",
       "Wenn gleichzeitig ein Büroumzug geplant ist, lässt sich Firmenentsorgung oft sinnvoll mit Transport, Reinigung oder Leer-Rückfahrt kombinieren.",
      ],
     },
    ]}
    highlightPoints={[
     "Firmenentsorgung braucht klare Materialgrenzen.",
     "Fotos und Mengenliste verbessern die Vorprüfung.",
     "Büroumzug, Reinigung und Entsorgung lassen sich sinnvoll kombinieren.",
    ]}
    ctas={[
     { href: "/firmenentsorgung", label: "Firmenentsorgung ansehen" },
     { href: "/bueroumzug", label: "Büroumzug prüfen" },
     { href: "/leerfahrt-rueckfahrt", label: "Leer-Rückfahrt nutzen" },
    ]}
    faqTitle="FAQ zur Firmenentsorgung"
    faqItems={faqItems}
   />
  </>
 );
}
