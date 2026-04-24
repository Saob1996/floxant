import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatePageSEO } from "@/lib/seo";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import { Building2, Shield, Clock, Star, Zap, Briefcase } from "lucide-react";
interface PageProps {
  params: Promise<{}>;
}
export async function generateMetadata(): Promise<Metadata> {
  const lang = "de";
  const { seoContent, seoFallback, city } = await getSpecialtyPageData({
    locale: "de",
    baseKey: "buero_umzug_spec",
    city: "Bayern",
  });
  return generatePageSEO({
    lang: "de",
    path: "bueroumzug",
    title: resolveField(seoContent.meta_title, seoFallback.meta_title, city, "de"),
    description: resolveField(seoContent.meta_desc, seoFallback.meta_desc, city, "de"),
  });
}
export default async function BueroumzugPage() {
  const lang = "de";
  const locale = "de";
  const { 
    localeDict, 
    content, 
    fallback, 
    seoContent, 
    seoFallback, 
    city 
  } = await getSpecialtyPageData({
    locale: "de",
    baseKey: "buero_umzug_spec",
    city: "Bayern",
  });
  return (
    <SpecialtyPageLayout
        lang="de"
        dict={localeDict}
        city={city}
        heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, "de")}
        heroTitle={resolveField(content.hero_h1, fallback.hero_h1, city, "de")}
        heroText={resolveField(content.hero_p, fallback.hero_p, city, "de")}
        ctaText={resolveField(content.cta, fallback.cta, city, "de")}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Büroumzug" }
        ]}
        chips={[
          { icon: Building2, text: resolveNestedField(content.badges, fallback.badges, "permit", city) },
          { icon: Shield, text: resolveNestedField(content.badges, fallback.badges, "signs", city) },
          { icon: Briefcase, text: resolveNestedField(content.badges, fallback.badges, "stressfree", city) }
        ]}
        cards={[
          {
            icon: Star,
            title: resolveNestedField(content.service1, fallback.service1, "title", city),
            lines: [
              resolveNestedField(content.service1, fallback.service1, "l1", city),
              resolveNestedField(content.service1, fallback.service1, "l2", city),
              resolveNestedField(content.service1, fallback.service1, "l3", city),
            ]
          },
          {
            icon: Zap,
            title: resolveNestedField(content.service2, fallback.service2, "title", city),
            lines: [
              resolveNestedField(content.service2, fallback.service2, "l1", city),
              resolveNestedField(content.service2, fallback.service2, "l2", city),
              resolveNestedField(content.service2, fallback.service2, "l3", city),
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
