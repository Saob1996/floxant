import { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import { Truck, Shield, Clock, Star, Zap } from "lucide-react";

interface PageProps {
  params: Promise<{}>;
}

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: "entruempelung-regensburg",
    title: "Entrümpelung Regensburg – Wohnung, Keller & Reinigung | FLOXANT",
    description:
      "Entrümpelung in Regensburg für Wohnung, Keller, Garage und Sperrmüll. Fotos senden, Preisrahmen prüfen und Reinigung bei Bedarf ergänzen.",
  });
}

export default async function EntruempelungRegensburgPage({ params }: PageProps) {
  const locale = "de";
  const { 
    localeDict, 
    content, 
    fallback, 
    city 
  } = await getSpecialtyPageData({
    locale,
    baseKey: "entruempelung_spec",
    city: "Regensburg",
  });

  return (
    <SpecialtyPageLayout
        lang="de"
        dict={localeDict}
        city={city}
        heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, "de")}
        heroTitle="Entrümpelung Regensburg mit Fotos, Planung und optionaler Reinigung"
        heroText={resolveField(content.hero_p, fallback.hero_p, city, "de")}
        ctaText={resolveField(content.cta, fallback.cta, city, "de")}
        breadcrumbs={[{"label":"Home","href":"/"},{"label":"Entrümpelung","href":"/entruempelung"},{"label":"Regensburg"}]}
        chips={[
          { icon: Truck, text: resolveNestedField(content.badges, fallback.badges, "permit", city) },
          { icon: Shield, text: resolveNestedField(content.badges, fallback.badges, "signs", city) },
          { icon: Clock, text: resolveNestedField(content.badges, fallback.badges, "stressfree", city) }
        ]}
        cards={[
          {
            icon: Star,
            title: resolveNestedField(content.service1, fallback.service1, "title", city),
            lines: [
              resolveNestedField(content.service1, fallback.service1, "l1", city),
              resolveNestedField(content.service1, fallback.service1, "l2", city),
              resolveNestedField(content.service1, fallback.service1, "l3", city),
              resolveNestedField(content.service1, fallback.service1, "l4", city),
            ]
          },
          {
            icon: Zap,
            title: resolveNestedField(content.service2, fallback.service2, "title", city),
            lines: [
              resolveNestedField(content.service2, fallback.service2, "l1", city),
              resolveNestedField(content.service2, fallback.service2, "l2", city),
              resolveNestedField(content.service2, fallback.service2, "l3", city),
              resolveNestedField(content.service2, fallback.service2, "l4", city),
            ]
          }
        ]}
        sectionTitle={resolveField(content.section2_h2, fallback.section2_h2, city, "de")}
        sectionParagraphs={[
          resolveField(content.section2_p1, fallback.section2_p1, city, "de"),
          resolveField(content.section2_p2, fallback.section2_p2, city, "de"),
        ]}
        wizardBadge={resolveField(content.wizard_badge, fallback.wizard_badge, city, "de")}
        wizardTitle={resolveField(content.wizard_h2, fallback.wizard_h2, city, "de")}
        wizardText={resolveField(content.wizard_p, fallback.wizard_p, city, "de")}
        signatureServices={[
          "clear_cleaning",
          "photo_check",
          "budget_check",
          "property_ready_service",
          "estate_clearance",
          "short_notice",
          "handover_ready",
        ]}
        signatureTitle="Signature Services für Entrümpelung Regensburg"
        signatureSubtitle="Entrümpelung wird leichter, wenn Menge, Zugang, Fotos, Preisrahmen und eine mögliche Reinigung von Anfang an zusammen gedacht werden."
        authorityModules={[
          "regensburg_core",
          "regensburg_200km",
          "price_clearance",
          "cellar_trashroom_rescue",
          "offer_check",
          "damage_control",
          "rental_ready",
          "tenant_turnover",
          "photo_check",
          "budget_check",
          "clear_cleaning_combo",
          "handover_preparation",
        ]}
        authorityBadge="Lokale Entruempelungsautoritaet"
        authorityTitle="Was eine Entruempelung in Regensburg besser kalkulierbar macht"
        authoritySubtitle="Menge, Material, Etage, Zugang, Fotos, Budget und der gewuenschte Zielzustand entscheiden, ob Raeume nur leer oder auch uebergabebereit werden sollen."
      />
  );
}
