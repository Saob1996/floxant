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
  q: "Was ist bei einem Express-Umzug am wichtigsten?",
  a: "Schnelligkeit ist nur ein Teil. Entscheidend sind klare Angaben zu Umfang, Zugang, Strecke und Terminlage, damit eine Vorprüfung überhaupt belastbar wird.",
 },
 {
  q: "Sind Express-Anfragen immer teurer?",
  a: "Oft ja, weil die Planung enger ist und operative Reserve gebraucht wird. Wie stark sich das auswirkt, hängt aber vom tatsächlichen Umfang ab.",
 },
 {
  q: "Wie kann ich eine Express-Anfrage sinnvoll vorbereiten?",
  a: "Mit möglichst klaren Daten zu Volumen, Adressen, Stockwerken, Tragewegen und gewünschten Zusatzleistungen.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog/express-umzug-regensburg",
  title: "Express-Umzug in Regensburg realistisch vorbereiten | FLOXANT",
  description:
   "Was ist bei einem Express-Umzug in Regensburg wirklich machbar? FLOXANT erklärt, welche Angaben für eine schnelle und saubere Vorprüfung nötig sind.",
 });
}

export default function BlogExpressUmzugPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "Express-Umzug in Regensburg realistisch vorbereiten",
    description: "Praxisartikel über Eilanfragen, Vorprüfung und kurzfristige Umzüge.",
    path: "/blog/express-umzug-regensburg",
    about: ["Express-Umzug", "Regensburg", "Eilanfrage", "Vorprüfung"],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Express-Umzug", item: "/blog/express-umzug-regensburg" },
   ]),
   buildArticleJsonLd({
    headline: "Express-Umzug in Regensburg: was kurzfristig wirklich machbar ist",
    description: "Ein FLOXANT Artikel über Eilanfragen und schnelle Vorprüfung.",
    path: "/blog/express-umzug-regensburg",
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
     { label: "Express-Umzug" },
    ]}
    date="20. April 2026"
    readTime="5 Min."
    title="Express-Umzug in Regensburg: was kurzfristig wirklich machbar ist"
    intro="Kurzfristige Umzüge sind nicht automatisch chaotisch. Sie werden es nur dann, wenn wichtige Angaben fehlen. Wer bei einer Express-Anfrage die richtigen Informationen mitgibt, verbessert die Chancen auf eine saubere schnelle Einordnung deutlich."
    sections={[
     {
      title: "Was FLOXANT bei einer Eilanfrage zuerst braucht",
      paragraphs: [
       "Entscheidend sind Umfang, Strecke, Zugang, Stockwerke, Zeitfenster und Zusatzleistungen. Ohne diese Angaben ist eine schnelle Rückmeldung zwar möglich, aber kaum belastbar.",
      ],
      bullets: [
       "Start- und Zieladresse",
       "Volumen oder Zimmerzahl",
       "Stockwerke, Aufzug und Laufwege",
       "Wunschtermin und echte Dringlichkeit",
      ],
     },
     {
      title: "Was kurzfristig oft unterschätzt wird",
      paragraphs: [
       "Besonders kritisch sind Haltezonen, enge Treppenhäuser, Montagearbeiten und empfindliche Gegenstände. Gerade bei Eile werden diese Punkte gerne zu spät genannt.",
      ],
     },
     {
      title: "Wie FLOXANT Express sinnvoll einordnet",
      paragraphs: [
       "Express heißt bei FLOXANT nicht blind zusagen, sondern schnell vorprüfen. So bleibt die Kundenerfahrung professionell und die Erwartung vor dem Klick oder der Anfrage realistisch.",
      ],
     },
    ]}
    highlightPoints={[
     "Express braucht mehr Klarheit, nicht nur mehr Tempo.",
     "Je besser die Angaben, desto belastbarer die schnelle Rückmeldung.",
     "Die stärksten Kostentreiber sind Zugang, Zeitfenster und Zusatzleistungen.",
    ]}
    ctas={[
     { href: "/express-anfrage", label: "Express-Anfrage öffnen" },
     { href: "/rechner", label: "Umzug vorprüfen" },
     { href: "/umzug", label: "Umzugsservice ansehen" },
    ]}
    faqTitle="FAQ zum Express-Umzug"
    faqItems={faqItems}
   />
  </>
 );
}
