import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { company } from "@/lib/company";
import { generatePageSEO } from "@/lib/seo";
import { getDictionary } from "@/get-dictionary";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import ReviewCarousel from "@/components/trust/ReviewCarousel";
import { buildWhatsAppHref, getWhatsAppContext } from "@/lib/whatsapp";
const SERVICE_SLUGS = [
  "umzug",
  "bueroumzug",
  "fernumzug",
  "reinigung",
  "entruempelung",
  "montage",
  "halteverbotszone",
] as const;
type ServiceSlug = (typeof SERVICE_SLUGS)[number];
const SLUG_TO_KEY: Record<ServiceSlug, string> = {
  umzug: "service_umzug",
  bueroumzug: "service_buero_umzug",
  fernumzug: "service_fernumzug",
  reinigung: "service_reinigung",
  entruempelung: "service_entruempelung",
  montage: "service_montage",
  halteverbotszone: "service_halteverbotszone",
};
const RELATED_SERVICES: Record<ServiceSlug, readonly ServiceSlug[]> = {
  umzug: ["fernumzug", "montage", "halteverbotszone"],
  bueroumzug: ["fernumzug", "halteverbotszone", "montage"],
  fernumzug: ["umzug", "bueroumzug", "halteverbotszone"],
  reinigung: ["entruempelung", "umzug", "montage"],
  entruempelung: ["reinigung", "umzug", "montage"],
  montage: ["umzug", "bueroumzug", "reinigung"],
  halteverbotszone: ["umzug", "bueroumzug", "fernumzug"],
};
type PageProps = {
  params: Promise<{ serviceSlug: string }>;
};

function isValidServiceSlug(slug: string): slug is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(slug);
}

function getServiceContent(dict: any, slug: ServiceSlug): any {
  const key = SLUG_TO_KEY[slug];
  return dict?.pages?.[key] || {};
}

function getNestedRecord(obj: any, key: string): any {
  return obj?.[key] || {};
}

function getServiceType(slug: ServiceSlug): string {
  switch (slug) {
    case "umzug":
    case "bueroumzug":
    case "fernumzug":
      return "MovingService";
    case "reinigung":
      return "CleaningService";
    case "entruempelung":
      return "DebrisRemovalService";
    default:
      return "Service";
  }
}

function getProviderSchemaType(slug: ServiceSlug): string | string[] {
  switch (slug) {
    case "reinigung":
      return "HouseCleaningService";
    case "entruempelung":
      return ["LocalBusiness", "ProfessionalService"];
    case "montage":
    case "halteverbotszone":
      return "ProfessionalService";
    default:
      return "MovingCompany";
  }
}

function getHomeLabel(lang: string): string {
  return lang === "de" ? "Startseite" : "Home";
}

function sanitizeString(val: any, fallback: string = ""): string {
  return typeof val === "string" ? val : fallback;
}

function getLocalizedCityLabel(cities: any, key: string, fallback: string): string {
  return cities?.[key] || fallback;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const { serviceSlug } = await params;
  if (!isValidServiceSlug(serviceSlug)) {
    notFound();
  }
  const dict = (await getDictionary("de")) as unknown as Record<string, unknown>;
  const content = getServiceContent(dict, serviceSlug);
  return generatePageSEO({
    lang: "de",
    path: serviceSlug,
    title: content.meta_title || content.hero_title,
    description: content.meta_desc || content.hero_desc,
  });
}
export default async function CoreServicePage({ params }: PageProps) {
  const { serviceSlug } = await params;
  if (!isValidServiceSlug(serviceSlug)) {
    notFound();
  }
  const dict = (await getDictionary("de")) as unknown as Record<string, unknown>;
  const isDe = true;
  const content = getServiceContent(dict, serviceSlug);
  const area = getNestedRecord(dict, "area");
  const cities = getNestedRecord(area, "cities");
  const common = getNestedRecord(dict, "common");
  const servicesSection = getNestedRecord(dict, "services_section");
  const related = RELATED_SERVICES[serviceSlug];
  const faqs = content.faqs ?? [];
  const processSteps = content.process_steps ?? [];
  const forWhomItems = content.for_whom_items ?? [];
  const guarantees = content.guarantees ?? [];
  const canonicalUrl = `${company.url}/${serviceSlug}`;
  const faqJsonLd =
    faqs.length > 0
      ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq: any) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      }
      : null;
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": getProviderSchemaType(serviceSlug),
    "@id": `${canonicalUrl}#localbusiness`,
    name: company.name,
    url: canonicalUrl,
    telephone: company.phoneRaw,
    email: company.email,
    areaServed: {
      "@type": "State",
      name: "Bayern",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: company.streetAddress,
      addressLocality: company.city,
      postalCode: company.postalCode,
      addressRegion: "Bayern",
      addressCountry: company.countryCode,
    },
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: getServiceType(serviceSlug),
    name: content.hero_title || serviceSlug,
    description: content.hero_desc || content.meta_desc || "",
    provider: {
      "@type": getProviderSchemaType(serviceSlug),
      name: company.name,
      telephone: company.phoneRaw,
      email: company.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.streetAddress,
        addressLocality: company.city,
        postalCode: company.postalCode,
        addressRegion: "Bayern",
        addressCountry: company.countryCode,
      },
    },
    areaServed: {
      "@type": "State",
      name: "Bayern",
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: getHomeLabel("de"),
        item: `${company.url}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: content.hero_title || serviceSlug,
        item: canonicalUrl,
      },
    ],
  };
  const alsoAvailableIn = sanitizeString(common.also_available_in, "Auch verfügbar in");
  const whatsappCtaTitle = sanitizeString(common.whatsapp_cta_title, "Schnell per WhatsApp anfragen");
  const whatsappCtaDesc = sanitizeString(
    common.whatsapp_cta_desc,
    "Direkter Kontakt für Rückfragen und Angebote in Deutschland."
  );
  const relatedServicesTitle = sanitizeString(servicesSection.title, "Weitere Leistungen");
  const hubNote = sanitizeString(area.hub_note);
  const whatsappHref = buildWhatsAppHref(
    company.phoneRaw,
    getWhatsAppContext(`/${serviceSlug}`, serviceSlug).message
  );
  return (
    <main className="min-h-screen bg-background">
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Breadcrumbs
        lang="de"
        items={[{ label: content.hero_title || serviceSlug }]}
      />
      <section className="section-glow bg-gradient-to-b from-primary/5 to-background px-6 pb-20 pt-32">
        <div className="mx-auto max-w-4xl text-center">
          {content.badge && (
            <span className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              {content.badge}
            </span>
          )}
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-slate-950 md:text-6xl">
            {content.hero_title || (serviceSlug.charAt(0).toUpperCase() + serviceSlug.slice(1).replace("-", " "))}
          </h1>
          {content.hero_desc && (
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
              {content.hero_desc}
            </p>
          )}
        </div>
      </section>
      <section className="px-6 pb-12">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            {
              title: "Realistisch statt Lockpreis",
              text: "Ein Auftrag wird erst belastbar, wenn Umfang, Zugang, Terminlage und Zusatzleistungen zusammenpassen.",
            },
            {
              title: "Klare Zuständigkeit",
              text: "FLOXANT prüft, welcher Service wirklich gebraucht wird und welcher nächste Schritt sinnvoll ist.",
            },
            {
              title: "Übergabe mitdenken",
              text: "Wenn Reinigung, Restmengen, Schlüssel oder Dokumentation relevant sind, werden sie früh eingeordnet.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-[1.45rem] border border-slate-200 bg-white px-5 py-5 shadow-sm shadow-slate-950/5"
            >
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-primary">
                FLOXANT Prinzip
              </div>
              <h2 className="mt-3 text-lg font-semibold text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      {(content.intro_title || content.intro_p1 || content.intro_p2) && (
        <section className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            {content.intro_title && (
              <h2 className="mb-8 text-3xl font-bold text-slate-950">{content.intro_title}</h2>
            )}
            {content.intro_p1 && (
              <p className="mb-6 text-lg leading-relaxed text-slate-600">
                {content.intro_p1}
              </p>
            )}
            {content.intro_p2 && (
              <p className="text-lg leading-relaxed text-slate-600">
                {content.intro_p2}
              </p>
            )}
          </div>
        </section>
      )}
      {(content.for_whom_title || forWhomItems.length > 0) && (
        <section className="section-glow px-6 py-16">
          <div className="mx-auto max-w-3xl">
            {content.for_whom_title && (
              <h2 className="mb-8 text-2xl font-bold text-slate-950">{content.for_whom_title}</h2>
            )}
            {forWhomItems.length > 0 && (
              <div className="space-y-4">
                {forWhomItems.map((item: any, index: number) => (
                  <div key={`${item}-${index}`} className="card-premium flex items-start gap-4 rounded-[1.6rem] p-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      {(content.process_title || processSteps.length > 0) && (
        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            {content.process_title && (
              <h2 className="mb-12 text-center text-3xl font-bold text-slate-950">
                {content.process_title}
              </h2>
            )}
            {processSteps.length > 0 && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {processSteps.map((step: any, index: number) => (
                  <div
                    key={`${step.title}-${index}`}
                    className="card-premium relative rounded-[1.8rem] p-6"
                  >
                    <div className="mb-4 flex items-center gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-semibold text-slate-950">{step.title}</h3>
                    </div>
                    <p className="leading-relaxed text-slate-600">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      {(content.guarantees_title || guarantees.length > 0) && (
        <section className="section-glow px-6 py-16">
          <div className="mx-auto max-w-3xl">
            {content.guarantees_title && (
              <h2 className="mb-8 text-2xl font-bold text-slate-950">
                {content.guarantees_title}
              </h2>
            )}
            {guarantees.length > 0 && (
              <div className="space-y-4">
                {guarantees.map((guarantee: any, index: number) => (
                  <div key={`${guarantee}-${index}`} className="card-premium flex items-start gap-4 rounded-[1.6rem] p-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="font-medium text-slate-700">
                      {guarantee}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      {hubNote && (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-3xl">
            <p className="border-s-2 border-primary/20 ps-4 text-sm italic leading-relaxed text-muted-foreground/70">
              {hubNote}
            </p>
          </div>
        </section>
      )}
      <ReviewCarousel dic={dict} />
      <section className="border-t border-border/50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-xl font-bold text-muted-foreground">
            {relatedServicesTitle}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((slug: any) => {
              const relContent = getServiceContent(dict, slug);
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="group rounded-xl border border-border/50 p-5 transition-all hover:border-primary/30"
                >
                  <h3 className="flex items-center gap-2 font-semibold transition-colors group-hover:text-primary">
                    {relContent.hero_title || slug}
                    <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {relContent.hero_desc || ""}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      {isDe && (
        <section className="border-t border-border/50 px-6 py-12">
          <div className="mx-auto max-w-4xl">
            <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {alsoAvailableIn}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { slug: "regensburg", label: getLocalizedCityLabel(cities, "regensburg", "Regensburg") },
                { slug: "bayern", label: getLocalizedCityLabel(cities, "bavaria", "Bayern") },
                { slug: "muenchen", label: getLocalizedCityLabel(cities, "munich", "München") },
                { slug: "nuernberg", label: getLocalizedCityLabel(cities, "nuremberg", "Nürnberg") },
                { slug: "augsburg", label: getLocalizedCityLabel(cities, "augsburg", "Augsburg") },
                { slug: "landshut", label: "Landshut" },
                { slug: "passau", label: "Passau" },
                { slug: "straubing", label: "Straubing" },
                { slug: "schwandorf", label: "Schwandorf" },
                { slug: "ingolstadt", label: "Ingolstadt" },
              ].map((city: any) => {
                let href = `/umzug-${city.slug}`;
                if (serviceSlug === "reinigung" || serviceSlug === "entruempelung") {
                  href = `/${serviceSlug}-${city.slug}`;
                } else if (serviceSlug === "bueroumzug" && city.slug === "regensburg") {
                  href = `/bueroumzug-regensburg`;
                } else if ((serviceSlug as string) === "seniorenumzug" && (city.slug === "regensburg" || city.slug === "muenchen" || city.slug === "nuernberg")) {
                  href = `/seniorenumzug-${city.slug}`;
                }
                return (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-full border border-border/50 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
                  >
                    {city.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
      <section className="border-y border-[#25D366]/10 bg-[#25D366]/5 px-6 py-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h3 className="mb-1 text-lg font-bold text-foreground">
              {whatsappCtaTitle}
            </h3>
            <p className="text-sm text-muted-foreground">{whatsappCtaDesc}</p>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-xl bg-[#25D366] px-8 py-4 font-bold text-white shadow-lg shadow-green-900/20 transition-all hover:bg-[#128C7E]"
          >
            <span className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
              </span>
              WhatsApp Chat
            </span>
          </a>
        </div>
      </section>
      {(content.cta_title || content.cta_text) && (
        <section className="section-glow py-24 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
            <div className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-violet-600/10 blur-[120px] animate-pulse" />
            <div className="absolute -bottom-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {content.cta_title && (
              <h2 className="mb-6 text-3xl font-bold text-slate-950 md:text-5xl">
                {content.cta_title}
              </h2>
            )}
            {content.cta_text && (
              <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-600">
                {content.cta_text}
              </p>
            )}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-violet-500/10 to-indigo-500/10 blur-xl opacity-0 transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
              <div className="glass-elevated relative overflow-hidden rounded-[2rem] p-4 shadow-[0_30px_90px_rgba(15,23,42,0.12)] md:p-8">
                <SmartBookingWizard dict={dict} />
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="px-6 pb-16">
        <div className="mx-auto flex max-w-4xl justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border/50 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
          >
            {getHomeLabel("de")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
