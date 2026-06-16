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
    q: "Welche Angaben helfen bei einer Umzugsanfrage in Regensburg am meisten?",
    a: "Am wichtigsten sind Serviceart, Start und Ziel, grober Umfang, Etagen, Aufzug, Laufwege, Terminfenster und besondere Extras. Damit kann FLOXANT schneller sauber einordnen, ob ein normaler Buchungsweg, ein Express-Check oder eine gezielte Rückfrage sinnvoll ist.",
  },
  {
    q: "Soll ich schon ein Budget nennen?",
    a: "Ja, wenn Sie bereits eine Preisvorstellung haben. Sie ergänzt die Vorprüfung, ersetzt sie aber nicht. So lässt sich schneller erkennen, ob Leistungsumfang, Termin und Budget grundsätzlich zusammenpassen.",
  },
  {
    q: "Ist eine kurze Anfrage schlechter als ein langer Text?",
    a: "Nein. Entscheidend ist nicht die Länge, sondern die richtigen Eckdaten. Lieber kurz und klar als lang und unstrukturiert. Wenn etwas fehlt, fragt FLOXANT gezielt nach.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/anfrage-regensburg-richtig-stellen",
    title: "Anfrage in Regensburg richtig stellen: so kommt FLOXANT schneller zur klaren Antwort",
    description:
      "Welche Angaben bei Umzug, Reinigung, Entrümpelung oder Büroumzug in Regensburg die Vorprüfung schneller und die Rückmeldung klarer machen.",
    keywords: [
      "Anfrage Regensburg Umzug",
      "Umzugsanfrage Regensburg",
      "Reinigung anfragen Regensburg",
      "Entrümpelung anfragen Regensburg",
      "Buchung Regensburg",
      "FLOXANT Anfrage",
    ],
  });
}

export default function BlogAnfrageRegensburgRichtigStellenPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Anfrage in Regensburg richtig stellen",
        description:
          "Ratgeber zu klaren Angaben für Umzug, Reinigung, Entrümpelung und Büroumzug in Regensburg.",
        path: "/blog/anfrage-regensburg-richtig-stellen",
        about: ["Anfrage", "Regensburg", "Umzug", "Reinigung", "Entrümpelung", "Buchung"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        {
          name: "Anfrage in Regensburg richtig stellen",
          item: "/blog/anfrage-regensburg-richtig-stellen",
        },
      ]),
      buildArticleJsonLd({
        headline:
          "Anfrage in Regensburg richtig stellen: welche Angaben FLOXANT schneller helfen",
        description:
          "Ein FLOXANT Artikel dazu, welche Eckdaten bei einer Anfrage schneller zu einer klaren Antwort führen.",
        path: "/blog/anfrage-regensburg-richtig-stellen",
        datePublished: "2026-04-27",
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
          { label: "Anfrage in Regensburg richtig stellen" },
        ]}
        date="27. April 2026"
        readTime="6 Min."
        title="Anfrage in Regensburg richtig stellen: welche Angaben FLOXANT schneller helfen"
        intro="Viele Anfragen scheitern nicht an zu wenig Interesse, sondern an zu wenig Klarheit. Wenn Service, Umfang, Ort und Zugang gleich sauber genannt werden, kommt die Rückmeldung meist deutlich schneller und passender."
        sections={[
          {
            title: "Warum klare Eckdaten mehr bringen als lange Texte",
            paragraphs: [
              "Bei Umzug, Reinigung, Entrümpelung oder Büroumzug zählt zuerst die Struktur: Wo ist der Einsatz, was soll gemacht werden, wie groß ist der Umfang und welche Bedingungen vor Ort sind wichtig?",
              "Je klarer diese Punkte sind, desto schneller kann FLOXANT Aufwand, Terminlage und passenden Kontaktweg einordnen. Kurz gesagt: lieber sauber schildern als später alles zweimal erklären.",
            ],
          },
          {
            title: "Diese Angaben helfen am meisten",
            paragraphs: [
              "Für die erste Vorprüfung reichen oft schon wenige belastbare Punkte. Genau damit wird aus einem Klick schneller ein klarer nächster Schritt.",
            ],
            bullets: [
              "Serviceart: Umzug, Reinigung, Entrümpelung, Büroumzug oder besondere Situation",
              "Ort und Strecke: Start, Ziel oder genaue Objektadresse in Regensburg oder Bayern",
              "Umfang: Wohnfläche, Volumen, Räume, Arbeitsplätze oder Materialarten",
              "Zugang: Etage, Aufzug, Laufweg, Zeitfenster oder Objektregeln",
              "Terminlage: Wunschdatum, flexibel oder kurzfristig",
              "Optionales Budget: hilfreich, aber nie Ersatz für die Vorprüfung",
            ],
          },
          {
            title: "Welcher FLOXANT Weg dann am besten passt",
            paragraphs: [
              "Wenn schon einige Eckdaten vorhanden sind, ist /buchung meist der sauberste Startpunkt. Für sehr knappe Zeitfenster passt der Express-Check. Wenn bereits ein Budget gesetzt ist, hilft die Anfrage mit Preisvorstellung.",
              "Und wenn noch eine kurze Rückfrage offen ist? Dann geht natürlich auch WhatsApp oder ein direkter Kontaktweg. Hauptsache, es bleibt klar und menschlich. Oder, ein bissl bayerisch gesagt: lieber gscheid anfangen, dann läuft's hinten raus leichter.",
            ],
          },
        ]}
        highlightPoints={[
          "Klare Eckdaten beschleunigen die Vorprüfung deutlich.",
          "Ein Budget kann helfen, ersetzt aber keine Einordnung.",
          "Buchung, Express und Preisvorstellung haben jeweils ihren eigenen sinnvollen Einsatz.",
        ]}
        ctas={[
          { href: "/buchung", label: "Buchung direkt starten" },
          { href: "/express-anfrage", label: "Express-Check öffnen" },
          { href: "/anfrage-mit-preisrahmen", label: "Preisvorstellung senden" },
        ]}
        faqTitle="FAQ zur klaren Anfrage"
        faqItems={faqItems}
      />
    </>
  );
}
