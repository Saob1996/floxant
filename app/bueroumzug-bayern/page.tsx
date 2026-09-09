import { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import { Building2, Shield, Clock, Star, Zap } from "lucide-react";

interface PageProps {
  params: Promise<{}>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { seoContent, seoFallback, city } = await getSpecialtyPageData({
    locale: "de",
    baseKey: "service_bueroumzug",
    seoKey: "bueroumzug_bayern_spec",
    city: "Bayern",
  });

  return generatePageSEO({
    lang: "de",
    path: `bueroumzug-bayern`,
    title: "Büroumzug in Bayern ab oder nach Regensburg | FLOXANT",
    description: "Firmenumzug mit Bezug zu Regensburg planen: Arbeitsplätze, Möbel, Zugänge und Zeitfenster abstimmen. Ein persönliches Angebot klärt Umfang und Strecke.",
  });
}

export default async function BueroUmzugBayernPage({ params }: PageProps) {
  const locale = "de";
  const { 
    localeDict, 
    content, 
    fallback, 
    city 
  } = await getSpecialtyPageData({
    locale,
    baseKey: "service_bueroumzug",
    seoKey: "bueroumzug_bayern_spec",
    city: "Bayern",
  });

  return (
    <SpecialtyPageLayout
      lang="de"
      dict={localeDict}
      city={city}
      heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, "de")}
      heroTitle="Büroumzug in Bayern ab oder nach Regensburg planen"
      highlightWord={resolveField(content.hero_h1_highlight, fallback.hero_h1_highlight, city, "de")}
      heroText="Für Ihren Firmenumzug mit Start oder Ziel im Raum Regensburg stimmen wir Arbeitsplätze, Möbel, Zugänge und den Zeitplan ab. Längere Strecken in Bayern prüfen wir als Fernumzug."
      ctaText={resolveField(content.cta, fallback.cta, city, "de")}
      heroImage="/assets/service-moving.webp"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Büroumzug", href: `/umzug-bayern` },
        { label: "Bayernweit" }
      ]}
      chips={[
        { icon: Shield, text: resolveNestedField(content.badges, fallback.badges, "permit", city) },
        { icon: Building2, text: resolveNestedField(content.badges, fallback.badges, "signs", city) },
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
    />
  );
}
