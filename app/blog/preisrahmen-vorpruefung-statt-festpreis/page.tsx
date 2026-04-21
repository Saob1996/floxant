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
    q: "Warum nennt FLOXANT zuerst einen Preisrahmen?",
    a: "Weil Umzug, Reinigung und Entrümpelung von Volumen, Zugang, Terminlage, Materialarten und Zusatzleistungen abhängen. Ein Preisrahmen ist ehrlicher als ein künstlich exakter Online-Endpreis.",
  },
  {
    q: "Ist ein Preisrahmen schlechter als ein Festpreis?",
    a: "Nein. Der Preisrahmen ist die erste Einordnung. Ein konkretes Angebot kann folgen, wenn die operativen Details ausreichend geprüft wurden.",
  },
  {
    q: "Welche Angaben machen die Einschätzung besser?",
    a: "Fotos, Volumen, Fläche, Etage, Aufzug, Laufweg, Terminwunsch, Zusatzleistungen und besondere Materialarten verbessern die Vorprüfung deutlich.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/preisrahmen-vorpruefung-statt-festpreis",
    title: "Preisrahmen statt Festpreis | Warum Vorprüfung ehrlicher ist",
    description:
      "Warum FLOXANT bei Umzug, Reinigung und Entrümpelung zuerst mit unverbindlichem Preisrahmen und sauberer Vorprüfung arbeitet.",
  });
}

export default function PreisrahmenVorpruefungBlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Preisrahmen statt Festpreis",
        description: "Ratgeber zur ehrlichen Preislogik bei Umzug, Reinigung und Entrümpelung.",
        path: "/blog/preisrahmen-vorpruefung-statt-festpreis",
        about: ["Preisrahmen", "Vorprüfung", "Umzug", "Reinigung", "Entrümpelung"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        { name: "Preisrahmen statt Festpreis", item: "/blog/preisrahmen-vorpruefung-statt-festpreis" },
      ]),
      buildArticleJsonLd({
        headline: "Preisrahmen statt Festpreis: Warum Vorprüfung ehrlicher ist",
        description: "Ein FLOXANT Artikel über Preiswahrheit, Kostentreiber und realistische Vorplanung.",
        path: "/blog/preisrahmen-vorpruefung-statt-festpreis",
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
          { label: "Preisrahmen statt Festpreis" },
        ]}
        date="20. April 2026"
        readTime="7 Min."
        title="Preisrahmen statt Festpreis: Warum Vorprüfung ehrlicher ist"
        intro="Viele Dienstleistungsseiten versprechen schnelle Preise. Bei Umzug, Reinigung und Entrümpelung ist das oft nicht ehrlich genug. FLOXANT trennt deshalb Orientierung, Vorprüfung und konkretes Angebot sauber voneinander."
        sections={[
          {
            title: "Warum exakte Onlinepreise oft trügen",
            paragraphs: [
              "Ein Umzug kann bei gleicher Zimmerzahl völlig unterschiedliche Aufwände haben. Ein dritter Stock ohne Aufzug, lange Laufwege oder Montage verändern die Realität sofort. Bei Reinigung zählen Fläche, Zustand, Möblierung und Extras. Bei Entrümpelung entscheiden Materialarten, Volumen und Zugang.",
              "Ein zu präziser Onlinepreis wirkt zwar schnell, kann aber falsche Erwartungen erzeugen. Ein realistischer Preisrahmen ist für Kunden und Dienstleister belastbarer.",
            ],
          },
          {
            title: "Was eine gute Vorprüfung leisten muss",
            paragraphs: [
              "Eine gute Vorprüfung erklärt nicht nur eine Zahl, sondern die Gründe dahinter. Der Kunde soll erkennen, welche Faktoren den Rahmen beeinflussen und welche Angaben noch fehlen.",
              "FLOXANT nutzt dafür service-spezifische Kostentreiber. Beim Umzug stehen Volumen, Strecke, Etage und Zusatzleistungen im Vordergrund. Bei Reinigung eher Fläche, Zustand und Extras. Bei Entrümpelung Volumen, Material und Zugang.",
            ],
            bullets: [
              "Umzug: Volumen, Strecke, Zugang, Montage und Zeitfenster",
              "Reinigung: Fläche, Objektart, Zustand, Fenster, Küche und Bad",
              "Entrümpelung: Volumen, Materialarten, Laufwege und Demontage",
              "Expressfälle: Terminlage, verfügbare Teams und regionale Machbarkeit",
            ],
          },
          {
            title: "Wie Kunden den besten Preisrahmen erhalten",
            paragraphs: [
              "Je besser die Angaben, desto belastbarer die Einschätzung. Fotos, kurze Beschreibungen und klare Leistungswünsche helfen mehr als eine lange Nachricht ohne Struktur.",
              "Eine eigene Preisvorstellung kann zusätzlich sinnvoll sein. Sie ersetzt aber nicht die System-Einschätzung, sondern zeigt, welcher Zielrahmen für den Kunden relevant ist.",
            ],
          },
        ]}
        highlightPoints={[
          "Ein Preisrahmen ist kein Ausweichen, sondern ehrliche Vorplanung.",
          "Die wichtigsten Kostentreiber müssen sichtbar erklärt werden.",
          "Kundenbudget und System-Einschätzung sollten getrennt bleiben.",
        ]}
        ctas={[
          { href: "/rechner", label: "Rechner starten" },
          { href: "/anfrage-mit-preisrahmen", label: "Preisvorstellung senden" },
          { href: "/blog/preisvorstellung-umzug-anfrage", label: "Budget richtig nutzen" },
        ]}
        faqTitle="FAQ zu Preisrahmen und Vorprüfung"
        faqItems={faqItems}
      />
    </>
  );
}
