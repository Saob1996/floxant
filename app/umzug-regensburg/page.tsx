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
    path: "umzug-regensburg",
    title: "Umzug Regensburg – Transport, Reinigung & Übergabe | FLOXANT",
    description:
      "Umzug in Regensburg mit Planung, Transport, Endreinigung, Schlüsselübergabe und Halteverbotszone nach Absprache. Fotos oder Budget unverbindlich senden.",
  });
}

export default async function UmzugRegensburgPage({ params }: PageProps) {
  const locale = "de";
  const { 
    localeDict, 
    content, 
    fallback, 
    city 
  } = await getSpecialtyPageData({
    locale,
    baseKey: "umzug_spec",
    city: "Regensburg",
  });

  return (
    <SpecialtyPageLayout
        lang="de"
        dict={localeDict}
        city={city}
        heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, "de")}
        heroTitle="Umzug Regensburg mit Planung, Transport und Übergabe"
        heroText={resolveField(content.hero_p, fallback.hero_p, city, "de")}
        ctaText={resolveField(content.cta, fallback.cta, city, "de")}
        breadcrumbs={[{"label":"Home","href":"/"},{"label":"Umzug","href":"/umzug"},{"label":"Regensburg"}]}
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
          "key_handover",
          "parking_zone",
          "move_cleaning",
          "empty_return",
          "discreet_move",
          "premium_discreet",
          "photo_check",
          "budget_check",
        ]}
        signatureTitle="Signature Services für Umzug Regensburg"
        signatureSubtitle="Bei Umzügen in Regensburg entscheidet oft nicht nur der Transport. Schlüssel, Haltezone, Reinigung, Rückfahrt und Budget müssen früh sichtbar werden."
        authorityModules={[
          "regensburg_core",
          "price_umzug",
          "offer_check",
          "tenant_turnover",
          "damage_control",
          "route_board",
          "photo_check",
          "move_cleaning_combo",
          "handover_preparation",
          "regensburg_200km",
        ]}
        authorityBadge="Lokale Umzugsautoritaet"
        authorityTitle="Was einen Umzug in Regensburg wirklich planbar macht"
        authoritySubtitle="FLOXANT klaert nicht nur den Transport. Fuer ein belastbares Angebot zaehlen Volumen, Zugang, Fotos, Reinigung, Schluessel, Uebergabe und die regionale Verfuegbarkeit."
      />
  );
}
