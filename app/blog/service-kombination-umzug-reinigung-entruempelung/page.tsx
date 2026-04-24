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
  q: "Wann sollte man Umzug, Reinigung und Entrümpelung kombinieren?",
  a: "Wenn Übergabe, Räumung und Transport zeitlich eng zusammenliegen oder wenn mehrere Dienstleister sonst unnötige Abstimmung erzeugen würden.",
 },
 {
  q: "Ist ein Kombiservice immer günstiger?",
  a: "Nicht automatisch. Er ist vor allem planbarer, weil Laufwege, Termine und Zuständigkeiten gemeinsam geprüft werden.",
 },
 {
  q: "Welche Reihenfolge ist sinnvoll?",
  a: "Erst räumen und sortieren, dann transportieren, danach reinigen und Übergabe vorbereiten. In Einzelfällen kann die Reihenfolge abweichen.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog/service-kombination-umzug-reinigung-entruempelung",
  title: "Umzug, Reinigung & Entrümpelung kombinieren | FLOXANT",
  description:
   "Wann ein kombinierter Ablauf aus Umzug, Reinigung und Entrümpelung sinnvoll ist und wie FLOXANT die Übergabe strukturiert.",
 });
}

export default function ServiceKombinationBlogPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "Umzug, Reinigung und Entrümpelung kombinieren",
    description: "Ratgeber zur kombinierten Planung von FLOXANT Services.",
    path: "/blog/service-kombination-umzug-reinigung-entruempelung",
    about: ["Umzug", "Reinigung", "Entrümpelung", "Übergabe", "Regensburg", "Bayern"],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Service-Kombination", item: "/blog/service-kombination-umzug-reinigung-entruempelung" },
   ]),
   buildArticleJsonLd({
    headline: "Umzug, Reinigung und Entrümpelung kombinieren",
    description: "Ein FLOXANT Artikel über koordinierte Abläufe vor Übergabe und Auszug.",
    path: "/blog/service-kombination-umzug-reinigung-entruempelung",
    datePublished: "2026-04-20",
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
     { label: "Service-Kombination" },
    ]}
    date="20. April 2026"
    readTime="8 Min."
    title="Umzug, Reinigung und Entrümpelung kombinieren"
    intro="Viele Projekte scheitern nicht am einzelnen Service, sondern an der Abstimmung dazwischen. Wenn Auszug, Räumung, Transport und Reinigung ineinandergreifen müssen, ist ein kombinierter Ablauf oft der ruhigere Weg."
    sections={[
     {
      title: "Das eigentliche Problem ist oft die Schnittstelle",
      paragraphs: [
       "Ein Umzugsteam kann nur gut arbeiten, wenn vorher klar ist, was mit Restmengen, Keller, Sperrmüll oder Möbeln passiert. Eine Reinigung kann nur sinnvoll geplant werden, wenn klar ist, wann die Räume frei sind.",
       "Genau an diesen Übergängen entstehen Verzögerungen, doppelte Wege oder unnötiger Stress. Ein Kombiservice reduziert diese Reibung, weil der Ablauf als ein Projekt geplant wird.",
      ],
     },
     {
      title: "Wann die Kombination besonders sinnvoll ist",
      paragraphs: [
       "Besonders stark ist die Kombination bei Wohnungsübergaben, Nachlassfällen, Firmenumzügen, engem Kündigungstermin oder wenn ein Objekt schnell wieder vermietet werden soll.",
      ],
      bullets: [
       "Auszug mit Endreinigung am gleichen oder folgenden Tag",
       "Räumung von Keller, Wohnung oder Nebenflächen vor dem Transport",
       "Übergabe an Vermieter, Käufer oder Hausverwaltung",
       "Enger Terminplan mit wenig Spielraum für Nacharbeiten",
      ],
     },
     {
      title: "Wie FLOXANT den Ablauf strukturiert",
      paragraphs: [
       "Zuerst wird geklärt, welche Leistungen wirklich zusammengehören. Danach werden Reihenfolge, Zugänge, Zeitfenster und Zuständigkeiten definiert. So entsteht kein Service-Mix auf Zuruf, sondern ein Ablauf mit klarer Verantwortung.",
       "Der Rechner hilft dabei, die wichtigsten Daten früh zu erfassen. Danach kann FLOXANT entscheiden, ob Umzug, Reinigung und Entrümpelung getrennt, kombiniert oder gestaffelt sinnvoller sind.",
      ],
     },
    ]}
    highlightPoints={[
     "Kombination lohnt sich vor allem bei Übergabe- und Zeitdruck.",
     "Die Reihenfolge entscheidet über Aufwand und Ergebnis.",
     "Ein guter Kombiservice ist Prozessklarheit, nicht nur ein Paketname.",
    ]}
    ctas={[
     { href: "/umzug-mit-reinigung", label: "Umzug mit Reinigung" },
     { href: "/entruempelung", label: "Entrümpelung ansehen" },
     { href: "/rechner", label: "Kombi-Aufwand einordnen" },
    ]}
    faqTitle="FAQ zur Service-Kombination"
    faqItems={faqItems}
   />
  </>
 );
}
