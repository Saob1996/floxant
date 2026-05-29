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
  q: "Warum ist ein direkter Anfrageweg oft besser als ein Vergleichsportal?",
  a: "Weil Service, Umfang, Zugang und Termin direkt beim Anbieter landen, statt erst gefiltert, verkauft oder mehrfach verteilt zu werden.",
 },
 {
  q: "Heißt direkt anfragen automatisch teurer?",
  a: "Nein. Oft ist es sogar klarer, weil weniger Umwege, weniger Missverständnisse und eine ehrlichere Vorprüfung entstehen.",
 },
 {
  q: "Wann ist eine direkte Buchungsseite besonders sinnvoll?",
  a: "Wenn Kunden schnell verstehen sollen, welche Anfrageform passt – etwa Buchungssystem, Express-Check, Preisvorschlag oder direkter Kontakt.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog/direkt-anfragen-statt-vergleichsportal-regensburg",
  title: "Direkt anfragen statt Vergleichsportal | FLOXANT Regensburg",
  description:
   "Warum direkte Anfragewege für Umzug, Reinigung und Entrümpelung oft schneller, ehrlicher und planbarer sind als Vergleichsportale.",
  keywords: [
   "Umzug direkt anfragen",
   "Vergleichsportal Umzug Nachteile",
   "Buchungsseite Regensburg",
   "direkte Anfrage Reinigung",
  ],
 });
}

export default function BlogDirektAnfragenPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "Direkt anfragen statt Vergleichsportal",
    description: "Ratgeber zu direkten Anfragewegen, Buchungsseiten und ehrlicher Vorprüfung.",
    path: "/blog/direkt-anfragen-statt-vergleichsportal-regensburg",
    about: ["Direkte Anfrage", "Buchung", "Vergleichsportal", "Regensburg"],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Direkt anfragen", item: "/blog/direkt-anfragen-statt-vergleichsportal-regensburg" },
   ]),
   buildArticleJsonLd({
    headline: "Direkt anfragen statt Vergleichsportal: warum klare Buchungswege besser sind",
    description: "Ein FLOXANT Artikel zu direkten Buchungswegen, Preiswahrheit und sauberer Vorprüfung.",
    path: "/blog/direkt-anfragen-statt-vergleichsportal-regensburg",
    datePublished: "2026-04-26",
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
     { label: "Direkt anfragen" },
    ]}
    date="26. April 2026"
    readTime="6 Min."
    title="Direkt anfragen statt Vergleichsportal: warum klare Buchungswege besser sind"
    intro="Viele Kunden möchten schnell vergleichen. Das ist nachvollziehbar. In der Praxis führen direkte Anfragewege aber oft schneller zum passenden Ergebnis – gerade bei Umzug, Reinigung und Entrümpelung, wo Details wichtiger sind als eine plakative Zahl."
    sections={[
     {
      title: "Der eigentliche Vorteil direkter Anfragewege",
      paragraphs: [
       "Wenn eine Anfrage direkt beim Anbieter landet, bleiben Kontext, Termin, Zugang, Umfang und Zusatzleistungen zusammen. Das ist oft der Unterschied zwischen echter Vorprüfung und bloßer Weiterleitung.",
       "Für Kunden bedeutet das meist weniger Rückfragen an falscher Stelle und schnelleres Gefühl dafür, ob ein Auftrag wirklich passt.",
      ],
     },
     {
      title: "Wo Vergleichsportale oft Reibung erzeugen",
      paragraphs: [
       "Vergleichslogik ist stark auf schnelle Kontakte gebaut. Dienstleistungen wie Umzug, Reinigung oder Entrümpelung brauchen aber oft mehr Einordnung als nur Start, Ziel und Telefonnummer.",
      ],
      bullets: [
       "Preis ohne saubere Leistungsdefinition wirkt schnell irreführend",
       "Zusatzleistungen gehen im Erstkontakt leicht unter",
       "Region, Route und Zugang werden oft zu grob betrachtet",
       "Kunden sprechen nicht immer direkt mit dem späteren Ausführer",
      ],
     },
     {
      title: "Was eine gute Buchungsseite leisten sollte",
      paragraphs: [
       "Eine gute Buchungsseite macht die Wege klar: normaler Einstieg, Express-Check, Preisvorschlag oder direkte Kontaktaufnahme. So klicken Kunden nicht ins Leere, sondern finden schneller den passenden Pfad.",
       "Kurz gesagt: weniger Portalgefühl, mehr echte Orientierung. Oder auf gut bayerisch: lieber gscheid starten als später doppelt reden.",
      ],
     },
    ]}
    highlightPoints={[
     "Direkte Anfragewege behalten mehr Kontext und sorgen für bessere Vorprüfung.",
     "Vergleichsportale sind schnell, aber nicht immer sauber genug für komplexere Services.",
     "Eine gute Buchungsseite reduziert Missverständnisse und macht den nächsten Schritt leichter.",
    ]}
    ctas={[
     { href: "/buchung", label: "Buchungsseite öffnen" },
     { href: "/rechner", label: "Preisrahmen prüfen" },
     { href: "/anfrage-mit-preisrahmen", label: "Preisvorstellung senden" },
    ]}
    faqTitle="FAQ zu direkter Anfrage statt Vergleichsportal"
    faqItems={faqItems}
   />
  </>
 );
}
