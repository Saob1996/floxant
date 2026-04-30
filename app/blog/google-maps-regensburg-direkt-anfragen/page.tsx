import type { Metadata } from "next";

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
    q: "Warum ist ein klarer Buchungslink in Google Maps so wichtig?",
    a: "Weil Kunden in Maps meist sehr schnell entscheiden. Wenn der nächste Schritt sofort verständlich ist, wirkt der Anbieter greifbarer, professioneller und vertrauenswürdiger.",
  },
  {
    q: "Hilft das auch gegen unpassende Anfragen?",
    a: "Ja. Ein sauberer direkter Weg trennt Buchung, Express, Preisvorstellung und Spezialseiten besser voneinander. So kommen öfter die Anfragen an, die wirklich zum jeweiligen Einstieg passen.",
  },
  {
    q: "Welche Seite ist bei FLOXANT dafür gedacht?",
    a: "Die zentrale Seite dafür ist /buchung. Sie ist als direkter Einstieg für Google Maps, Search und lokale Empfehlungen gedacht.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/google-maps-regensburg-direkt-anfragen",
    title: "In Google Maps direkt anfragen: klarer Buchungsweg für Regensburg",
    description:
      "Warum ein eindeutiger Buchungsweg in Google Maps für Regensburg mehr Vertrauen, bessere Klicks und passendere Anfragen schafft.",
    keywords: [
      "Google Maps Regensburg direkt anfragen",
      "Buchungslink Google Maps Regensburg",
      "direkte Anfrage Regensburg",
      "Google Maps Buchung Umzug Regensburg",
      "FLOXANT Buchung Regensburg",
    ],
  });
}

export default function BlogGoogleMapsRegensburgDirektAnfragenPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "In Google Maps direkt anfragen",
        description:
          "Ein FLOXANT Ratgeber dazu, warum ein klarer Buchungsweg in Google Maps für Regensburg Vertrauen und bessere Anfragen schafft.",
        path: "/blog/google-maps-regensburg-direkt-anfragen",
        about: ["Google Maps", "Buchung", "Regensburg", "Lokale Suche", "Vertrauen"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        {
          name: "In Google Maps direkt anfragen",
          item: "/blog/google-maps-regensburg-direkt-anfragen",
        },
      ]),
      buildArticleJsonLd({
        headline: "In Google Maps direkt anfragen: warum ein klarer Buchungsweg in Regensburg mehr Vertrauen schafft",
        description:
          "Ein FLOXANT Artikel über direkte Buchungswege, klare Einstiegspfade und mehr Vertrauen in Google Maps.",
        path: "/blog/google-maps-regensburg-direkt-anfragen",
        datePublished: "2026-04-28",
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
          { label: "In Google Maps direkt anfragen" },
        ]}
        date="28. April 2026"
        readTime="6 Min."
        title="In Google Maps direkt anfragen: warum ein klarer Buchungsweg in Regensburg mehr Vertrauen schafft"
        intro="Wer in Google Maps klickt, will meist nicht lange suchen, sondern schnell verstehen, wie eine seriöse Anfrage startet. Genau deshalb wirkt ein klarer direkter Buchungsweg oft stärker als ein unübersichtlicher Sammelpfad."
        sections={[
          {
            title: "Was Kunden in Maps in wenigen Sekunden prüfen",
            paragraphs: [
              "In Google Maps zählen Übersicht, Vertrauen und ein sofort verständlicher nächster Schritt. Wenn Kontakt, Standort und Buchung sauber zusammenpassen, wirkt ein Anbieter lokaler und greifbarer.",
              "Kunden wollen nicht erst überlegen, ob sie auf die Startseite, ein Kontaktformular oder irgendeinen Rechner sollen. Je klarer der Weg, desto ruhiger fühlt sich die Anfrage an.",
            ],
          },
          {
            title: "Warum ein klarer Buchungsweg oft besser klickt",
            paragraphs: [
              "Ein guter Buchungslink beantwortet schon vor dem Klick die wichtigste Frage: Was passiert jetzt eigentlich?",
            ],
            bullets: [
              "Service und Anfrageweg sind sofort klar",
              "Der Einstieg wirkt professioneller als ein allgemeines Sammelformular",
              "Maps, Search und Website senden dasselbe Signal",
              "Buchung, Express, Budget und Spezialseiten bleiben logisch getrennt",
              "Kunden fühlen sich eher geführt als weitergereicht",
            ],
          },
          {
            title: "Wie FLOXANT das für Regensburg aufbaut",
            paragraphs: [
              "FLOXANT nutzt /buchung als klaren direkten Einstieg für Regensburg, Google Maps und lokale Empfehlungen. Kontakt, Standort, B2B-Reinigung und Private Client bleiben trotzdem als eigene Wege bestehen.",
              "Kurz gesagt: lieber gscheid sortiert als laut beworben. Genau das schafft oft die besseren Klicks und die passenderen Anfragen.",
            ],
          },
        ]}
        highlightPoints={[
          "Google Maps braucht einen klaren nächsten Schritt, nicht nur Sichtbarkeit.",
          "Ein direkter Buchungsweg erhöht oft das Klickvertrauen.",
          "Sauber getrennte Zielseiten helfen Kunden und Suchsystemen zugleich.",
        ]}
        ctas={[
          { href: "/buchung", label: "Direkt zur Buchung" },
          { href: "/kontakt", label: "Kontakt & Standort ansehen" },
          { href: "/gewerbereinigung-regensburg", label: "Zur B2B-Reinigung" },
        ]}
        faqTitle="FAQ zu Google Maps und direkter Anfrage"
        faqItems={faqItems}
      />
    </>
  );
}
