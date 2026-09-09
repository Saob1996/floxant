import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageSEO } from "@/lib/seo";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import Link from "next/link";
import { Trash2, Shield, Clock, Star, Zap } from "lucide-react";
interface PageProps {
  params: Promise<{}>;
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { seoContent, seoFallback, city } = await getSpecialtyPageData({
    locale: "de",
    baseKey: "entrümpelung_spec",
    seoKey: "entrümpelung_bayern",
    city: "Bayern",
  });
  return generatePageSEO({
    lang: "de",
    path: `entruempelung-bayern`,
    title: "Entrümpelung in Bayern: Raum Regensburg | FLOXANT",
    description: "FLOXANT räumt Keller, Räume und Haushalte im lokalen Gebiet bis 75 km um Regensburg. Umfang, Trennung, Zugang und Termin gemeinsam abstimmen.",
  });
}
export default async function EntrümpelungBayernPage({ params }: PageProps) {
  const locale = "de";
  const { 
    localeDict, 
    content, 
    fallback, 
    seoContent, 
    seoFallback, 
    city 
  } = await getSpecialtyPageData({
    locale,
    baseKey: "entrümpelung_spec",
    seoKey: "entrümpelung_bayern",
    city: "Bayern",
  });
  return (
    <SpecialtyPageLayout
        lang="de"
        dict={localeDict}
        city={city}
        heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, "de")}
        heroTitle="Entrümpelung im Raum Regensburg anfragen"
        heroText="Unser lokales Einsatzgebiet reicht bis 75 km Luftlinie um Regensburg. Beschreiben Sie Räume, Menge, Zugang und den gewünschten Endzustand. Daraus klären wir die benötigte Hilfe und ein persönliches Angebot."
        ctaText={resolveField(content.cta, fallback.cta, city, "de")}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: `Entrümpelung ${city}` }
        ]}
        chips={[
          { icon: Trash2, text: resolveNestedField(content.badges, fallback.badges, "permit", city) },
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
