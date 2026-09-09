import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageSEO } from "@/lib/seo";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import { Truck, Shield, Clock, Star, Zap } from "lucide-react";
interface PageProps {
  params: Promise<{}>;
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { seoContent, seoFallback, city } = await getSpecialtyPageData({
    locale: "de",
    baseKey: "umzug_spec",
    city: "Bayern",
  });
  return generatePageSEO({
    lang: "de",
    path: "umzug-bayern",
    title: "Umzug in Bayern ab oder nach Regensburg | FLOXANT",
    description: "Ihren Umzug mit Start oder Ziel im Raum Regensburg vorbereiten. Wir stimmen Strecke, Möbel, Etagen und benötigte Hilfe für ein persönliches Angebot ab.",
  });
}
export default async function UmzugBayernPage({ params }: PageProps) {
  const locale = "de";
  const { 
    localeDict, 
    content, 
    fallback, 
    city 
  } = await getSpecialtyPageData({
    locale,
    baseKey: "umzug_spec",
    city: "Bayern",
  });
  return (
    <SpecialtyPageLayout
        lang="de"
        dict={localeDict}
        city={city}
        heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, "de")}
        heroTitle="Umzug in Bayern ab oder nach Regensburg"
        heroText="Sie ziehen aus dem Raum Regensburg weg oder hierher? Wir stimmen Strecke, Möbel, Etagen und benötigte Hilfe mit Ihnen ab. Fernumzugsziele gehören zum vereinbarten Transportweg; unser lokales Einsatzgebiet bleibt bei 75 km um Regensburg."
        ctaText={resolveField(content.cta, fallback.cta, city, "de")}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Umzug", href: "/umzug" },
          { label: city }
        ]}
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
      />
  );
}
