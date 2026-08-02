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
  q: "Warum ist Regensburg für FLOXANT so wichtig?",
  a: "Regensburg ist der Ausgangspunkt des verifizierten Einsatzgebiets bis 75 km. Dort werden Umzug, Entrümpelung und Reinigung nach Umfang, Termin und Kapazität eingeordnet.",
 },
 {
  q: "Wie werden Ziele außerhalb des Einsatzgebiets behandelt?",
  a: "Das Einsatzgebiet reicht bis 75 km um Regensburg. München, Nürnberg, Augsburg und andere weiter entfernte Orte können nur Ziel einer konkreten Fernziel-Anfrage sein; daraus folgt keine flächendeckende Verfügbarkeit.",
 },
 {
  q: "Warum beeinflusst die Region den Preisrahmen?",
  a: "Anfahrt, Strecke, Tourenplanung, Parken, Laufwege und Terminfenster unterscheiden sich je nach Ort. Deshalb gehört die regionale Einordnung zur Vorprüfung.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog/regensburg-bayern-servicegebiet-richtig-planen",
  title: "Regensburg + 75 km | Servicegebiet richtig planen",
  description:
   "Verifiziertes FLOXANT Einsatzgebiet bis 75 km um Regensburg. Fernziele sind nur Ziel einer konkreten Anfrage und keine flächendeckende Verfügbarkeit.",
 });
}

export default function RegensburgBayernServicegebietBlogPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "Regensburg und das Einsatzgebiet bis 75 km planen",
    description: "Ratgeber zum verifizierten Einsatzgebiet um Regensburg und zur Einordnung von Fernzielen.",
    path: "/blog/regensburg-bayern-servicegebiet-richtig-planen",
    about: ["Regensburg", "Einsatzgebiet bis 75 km", "Umzug", "Entrümpelung", "Reinigung", "Fernziel-Anfrage"],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Servicegebiet", item: "/blog/regensburg-bayern-servicegebiet-richtig-planen" },
   ]),
   buildArticleJsonLd({
    headline: "Regensburg und 75 km Einsatzgebiet richtig planen",
    description: "Ein FLOXANT Artikel über das verifizierte Einsatzgebiet und Fernziele als Ziel einer Anfrage.",
    path: "/blog/regensburg-bayern-servicegebiet-richtig-planen",
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
     { label: "Regensburg und 75 km" },
    ]}
    date="20. April 2026"
    readTime="6 Min."
    title="Regensburg und 75 km: Servicegebiet richtig planen"
    intro="Regensburg ist der Ausgangspunkt des verifizierten FLOXANT Einsatzgebiets bis 75 km. Weiter entfernte Orte werden nicht als Einsatzgebiet beworben; sie können nur als Fernziel einer konkreten Anfrage genannt werden."
    sections={[
     {
      title: "Warum die Region für Ihre Planung wichtig ist",
      paragraphs: [
       "Für Google ist die regionale Einordnung wichtig. Für Kunden ist sie noch wichtiger. Wer einen Umzug, eine Reinigung oder eine Entrümpelung plant, braucht keine leere Floskel, sondern eine klare Grenze: Das verifizierte Einsatzgebiet reicht bis 75 km um Regensburg.",
       "Regionale Relevanz entsteht durch Verfügbarkeit, Fahrtwege, lokale Erfahrung, Zeitfenster und die Fähigkeit, Zusatzleistungen sinnvoll zu kombinieren.",
      ],
     },
     {
      title: "Regensburg als Ausgangspunkt",
      paragraphs: [
       "Regensburg ist der natürliche Schwerpunkt für FLOXANT. Im verifizierten Einsatzgebiet bis 75 km lassen sich Wege, Reinigung, Transport, Beiladung und Entrümpelung belastbar einordnen.",
      ],
      bullets: [
       "Kürzere Wege bei Einsätzen im Stadtgebiet und Landkreis",
       "Bessere Einschätzung von Übergabe, Parken und Zeitfenstern",
       "Stärkere Kombination von Umzug, Reinigung und Entrümpelung",
       "Schnellerer Startpunkt über Rechner oder Preisvorstellung",
      ],
     },
     {
      title: "Fernziele in Bayern richtig einordnen",
      paragraphs: [
       "München, Nürnberg, Augsburg und andere Orte außerhalb des 75-km-Einsatzgebiets können als Ziel einer konkreten Umzugs- oder Transportanfrage genannt werden. FLOXANT behauptet dort keine lokale oder flächendeckende Verfügbarkeit.",
       "Der FLOXANT Rechner hilft, diese Unterschiede früh sichtbar zu machen. Das verbessert Nutzererlebnis und macht die Anfrage für spätere Abstimmung belastbarer.",
      ],
     },
    ]}
    highlightPoints={[
     "Regensburg ist der Kern; das verifizierte Einsatzgebiet reicht bis 75 km.",
     "Fernziele sind Ziele einer Anfrage, keine flächendeckende Verfügbarkeitszusage.",
     "Regionale Einordnung beeinflusst Termin, Route und Preisrahmen.",
     "Starke Ortsseiten brauchen echte Erklärung statt bloßer Städtenamen.",
    ]}
    ctas={[
     { href: "/regensburg", label: "Regensburg-Bereich" },
     { href: "/regensburg/umzug", label: "Umzug Regensburg" },
     { href: "/rechner", label: "Region im Rechner prüfen" },
    ]}
    faqTitle="FAQ zum Einsatzgebiet um Regensburg"
    faqItems={faqItems}
   />
  </>
 );
}
