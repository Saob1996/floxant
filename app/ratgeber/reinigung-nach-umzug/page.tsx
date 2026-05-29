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
    path: 'ratgeber/reinigung-nach-umzug',
    title: dict.seo?.dynamic_city_title || "Umzugsunternehmen",
    description: dict.seo?.dynamic_city_desc || "Reinigung nach dem Umzug",
  });
}
export default async function Article() {
  var dict = await getDictionary("de");
  const content = (dict as any)?.pages?.service_reinigung || {};
  const faqJsonLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
        { "@type": "Question", "name": content.faqs?.[0]?.q, "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[0]?.a } },
        { "@type": "Question", "name": content.faqs?.[1]?.q, "acceptedAnswer": { "@type": "Answer", "text": content.faqs?.[1]?.a } }
      ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org", "@type": "Article",
    "headline": "Reinigung nach Umzug: was vor der Übergabe wichtig ist",
    "description": "Reinigung nach dem Umzug für die Wohnungsübergabe: Küche, Bad, Böden, Fenster, Vertrag und realistische Kosten.",
    "author": { "@type": "Organization", "name": "FLOXANT" },
    "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
    "datePublished": "2026-03-01",
    "dateModified": "2026-03-08",
  };
  return (
    <main className="min-h-screen bg-background">
      <Breadcrumbs lang="de" items={[{ label: "Ratgeber", href: `/ratgeber` }, { label: "Reinigung nach Umzug" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Reinigung nach Umzug: was vor der Übergabe wichtig ist</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Küche, Bad, Böden, Fenster und Nebenräume fallen bei der Übergabe schnell auf. Gute Vorbereitung spart Rückfragen.</p>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Was gehört zur Endreinigung?</h2>
            <p className="text-muted-foreground leading-relaxed">Alle Räume saugen und wischen, Küche und Bad gründlich reinigen, Fenster putzen, Heizkörper abwischen, Einbauschränke auswischen. Der Standard ist „besenrein" – doch oft wird mehr erwartet.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Reinigung beauftragen</h2>
            <p className="text-muted-foreground leading-relaxed">Eine Endreinigung hängt stark von Fläche, Zustand, Küche, Bad, Fenstern und Termin ab. Der Vorteil liegt nicht in einer pauschalen Zusage, sondern in klarer Vorbereitung, nachvollziehbarer Reinigung und besserer Abstimmung vor der Übergabe. FLOXANT bietet Reinigung je nach Auftrag auch als Kombi-Service zum Umzug an.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Typische Stolperfallen</h2>
            <p className="text-muted-foreground leading-relaxed">Kalkflecken in der Dusche, fettige Abzugshauben, verschmutzte Fensterrahmen und vergessene Steckdosen werden bei der Übergabe oft beanstandet.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">{dict.common.faq_title}</h2>
            <div className="space-y-4">
              {[
              { q: "Was kostet eine Endreinigung?", a: "Das hängt von Fläche, Zustand, Küche, Bad, Fenstern und Termin ab. Ein realistischer Preis entsteht erst nach Prüfung der Angaben." },
              { q: "Muss ich nach dem Umzug besenrein übergeben?", a: "Häufig ist besenrein der Mindeststandard. Was konkret verlangt wird, hängt aber vom Mietvertrag und der Absprache mit Vermieter oder Hausverwaltung ab." }
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


