import { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo";
import { SpecialtyPageLayout } from "@/components/SpecialtyPageLayout";
import { getSpecialtyPageData, resolveField, resolveNestedField } from "@/lib/specialty-page";
import { buildLeadHref } from "@/lib/lead-intents";
import { Music, Shield, Clock, Star, Zap } from "lucide-react";
interface PageProps {
  params: Promise<{}>;
}

const klaviertransportLeadHref = buildLeadHref({
  service: "klaviertransport",
  city: "bayern",
  intent: "klaviertransport-bayern",
  priority: "p1",
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { content, fallback, seoContent, seoFallback, city } = await getSpecialtyPageData({
    locale: "de",
    baseKey: "klaviertransport_spec",
    city: "Bayern",
  });
  return generatePageSEO({
    lang: "de",
    path: `klaviertransport`,
    title: resolveField(seoContent?.meta_title || content?.meta_title, seoFallback?.meta_title || fallback?.meta_title, city, "de"),
    description: resolveField(seoContent?.meta_desc || content?.meta_desc, seoFallback?.meta_desc || fallback?.meta_desc, city, "de"),
  });
}
export default async function KlaviertransportPage({ params }: PageProps) {
  const locale = "de";
  const { 
    localeDict, 
    content, 
    fallback, 
    city 
  } = await getSpecialtyPageData({
    locale,
    baseKey: "klaviertransport_spec",
    city: "Bayern",
  });
  return (
    <SpecialtyPageLayout
        lang="de"
        dict={localeDict}
        city={city}
        heroBadge={resolveField(content.hero_badge, fallback.hero_badge, city, "de")}
        heroTitle={`Klaviertransport in ${city}`}
        heroText={resolveField(content.hero_p, fallback.hero_p, city, "de")}
        ctaText={resolveField(content.cta, fallback.cta, city, "de")}
        primaryCtaHref={klaviertransportLeadHref}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Klaviertransport" }
        ]}
        chips={[
          { icon: Music, text: resolveNestedField(content.badges, fallback.badges, "permit", city) },
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
