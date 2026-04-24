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
  q: "Sollte ich bei einer Anfrage überhaupt eine Preisvorstellung nennen?",
  a: "Ja, wenn sie als Orientierung gemeint ist. Eine gute Preisvorstellung hilft bei der Priorisierung, ersetzt aber keine operative Vorprüfung.",
 },
 {
  q: "Wird mein Budget bei FLOXANT als Preiszusage behandelt?",
  a: "Nein. Die Preisvorstellung ergänzt die System-Einschätzung, überschreibt sie aber nicht.",
 },
 {
  q: "Wann ist eine Preisvorstellung besonders hilfreich?",
  a: "Vor allem dann, wenn Varianten verglichen werden, das Budget klar begrenzt ist oder bestimmte Leistungen priorisiert werden sollen.",
 },
];

export async function generateMetadata(): Promise<Metadata> {
 return generatePageSEO({
  lang: "de",
  path: "blog/preisvorstellung-umzug-anfrage",
  title: "Preisvorstellung bei der Umzugsanfrage richtig nutzen | FLOXANT",
  description:
   "Wie sinnvoll ist eine Preisvorstellung bei Umzug, Reinigung oder Entrümpelung? FLOXANT erklärt Nutzen, Grenzen und die richtige Formulierung.",
 });
}

export default function BlogPreisvorstellungPage() {
 const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
   buildWebPageJsonLd({
    name: "Preisvorstellung bei der Umzugsanfrage richtig nutzen",
    description: "Praxisartikel über Budget und Preisvorstellung in Service-Anfragen.",
    path: "/blog/preisvorstellung-umzug-anfrage",
    about: ["Preisvorstellung", "Budget", "Umzugsanfrage", "Orientierungsrahmen"],
   }),
   buildBreadcrumbJsonLd([
    { name: "FLOXANT", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: "Preisvorstellung", item: "/blog/preisvorstellung-umzug-anfrage" },
   ]),
   buildArticleJsonLd({
    headline: "Preisvorstellung bei der Umzugsanfrage: sinnvoll oder riskant?",
    description: "Ein FLOXANT Artikel über Budgetsignale und realistische Vorprüfung.",
    path: "/blog/preisvorstellung-umzug-anfrage",
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
     { label: "Preisvorstellung" },
    ]}
    date="20. April 2026"
    readTime="6 Min."
    title="Preisvorstellung bei der Umzugsanfrage: sinnvoll oder riskant?"
    intro="Viele Kunden möchten nicht erst am Ende über Geld sprechen. Das ist verständlich. Entscheidend ist aber, wie eine Preisvorstellung kommuniziert wird: als Orientierung für die Planung, nicht als Forderung nach einem künstlich passenden Endpreis."
    sections={[
     {
      title: "Warum eine Preisvorstellung hilfreich sein kann",
      paragraphs: [
       "Ein klares Budget hilft dabei, Leistungen zu priorisieren und Varianten zu prüfen. Gerade bei Umzug, Reinigung oder Entrümpelung kann so früh sichtbar werden, welche Lösung realistisch in Frage kommt.",
      ],
      bullets: [
       "Hilft bei Varianten und Prioritäten",
       "Erleichtert ehrliche Rückmeldung zum Machbaren",
       "Sinnvoll bei begrenztem Budget oder enger Planung",
       "Besonders hilfreich für Kombi- und Expressfälle",
      ],
     },
     {
      title: "Wo die Grenze liegt",
      paragraphs: [
       "Ein Budget ist kein Preis. Ohne Angaben zu Umfang, Zugang, Terminlage und Zusatzleistungen wäre jede exakte Zahl eher Marketing als Produktwahrheit.",
       "Deshalb führt FLOXANT Preisvorstellung und System-Einschätzung getrennt. So bleibt sichtbar, was der Kunde wünscht und was operativ plausibel ist.",
      ],
     },
     {
      title: "Wie Sie Ihre Preisvorstellung sinnvoll formulieren",
      paragraphs: [
       "Am besten als Rahmen in Kundensprache. Nicht 'es darf auf keinen Fall mehr kosten', sondern zum Beispiel: 'Wir stellen uns einen Rahmen von 900 bis 1.200 Euro vor, wenn Reinigung und Kleinmöbel bereits enthalten sind.'",
      ],
     },
    ]}
    highlightPoints={[
     "Preisvorstellung ja, Preiszusage nein.",
     "Budget und System-Einschätzung sollten immer getrennt sichtbar bleiben.",
     "Die beste Wirkung hat eine Preisvorstellung zusammen mit klaren Projektdaten.",
    ]}
    ctas={[
     { href: "/anfrage-mit-preisrahmen", label: "Preisvorstellung senden" },
     { href: "/rechner", label: "Orientierungsrahmen berechnen" },
     { href: "/umzug", label: "Umzug ansehen" },
    ]}
    faqTitle="FAQ zur Preisvorstellung"
    faqItems={faqItems}
   />
  </>
 );
}
