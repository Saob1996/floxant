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
  q: "Für welche Objekte ist Unterhaltsreinigung in Regensburg besonders sinnvoll?",
  a: "Vor allem für Büros, Kanzleien, Praxen, Hotels, Hausverwaltungen und gemischt genutzte Gewerbeobjekte. Dort zählen Verlässlichkeit, feste Ansprechpartner und eine saubere Taktung.",
 },
 {
  q: "Warum reicht der Preis pro Quadratmeter oft nicht aus?",
  a: "Weil Zugang, Randzeiten, Flächenstruktur, Sanitärzonen, Küchen, Glasflächen und Qualitätskontrolle den Aufwand stark verändern können.",
 },
 {
  q: "Was möchten gewerbliche Kunden meist zuerst wissen?",
  a: "Ob das Team verlässlich arbeitet, ob es feste Ansprechpartner gibt, wie Reklamationen gehandhabt werden und ob die Reinigung zum tatsächlichen Betrieb passt.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog/unterhaltsreinigung-regensburg-buero-praxis-hotel",
  title: "Unterhaltsreinigung Regensburg für Büro, Praxis und Hotel | FLOXANT",
  description:
   "Worauf Unternehmen bei Unterhaltsreinigung in Regensburg achten sollten: Turnus, Zugang, Qualitätskontrolle, Ansprechpartner und klare B2B-Abläufe.",
  keywords: [
   "Unterhaltsreinigung Regensburg",
   "Büroreinigung Regensburg",
   "Praxisreinigung Regensburg",
   "Hotelreinigung Regensburg",
  ],
 });
}

export default function BlogUnterhaltsreinigungPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "Unterhaltsreinigung in Regensburg für Büro, Praxis und Hotel",
    description: "Ratgeber für gewerbliche Reinigung in Regensburg mit Fokus auf Turnus, Qualität und Ansprechpartner.",
    path: "/blog/unterhaltsreinigung-regensburg-buero-praxis-hotel",
    about: ["Unterhaltsreinigung", "Büroreinigung", "Praxisreinigung", "Hotelreinigung", "Regensburg"],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Unterhaltsreinigung Regensburg", item: "/blog/unterhaltsreinigung-regensburg-buero-praxis-hotel" },
   ]),
   buildArticleJsonLd({
    headline: "Unterhaltsreinigung in Regensburg: worauf Büro, Praxis und Hotel achten sollten",
    description: "Ein FLOXANT Artikel zu B2B-Reinigung, Turnus, Qualitätskontrolle und Objektverantwortung.",
    path: "/blog/unterhaltsreinigung-regensburg-buero-praxis-hotel",
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
     { label: "Unterhaltsreinigung Regensburg" },
    ]}
    date="26. April 2026"
    readTime="7 Min."
    title="Unterhaltsreinigung in Regensburg: worauf Büro, Praxis und Hotel achten sollten"
    intro="Gewerbliche Reinigung wird oft zu stark über Fläche und zu wenig über Betrieb gedacht. Für Büros, Praxen, Hotels und Objektverantwortliche sind meist ganz andere Fragen entscheidend: Wer kommt? Wie läuft die Abstimmung? Was passiert bei Änderungen? Und bleibt die Qualität wirklich konstant?"
    sections={[
     {
      title: "Nicht nur sauber, sondern betriebstauglich",
      paragraphs: [
       "Für Unternehmen zählt nicht nur, ob am Ende gewischt wurde. Wichtig ist, dass Reinigungszeiten, Zugang, Schließsysteme, sensible Bereiche und Verantwortlichkeiten zum Alltag des Objekts passen.",
       "Gerade in Kanzleien, Praxen oder Hotels ist ein unklarer Ablauf oft teurer als ein etwas gründlicheres Angebot. Denn jede Störung im Betrieb kostet Zeit, Nerven und Vertrauen.",
      ],
     },
     {
      title: "Welche Punkte gute B2B-Reinigung von Standardanfragen unterscheiden",
      paragraphs: [
       "Ein seriöser Anbieter prüft nicht nur Quadratmeter, sondern auch Nutzung, Flächenmix, Sanitärbereiche, Küchen, Glasflächen, Randzeiten und Reaktionsbedarf.",
      ],
      bullets: [
       "Gibt es feste Ansprechpartner oder ständig wechselnde Teams?",
       "Ist die Reinigung vor Öffnung, nach Schließung oder im laufenden Betrieb geplant?",
       "Wie werden Reklamationen, Sonderreinigung und Vertretungen gelöst?",
       "Welche Bereiche brauchen besondere Diskretion oder klare Zugangsregeln?",
      ],
     },
     {
      title: "Warum Regensburg lokal ein echter Vorteil sein kann",
      paragraphs: [
       "Kurze Wege, schnellere Abstimmung und bessere Objektkenntnis helfen vor allem dann, wenn sich Termine, Turnus oder Sonderlagen kurzfristig ändern.",
       "Für Hausverwaltungen, Hotels oder Praxen ist ein erreichbarer regionaler Partner oft wertvoller als ein anonymer Lead-Anbieter mit viel Marketing und wenig operativer Nähe.",
      ],
     },
    ]}
    highlightPoints={[
     "Unterhaltsreinigung sollte zum Objekt und zum Betrieb passen, nicht nur zur Fläche.",
     "Feste Ansprechpartner und klare Qualitätswege sind für B2B oft wichtiger als ein lockender Einstiegspreis.",
     "Lokale Nähe in Regensburg hilft bei Abstimmung, Änderungen und Sonderlagen.",
    ]}
    ctas={[
     { href: "/hotelreinigung-regensburg", label: "Hotelreinigung Regensburg ansehen" },
     { href: "/praxisreinigung-regensburg", label: "Praxisreinigung Regensburg ansehen" },
     { href: "/gewerbereinigung-regensburg", label: "Gewerbereinigung Regensburg ansehen" },
     { href: "/kontakt", label: "Direkt Kontakt aufnehmen" },
    ]}
    faqTitle="FAQ zur Unterhaltsreinigung"
    faqItems={faqItems}
   />
  </>
 );
}
