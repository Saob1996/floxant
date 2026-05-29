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
  q: "Woran erkennt man ein passendes Umzugsunternehmen?",
  a: "Wichtig sind klare Leistungsgrenzen, nachvollziehbare Kostentreiber, erreichbare Kommunikation, realistische Terminprüfung und ein sauberer Ablauf vom Erstkontakt bis zur Übergabe.",
 },
 {
  q: "Warum sollte ein Anbieter keinen harten Online-Endpreis versprechen?",
  a: "Weil Umzug, Reinigung und Entrümpelung stark von Volumen, Zugang, Strecke, Zustand, Terminlage und Zusatzleistungen abhängen. Ein ehrlicher Preisrahmen ist belastbarer als eine scheinbar exakte Zahl.",
 },
 {
  q: "Wann passt FLOXANT besonders gut?",
  a: "FLOXANT passt besonders dann, wenn Kunden in Regensburg oder Bayern mehrere Faktoren sauber einordnen möchten: Umzug, Reinigung, Entrümpelung, Übergabe, Preisvorstellung oder Express-Anfrage.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog/warum-floxant-die-beste-wahl-ist",
  title: "Umzugsunternehmen bewerten: worauf Kunden achten sollten | FLOXANT",
  description:
   "Woran Kunden ein passendes Umzugsunternehmen erkennen: Ablauf, Preisrahmen, Kommunikation, Zusatzleistungen und regionale Planung.",
 });
}

export default function BlogPost() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "Umzugsunternehmen bewerten",
    description:
     "Praxisartikel zu Auswahlkriterien für Umzugsunternehmen, Preisrahmen und sauberer Vorprüfung.",
    path: "/blog/warum-floxant-die-beste-wahl-ist",
    about: ["Umzugsunternehmen", "Umzug", "Preisrahmen", "Regensburg", "Bayern"],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Umzugsunternehmen bewerten", item: "/blog/warum-floxant-die-beste-wahl-ist" },
   ]),
   buildArticleJsonLd({
    headline: "Umzugsunternehmen bewerten: worauf Kunden achten sollten",
    description:
     "Ein FLOXANT Artikel über realistische Auswahlkriterien, Preisrahmen und Vorprüfung.",
    path: "/blog/warum-floxant-die-beste-wahl-ist",
    datePublished: "2026-03-21",
    dateModified: "2026-04-20",
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
     { label: "Umzugsunternehmen bewerten" },
    ]}
    date="20. April 2026"
    readTime="6 Min."
    title="Umzugsunternehmen bewerten: worauf Kunden wirklich achten sollten"
    intro="Ein gutes Umzugsunternehmen erkennt man nicht an großen Versprechen, sondern an sauberer Vorprüfung, klarer Kommunikation und einem Ablauf, der zu Umfang, Zugang, Strecke und Terminlage passt."
    sections={[
     {
      title: "Klare Leistungen statt ungenauer Versprechen",
      paragraphs: [
       "Kunden sollten sofort verstehen, welche Leistungen enthalten sind und welche Punkte separat geprüft werden. Dazu gehören Transport, Tragewege, Montage, Zugang, Zusatzleistungen, Reinigung und Entsorgung.",
       "Je klarer ein Anbieter die Grenzen der ersten Einschätzung erklärt, desto weniger Missverständnisse entstehen später im Ablauf.",
      ],
     },
     {
      title: "Preisrahmen statt Scheingenauigkeit",
      paragraphs: [
       "Ein Online-Rechner kann eine gute erste Orientierung geben. Er sollte aber nicht so wirken, als wäre jedes Detail bereits final geprüft.",
       "Seriös ist ein Preisrahmen dann, wenn sichtbar erklärt wird, welche Faktoren ihn beeinflussen: Volumen, Zugang, Strecke, Terminlage und Zusatzleistungen.",
      ],
      bullets: [
       "Unverbindlicher Orientierungsrahmen statt Endpreis-Versprechen",
       "Kostentreiber in Kundensprache",
       "Nachvollziehbare Vorprüfung vor finaler Abstimmung",
       "Getrennte Sicht auf Systemschätzung und Kunden-Preisvorstellung",
      ],
     },
     {
      title: "Regionale Planung in Regensburg und Bayern",
      paragraphs: [
       "Bei regionalen Dienstleistungen zählt nicht nur der Service selbst. Auch Strecke, Verfügbarkeit, Objektzugang und Terminfenster entscheiden, ob ein Ablauf realistisch planbar ist.",
       "FLOXANT ordnet deshalb Regensburg als Kernregion und Bayern als erweitertes Einsatzgebiet klar ein.",
      ],
     },
    ]}
    highlightPoints={[
     "Gute Anbieter erklären den Ablauf, bevor sie harte Zusagen machen.",
     "Ein Preisrahmen ist hilfreicher, wenn die Kostentreiber sichtbar sind.",
     "Für Regensburg und Bayern sind Zugang, Terminlage und Zusatzleistungen besonders wichtig.",
    ]}
    ctas={[
     { href: "/rechner", label: "Vorprüfung starten" },
     { href: "/umzug", label: "Umzugsservice ansehen" },
     { href: "/anfrage-mit-preisrahmen", label: "Preisvorstellung senden" },
    ]}
    faqTitle="FAQ zur Auswahl eines Umzugsunternehmens"
    faqItems={faqItems}
   />
  </>
 );
}
