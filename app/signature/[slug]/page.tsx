import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/get-dictionary";
import { generatePageSEO } from "@/lib/seo";
import { ChevronRight } from "lucide-react";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
// Define valid signature service slugs
const SIGNATURE_SLUGS = [
  "ritual-exit-box",
  "clean-start",
  "new-neighbour-kit",
  "first-48h",
  "buerokratie-schutz",
  "moebel-optimierung",
  "reinigungsgarantie",
  "lager-rotation",
  "kinder-umzugsbox",
  "24h-umzugsservice",
  "damen-team",
  "erinnerungskapsel",
  "vielleicht-box",
  "schluesseluebergabe",
] as const;
type SignatureSlug = (typeof SIGNATURE_SLUGS)[number];
// Map slug to dictionary key
const SLUG_TO_KEY: Record<SignatureSlug, string> = {
  "ritual-exit-box": "sig_ritual_exit",
  "clean-start": "sig_clean_start",
  "new-neighbour-kit": "sig_neighbour_kit",
  "first-48h": "sig_first_48h",
  "buerokratie-schutz": "sig_bureaucracy",
  "moebel-optimierung": "sig_furniture_opt",
  "reinigungsgarantie": "sig_cleaning_guarantee",
  "lager-rotation": "sig_storage_rot",
  "kinder-umzugsbox": "sig_kids_box",
  "24h-umzugsservice": "sig_service_24h",
  "damen-team": "sig_ladies_team",
  "erinnerungskapsel": "sig_memory_capsule",
  "vielleicht-box": "sig_maybe_box",
  "schluesseluebergabe": "sig_key_handover",
};
// ISR: render on demand, revalidate every hour (reduces static output by ~238 pages)
export const revalidate = 3600;
export const dynamicParams = true;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dict = await getDictionary("de");
  const key = SLUG_TO_KEY[slug as SignatureSlug];
  if (!key) {
    notFound();
  }
  const content = (dict?.pages as any)?.[key] || {};
  return generatePageSEO({
    lang: "de",
    path: `signature/${slug}`,
    title: content.meta_title,
    description: content.meta_desc,
  });
}
export default async function SignatureServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dict = await getDictionary("de");
  const key = SLUG_TO_KEY[slug as SignatureSlug];
  if (!key) {
    notFound();
  }
  const content = (dict?.pages as any)?.[key] || {};
  const area = (dict?.area as any) || {};
  // Get other signature services for cross-linking
  const otherSlugs = SIGNATURE_SLUGS.filter((s) => s !== slug).slice(0, 3);
  return (
    <main className="min-h-screen bg-background">
      <Breadcrumbs lang="de" items={[{ label: 'Signature Services', href: `/#extras` }, { label: content.hero_title || slug }]} />
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-muted/20 to-background">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
            {content.badge}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            {content.hero_title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {content.hero_desc}
          </p>
        </div>
      </section>
      {/* Story */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">{content.story_title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
            {content.story_p1}
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {content.story_p2}
          </p>
        </div>
      </section>
      {/* Purpose */}
      <section className="py-16 px-6 bg-muted/10">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">{content.purpose_title}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {content.purpose_text}
          </p>
        </div>
      </section>
      {/* For Whom */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">{content.for_whom_title}</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {content.for_whom_text}
          </p>
        </div>
      </section>
      {/* Hub Note */}
      {area.hub_note && (
        <section className="py-12 px-6">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-muted-foreground/70 leading-relaxed border-s-2 border-primary/20 ps-4 italic">
              {area.hub_note}
            </p>
          </div>
        </section>
      )}
      {/* Related Signature Services */}
      <section className="py-16 px-6 border-t border-border/50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold mb-8 text-center text-muted-foreground">
            {dict?.signature_services?.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherSlugs.map((s) => {
              const relKey = SLUG_TO_KEY[s];
              const relContent = (dict?.pages as any)?.[relKey] || {};
              return (
                <Link
                  key={s}
                  href={`/signature/${s}`}
                  className="group p-5 rounded-xl border border-border/50 hover:border-primary/30 transition-all"
                >
                  <h3 className="font-semibold group-hover:text-primary transition-colors flex items-center gap-2">
                    {relContent.hero_title || s}
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {relContent.hero_desc || ""}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      {/* Internal Links: Core Services */}
      <section className="py-12 px-6 border-t border-border/50">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["umzug", "reinigung", "entruempelung", "kleintransporte"].map(
              (svc) => {
                const svcKey = `service_${svc.replace("-", "_")}`;
                const svcContent = (dict?.pages as any)?.[svcKey] || {};
                return (
                  <Link
                    key={svc}
                    href={`/${svc}`}
                    className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                  >
                    {svcContent.hero_title || svc}
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section id="booking" className="section-glow py-24">
        <div className="container px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-950">{content.cta_title}</h2>
            <p className="mx-auto max-w-xl text-lg text-slate-600">
              {content.cta_text}
            </p>
          </div>
          <div className="glass-elevated relative z-10 mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] p-1 shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
            {/* Premium Mesh Gradient Background */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
              <div className="absolute -left-[10%] -top-[10%] h-[60%] w-[60%] animate-pulse rounded-full bg-blue-600/12 blur-[120px]" />
              <div className="absolute -right-[10%] bottom-[0%] h-[50%] w-[50%] animate-bounce rounded-full bg-emerald-600/8 blur-[100px] [animation-duration:12s]" />
              <div className="absolute left-[20%] top-[40%] h-[40%] w-[40%] animate-pulse rounded-full bg-purple-600/8 blur-[110px] [animation-duration:8s]" />
            </div>
            <div className="relative z-10 p-4 md:p-8">
              <SmartBookingWizard dict={dict} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
