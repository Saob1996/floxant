import { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import { Package, Shield, Clock, Star, Zap } from "lucide-react";

interface PageProps {
  params: Promise<{}>;
}

export async function generateMetadata(): Promise<Metadata> {
  return generatePageSEO({
    lang: "de",
    path: `kleintransport-regensburg`,
    title: "Transport Regensburg – Möbel, Kleintransport & Rückfahrt | FLOXANT",
    description:
      "Transport in Regensburg für Möbel, Einzelstücke und Kleintransport. Route, Zugang, Fotos und Leerfahrt/Rückfahrt nach Verfügbarkeit prüfen lassen.",
  });
}

export default async function KleintransportRegensburgPage({ params }: PageProps) {
  const locale = "de";
  const { 
    localeDict, 
    content, 
    fallback, 
    city 
  } = await getSpecialtyPageData({
    locale,
    baseKey: "service_umzug",
    seoKey: "kleintransport_regensburg_spec",
    city: "Regensburg",
  });

  return (
    <SpecialtyPageLayout
      lang="de"
      dict={localeDict}
      city={city}
      heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, "de")}
      heroTitle="Transport Regensburg für Möbel, Kleintransport und Rückfahrt"
      heroText={resolveField(content.hero_p, fallback.hero_p, city, "de")}
      ctaText={resolveField(content.cta, fallback.cta, city, "de")}
      heroImage="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Umzug Regensburg", href: `/umzug-regensburg` },
        { label: "Kleintransport" }
      ]}
      chips={[
        { icon: Shield, text: resolveNestedField(content.badges, fallback.badges, "permit", city) },
        { icon: Package, text: resolveNestedField(content.badges, fallback.badges, "signs", city) },
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
        "empty_return",
        "photo_check",
        "budget_check",
        "short_notice",
      ]}
      signatureTitle="Signature Services für Transport Regensburg"
      signatureSubtitle="Bei Möbeltransport und Kleintransport zählen Strecke, Zugang, Zeitfenster, Fotos und freie Kapazität. FLOXANT prüft, was realistisch passt."
      authorityModules={[
        "regensburg_core",
        "price_transport",
        "offer_check",
        "damage_control",
        "empty_return_fit",
        "route_board",
        "photo_check",
        "budget_check",
        "regensburg_200km",
      ]}
      authorityBadge="Transport- und Routenautoritaet"
      authorityTitle="Was Transport in Regensburg schneller einschaetzbar macht"
      authoritySubtitle="Bei Moebeln, Einzelstuecken und Kleintransport entscheidet nicht nur die Strecke. Zugang, Etage, Fotos, Datum und freie Rueckfahrt-Kapazitaet zaehlen mit."
    />
  );
}
