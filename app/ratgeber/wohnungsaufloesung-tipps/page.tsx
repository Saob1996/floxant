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
    path: 'ratgeber/wohnungsaufloesung-tipps',
    title: dict.seo?.dynamic_city_title || "Umzugsunternehmen",
    description: dict.seo?.dynamic_city_desc || "Professioneller Umzug",
  });
}
export default async function Article() {
  var dict = await getDictionary("de");
  const content = (dict as any)?.pages?.ratgeber || {};
  const faqJsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
        { "@type": "Question", "name": content.faqs?.[0]?.q, "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[0]?.a } },
        { "@type": "Question", "name": content.faqs?.[1]?.q, "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[1]?.a } }
      ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org", "@type": "Article",
    "headline": "Wohnungsauflösung: Tipps und Kosten",
    "description": "Wohnungsauflösung organisieren: Ablauf, Kosten, Checkliste und Tipps von FLOXANT.",
    "author": { "@type": "Organization", "name": "FLOXANT" },
    "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
    "datePublished": "2026-03-01",
    "dateModified": "2026-03-08",
  };
  return (
    <main className="min-h-screen bg-background">
      <Breadcrumbs lang="de" items={[{ label: "Ratgeber", href: `/ratgeber` }, { label: "Wohnungsauflösung: Tipps und Kosten" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Wohnungsauflösung: Tipps und Kosten</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Eine Wohnungsauflösung ist oft emotional und logistisch anspruchsvoll. Hier erfahren Sie, wie der Ablauf funktioniert.</p>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Wann braucht man eine Wohnungsauflösung?</h2>
            <p className="text-muted-foreground leading-relaxed">Bei Todesfall, Pflegeheimeinzug, Auswanderung oder wenn eine Wohnung komplett geräumt werden muss. Der Unterschied zur Entrümpelung: bei der Wohnungsauflösung wird der gesamte Hausstand aufgelöst.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Kosten und Ablauf</h2>
            <p className="text-muted-foreground leading-relaxed">Eine Wohnungsauflösung kostet je nach Wohnungsgröße 500 bis 3.000 Euro. Verwertbare Gegenstände werden gegengerechnet. FLOXANT bietet Festpreise nach Besichtigung.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Emotionale Begleitung</h2>
            <p className="text-muted-foreground leading-relaxed">Wir gehen sensibel mit der Situation um. Persönliche Erinnerungsstücke werden sorgfältig aussortiert. Auf Wunsch dokumentieren wir alles fotografisch.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">{dict.common.faq_title}</h2>
            <div className="space-y-4">
              {[
              { q: "Wie lange dauert eine Wohnungsauflösung?", a: "In der Regel 1 bis 3 Tage, je nach Wohnungsgröße." },
              { q: "Was passiert mit verwertbaren Gegenständen?", a: "Gegengerechnet oder auf Wunsch an Sozialkaufhäuser gespendet." }
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


