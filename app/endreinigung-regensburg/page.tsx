import { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import { Sparkles, Shield, Clock, Star, Zap } from "lucide-react";

interface PageProps {
  params: Promise<{}>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { seoContent, seoFallback, city } = await getSpecialtyPageData({
    locale: "de",
    baseKey: "service_reinigung",
    seoKey: "endreinigung_regensburg_spec",
    city: "Regensburg",
  });

  return generatePageSEO({
    lang: "de",
    path: `endreinigung-regensburg`,
    title: resolveField(seoContent.meta_title, seoFallback.meta_title, city, "de"),
    description: resolveField(seoContent.meta_desc, seoFallback.meta_desc, city, "de"),
  });
}

export default async function EndreinigungRegensburgPage({ params }: PageProps) {
  const locale = "de";
  const { 
    localeDict, 
    content, 
    fallback, 
    city 
  } = await getSpecialtyPageData({
    locale,
    baseKey: "service_reinigung",
    seoKey: "endreinigung_regensburg_spec",
    city: "Regensburg",
  });

  return (
    <SpecialtyPageLayout
      lang="de"
      dict={localeDict}
      city={city}
      heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, "de")}
      heroTitle={resolveField(content.hero_h1, fallback.hero_h1, city, "de")}
      highlightWord={resolveField(content.hero_h1_highlight, fallback.hero_h1_highlight, city, "de")}
      heroText={resolveField(content.hero_p, fallback.hero_p, city, "de")}
      ctaText={resolveField(content.cta, fallback.cta, city, "de")}
      heroImage="/assets/service-cleaning.png"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Reinigung Regensburg", href: `/reinigung-regensburg` },
        { label: "Endreinigung" }
      ]}
      chips={[
        { icon: Shield, text: resolveNestedField(content.badges, fallback.badges, "permit", city) },
        { icon: Sparkles, text: resolveNestedField(content.badges, fallback.badges, "signs", city) },
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
        "move_cleaning",
        "short_notice",
      ]}
      signatureTitle="Signature Services fuer Endreinigung Regensburg"
      signatureSubtitle="Endreinigung wird belastbarer, wenn Uebergabeziel, Zustand, Fotos, Termin und Budget frueh sichtbar sind."
      authorityModules={[
        "regensburg_core",
        "price_cleaning",
        "photo_check",
        "budget_check",
        "handover_preparation",
        "move_cleaning_combo",
      ]}
      authorityBadge="Vor der Übergabe klären"
      authorityTitle="Was vor einer Endreinigung in Regensburg wichtig ist"
      authoritySubtitle="Für eine realistische Einschätzung braucht FLOXANT Fläche, Zustand, Fotos, Termin, Budgetrahmen und das Ziel der Wohnungsübergabe. So wird aus einer unklaren Anfrage ein nachvollziehbarer nächster Schritt."
    />
  );
}
