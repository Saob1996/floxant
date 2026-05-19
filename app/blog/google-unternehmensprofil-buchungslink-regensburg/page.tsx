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
    q: "Welcher Link ist für das Google-Unternehmensprofil am sinnvollsten?",
    a: "Am sinnvollsten ist ein klarer direkter Einstieg, auf dem Kunden sofort buchen, eine Vorprüfung starten oder den passenden Kontaktweg wählen können. Genau dafür ist bei FLOXANT die Buchungsseite gedacht.",
  },
  {
    q: "Sollte der Profil-Link direkt auf WhatsApp gehen?",
    a: "Nur dann, wenn es der einzige sinnvolle Kontaktweg ist. Für Dienstleister mit mehreren Einstiegen ist eine klare Buchungsseite oft besser, weil Kunden dort Express, Preisvorstellung, Rechner und Direktanfrage sauber unterscheiden können.",
  },
  {
    q: "Hilft ein guter Profil-Link auch für Google Maps und Search?",
    a: "Ja. Er verbessert vor allem die Nutzerführung, das Klickvertrauen und die Chance auf passendere Anfragen. Für die lokale Sichtbarkeit zählen zusätzlich vollständige Profilangaben, Bewertungen, Fotos und regionale Relevanz.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/google-unternehmensprofil-buchungslink-regensburg",
    title: "Google-Unternehmensprofil in Regensburg: welcher Buchungslink wirklich hilft | FLOXANT",
    description:
      "Warum ein klarer Buchungslink im Google-Unternehmensprofil mehr Vertrauen schafft und aus Maps-Klicks passendere Anfragen macht.",
    keywords: [
      "Google Unternehmensprofil Buchungslink Regensburg",
      "Google Maps Buchung Regensburg",
      "Buchungslink Regensburg",
      "direkte Anfrage Google Maps",
    ],
  });
}

export default function BlogGoogleBusinessProfileBookingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Google-Unternehmensprofil in Regensburg: welcher Buchungslink wirklich hilft",
        description:
          "Ratgeber zu Business-Profile-Link, Google Maps, lokaler Nutzerführung und direkter Anfrage.",
        path: "/blog/google-unternehmensprofil-buchungslink-regensburg",
        about: ["Google Unternehmensprofil", "Google Maps", "Buchungslink", "Regensburg"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        {
          name: "Google-Unternehmensprofil Buchungslink",
          item: "/blog/google-unternehmensprofil-buchungslink-regensburg",
        },
      ]),
      buildArticleJsonLd({
        headline:
          "Google-Unternehmensprofil in Regensburg: welcher Buchungslink Kunden wirklich hilft",
        description:
          "Ein FLOXANT Artikel zu lokalem Buchungslink, Google Maps und klarer Anfrageführung.",
        path: "/blog/google-unternehmensprofil-buchungslink-regensburg",
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
          { label: "Google-Unternehmensprofil Buchungslink" },
        ]}
        date="27. April 2026"
        readTime="6 Min."
        title="Google-Unternehmensprofil in Regensburg: welcher Buchungslink Kunden wirklich hilft"
        intro="Viele Profile in Google Maps verlinken auf eine Startseite, auf der Kunden erst wieder suchen müssen. Besser ist ein direkter Einstieg, der klar zeigt, wie die Anfrage jetzt sauber weitergeht."
        sections={[
          {
            title: "Warum der Link im Unternehmensprofil mehr ist als nur ein Klickziel",
            paragraphs: [
              "Wer in Google Maps oder im Google-Unternehmensprofil klickt, hat meist schon eine sehr konkrete Absicht. Diese Nutzer möchten nicht erst lange navigieren, sondern schnell verstehen, was der richtige nächste Schritt ist.",
              "Gerade bei Umzug, Reinigung oder Entrümpelung ist der Unterschied groß: Ein klarer Einstieg schafft Vertrauen, spart Rückfragen und erhöht die Chance auf passendere Anfragen.",
            ],
          },
          {
            title: "Was ein guter Link leisten sollte",
            paragraphs: [
              "Ein guter Business-Profile-Link trennt Buchung, Express, Preisvorstellung und direkten Kontakt sauber. So sehen Kunden sofort, welcher Weg zu ihrer Situation passt.",
            ],
            bullets: [
              "Klare lokale Zuordnung statt allgemeiner Sammelseite",
              "Direkte Handlungsoptionen ohne erneutes Suchen",
              "Saubere Verbindung zwischen Google Maps, Suchintention und Anfrageweg",
              "Mehr Klarheit für Kunden und bessere Zuordnung der Anfrage",
            ],
          },
          {
            title: "Wie FLOXANT das aufbaut",
            paragraphs: [
              "Für FLOXANT ist /buchung der bevorzugte direkte Einstieg. Dort finden Kunden Buchungssystem, Express-Check, Preisvorstellung und weitere passende Wege an einem Ort.",
              "Kurz gesagt: lieber klar führen als den Nutzer herumirren lassen. Oder, mit etwas bayerischer Nähe gesagt: lieber gscheid gelöst als irgendwie verlinkt.",
            ],
          },
        ]}
        highlightPoints={[
          "Ein Unternehmensprofil-Link sollte sofort in einen klaren Anfrageweg führen.",
          "Kunden klicken eher, wenn Buchung, Express und Kontakt sichtbar getrennt sind.",
          "Für Maps zählen neben dem Link auch vollständige Profilangaben, Bewertungen und lokale Relevanz.",
        ]}
        ctas={[
          { href: "/buchung", label: "Buchungsseite öffnen" },
          { href: "/kontakt", label: "Kontakt ansehen" },
          { href: "/standorte", label: "Standorte einordnen" },
        ]}
        faqTitle="FAQ zum Buchungslink im Unternehmensprofil"
        faqItems={faqItems}
      />
    </>
  );
}
