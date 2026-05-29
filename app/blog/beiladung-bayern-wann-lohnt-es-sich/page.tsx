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
  q: "Was ist Beiladung bei FLOXANT?",
  a: "Beiladung bedeutet, dass einzelne Möbel, Kartons oder kleinere Sendungen in einen bereits geplanten Transport integriert werden. Das eignet sich vor allem für flexible Termine und kleinere Volumina.",
 },
 {
  q: "Wann lohnt sich Beiladung in Bayern?",
  a: "Beiladung lohnt sich, wenn kein kompletter Umzug nötig ist, aber Möbel oder Kartons trotzdem sauber mitfahren sollen. Typisch sind einzelne Sofas, kleinere Privatumzüge, Nachsendungen oder Teilmengen.",
 },
 {
  q: "Wann ist Beiladung nicht passend?",
  a: "Wenn ein fester Wunschtermin, ein großes Volumen oder mehrere Zusatzleistungen wie Montage, viele Tragewege oder parallele Reinigungsarbeiten gebraucht werden, ist meist ein eigener Umzug sinnvoller.",
 },
 {
  q: "Wie wird die Einschätzung für Beiladung erstellt?",
  a: "Entscheidend sind Volumen, Strecke, Zugang, Tragewege, Zusatzleistungen und Terminfenster. Daraus entsteht zuerst ein unverbindlicher Orientierungsrahmen für die weitere Planung.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog/beiladung-bayern-wann-lohnt-es-sich",
  title: "Beiladung in Bayern richtig einordnen | FLOXANT",
  description:
   "Beiladung für Bayern richtig einordnen: Vorteile, Grenzen, Preisfaktoren und wann ein eigener Umzug sinnvoller ist.",
 });
}

export default function BlogBeiladungBayernPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "Beiladung in Bayern: Wann sie sich lohnt und wann nicht",
    description: "Praxisleitfaden für Beiladung in Bayern mit klarer Einordnung von Nutzen, Grenzen und Preisfaktoren.",
    path: "/blog/beiladung-bayern-wann-lohnt-es-sich",
    about: ["Beiladung", "Umzug Bayern", "Transport", "Kleintransport"],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Beiladung Bayern", item: "/blog/beiladung-bayern-wann-lohnt-es-sich" },
   ]),
   buildArticleJsonLd({
    headline: "Beiladung in Bayern: wann sie sich wirklich lohnt",
    description: "Ein FLOXANT Artikel über Beiladung, Grenzen und Preisfaktoren.",
    path: "/blog/beiladung-bayern-wann-lohnt-es-sich",
    datePublished: "2026-04-19",
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
     { label: "Beiladung Bayern" },
    ]}
    date="19. April 2026"
    readTime="6 Min."
    title="Beiladung in Bayern: wann sie sich wirklich lohnt"
    intro="Beiladung klingt oft einfach, wird aber in der Planung häufig falsch eingeschätzt. Nicht jede kleine Menge ist automatisch ein guter Beiladungsfall. Entscheidend sind Terminspielraum, Transportweg und Zusatzaufwand."
    sections={[
     {
      title: "Was ist Beiladung und für wen ist sie gedacht?",
      paragraphs: [
       "Beiladung ist ideal, wenn kein volles Fahrzeug benötigt wird, aber einzelne Möbel, Kartons, kleine Privatumzüge oder Restmengen mitfahren sollen.",
      ],
     },
     {
      title: "Die stärksten Vorteile",
      paragraphs: [
       "Beiladung ist besonders dann stark, wenn Flexibilität vorhanden ist und der Umfang wirklich überschaubar bleibt.",
      ],
      bullets: [
       "Wirtschaftlich für kleinere Transportmengen",
       "Sinnvoll bei flexiblen Terminfenstern",
       "Gut für Einzelmöbel und Teilmengen",
       "Sauberer Transport statt improvisierter Eigenlösung",
      ],
     },
     {
      title: "Wann ein eigener Umzug oder Kleintransport besser ist",
      paragraphs: [
       "Wenn mehrere Stockwerke, lange Laufwege, Montage, ein enger Wunschtermin oder großer Umfang dazukommen, verliert Beiladung schnell ihren Vorteil. Dann ist ein eigener Einsatz klarer und planbarer.",
      ],
     },
    ]}
    highlightPoints={[
     "Beiladung ist stark bei kleinen Mengen und flexiblem Timing.",
     "Viele Zusatzleistungen kippen den Fall in Richtung eigener Transport.",
     "Der Rechner hilft dabei, Beiladung gegen einen eigenen Einsatz sauber abzugrenzen.",
    ]}
    ctas={[
     { href: "/beiladung", label: "Beiladung ansehen" },
     { href: "/umzug", label: "Umzugsservice" },
     { href: "/rechner?service=umzug", label: "Transport vorprüfen" },
    ]}
    faqTitle="FAQ zur Beiladung in Bayern"
    faqItems={faqItems}
   />
  </>
 );
}
