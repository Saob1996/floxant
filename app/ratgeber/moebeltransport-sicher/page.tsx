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
    path: 'ratgeber/moebeltransport-sicher',
    title: dict.seo?.dynamic_city_title || "Umzugsunternehmen",
    description: dict.seo?.dynamic_city_desc || "Moebeltransport vorbereiten",
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
    "headline": "Möbeltransport sicher organisieren",
    "description": "So kommen Ihre Möbel sicher an: Verpackung, Transport und Versicherung beim Umzug.",
    "author": { "@type": "Organization", "name": "FLOXANT" },
    "publisher": { "@type": "Organization", "name": "FLOXANT", "logo": { "@type": "ImageObject", "url": "https://www.floxant.de/logo_v10.png" } },
    "datePublished": "2026-03-01",
    "dateModified": "2026-03-08",
  };
  return (
    <main className="min-h-screen bg-background">
      <Breadcrumbs lang="de" items={[{ label: "Ratgeber", href: `/ratgeber` }, { label: "Möbeltransport sicher organisieren" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="pt-8 pb-12 px-6 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-sm font-medium text-primary">FLOXANT Ratgeber</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Möbeltransport sicher organisieren</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Ihre Möbel sind wertvoll – emotional und finanziell. Erfahren Sie, wie der sichere Transport gelingt.</p>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Richtig verpacken</h2>
            <p className="text-muted-foreground leading-relaxed">Demontierbare Möbel auseinanderbauen und Schrauben in beschrifteten Beuteln aufbewahren. Polstermöbel mit Decken umwickeln, Glastüren mit Luftpolsterfolie schützen.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Sicherer Transport</h2>
            <p className="text-muted-foreground leading-relaxed">Ladungssicherung im Transporter mit Gurten und Antirutschmatten. Schwere Stücke zuerst laden, zerbrechliche Teile oben und fixiert.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Versicherung</h2>
            <p className="text-muted-foreground leading-relaxed">Prüfen Sie die Transportversicherung Ihrer Umzugsfirma. FLOXANT bietet vollen Versicherungsschutz für Ihr Mobiliar während des gesamten Transports.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">{dict.common.faq_title}</h2>
            <div className="space-y-4">
              {[
              { q: "Wie werden Möbel beim Umzug geschützt?", a: "Durch fachgerechte Demontage, Polsterung, Verpackung und Ladungssicherung." },
              { q: "Was passiert bei Transportschäden?", a: "FLOXANT ist voll versichert. Schäden werden dokumentiert und reguliert." }
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


