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
    path: "reinigung-regensburg",
    title: "Reinigung Regensburg – Endreinigung & Wohnungsübergabe | FLOXANT",
    description:
      "Reinigung in Regensburg für Wohnung, Auszug und Übergabe. Fotos senden, Budget nennen und Endreinigung oder Wohnungsreinigung realistisch prüfen lassen.",
    keywords: [
      "Reinigung Regensburg",
      "Reinigungsfirma Regensburg",
      "Endreinigung Regensburg",
      "Gewerbereinigung Regensburg",
      "Unterhaltsreinigung Regensburg",
    ],
  });
}

export default async function ReinigungRegensburgPage({ params }: PageProps) {
  const locale = "de";
  const { 
    localeDict, 
    content, 
    fallback, 
    city 
  } = await getSpecialtyPageData({
    locale,
    baseKey: "reinigung_spec",
    city: "Regensburg",
  });

  return (
    <SpecialtyPageLayout
        lang="de"
        dict={localeDict}
        city={city}
        heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, "de")}
        heroTitle="Reinigung Regensburg für Endreinigung und Wohnungsübergabe"
        heroText={resolveField(content.hero_p, fallback.hero_p, city, "de")}
        ctaText={resolveField(content.cta, fallback.cta, city, "de")}
        breadcrumbs={[{"label":"Home","href":"/"},{"label":"Reinigung","href":"/reinigung"},{"label":"Regensburg"}]}
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
          "handover_ready",
          "photo_check",
          "budget_check",
          "property_ready_service",
          "estate_clearance",
          "discreet_move",
          "move_cleaning",
          "short_notice",
        ]}
        signatureTitle="Signature Services für Reinigung Regensburg"
        signatureSubtitle="Bei Endreinigung und Wohnungsübergabe zählen Zustand, Termin, Fotos und Budget. Diese Bausteine machen die Anfrage schneller und sauberer."
        authorityModules={[
          "regensburg_core",
          "regensburg_200km",
          "price_cleaning",
          "offer_check",
          "damage_control",
          "rental_ready",
          "tenant_turnover",
          "photo_check",
          "budget_check",
          "handover_preparation",
          "move_cleaning_combo",
        ]}
        authorityBadge="Lokale Reinigungsautoritaet"
        authorityTitle="Was Reinigung in Regensburg vor der Uebergabe verlaesslicher macht"
        authoritySubtitle="Fuer Endreinigung, Auszug und Wohnungsuebergabe zaehlen Flaeche, Zustand, Fotos, Termin, Budget und ob Umzug oder Restmengen mitgedacht werden muessen."
      />
  );
}
