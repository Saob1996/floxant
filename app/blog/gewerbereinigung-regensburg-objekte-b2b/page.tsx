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
  q: "Für welche Objekte lohnt sich eine eigene B2B-Reinigungsseite?",
  a: "Vor allem für Büro, Praxis, Kanzlei, Hotel, Hausverwaltung, Treppenhaus, Verwaltungsflächen und größere Objektstrukturen mit klarer wirtschaftlicher Relevanz.",
 },
 {
  q: "Warum sollte diese Seite private Kleinaufträge nicht anziehen?",
    a: "Weil gewerbliche Kunden andere Fragen haben als private Haushalte: Fläche, Turnus, Zugang, Ansprechpartner, Zeitfenster und Zuständigkeit müssen klar sein.",
 },
 {
  q: "Kann man auch größere oder sensiblere Objekte anfragen?",
  a: "Ja, solange Leistungsumfang, Zugang, Randzeiten, Verantwortlichkeiten und sensible Bereiche sauber vorgeprüft werden. Für Spezialhygiene oder regulierte Sonderanforderungen müssen Grenzen klar besprochen werden.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog/gewerbereinigung-regensburg-objekte-b2b",
  title: "Gewerbereinigung in Regensburg für große Objekte richtig anfragen | FLOXANT",
  description:
   "Wie Büro, Praxis, Hotel, Kanzlei, Hausverwaltung und größere Objekte in Regensburg eine B2B-Reinigung sauber und wirtschaftlich anfragen.",
  keywords: [
   "Gewerbereinigung Regensburg B2B",
   "Büroreinigung Regensburg",
   "Praxisreinigung Regensburg",
   "Hotelreinigung Regensburg",
  ],
 });
}

export default function BlogCommercialCleaningB2BPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "Gewerbereinigung Regensburg für große Objekte",
    description: "Ratgeber zu B2B-Reinigung für Büro, Praxis, Hotel, Kanzlei und Objektbetrieb in Regensburg.",
    path: "/blog/gewerbereinigung-regensburg-objekte-b2b",
    about: ["Gewerbereinigung", "B2B", "Büro", "Praxis", "Hotel", "Regensburg"],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Gewerbereinigung B2B", item: "/blog/gewerbereinigung-regensburg-objekte-b2b" },
   ]),
   buildArticleJsonLd({
    headline: "Gewerbereinigung in Regensburg für große Objekte richtig anfragen",
    description: "Ein FLOXANT Artikel zu wirtschaftlich starken B2B-Anfragen in der Reinigungslogik.",
    path: "/blog/gewerbereinigung-regensburg-objekte-b2b",
    datePublished: "2026-04-27",
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
     { label: "Gewerbereinigung B2B" },
    ]}
    date="27. April 2026"
    readTime="7 Min."
    title="Gewerbereinigung in Regensburg für große Objekte richtig anfragen"
    intro="Nicht jede Reinigungsanfrage ist gleich. Wer Büro, Praxis, Hotel, Kanzlei, Treppenhaus oder Verwaltungsflächen betreuen lassen will, braucht klare Angaben zu Fläche, Turnus, Zugang und Verantwortlichkeit."
    sections={[
     {
      title: "Warum B2B-Reinigung anders gesucht wird",
      paragraphs: [
       "Unternehmen suchen seltener nach einer schönen allgemeinen Reinigungsseite. Sie suchen nach Verlässlichkeit, festen Ansprechpartnern, klaren Zeiten, sauberer Objektlogik und planbarer Qualität.",
       "Je größer oder sensibler das Objekt, desto wichtiger wird die Vorprüfung. Quadratmeter allein reichen nicht. Turnus, Zugang, Randzeiten, Personalwege und Verantwortlichkeiten spielen genauso mit hinein.",
      ],
     },
     {
      title: "Welche Objektarten wirtschaftlich stark sein können",
      paragraphs: [
       "In Regensburg sind vor allem Büro, Praxis, Kanzlei, Hotel, Hausverwaltung, Treppenhaus, Verwaltungsflächen und gewerbliche Allgemeinbereiche starke B2B-Hinweise.",
      ],
      bullets: [
       "Büroflächen mit wiederkehrender Unterhaltsreinigung",
       "Praxen und Gesundheitsimmobilien mit klaren Allgemeinbereichen",
       "Hotels und Beherbergung mit Lobby, Fluren und Verwaltungszonen",
       "Hausverwaltungen und Objektbetreiber mit mehreren Flächen oder Turnussen",
      ],
     },
     {
      title: "Warum gewerbliche Anfragen anders sortiert werden müssen",
      paragraphs: [
       "Wenn klar gesagt wird, für welche Objekte die Reinigung gedacht ist, entstehen weniger falsche Rückfragen. Ein Büro braucht andere Planung als eine einzelne Wohnung.",
       "Kurz gesagt: lieber früh sauber einordnen als später erklären, warum Termin, Turnus oder Zugang nicht passen.",
      ],
     },
    ]}
    highlightPoints={[
     "B2B-Reinigung braucht eine andere Ansprache als private Einzelaufträge.",
     "Objektart, Turnus, Zugang und Verantwortlichkeit sind stärkere Hinweise als reine Fläche.",
     "Eine klare B2B-Seite kann falsche Anfragen reduzieren und passendere Anfragen bringen.",
    ]}
    ctas={[
     { href: "/hotelreinigung-regensburg", label: "Hotelreinigung prüfen" },
     { href: "/praxisreinigung-regensburg", label: "Praxisreinigung prüfen" },
     { href: "/gewerbereinigung-regensburg", label: "B2B-Reinigungsseite öffnen" },
     { href: "/buchung", label: "Direkte Anfrage starten" },
    ]}
    faqTitle="FAQ zur Gewerbereinigung für große Objekte"
    faqItems={faqItems}
   />
  </>
 );
}
