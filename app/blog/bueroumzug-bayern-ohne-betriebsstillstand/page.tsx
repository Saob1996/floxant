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
    q: "Was macht einen Büroumzug besonders heikel?",
    a: "Vor allem Arbeitsplätze, IT, Archiv, Zuständigkeiten im Unternehmen, Zugang, Betriebszeiten und die Frage, wie wenig der laufende Betrieb gestört werden soll.",
  },
  {
    q: "Braucht ein Büroumzug immer einen öffentlichen Preisrechner?",
    a: "Nicht zwingend. Für die erste Orientierung kann ein Rechner helfen, aber bei Firmenumzügen ist die konkrete Vorprüfung meist wichtiger als eine scheinbar exakte Online-Zahl.",
  },
  {
    q: "Für wen ist dieser Beitrag besonders relevant?",
    a: "Für Unternehmen, Büros, Kanzleien und Organisationen in Bayern, die einen Umzug planen und den Übergang sauber strukturieren möchten.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/bueroumzug-bayern-ohne-betriebsstillstand",
    title: "Büroumzug in Bayern ohne Chaos | FLOXANT",
    description:
      "Wie Unternehmen in Bayern Arbeitsplätze, IT, Zugang und Zeitfenster so planen, dass ein Büroumzug den Betrieb nicht unnötig ausbremst.",
  });
}

export default function BlogBueroumzugBayernPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Büroumzug in Bayern ohne Chaos: so bleibt der Betrieb besser handlungsfähig",
        description:
          "FLOXANT Ratgeber zu Büroumzug, Firmenumzug, Arbeitsplätzen, IT und Zeitfenstern in Bayern.",
        path: "/blog/bueroumzug-bayern-ohne-betriebsstillstand",
        about: ["Büroumzug", "Firmenumzug", "Bayern", "Arbeitsplätze", "IT"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        {
          name: "Büroumzug Bayern",
          item: "/blog/bueroumzug-bayern-ohne-betriebsstillstand",
        },
      ]),
      buildArticleJsonLd({
        headline: "Büroumzug in Bayern ohne Chaos: so bleibt der Betrieb besser handlungsfähig",
        description:
          "Ein FLOXANT Artikel zu Firmenumzug, Arbeitsplätzen, IT, Zugängen und realistischer Vorprüfung in Bayern.",
        path: "/blog/bueroumzug-bayern-ohne-betriebsstillstand",
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
          { label: "Büroumzug Bayern" },
        ]}
        date="27. April 2026"
        readTime="7 Min."
        title="Büroumzug in Bayern ohne Chaos: so bleibt der Betrieb besser handlungsfähig"
        intro="Ein Büroumzug wird teuer, wenn nicht der Preis, sondern der Stillstand aus dem Ruder läuft. Deshalb zählen bei Firmenumzügen vor allem Arbeitsplätze, IT, Zugänge, Abstimmung im Unternehmen und ein realistisches Zeitfenster."
        sections={[
          {
            title: "Warum ein Firmenumzug anders geplant werden muss",
            paragraphs: [
              "Bei Büros reicht es nicht, nur Volumen und Strecke zu betrachten. Entscheidend ist, wie viele Arbeitsplätze betroffen sind, welche Technik mitzieht und wie sauber der Übergang organisiert wird.",
              "Gerade in Bayern mit längeren Fahrten, mehreren Ansprechpartnern oder Außenstellen ist die konkrete Vorbereitung oft wichtiger als jede Werbezahl.",
            ],
          },
          {
            title: "Diese Faktoren machen den Unterschied",
            paragraphs: [
              "Je klarer Arbeitsplätze, IT, Archiv und Zugang beschrieben werden, desto besser lässt sich Aufwand, Zeitfenster und Teamlogik einschätzen.",
            ],
            bullets: [
              "Wie viele Arbeitsplätze, Besprechungsräume oder Sonderbereiche sind betroffen?",
              "Welche IT oder sensible Technik braucht Abstimmung mit zuständigen Personen im Unternehmen?",
              "Wie eng sind Zeitfenster, Zugänge, Aufzüge oder Laufwege?",
              "Welche Montage-, Demontage- oder Aufbauarbeiten sollen mitgedacht werden?",
            ],
          },
          {
            title: "Warum ein sauberer Kontaktweg so viel bringt",
            paragraphs: [
              "Ein guter Büroumzug beginnt nicht mit Hektik, sondern mit einer strukturierten Anfrage. So werden Preisrahmen, Terminlogik und Verantwortung im Unternehmen früh sortiert.",
              "Kurz gesagt: lieber gscheid geplant und sauber abgestimmt als am Umzugstag improvisiert.",
            ],
          },
        ]}
        highlightPoints={[
          "Arbeitsplätze, IT und Zeitfenster sind bei Firmenumzügen zentrale Kostentreiber.",
          "Eine strukturierte Vorprüfung ist oft wertvoller als ein vorschneller Festpreis.",
          "Klare Kontaktwege helfen Unternehmen und FLOXANT gleichermaßen bei Planung und Umsetzung.",
        ]}
        ctas={[
          { href: "/bueroumzug", label: "Büroumzug-Seite öffnen" },
          { href: "/buchung", label: "Direkt anfragen" },
          { href: "/kontakt", label: "Kontakt ansehen" },
        ]}
        faqTitle="FAQ zum Büroumzug in Bayern"
        faqItems={faqItems}
      />
    </>
  );
}
