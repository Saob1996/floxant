import { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData } from "@/lib/specialty-page";
import { Building2, Shield, Clock, Star, Zap } from "lucide-react";

interface PageProps {
  params: Promise<{}>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: `bueroumzug-bayern`,
    title: "Büroumzug Regensburg + Einsatzgebiet bis 75 km | FLOXANT",
    description: "Büroumzug im Einsatzgebiet bis 75 km um Regensburg anfragen. Weiter entfernte Orte sind nur Fernziele einer konkreten Anfrage.",
  });
}

export default async function BueroUmzugBayernPage({ params }: PageProps) {
  const locale = "de";
  const { localeDict } = await getSpecialtyPageData({
    locale,
    baseKey: "service_bueroumzug",
    seoKey: "bueroumzug_bayern_spec",
    city: "Bayern",
  });

  return (
    <SpecialtyPageLayout
      lang="de"
      dict={localeDict}
      city="Regensburg"
      heroBadge="Regensburg + Einsatzgebiet bis 75 km"
      heroTitle="Büroumzug ab Regensburg klar planen"
      highlightWord="Regensburg"
      heroText="FLOXANT plant Büroumzüge im verifizierten Einsatzgebiet bis 75 km um Regensburg. Weiter entfernte Orte können nur Ziel einer konkreten Fernziel-Anfrage sein; daraus folgt keine flächendeckende Verfügbarkeit."
      ctaText="Büroumzug ab Regensburg anfragen"
      heroImage="/assets/service-moving.webp"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Büroumzug", href: `/umzug-bayern` },
        { label: "Regensburg + 75 km" }
      ]}
      chips={[
        { icon: Shield, text: "Verifiziertes Einsatzgebiet bis 75 km" },
        { icon: Building2, text: "Arbeitsplätze und Inventar klar erfassen" },
        { icon: Clock, text: "Fernziel nur als konkrete Anfrage" }
      ]}
      cards={[
        {
          icon: Star,
          title: "Büroumzug im Einsatzgebiet",
          lines: [
            "Start und Einsatzort bis 75 km um Regensburg",
            "Arbeitsplätze, IT und Archiv getrennt erfassen",
            "Laufwege, Ladezonen und Zeitfenster prüfen",
            "Betriebsunterbrechung realistisch planen",
          ]
        },
        {
          icon: Zap,
          title: "Fernziel-Anfrage",
          lines: [
            "Weiter entfernten Zielort konkret angeben",
            "Strecke, Umfang und Termin prüfen lassen",
            "Keine lokale Verfügbarkeit am Fernziel behaupten",
            "Zusage erst nach Machbarkeitsprüfung",
          ]
        }
      ]}
      sectionTitle="Was für die regionale Planung gilt"
      sectionParagraphs={[
        "Regensburg ist der Ausgangspunkt. Das verifizierte Einsatzgebiet reicht bis 75 km und wird vor jeder Zusage nach Umfang, Zugang, Termin und Kapazität geprüft.",
        "München, Nürnberg, Augsburg und andere weiter entfernte Orte können Ziel einer konkreten Anfrage sein. Sie gehören nicht zum lokalen Einsatzgebiet.",
      ]}
      wizardBadge="Büroumzug anfragen"
      wizardTitle="Start, Ziel und Umfang konkret eintragen"
      wizardText="Nennen Sie Startort, Zielort, Arbeitsplätze, Zugang und Termin. Ein Fernziel ist Teil der Anfrage, keine flächendeckende Verfügbarkeitszusage."
    />
  );
}
