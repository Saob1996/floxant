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
    q: "Was gehört bei einer Endreinigung in Regensburg meistens dazu?",
    a: "Typisch sind Böden, Bad, Küche, Oberflächen, Türen, Lichtschalter und auf Wunsch auch Fenster. Der genaue Umfang hängt von Objektgröße, Zustand und Übergabeziel ab.",
  },
  {
    q: "Wann lohnt sich eine Endreinigung mit FLOXANT besonders?",
    a: "Vor allem bei Wohnungsübergaben, nach einem Umzug, bei Vermietung, vor Verkauf oder wenn wenig Zeit für Eigenleistung bleibt.",
  },
  {
    q: "Wie wird der Preis für eine Endreinigung eingeschätzt?",
    a: "Der Orientierungsrahmen basiert auf Fläche, Objektart, Verschmutzungsgrad, Möblierung, Fenstern und Terminlage. Erst die Vorprüfung, dann die genaue Abstimmung.",
  },
  {
    q: "Kann man Endreinigung und Umzug kombinieren?",
    a: "Ja. Genau dafür gibt es bei FLOXANT die Kombination aus Umzug und Reinigung, damit Schlüsselübergabe und Auszug sauber zusammenlaufen.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/endreinigung-regensburg-checkliste",
    title: "Endreinigung in Regensburg: Checkliste für Wohnung und Übergabe | FLOXANT",
    description:
      "Welche Punkte sind bei einer Endreinigung in Regensburg wirklich wichtig? Checkliste, Preisfaktoren, Ablauf und typische Fehler vor der Übergabe.",
  });
}

export default function BlogEndreinigungRegensburgPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Endreinigung in Regensburg: Checkliste für Wohnung und Übergabe",
        description: "Checkliste, Preislogik und Ablauf für Endreinigung in Regensburg.",
        path: "/blog/endreinigung-regensburg-checkliste",
        about: ["Endreinigung", "Reinigung Regensburg", "Wohnungsübergabe"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        { name: "Endreinigung Regensburg", item: "/blog/endreinigung-regensburg-checkliste" },
      ]),
      buildArticleJsonLd({
        headline: "Endreinigung in Regensburg: die kurze Checkliste vor der Übergabe",
        description: "Ein FLOXANT Artikel über Endreinigung, Übergabe und Preisfaktoren.",
        path: "/blog/endreinigung-regensburg-checkliste",
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
          { label: "Endreinigung Regensburg" },
        ]}
        date="19. April 2026"
        readTime="7 Min."
        title="Endreinigung in Regensburg: die kurze Checkliste vor der Übergabe"
        intro="Eine gute Endreinigung ist kein Luxus, sondern oft der letzte kritische Schritt vor Schlüsselabgabe, Abnahme oder Neuvermietung. Entscheidend ist nicht möglichst viel Aufwand, sondern der richtige Umfang."
        sections={[
          {
            title: "Was ist bei einer Endreinigung wirklich relevant?",
            paragraphs: [
              "Relevant sind vor allem die Bereiche, die bei einer Übergabe sichtbar und bewertbar sind: Bad, Küche, Böden, Oberflächen, Türen, Schalter, Heizkörper und je nach Zustand auch Fenster oder Einbauten.",
            ],
          },
          {
            title: "Die kompakte Checkliste vor der Wohnungsübergabe",
            paragraphs: [
              "Gerade in Regensburg sehen wir häufig denselben Fehler: viel Energie für Nebenthemen, aber kein klarer Fokus auf die Punkte, die Vermieter oder Nachmieter sofort sehen.",
            ],
            bullets: [
              "Böden saugen, wischen und Rückstände entfernen",
              "Bad inklusive Armaturen, Spiegel, Dusche und Fugen reinigen",
              "Küche mit Arbeitsflächen, Fronten und Geräten prüfen",
              "Zeitfenster zwischen Auszug, Reinigung und Abgabe realistisch planen",
            ],
          },
          {
            title: "Wie FLOXANT den Umfang einordnet",
            paragraphs: [
              "FLOXANT arbeitet im Rechner nicht mit blindem Festpreisversprechen, sondern mit einem unverbindlichen Orientierungsrahmen. Bewertet werden Fläche, Objektart, Zustand, Fenster, Möblierung, Extras und Terminlage.",
            ],
          },
        ]}
        highlightPoints={[
          "Der richtige Umfang ist wichtiger als blinder Mehraufwand.",
          "Übergaberelevante Flächen sollten immer Priorität haben.",
          "Kombi-Services sind bei knappen Übergaben oft die bessere Lösung.",
        ]}
        ctas={[
          { href: "/reinigung", label: "Reinigung ansehen" },
          { href: "/umzug-mit-reinigung", label: "Umzug mit Reinigung" },
          { href: "/rechner?service=reinigung", label: "Reinigung vorprüfen" },
        ]}
        faqTitle="FAQ zur Endreinigung in Regensburg"
        faqItems={faqItems}
      />
    </>
  );
}
