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
  q: "Wann ist Einlagerung beim Umzug sinnvoll?",
  a: "Vor allem bei Bauverzug, Zwischenmiete, versetzter Übergabe oder wenn Möbel zeitweise nicht direkt ins Zielobjekt können.",
 },
 {
  q: "Ist Einlagerung nur eine Notlösung?",
  a: "Nein. Richtig eingesetzt schafft sie Flexibilität und verhindert hektische Zwischenentscheidungen am Umzugstag.",
 },
 {
  q: "Welche Angaben braucht FLOXANT dafür?",
  a: "Wichtig sind Volumen, Dauer, Abholbedarf, besondere Gegenstände und die operative Einbindung in den restlichen Umzug.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog/einlagerung-beim-umzug-wann-sinnvoll",
  title: "Einlagerung beim Umzug richtig einordnen | FLOXANT",
  description:
   "Wann ist Einlagerung beim Umzug sinnvoll? FLOXANT erklärt typische Fälle, Preisfaktoren und warum sie oft mehr Ruhe in den Ablauf bringt.",
 });
}

export default function BlogEinlagerungPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "Einlagerung beim Umzug richtig einordnen",
    description: "Praxisleitfaden für Einlagerung in Umzugs- und Übergabesituationen.",
    path: "/blog/einlagerung-beim-umzug-wann-sinnvoll",
    about: ["Einlagerung", "Umzug", "Zwischenlagerung", "Übergabe"],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Einlagerung", item: "/blog/einlagerung-beim-umzug-wann-sinnvoll" },
   ]),
   buildArticleJsonLd({
    headline: "Einlagerung beim Umzug: wann sie sinnvoll ist und wann nicht",
    description: "Ein FLOXANT Artikel über Zwischenlagerung, Bauverzug und flexible Übergaben.",
    path: "/blog/einlagerung-beim-umzug-wann-sinnvoll",
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
     { label: "Einlagerung" },
    ]}
    date="20. April 2026"
    readTime="6 Min."
    title="Einlagerung beim Umzug: wann sie sinnvoll ist und wann nicht"
    intro="Einlagerung wirkt auf den ersten Blick wie ein Zusatzthema. In der Praxis ist sie oft der Unterschied zwischen einem hektischen Umzugstag und einem kontrollierten Ablauf, wenn Übergaben oder Zielobjekte zeitlich nicht sauber zusammenpassen."
    sections={[
     {
      title: "Typische Fälle für Einlagerung",
      paragraphs: [
       "Einlagerung ist besonders relevant bei Bauverzug, später Schlüsselübergabe, Zwischenmiete oder wenn das Zielobjekt noch nicht vollständig nutzbar ist.",
      ],
      bullets: [
       "Versetzte Auszugs- und Einzugstermine",
       "Sanierung oder Renovierung im Zielobjekt",
       "Zwischenmiete oder Auslandsaufenthalt",
       "Empfindliche Möbel sollen nicht improvisiert zwischengelagert werden",
      ],
     },
     {
      title: "Warum sie die Kundenerfahrung verbessert",
      paragraphs: [
       "Wer Einlagerung früh mitdenkt, muss am Umzugstag keine hektischen Notlösungen finden. Das schafft Ruhe, senkt Fehler und macht auch Zusatzleistungen planbarer.",
      ],
     },
     {
      title: "Wie FLOXANT Einlagerung einordnet",
      paragraphs: [
       "Für eine gute Vorprüfung zählen Volumen, Dauer, Abholung, besondere Gegenstände und die operative Verbindung zum restlichen Projekt. Erst daraus lässt sich ein plausibler Orientierungsrahmen ableiten.",
      ],
     },
    ]}
    highlightPoints={[
     "Einlagerung ist oft eine Qualitätsentscheidung, nicht nur ein Zusatz.",
     "Früh eingeplant bringt sie Ruhe in komplizierte Übergaben.",
     "Volumen, Dauer und Abholbedarf sind die wichtigsten Treiber.",
    ]}
    ctas={[
     { href: "/einlagerung", label: "Einlagerung ansehen" },
     { href: "/rechner", label: "Umzug vorprüfen" },
     { href: "/anfrage-mit-preisrahmen", label: "Preisvorstellung senden" },
    ]}
    faqTitle="FAQ zur Einlagerung"
    faqItems={faqItems}
   />
  </>
 );
}
