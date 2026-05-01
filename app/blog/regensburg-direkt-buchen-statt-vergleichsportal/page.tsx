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
    q: "Warum ist ein direkter Buchungsweg oft besser als ein allgemeiner Kontaktpfad?",
    a: "Weil Kunden schneller verstehen, was als Nächstes passiert. Ein klarer Buchungsweg wirkt ruhiger, professioneller und reduziert unnötige Rückfragen.",
  },
  {
    q: "Hilft das auch bei Google Maps und lokaler Suche?",
    a: "Ja. Wenn Buchung, Kontakt und Standort klar zusammenpassen, wirkt der Anbieter für Nutzer und Suchsysteme greifbarer und lokaler.",
  },
  {
    q: "Welche FLOXANT Seite ist dafür der wichtigste Einstieg?",
    a: "Für direkte Anfragen ist /buchung der zentrale Weg. Dort sind Anfrage, Vorprüfung und Kontakt sauber geordnet.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/regensburg-direkt-buchen-statt-vergleichsportal",
    title: "In Regensburg direkt buchen statt vergleichen: klare Wege bringen oft mehr",
    description:
      "Warum direkte Buchungswege, feste Ansprechpartner und eine saubere Vorprüfung in Regensburg oft besser funktionieren als unklare Vergleichsportal-Wege.",
    keywords: [
      "direkt buchen Regensburg",
      "Buchung Umzug Regensburg",
      "direkte Anfrage Regensburg",
      "Google Maps Buchung Regensburg",
      "Vergleichsportal Alternative Regensburg",
      "FLOXANT Buchung",
    ],
  });
}

export default function BlogRegensburgDirektBuchenStattVergleichsportalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "In Regensburg direkt buchen statt vergleichen",
        description:
          "Ein FLOXANT Ratgeber zu klaren Buchungswegen, lokalen Ansprechpartnern und direkter Anfrageführung in Regensburg.",
        path: "/blog/regensburg-direkt-buchen-statt-vergleichsportal",
        about: ["Buchung", "Regensburg", "Google Maps", "Lokale Suche", "Direktanfrage"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        {
          name: "In Regensburg direkt buchen statt vergleichen",
          item: "/blog/regensburg-direkt-buchen-statt-vergleichsportal",
        },
      ]),
      buildArticleJsonLd({
        headline:
          "In Regensburg direkt buchen statt vergleichen: warum klare Wege öfter besser passen",
        description:
          "Ein FLOXANT Artikel über direkte Anfragewege, lokale Ansprechpartner und ruhigere Buchungslogik in Regensburg.",
        path: "/blog/regensburg-direkt-buchen-statt-vergleichsportal",
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
          { label: "Direkt buchen statt vergleichen" },
        ]}
        date="28. April 2026"
        readTime="6 Min."
        title="In Regensburg direkt buchen statt vergleichen: warum klare Wege öfter besser passen"
        intro="Viele Interessenten wollen nicht erst fünf Wege prüfen, sondern zügig erkennen, wie eine seriöse Anfrage beginnt. Genau deshalb funktionieren klare Buchungswege oft besser als ein unruhiger Mix aus verstreuten Kontaktoptionen."
        sections={[
          {
            title: "Warum Klarheit schon vor dem ersten Klick Vertrauen schafft",
            paragraphs: [
              "Wer nach Umzug, Reinigung oder Entrümpelung sucht, schaut zuerst auf Verständlichkeit. Ist sofort klar, wohin der Weg führt, wirkt der Anbieter strukturierter und näher dran.",
              "Gerade in Regensburg und im regionalen Umfeld zählt nicht nur Sichtbarkeit, sondern auch die Frage, ob der nächste Schritt geordnet, menschlich und belastbar wirkt.",
            ],
          },
          {
            title: "Was direkte Buchungswege besser machen",
            paragraphs: [
              "Ein guter Buchungsweg trennt nicht wild zwischen Startseite, Formular, WhatsApp und Spezialseite, sondern sortiert den Einstieg sinnvoll vor.",
            ],
            bullets: [
              "Direkter Kontakt ohne Umweg über unklare Sammelpfade",
              "Feste Ansprechpartner statt anonymer Weiterleitung",
              "Bessere Trennung zwischen Buchung, Express und Preisvorstellung",
              "Klarere Wege aus Google Maps, lokaler Suche und direkter Empfehlung",
              "Mehr Ruhe im Prozess und oft passendere Anfragen",
            ],
          },
          {
            title: "Wie FLOXANT das für Regensburg aufbaut",
            paragraphs: [
              "FLOXANT nutzt /buchung als klaren Haupteinstieg für direkte Anfragen. Kontakt, Standort, B2B-Reinigung und Private Client bleiben bewusst eigene Wege, damit nichts durcheinandergeht.",
              "So bleibt die Anfrage für Kunden verständlich und für das Team operativ sauber. Oder, kurz gesagt: lieber gscheid und klar als laut und hektisch.",
            ],
          },
        ]}
        highlightPoints={[
          "Direkte Buchungswege schaffen oft mehr Vertrauen als verstreute Kontaktpfade.",
          "Klare Trennung verbessert Nutzerführung, lokale Suche und den Weg zur Anfrage.",
          "Für FLOXANT ist /buchung der wichtigste direkte Einstieg.",
        ]}
        ctas={[
          { href: "/buchung", label: "Direkt zur Buchung" },
          { href: "/kontakt", label: "Kontakt & Standort ansehen" },
          { href: "/gewerbereinigung-regensburg", label: "Zur B2B-Reinigung" },
        ]}
        faqTitle="FAQ zu direkter Buchung in Regensburg"
        faqItems={faqItems}
      />
    </>
  );
}
