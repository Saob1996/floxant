import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageSEO } from "@/lib/seo";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import { Truck, Shield, Clock, Star, Zap } from "lucide-react";
interface PageProps {
  params: Promise<{}>;
}
const CITY_KEY = "muenchen-schwabing";
const DISPLAY_NAME = "München Schwabing";
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { seoContent, seoFallback, city, neighborhoods } = await getSpecialtyPageData({
    locale: "de",
    baseKey: "umzug_spec",
    city: DISPLAY_NAME,
    seoKey: CITY_KEY
  });
  return generatePageSEO({
    lang: "de",
    path: `umzug-${CITY_KEY}`,
    title: resolveField(seoContent.meta_title, seoFallback.meta_title, city, neighborhoods, "de"),
    description: resolveField(seoContent.meta_desc, seoFallback.meta_desc, city, neighborhoods, "de"),
  });
}
export default async function UmzugSchwabingPage({ params }: PageProps) {
  const locale = "de";
  const { 
    localeDict, 
    content, 
    fallback, 
    city,
    neighborhoods
  } = await getSpecialtyPageData({
    locale,
    baseKey: "umzug_spec",
    city: DISPLAY_NAME,
    seoKey: CITY_KEY
  });
  return (
    <SpecialtyPageLayout
        lang="de"
        dict={localeDict}
        city={city}
        neighborhoods={neighborhoods}
        heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, neighborhoods, "de")}
        heroTitle={resolveField(content.hero_h1, fallback.hero_h1, city, neighborhoods, "de")}
        heroText={resolveField(content.hero_p, fallback.hero_p, city, neighborhoods, "de")}
        ctaText={resolveField(content.cta, fallback.cta, city, neighborhoods, "de")}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Umzug München", href: `/umzug-muenchen` },
          { label: city }
        ]}
        chips={[
          { icon: Truck, text: resolveNestedField(content.badges, fallback.badges, "permit", city, neighborhoods) },
          { icon: Shield, text: resolveNestedField(content.badges, fallback.badges, "signs", city, neighborhoods) },
          { icon: Clock, text: resolveNestedField(content.badges, fallback.badges, "stressfree", city, neighborhoods) }
        ]}
        cards={[
          {
            icon: Star,
            title: resolveNestedField(content.service1, fallback.service1, "title", city, neighborhoods),
            lines: [
              resolveNestedField(content.service1, fallback.service1, "l1", city, neighborhoods),
              resolveNestedField(content.service1, fallback.service1, "l2", city, neighborhoods),
              resolveNestedField(content.service1, fallback.service1, "l3", city, neighborhoods),
              resolveNestedField(content.service1, fallback.service1, "l4", city, neighborhoods),
            ]
          },
          {
            icon: Zap,
            title: resolveNestedField(content.service2, fallback.service2, "title", city, neighborhoods),
            lines: [
              resolveNestedField(content.service2, fallback.service2, "l1", city, neighborhoods),
              resolveNestedField(content.service2, fallback.service2, "l2", city, neighborhoods),
              resolveNestedField(content.service2, fallback.service2, "l3", city, neighborhoods),
              resolveNestedField(content.service2, fallback.service2, "l4", city, neighborhoods),
            ]
          }
        ]}
        sectionTitle={resolveField(content.section2_h2, fallback.section2_h2, city, neighborhoods, "de")}
        sectionParagraphs={[
          resolveField(content.section2_p1, fallback.section2_p1, city, neighborhoods, "de"),
          resolveField(content.section2_p2, fallback.section2_p2, city, neighborhoods, "de"),
        ]}
        wizardBadge={resolveField(content.wizard_badge, fallback.wizard_badge, city, neighborhoods, "de")}
        wizardTitle={resolveField(content.wizard_h2, fallback.wizard_h2, city, neighborhoods, "de")}
        wizardText={resolveField(content.wizard_p, fallback.wizard_p, city, neighborhoods, "de")}
      />
  );
}
