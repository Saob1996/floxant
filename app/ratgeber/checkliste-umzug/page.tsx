import { Metadata } from "next";
import { getDictionary } from "@/get-dictionary";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";
export async function generateMetadata(): Promise<Metadata> {
  const pageLocale = "de";
  const dict = (await getDictionary("de")) as any;
  return generatePageSEO({
    pageLocale: pageLocale as any,
    path: 'ratgeber/checkliste-umzug',
    title: dict.seo?.dynamic_city_title || "Umzugsunternehmen",
    description: dict.seo?.dynamic_city_desc || "Professioneller Umzug",
  });
}
export default async function Article() {
  var dict = await getDictionary("de");
  const content = (dict as any)?.pages?.service_umzug || {};
  const faqJsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
        { "@type": "Question", "name": content.faqs?.[0]?.q, "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[0]?.a } },
        { "@type": "Question", "name": content.faqs?.[1]?.q, "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[1]?.a } }
      ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org", "@type": "Article",
    "headline": "Checkliste für stressfreien Umzug",
    "description": "Die ultimative Umzug-Checkliste: Schritt für Schritt zum perfekten Umzug ohne Stress.",
    "author": { "@type": "Organization", "name": "FLOXANT" },
    "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
    "datePublished": "2026-03-01",
    "dateModified": "2026-03-08",
  };
  return (
    <main className="min-h-screen bg-background">
      <Breadcrumbs lang="de" items={[{ label: "Ratgeber", href: `/ratgeber` }, { label: "Checkliste für stressfreien Umzug" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Checkliste für einen stressfreien Umzug</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Ein Umzug erfordert vorausschauende Planung. Mit unserer Checkliste behalten Sie den Überblick über alle wichtigen Aufgaben – von der Kündigung bis zum Einleben.</p>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">8 Wochen vorher</h2>
            <p className="text-muted-foreground leading-relaxed">Kündigen Sie Ihren alten Mietvertrag fristgerecht. Beantragen Sie Urlaub für den Umzugstag. Holen Sie Angebote von Umzugsfirmen ein und vergleichen Sie Leistungen und Preise.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">4 Wochen vorher</h2>
            <p className="text-muted-foreground leading-relaxed">Beginnen Sie mit dem Packen selten genutzter Gegenstände. Organisieren Sie Umzugskartons und Verpackungsmaterial. Klären Sie Zugang, Laufwege und Parkmöglichkeit für Be- und Entladung.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Am Umzugstag</h2>
            <p className="text-muted-foreground leading-relaxed">Legen Sie Zählerstände fest. Übergeben Sie die alte Wohnung dokumentiert. Überprüfen Sie die Möbel nach dem Transport auf Schäden.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">{dict.common.faq_title}</h2>
            <div className="space-y-4">
              {[
              { q: "Wann sollte man mit der Umzugsplanung beginnen?", a: "Idealerweise 8 bis 12 Wochen vor dem Umzugstermin." },
              { q: "Was vergisst man beim Umzug am häufigsten?", a: "Nachsendeauftrag, Zählerstände ablesen, Schlüsselübergabe dokumentieren." }
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-xl bg-muted/10 border border-border/50">
                  <h3 className="font-bold mb-2">{item.q}</h3>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-wrap gap-3">
            <Link href={`/ratgeber`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">← Alle Ratgeber</Link>
            <Link href={`/umzug-regensburg`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">Umzugsfirma Regensburg</Link>
            <Link href={`/umzug-bayern`} className="px-4 py-2 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">{dict.common.umzug_bavaria}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
