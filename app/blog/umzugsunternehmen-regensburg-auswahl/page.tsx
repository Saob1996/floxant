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
    q: "Woran erkennt man ein seriöses Umzugsunternehmen in Regensburg?",
    a: "An klaren Ansprechpartnern, sauberer Vorprüfung, nachvollziehbaren Leistungsschritten und ehrlicher Kommunikation zu Preisrahmen, Zugang, Strecke und Zusatzleistungen.",
  },
  {
    q: "Warum ist ein schneller Festpreis online oft kein gutes Signal?",
    a: "Weil Volumen, Etagen, Laufwege, Zugang, Terminlage und Zusatzleistungen oft erst kurz eingeordnet werden müssen. Ein belastbarer erster Rahmen ist meist seriöser als ein scheinbar exakter Schnellpreis.",
  },
  {
    q: "Hilft eine lokale Firma in Regensburg wirklich?",
    a: "Oft ja. Regionale Nähe vereinfacht Rückfragen, Besichtigung, Zufahrtseinschätzung und Terminabstimmung. Gerade in Regensburg mit Altstadt, Etagen und engen Zugängen ist das ein echter Vorteil.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/umzugsunternehmen-regensburg-auswahl",
    title: "Umzugsunternehmen in Regensburg auswählen: worauf Kunden achten sollten | FLOXANT",
    description:
      "Wie Kunden in Regensburg ein Umzugsunternehmen seriös bewerten: Ansprechpartner, Vorprüfung, Preisrahmen, Zugang, Planung und regionale Erfahrung.",
    keywords: [
      "Umzugsunternehmen Regensburg auswählen",
      "Umzug Regensburg Anbieter Vergleich",
      "seriöses Umzugsunternehmen Regensburg",
      "Umzug Regensburg Preisrahmen",
    ],
  });
}

export default function BlogUmzugsunternehmenRegensburgAuswahlPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Umzugsunternehmen in Regensburg auswählen",
        description:
          "Ratgeber für Kunden, die in Regensburg einen Umzugsanbieter besser einordnen möchten.",
        path: "/blog/umzugsunternehmen-regensburg-auswahl",
        about: ["Umzugsunternehmen Regensburg", "Preisrahmen", "Vorprüfung", "lokale Planung"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        { name: "Umzugsunternehmen Regensburg auswählen", item: "/blog/umzugsunternehmen-regensburg-auswahl" },
      ]),
      buildArticleJsonLd({
        headline: "Umzugsunternehmen in Regensburg auswählen: worauf Kunden wirklich achten sollten",
        description:
          "Ein FLOXANT Leitfaden zu Ansprechpartnern, Vorprüfung, Preisrahmen und regionaler Planung beim Umzug in Regensburg.",
        path: "/blog/umzugsunternehmen-regensburg-auswahl",
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
          { label: "Umzugsunternehmen Regensburg auswählen" },
        ]}
        date="27. April 2026"
        readTime="7 Min."
        title="Umzugsunternehmen in Regensburg auswählen: worauf Kunden wirklich achten sollten"
        intro="Viele Kunden vergleichen nur den ersten Preis. In der Praxis entscheiden aber Ansprechpartner, Vorprüfung, Zugang, Timing und regionale Erfahrung oft stärker darüber, ob ein Umzug ruhig und sauber läuft."
        sections={[
          {
            title: "Nicht nur auf die erste Zahl schauen",
            paragraphs: [
              "Ein Umzug besteht nicht nur aus Kartons und Kilometern. Etagen, Laufwege, Zugang, Möbelmontage, Terminlage und Zusatzleistungen verändern den Aufwand schnell.",
              "Ein gutes Umzugsunternehmen erklärt diese Punkte früh und macht sichtbar, was bereits eingeschätzt werden kann und was erst nach kurzer Vorprüfung belastbar wird.",
            ],
          },
          {
            title: "Welche Fragen vor einer Entscheidung sinnvoll sind",
            paragraphs: [
              "Wer in Regensburg anfragt, sollte nicht nur nach Preis, sondern auch nach Ablauf fragen. Das zeigt schnell, ob die Firma nur klickstark wirbt oder wirklich organisiert arbeitet.",
            ],
            bullets: [
              "Gibt es einen klaren Ansprechpartner?",
              "Wird Zugang, Etage und Laufweg sauber abgefragt?",
              "Werden Zusatzleistungen wie Montage oder Entsorgung mitgedacht?",
              "Wird ein ehrlicher Preisrahmen statt eines Lockpreises genannt?",
            ],
          },
          {
            title: "Warum lokale Erfahrung in Regensburg hilft",
            paragraphs: [
              "In Regensburg spielen Altstadt, enge Zufahrten und kurze Wegefenster oft eine größere Rolle als in einfachen Neubaugebieten. Regionale Kenntnis spart Rückfragen und macht die Vorprüfung glaubwürdiger.",
              "Kurz gesagt: lieber gscheid geplant als später improvisiert. Genau das schafft mehr Ruhe für Kunden und Team.",
            ],
          },
        ]}
        highlightPoints={[
          "Ein sauberer Preisrahmen ist meist seriöser als ein schneller Festpreis-Klick.",
          "Regionale Kenntnis hilft bei Zugang, Laufwegen und Timing in Regensburg.",
          "Gute Anbieter machen Aufwand, Grenzen und nächsten Schritt sichtbar.",
        ]}
        ctas={[
          { href: "/buchung", label: "Direkt Buchung starten" },
          { href: "/rechner", label: "Orientierungsrahmen prüfen" },
          { href: "/umzug", label: "Umzugsservice ansehen" },
        ]}
        faqTitle="FAQ zur Auswahl eines Umzugsunternehmens in Regensburg"
        faqItems={faqItems}
      />
    </>
  );
}
