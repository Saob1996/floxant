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
    path: 'ratgeber/umzug-erste-wohnung',
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
    "headline": "Erste Wohnung: Umzug richtig planen",
    "description": "Der erste eigene Umzug: Tipps für Berufseinsteiger, junge Haushalte und kleine Wohnungen.",
    "author": { "@type": "Organization", "name": "FLOXANT" },
    "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
    "datePublished": "2026-03-01",
    "dateModified": "2026-03-08",
  };
  return (
    <main className="min-h-screen bg-background">
      <Breadcrumbs lang="de" items={[{ label: "Ratgeber", href: `/ratgeber` }, { label: "Erste Wohnung: Umzug richtig planen" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Erste Wohnung: Umzug richtig planen</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Der Einzug in die erste eigene Wohnung ist aufregend. Mit diesen Tipps starten Sie entspannt.</p>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Budget planen</h2>
            <p className="text-muted-foreground leading-relaxed">Kaution (meist 3 Monatsmieten), Umzugskosten, erste Einrichtung und Anschlussgebühren einkalkulieren. Tipp: Gebrauchte Möbel über lokale Börsen finden.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Was brauche ich wirklich?</h2>
            <p className="text-muted-foreground leading-relaxed">Bett, Schreibtisch, Kühlschrank und Grundausstattung für die Küche. Der Rest kommt mit der Zeit. Weniger ist am Anfang mehr.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Kleinen Privatumzug realistisch planen</h2>
            <p className="text-muted-foreground leading-relaxed">FLOXANT prüft auch kleine Umzüge in Regensburg und Bayern nach Umfang, Zugang, Termin und Strecke. Wichtig ist eine ehrliche Einschätzung: wenige Möbel bedeuten oft weniger Volumen, aber nicht automatisch weniger Aufwand bei Treppenhaus, Parken oder Übergabe.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">{dict.common.faq_title}</h2>
            <div className="space-y-4">
              {[
              { q: "Was kostet ein kleiner Umzug?", a: "Das hängt von Volumen, Etage, Laufweg, Strecke und Termin ab. Für eine realistische Einschätzung helfen Fotos und eine kurze Beschreibung." },
              { q: "Brauche ich eine Umzugsfirma für ein WG-Zimmer?", a: "Nicht zwingend, aber bei Möbeltransport spart es Zeit und schont die Nerven." }
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


