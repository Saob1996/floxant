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
    q: "Wann gilt eine Reinigungsanfrage als größerer B2B-Auftrag?",
    a: "Sobald mehrere Flächen, regelmäßige Einsätze, feste Ansprechpartner, Randzeiten oder besondere Objektanforderungen zusammenkommen, sollte die Anfrage als strukturierter B2B-Auftrag vorbereitet werden.",
  },
  {
    q: "Welche Angaben helfen bei großen Büro-, Hotel- oder Praxisanfragen am meisten?",
    a: "Wichtig sind Objektart, Flächenordnung, Turnus, Zugänge, Ansprechpartner, gewünschte Zeitfenster und besondere Zonen wie Empfang, Sanitär, Sozialräume oder Allgemeinflächen.",
  },
  {
    q: "Warum ist eine saubere Vorprüfung besser als ein schneller Pauschalpreis?",
    a: "Weil größere gewerbliche Aufträge oft an Details wie Zugang, Taktung, Verantwortlichkeit und Reaktionszeit hängen. Ohne diese Punkte wirkt ein Preis schnell attraktiv, passt später aber nicht zur Realität.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/grosse-reinigungsauftraege-regensburg-buero-hotel-praxis",
    title: "Große Reinigungsaufträge in Regensburg: was Büro, Hotel und Praxis klären sollten | FLOXANT",
    description:
      "Welche Angaben bei größeren B2B-Reinigungsanfragen in Regensburg helfen, damit aus Interesse ein belastbarer Auftrag wird.",
    keywords: [
      "große Reinigungsaufträge Regensburg",
      "Büroreinigung Regensburg Anfrage",
      "Hotelreinigung Regensburg",
      "Praxisreinigung Regensburg B2B",
    ],
  });
}

export default function BlogLargeCommercialCleaningPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Große Reinigungsaufträge in Regensburg",
        description:
          "Ratgeber für Büro, Hotel, Praxis und größere gewerbliche Reinigungsanfragen in Regensburg.",
        path: "/blog/grosse-reinigungsauftraege-regensburg-buero-hotel-praxis",
        about: [
          "Gewerbereinigung",
          "Büroreinigung",
          "Praxisreinigung",
          "Hotelreinigung",
          "Regensburg",
        ],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        {
          name: "Große Reinigungsaufträge Regensburg",
          item: "/blog/grosse-reinigungsauftraege-regensburg-buero-hotel-praxis",
        },
      ]),
      buildArticleJsonLd({
        headline:
          "Große Reinigungsaufträge in Regensburg: was Büro, Hotel und Praxis vorab klären sollten",
        description:
          "Ein FLOXANT Artikel zu gewerblichen Reinigungsanfragen mit Fokus auf Objektgröße, Turnus und Zuständigkeit.",
        path: "/blog/grosse-reinigungsauftraege-regensburg-buero-hotel-praxis",
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
          { label: "Große Reinigungsaufträge Regensburg" },
        ]}
        date="27. April 2026"
        readTime="7 Min."
        title="Große Reinigungsaufträge in Regensburg: was Büro, Hotel und Praxis vorab klären sollten"
        intro="Bei größeren gewerblichen Reinigungsaufträgen geht es selten nur um Quadratmeter. Entscheidend sind Zuständigkeiten, Turnus, Zugänge und die Frage, wie sauber der Ablauf im Alltag wirklich funktionieren soll."
        sections={[
          {
            title: "Warum große Anfragen oft an kleinen Details hängen",
            paragraphs: [
              "Ob Bürohaus, Hotel, Praxis oder größere Objektstruktur: Der Unterschied zwischen einer guten Anfrage und einer unklaren Klickspur liegt oft in wenigen Angaben. Wenn diese früh sauber erfasst werden, wird der Weg zum Angebot deutlich belastbarer.",
              "Genau deshalb lohnt sich bei größeren Reinigungsaufträgen eine kurze Vorprüfung statt eines ungenauen Schnellpreises.",
            ],
          },
          {
            title: "Welche Punkte vorab wirklich wichtig sind",
            paragraphs: [
              "Für B2B-Reinigung zählen nicht nur Fläche und Häufigkeit. Mindestens genauso wichtig sind Ansprechpartner, Zugänge, Reaktionszeiten und die Frage, welche Zonen in welchem Standard betreut werden sollen.",
            ],
            bullets: [
              "Objektart und Flächenordnung klar benennen",
              "Turnus und gewünschte Zeiten früh einordnen",
              "Zugänge, Schlüssel, Alarm oder Randzeiten abstimmen",
              "Empfang, Sanitär, Sozialräume, Allgemeinflächen oder Sonderzonen getrennt denken",
            ],
          },
          {
            title: "Wie FLOXANT solche Anfragen sauber einordnet",
            paragraphs: [
              "FLOXANT prüft größere Reinigungsanfragen in Regensburg bewusst nach Ablauf, Verantwortlichkeit und Objektstruktur. So wird aus einer groben Idee ein belastbarer nächster Schritt.",
              "Kurz gesagt: erst ordentlich sortieren, dann sauber umsetzen. Oder bayerisch formuliert: lieber vorher gscheid abstimmen als später nacharbeiten.",
            ],
          },
        ]}
        highlightPoints={[
          "Größere Reinigungsaufträge brauchen klare Ansprechpartner und saubere Objektangaben.",
          "Turnus, Zugang und Verantwortlichkeit sind oft wichtiger als eine grobe Quadratmeterzahl.",
          "Eine kurze Vorprüfung spart später Reibung, Zeit und falsche Erwartungen.",
        ]}
        ctas={[
          { href: "/gewerbereinigung-regensburg", label: "B2B-Reinigungsseite öffnen" },
          { href: "/buchung", label: "Direkt anfragen" },
          { href: "/kontakt", label: "Kontakt ansehen" },
        ]}
        faqTitle="FAQ zu größeren B2B-Reinigungsanfragen"
        faqItems={faqItems}
      />
    </>
  );
}
