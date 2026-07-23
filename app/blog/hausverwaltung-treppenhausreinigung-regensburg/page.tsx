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
    q: "Ist diese Seite nur für Hausverwaltungen und größere Objekte gedacht?",
    a: "Ja. Der Beitrag richtet sich gezielt an Hausverwaltungen, Objektbetreiber und Verantwortliche für größere Treppenhäuser, Allgemeinflächen und Mehrobjekt-Strukturen in Regensburg.",
  },
  {
    q: "Welche Angaben helfen bei einer Treppenhausreinigungs-Anfrage am meisten?",
    a: "Wichtig sind Objektgröße, Turnus, Zugang, Schlüsselregelung, Ansprechpartner, Besonderheiten im Haus und gewünschte Zusatzleistungen wie Glasflächen oder Eingangsbereiche.",
  },
  {
    q: "Warum ist eine direkte B2B-Anfrage besser als ein allgemeiner Privatweg?",
    a: "Weil Objektstruktur, Turnus, Erreichbarkeit und Zuständigkeiten im B2B-Bereich genauer vorgeprüft werden müssen. Das spart Rückfragen und macht das spätere Angebot belastbarer.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/hausverwaltung-treppenhausreinigung-regensburg",
    title: "Treppenhausreinigung Regensburg für Hausverwaltungen | FLOXANT",
    description:
      "Was Hausverwaltungen in Regensburg bei Treppenhausreinigung, Turnus, Zugang und Ansprechpartnern vor der Anfrage sauber klären sollten.",
  });
}

export default function BlogHausverwaltungTreppenhausPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Treppenhausreinigung in Regensburg: worauf Hausverwaltungen wirklich achten",
        description:
          "FLOXANT Ratgeber für Hausverwaltungen, Objektbetreiber und größere Treppenhaus- oder Allgemeinflächen in Regensburg.",
        path: "/blog/hausverwaltung-treppenhausreinigung-regensburg",
        about: ["Treppenhausreinigung", "Hausverwaltung", "Objektreinigung", "Regensburg"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        {
          name: "Treppenhausreinigung Regensburg",
          item: "/blog/hausverwaltung-treppenhausreinigung-regensburg",
        },
      ]),
      buildArticleJsonLd({
        headline: "Treppenhausreinigung in Regensburg: worauf Hausverwaltungen wirklich achten",
        description:
          "Ein FLOXANT Artikel zu Treppenhausreinigung, Hausverwaltung, Turnus und sauberer B2B-Vorprüfung in Regensburg.",
        path: "/blog/hausverwaltung-treppenhausreinigung-regensburg",
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
          { label: "Treppenhausreinigung Regensburg" },
        ]}
        date="27. April 2026"
        readTime="6 Min."
        title="Treppenhausreinigung in Regensburg: worauf Hausverwaltungen wirklich achten"
        intro="Bei Hausverwaltungen geht es selten nur ums Putzen. Entscheidend sind Turnus, Zugang, Schlüsselwege, Ansprechpartner und die Frage, ob die Ausführung im Alltag wirklich ruhig und verlässlich funktioniert."
        sections={[
          {
            title: "Warum Hausverwaltungen andere Hinweise brauchen als private Einzelanfragen",
            paragraphs: [
              "Treppenhäuser, Eingangsbereiche und Allgemeinflächen wirken oft einfach, sind im Alltag aber organisatorisch anspruchsvoll. Wer zuständig ist, wann gearbeitet werden darf und wie der Zugang geregelt ist, entscheidet über einen sauberen Ablauf.",
              "Gerade deshalb lohnt sich eine gezielte B2B-Seite und keine allgemeine Sammelanfrage. Sie filtert besser, spart Rückfragen und hilft auf beiden Seiten bei einer realistischen Vorprüfung.",
            ],
          },
          {
            title: "Diese Angaben machen eine Anfrage deutlich belastbarer",
            paragraphs: [
              "Wenn Turnus, Objektstruktur und Zugang sauber beschrieben werden, ist die Einordnung viel schneller und das spätere Angebot plausibler.",
            ],
            bullets: [
              "Wie viele Eingänge, Etagen oder Häuser sind betroffen?",
              "Welcher Turnus wird erwartet: wöchentlich, mehrmals pro Woche oder flexibel?",
              "Wie läuft der Zugang: Schlüssel, Hausmeister, feste Zeitfenster oder Begleitung?",
              "Gibt es Extras wie Glasflächen, Aufzug, Kellergänge oder Außenbereiche?",
            ],
          },
          {
            title: "Was Kunden in Regensburg wirklich überzeugt",
            paragraphs: [
              "Ein klarer Ansprechpartner, eine nachvollziehbare Vorprüfung und ein lokaler Dienstleister mit sauberer Kommunikation wirken oft stärker als anonyme Massenangebote.",
              "Kurz gesagt: lieber gscheid vorbereitet und freundlich geführt als billig geklickt und später dreimal nachtelefoniert.",
            ],
          },
        ]}
        highlightPoints={[
          "Hausverwaltungen brauchen klare Turnus-, Zugangs- und Ansprechpartner-Logik.",
          "Eine gezielte B2B-Anfrage spart Rückfragen und verbessert die Angebotsqualität.",
          "Für Regensburg sind lokale Nähe und saubere Objektkommunikation starke Vertrauenshebel.",
        ]}
        ctas={[
          { href: "/treppenhausreinigung-regensburg", label: "Treppenhausreinigung anfragen" },
          { href: "/regensburg/gewerbereinigung", label: "B2B-Reinigungsseite öffnen" },
          { href: "/mieterwechsel-service-regensburg", label: "Mieterwechsel-Service prüfen" },
        ]}
        faqTitle="FAQ zur Treppenhausreinigung für Hausverwaltungen"
        faqItems={faqItems}
      />
    </>
  );
}
