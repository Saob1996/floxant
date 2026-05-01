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
    q: "Was macht einen guten Google-Maps-Einstieg für ein Umzugsunternehmen aus?",
    a: "Ein klarer direkter Link, vollständige Kontaktangaben, lokale Einordnung und ein verständlicher nächster Schritt. Kunden wollen nicht rätseln, sondern schnell erkennen, wie sie seriös anfragen können.",
  },
  {
    q: "Warum ist ein direkter Buchungsweg besser als ein allgemeines Kontaktformular?",
    a: "Weil Service, Eckdaten, Termin und Hinweise strukturierter erfasst werden. Das beschleunigt die Rückmeldung und wirkt für beide Seiten deutlich professioneller.",
  },
  {
    q: "Hilft das auch für Google Maps und lokale Empfehlungen?",
    a: "Ja. Klare lokale Signale, passende Zielseiten und verständliche Inhalte helfen Kunden, FLOXANT sauber einzuordnen und schneller den richtigen Anfrageweg zu finden.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/umzugsfirma-regensburg-google-maps-vertrauen",
    title: "Umzugsfirma Regensburg über Google Maps finden: worauf Kunden wirklich achten",
    description:
      "Wie Kunden eine Umzugsfirma in Regensburg über Google Maps besser einordnen können und warum direkte Buchungswege mehr Vertrauen schaffen.",
    keywords: [
      "Umzugsfirma Regensburg Google Maps",
      "Umzugsunternehmen Regensburg Google Maps",
      "Buchungslink Google Maps Regensburg",
      "direkt anfragen Umzug Regensburg",
      "FLOXANT Regensburg Maps",
    ],
  });
}

export default function BlogUmzugsfirmaRegensburgGoogleMapsVertrauenPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Umzugsfirma Regensburg über Google Maps finden",
        description:
          "Ein FLOXANT Ratgeber dazu, welche Signale in Google Maps Vertrauen schaffen und wie direkte Buchungswege Kunden schneller helfen.",
        path: "/blog/umzugsfirma-regensburg-google-maps-vertrauen",
        about: ["Google Maps", "Umzugsfirma Regensburg", "Buchung", "Vertrauen", "Lokale Suche"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        {
          name: "Umzugsfirma Regensburg über Google Maps finden",
          item: "/blog/umzugsfirma-regensburg-google-maps-vertrauen",
        },
      ]),
      buildArticleJsonLd({
        headline: "Umzugsfirma in Regensburg über Google Maps finden: worauf Kunden wirklich achten",
        description:
          "Ein FLOXANT Artikel über lokale Vertrauenssignale, direkte Anfragewege und bessere Orientierung in Google Maps.",
        path: "/blog/umzugsfirma-regensburg-google-maps-vertrauen",
        datePublished: "2026-04-28",
      }),
      buildFaqJsonLd(faqItems),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticlePage
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: "Umzugsfirma Regensburg über Google Maps finden" },
        ]}
        date="28. April 2026"
        readTime="6 Min."
        title="Umzugsfirma in Regensburg über Google Maps finden: worauf Kunden wirklich achten"
        intro="Wer über Google Maps nach einem Umzugsunternehmen sucht, entscheidet oft in wenigen Sekunden. Gerade deshalb zählen klare Buchungswege, echte Ansprechpartner und eine verständliche nächste Aktion mehr als große Versprechen."
        sections={[
          {
            title: "Warum Kunden in Maps zuerst Vertrauen suchen",
            paragraphs: [
              "In Google Maps geht es selten nur um Sichtbarkeit. Kunden prüfen innerhalb kürzester Zeit, ob ein Anbieter lokal verankert wirkt, ob Kontakt und Standort plausibel sind und ob die Anfrage einfach und seriös startet.",
              "Genau dort hilft ein klarer Buchungsweg mehr als eine diffuse Startseite. Wenn der nächste Schritt sofort verständlich ist, steigt die Chance auf einen echten Klick deutlich.",
            ],
          },
          {
            title: "Diese Signale wirken für Kunden besonders stark",
            paragraphs: [
              "Nicht jedes Signal ist technisch kompliziert. Oft geht es um Klarheit und Struktur statt um noch mehr Werbesprache.",
            ],
            bullets: [
              "Ein eindeutiger direkter Link statt mehrere unklare Pfade",
              "Standort, Kontakt und Einsatzgebiet klar sichtbar",
              "Anfrage mit Vorprüfung statt künstlichem Festpreisversprechen",
              "Saubere Trennung zwischen Buchung, Express, B2B und Premium-Anfrage",
              "Lokale Texte für Regensburg und Bayern ohne übertriebene Keyword-Masse",
              "FAQ, die echte Fragen beantwortet und nicht nur Rankings imitieren soll",
            ],
          },
          {
            title: "Was FLOXANT daraus praktisch macht",
            paragraphs: [
              "FLOXANT nutzt /buchung als direkten Einstieg für Maps, Search und Empfehlungen. Kontakt, Standort, B2B-Reinigung und Private Client bleiben trotzdem als eigene Zielseiten sauber getrennt.",
              "Das wirkt für Kunden ruhiger, klarer und greifbarer. Oder kurz bayerisch gesagt: lieber gscheid geführt als irgendwo im Formularnebel hängen bleiben.",
            ],
          },
        ]}
        highlightPoints={[
          "Ein klarer Buchungslink stärkt Vertrauen und Orientierung.",
          "Lokale Signale helfen sowohl Kunden als auch Suchmaschinen.",
          "Getrennte Zielseiten sind oft überzeugender als ein einziger Sammelpfad.",
        ]}
        ctas={[
          { href: "/buchung", label: "Direkten Buchungsweg öffnen" },
          { href: "/kontakt", label: "Kontakt & Standort ansehen" },
          { href: "/umzug", label: "Umzugsservice ansehen" },
        ]}
        faqTitle="FAQ zu Google Maps und direkter Anfrage"
        faqItems={faqItems}
      />
    </>
  );
}
