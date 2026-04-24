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
  q: "Wann lohnt sich Umzug mit Reinigung besonders?",
  a: "Vor allem bei knappen Übergaben, bei Vermietung, bei Verkauf und immer dann, wenn Auszug und Reinigung direkt ineinandergreifen müssen.",
 },
 {
  q: "Ist ein Kombiservice günstiger als zwei getrennte Aufträge?",
  a: "Nicht automatisch, aber oft effizienter. Wege, Timing, Schlüsselübergabe und Abstimmung lassen sich deutlich sauberer bündeln.",
 },
 {
  q: "Wie schätzt FLOXANT den Aufwand ein?",
  a: "Entscheidend sind Umzugsvolumen, Zugang, Reinigungsfläche, Zustand, Extras und das Übergabefenster. Daraus entsteht zuerst ein unverbindlicher Orientierungsrahmen.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog/umzug-mit-reinigung-regensburg",
  title: "Umzug mit Reinigung in Regensburg sinnvoll planen | FLOXANT",
  description:
   "Wann lohnt sich der Kombiservice aus Umzug und Reinigung? FLOXANT erklärt Ablauf, Vorteile und Preislogik für Regensburg und Bayern.",
 });
}

export default function BlogUmzugMitReinigungRegensburgPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "Umzug mit Reinigung in Regensburg sinnvoll planen",
    description: "Praxisleitfaden für den Kombiservice aus Umzug und Reinigung.",
    path: "/blog/umzug-mit-reinigung-regensburg",
    about: ["Umzug mit Reinigung", "Regensburg", "Übergabe", "Reinigung"],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Umzug mit Reinigung", item: "/blog/umzug-mit-reinigung-regensburg" },
   ]),
   buildArticleJsonLd({
    headline: "Umzug mit Reinigung in Regensburg: Wann sich der Kombiservice lohnt",
    description: "Ein FLOXANT Artikel über die Kombination aus Umzug, Reinigung und Übergabe.",
    path: "/blog/umzug-mit-reinigung-regensburg",
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
     { label: "Umzug mit Reinigung" },
    ]}
    date="20. April 2026"
    readTime="7 Min."
    title="Umzug mit Reinigung in Regensburg: Wann sich der Kombiservice lohnt"
    intro="Viele Übergaben scheitern nicht am eigentlichen Umzug, sondern an der Schnittstelle danach. Wenn Transport, Restmengen, Reinigung und Schlüsselübergabe eng zusammenliegen, ist ein koordinierter Kombiservice oft der sauberere Weg."
    sections={[
     {
      title: "Was ist der Vorteil eines Kombiservices?",
      paragraphs: [
       "Der größte Vorteil ist nicht nur Bequemlichkeit, sondern ein stabilerer Ablauf. Wer Umzug und Reinigung gemeinsam plant, vermeidet Leerlauf, doppelte Abstimmung und kritische Übergabelücken.",
      ],
      bullets: [
       "Ein Ansprechpartner für Übergabe, Ablauf und Timing",
       "Weniger Reibung zwischen Auszug, Reinigung und Nachkontrolle",
       "Sinnvoll bei engen Zeitfenstern und Vermieterterminen",
       "Gut kombinierbar mit Kleinmengen, Restbeständen oder Schlüsselübergabe",
      ],
     },
     {
      title: "Wann ist die Kombination besonders sinnvoll?",
      paragraphs: [
       "Sinnvoll ist sie vor allem bei Auszügen mit knappem Zeitfenster, bei Wohnungswechseln mit Nachmietern und überall dort, wo die saubere Übergabe direkt auf den Transport folgen muss.",
       "Auch in Regensburg mit Altbauten, Innenstadtlagen und enger Terminierung lässt sich ein kombinierter Ablauf oft deutlich besser steuern als zwei separate Gewerke.",
      ],
     },
     {
      title: "Wie FLOXANT den Aufwand einordnet",
      paragraphs: [
       "Im Rechner werden Transport- und Reinigungsfaktoren nicht vermischt, sondern gemeinsam eingeordnet. Relevante Punkte sind Volumen, Zugang, Fläche, Zustand, Extras und Terminlage.",
       "So entsteht ein unverbindlicher Orientierungsrahmen, der die Kombination realistisch abbildet, ohne künstliche Präzision zu behaupten.",
      ],
     },
    ]}
    highlightPoints={[
     "Kombiservices sind besonders stark bei knappen Übergaben.",
     "Ein sauberer Ablauf spart oft mehr als ein getrennter Billigansatz.",
     "Preisrahmen und Aufwand werden bei FLOXANT gemeinsam vorgeprüft.",
    ]}
    ctas={[
     { href: "/umzug-mit-reinigung", label: "Kombiservice ansehen" },
     { href: "/rechner", label: "Kombiservice vorprüfen" },
     { href: "/reinigung", label: "Reinigung ansehen" },
    ]}
    faqTitle="FAQ zu Umzug mit Reinigung"
    faqItems={faqItems}
   />
  </>
 );
}
