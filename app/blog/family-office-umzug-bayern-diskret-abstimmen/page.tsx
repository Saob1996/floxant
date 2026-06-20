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
    q: "Für wen ist ein Family-Office-orientierter Private-Client-Ablauf sinnvoll?",
    a: "Für Eigentümer, Assistenzen, Family Offices und diskret geführte Privathaushalte, bei denen Zuständigkeiten, Werte, Zugang und Kommunikation sauber getrennt und zuverlässig abgestimmt werden müssen.",
  },
  {
    q: "Warum ist eine ruhige Abstimmung hier wichtiger als ein schneller Rechner?",
    a: "Weil sensible Objekte, Kunst, Designmöbel, Zweitwohnsitze, Personal und Übergaben nicht in eine Standardlogik passen. Erst die Vorprüfung schafft einen belastbaren Ablauf.",
  },
  {
    q: "Welche Punkte sollten vorab geklärt werden?",
    a: "Wichtig sind Ansprechpartner, Entscheidungswege, Zugang, Schutzbedarf, Zeitfenster, Materialempfindlichkeit, Hausverwaltung, Nachbarschaftssituation und der gewünschte Servicegrad.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/family-office-umzug-bayern-diskret-abstimmen",
    title: "Family Office und Private Client in Bayern | Diskrete Umzüge sauber abstimmen",
    description:
      "Wie Eigentümer, Assistenz und Family Office sensible Umzüge, Übergaben und Schutzbedarf in Bayern diskret und sauber koordinieren.",
  });
}

export default function BlogFamilyOfficeUmzugBayernPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Family Office und Private Client in Bayern",
        description:
          "Ratgeber für diskrete Abstimmung zwischen Eigentümer, Assistenz und Family Office bei sensiblen Umzügen in Bayern.",
        path: "/blog/family-office-umzug-bayern-diskret-abstimmen",
        about: ["Family Office", "Private Client", "Diskretion", "Residenz", "Bayern"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        {
          name: "Family Office und Private Client in Bayern",
          item: "/blog/family-office-umzug-bayern-diskret-abstimmen",
        },
      ]),
      buildArticleJsonLd({
        headline: "Family Office und Private Client in Bayern: wie diskrete Umzüge sauber abgestimmt werden",
        description:
          "Ein FLOXANT Artikel zu Zuständigkeiten, Diskretion und Schutzkonzepten für sensible Privatumzüge in Bayern.",
        path: "/blog/family-office-umzug-bayern-diskret-abstimmen",
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
          { label: "Family Office & Private Client" },
        ]}
        date="28. April 2026"
        readTime="6 Min."
        title="Family Office und Private Client in Bayern: wie diskrete Umzüge sauber abgestimmt werden"
        intro="Bei sensiblen Privathaushalten entscheidet selten nur die Logistik. Wichtiger sind Zuständigkeiten, Diskretion, Objektverständnis und ein Ablauf, der für Eigentümer, Assistenz und Family Office ruhig und belastbar bleibt."
        sections={[
          {
            title: "Warum Abstimmung hier mehr zählt als Geschwindigkeit",
            paragraphs: [
              "Bei einem sensiblen Umzug oder einer sensiblen Übergabe geht es oft nicht darum, möglichst schnell irgendeinen Dienstleister zu finden. Es geht darum, dass alle Beteiligten denselben Plan sehen und der Ablauf ruhig bleibt.",
              "Wenn Eigentümer, Assistenz, Family Office, Hausverwaltung oder Sicherheitsdienste beteiligt sind, muss klar sein, wer freigibt, wer erreichbar ist und welche Bereiche besonders geschützt werden.",
            ],
          },
          {
            title: "Welche Punkte vorab sauber geklärt werden sollten",
            paragraphs: [
              "Je sensibler das Objekt, desto wichtiger ist die Vorprüfung. Das spart Nachfragen und verhindert Reibung im entscheidenden Moment.",
            ],
            bullets: [
              "Ansprechpartner und Freigabewege eindeutig festlegen",
              "Schutzbedarf für Böden, Oberflächen, Kunst und Designmöbel abstimmen",
              "Zeitfenster, Nachbarschaft, Personal und Zugang realistisch planen",
              "Zweitwohnsitze, Übergaben oder vorbereitete Reinigung früh mitdenken",
            ],
          },
          {
            title: "Warum FLOXANT hier bewusst nicht mit Standardrechner arbeitet",
            paragraphs: [
              "Ein Standardrechner kann bei sensiblen Objekten den falschen Eindruck erzeugen. Schutzbedarf, Diskretion, Teamzuschnitt und Kommunikationswege sind hier oft wichtiger als eine schnelle Zahl.",
              "Deshalb bleibt der Private-Client-Bereich bewusst getrennt: persönlich, diskret und auf saubere Vorprüfung ausgelegt. Kurz gesagt: lieber erst gscheid abstimmen, dann ruhig umsetzen.",
            ],
          },
        ]}
        highlightPoints={[
          "Bei Family Office und Private Client zählen Zuständigkeiten und Diskretion mehr als Tempo.",
          "Eine ruhige Vorprüfung spart Reibung bei Übergabe, Zugang und Schutzbedarf.",
          "Der getrennte Private-Client-Pfad schafft mehr Vertrauen als ein Standardformular.",
        ]}
        ctas={[
          { href: "/private-client-service", label: "Private Client Seite öffnen" },
          { href: "/kontakt", label: "Diskret Kontakt aufnehmen" },
          { href: "/blog/private-client-umzug-bayern-diskret-planen", label: "Weiteren Private-Client-Ratgeber lesen" },
        ]}
        faqTitle="FAQ zu Family Office und Private Client"
        faqItems={faqItems}
      />
    </>
  );
}
