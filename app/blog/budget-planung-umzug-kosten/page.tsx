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
    q: "Sollte ich mein Budget bei einer Umzugsanfrage nennen?",
    a: "Ja, wenn es als Zielrahmen gemeint ist. Das Budget hilft bei der Priorisierung, ersetzt aber keine Prüfung von Umfang, Zugang und Terminlage.",
  },
  {
    q: "Kann FLOXANT jede Leistung an ein Budget anpassen?",
    a: "Nein. Manche Anforderungen haben feste operative Grenzen. FLOXANT kann aber erklären, welche Leistungen im Rahmen sinnvoll priorisiert werden können.",
  },
  {
    q: "Was ist besser: Budget nennen oder Rechner starten?",
    a: "Ideal ist beides: Der Rechner liefert die System-Einschätzung, das Budget zeigt Ihre Preisvorstellung. Beides wird getrennt betrachtet.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "blog/budget-planung-umzug-kosten",
    title: "Budgetplanung beim Umzug | Preisvorstellung richtig nutzen",
    description:
      "Wie Kunden ein Zielbudget für Umzug, Reinigung oder Entrümpelung sinnvoll angeben, ohne falsche Preisversprechen zu erzeugen.",
  });
}

export default function BudgetPlanungUmzugKostenPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildWebPageJsonLd({
        name: "Budgetplanung beim Umzug",
        description: "Ratgeber zur sinnvollen Nutzung von Preisvorstellungen in FLOXANT Anfragen.",
        path: "/blog/budget-planung-umzug-kosten",
        about: ["Budgetplanung", "Preisvorstellung", "Umzugskosten", "Orientierungsrahmen"],
      }),
      buildBreadcrumbJsonLd([
        { name: "FLOXANT", item: "/" },
        { name: "Blog", item: "/blog" },
        { name: "Budgetplanung", item: "/blog/budget-planung-umzug-kosten" },
      ]),
      buildArticleJsonLd({
        headline: "Budgetplanung beim Umzug: Preisvorstellung richtig nutzen",
        description: "Ein FLOXANT Artikel über Zielbudget, Priorisierung und realistische Vorprüfung.",
        path: "/blog/budget-planung-umzug-kosten",
        datePublished: "2026-04-20",
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
          { label: "Budgetplanung" },
        ]}
        date="20. April 2026"
        readTime="6 Min."
        title="Budgetplanung beim Umzug: Preisvorstellung richtig nutzen"
        intro="Ein Zielbudget kann sehr hilfreich sein, wenn es richtig eingeordnet wird. Es ist kein Ersatz für die operative Prüfung, aber ein gutes Signal dafür, welche Lösung für den Kunden wirklich passend ist."
        sections={[
          {
            title: "Budget ist ein Rahmen, kein Endpreis",
            paragraphs: [
              "Wer ein Budget nennt, macht die Planung oft einfacher. Gleichzeitig darf daraus kein künstliches Preisversprechen entstehen. Ein Umzug, eine Reinigung oder eine Entrümpelung braucht immer die Prüfung der konkreten Daten.",
              "Deshalb trennt FLOXANT Preisvorstellung und System-Einschätzung. Der Kunde zeigt seinen Zielrahmen, FLOXANT prüft den realistischen Aufwand.",
            ],
          },
          {
            title: "Wie Budget bei der Priorisierung hilft",
            paragraphs: [
              "Wenn der Rahmen begrenzt ist, kann man Leistungen priorisieren: schwere Möbel statt Kleinteile, Beiladung statt Vollumzug, Endreinigung statt Zusatzextras oder Kleinmengen-Entsorgung statt kompletter Räumung.",
            ],
            bullets: [
              "Welche Leistung ist zwingend notwendig?",
              "Welche Leistung kann der Kunde selbst übernehmen?",
              "Welche Zusatzleistung spart später Zeit oder Risiko?",
              "Welche Angaben fehlen für eine belastbare Einschätzung?",
            ],
          },
          {
            title: "So formulieren Sie Ihr Budget sinnvoll",
            paragraphs: [
              "Hilfreich ist ein Zielkorridor mit Kontext. Beispiel: 'Wir planen etwa 1.200 Euro ein, wenn Demontage und Transport enthalten sind, Reinigung aber separat geprüft wird.'",
              "So wird das Budget nicht zur Forderung, sondern zu einer Planungsinformation. Das erhöht die Chance auf eine ehrliche und passende Rückmeldung.",
            ],
          },
        ]}
        highlightPoints={[
          "Budget nennen ist sinnvoll, wenn es als Zielrahmen formuliert wird.",
          "System-Einschätzung und Preisvorstellung bleiben getrennt.",
          "Gute Budgetangaben helfen, Leistungen zu priorisieren.",
        ]}
        ctas={[
          { href: "/anfrage-mit-preisrahmen", label: "Preisvorstellung senden" },
          { href: "/rechner", label: "Rechner starten" },
          { href: "/blog/preisrahmen-vorpruefung-statt-festpreis", label: "Preisrahmen verstehen" },
        ]}
        faqTitle="FAQ zur Budgetplanung"
        faqItems={faqItems}
      />
    </>
  );
}
