import { Metadata } from "next";
import { getDictionary } from "@/get-dictionary";
import { type Locale } from "@/i18n-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { generatePageSEO } from "@/lib/seo";
import { AlertTriangle, Phone, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { SmartBookingWizard } from "@/components/SmartBookingWizard";
import { FaqSection } from "@/components/FaqSection";
export async function generateMetadata(): Promise<Metadata> {
  const pageLocale: Locale = "de";
  return generatePageSEO({
    pageLocale,
    path: "notfall-umzug-bayern",
    title: "Dringender Umzug Bayern: sicheren nächsten Schritt prüfen",
    description: "Dringenden Umzugsbedarf mit Ort, Ursache, sicherem Zugang, Umfang, Fotos und Frist schildern. FLOXANT prüft Machbarkeit und Kapazität ohne Sofortzusage.",
  });
}
export default async function NotfallUmzugBayern() {
  const pageLocale: Locale = "de";
  const dict = await getDictionary("de");
  const isDe = pageLocale === "de";
  const breadcrumbs = [
    { label: "Umzug Bayern", href: `/umzug-bayern` },
    { label: "Notfall-Umzug" }
  ];
  const faqItems = [
    {
      q: "Ist bei einer dringenden Anfrage sofort ein Team verfügbar?",
      a: "Nein. Ort, Ursache, sichere Zugänglichkeit, Umfang, Fahrzeug und Kapazität müssen geprüft werden. Eine Anfrage ist noch keine Terminbestätigung.",
    },
    {
      q: "Was gilt bei Brand, Wasser oder möglicher Gefahr?",
      a: "Behördliche, technische oder sicherheitsbezogene Freigaben gehen vor. FLOXANT übernimmt keine Gefahrenbeurteilung und plant Transport erst, wenn ein sicherer Zugang bestätigt ist.",
    },
    {
      q: "Welche Angaben braucht FLOXANT zuerst?",
      a: "Ort, Frist, Ursache, sicherer Zugang, grober Umfang, Etagen, Aufzug, Fotos ohne unnötige persönliche Daten und ein erreichbarer Kontakt helfen bei der Prüfung.",
    },
    {
      q: "Übernimmt FLOXANT rechtliche oder behördliche Schritte?",
      a: "Nein. FLOXANT kann einen praktischen Transport- oder Räumungsbedarf prüfen, ersetzt aber keine Rechtsberatung, Behörde, Feuerwehr, Versicherung oder technische Fachstelle.",
    },
  ];
  return (
    <main className="min-h-screen bg-background text-start font-sans">
      <Breadcrumbs lang="de" items={breadcrumbs} />
      <section className="pt-8 pb-20 px-6 bg-gradient-to-b from-red-50 to-background dark:from-red-950/10">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-600 text-sm font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>Dringende Anfrage</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Notfall-Umzug in <span className="text-primary">Bayern</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Bei Wasserschaden, Brandfolge oder persönlicher Krise kann ein schneller Ortswechsel
            nötig werden. FLOXANT prüft den praktischen Transportbedarf, sobald sichere Zugänge,
            Umfang, Ort und Frist geklärt sind. Daraus entsteht keine automatische Sofortzusage.
          </p>
          <a href="tel:+4915771105087" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            <Phone className="w-5 h-5" /> +49 1577 1105087
          </a>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-24">
          <div className="prose prose-lg max-w-none text-muted-foreground text-start">
            <h2 className="text-3xl font-bold text-foreground mb-6">Wenn jede Stunde zählt</h2>
            <p>
              Dringende Situationen dürfen nicht zu unklaren Sicherheitsannahmen führen. Bei
              Feuer, Wasser, Schadstoffen oder behördlichen Maßnahmen müssen die zuständigen
              Stellen den Zugang und die weitere Nutzung zuerst klären. FLOXANT ersetzt diese Prüfung nicht.
            </p>
            <p>
              Für die anschließende Transportprüfung helfen Ort, Frist, Umfang, Fotos, Etagen,
              Aufzug, Laufwege und eine bestätigte Kontaktperson. Zwischenlagerung oder weitere
              Leistungen werden nur berücksichtigt, wenn sie im konkreten Fall verfügbar und vereinbart sind.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-start">Notfall-Szenarien & Unterstützung</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Wasserschaden / Brand",
                  desc: "Transport erst nach bestätigtem sicheren Zugang; Umfang, sensible Gegenstände und mögliche Zwischenlagerung separat prüfen."
                },
                {
                  title: "Räumungsklage",
                  desc: "Kurzfristige Räumung nach Prüfung von Umfang, Zugang, Termin und rechtlichen Zuständigkeiten."
                },
                {
                  title: "Familiäre Notfälle",
                  desc: "Einen diskreten Transportbedarf mit möglichst wenigen notwendigen persönlichen Angaben schildern."
                },
                {
                  title: "Akute Wohnungsprobleme",
                  desc: "Nach Freigabe von Zugang und Sicherheit einen möglichen Auszug und Transport prüfen lassen."
                },
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-3xl bg-muted/10 border border-border/50 text-start">
                  <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          {isDe && (
            <div className="border-t border-border pt-12 text-start">
              <h3 className="text-lg font-semibold mb-6">Verwandte Leistungen</h3>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/24h-umzug-bayern`}
                  className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all font-sans"
                >
                  Kurzfristigen Umzug anfragen
                </Link>
                <Link
                  href={`/kurzfristiger-umzug-bayern`}
                  className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all font-sans"
                >
                  Kurzfristiger Umzug
                </Link>
                <Link
                  href={`/umzug-bayern`}
                  className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all font-sans"
                >
                  Umzug Bayern
                </Link>
                <Link
                  href={`/entruempelung-bayern`}
                  className="px-5 py-2.5 rounded-full border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all font-sans"
                >
                  Entrümpelung Bayern
                </Link>
              </div>
            </div>
          )}
          <FaqSection
            title="Häufige Fragen bei dringendem Umzugsbedarf"
            intro="Sicherheit und realistische Machbarkeit gehen einer Terminannahme vor."
            items={faqItems}
            includeJsonLd
          />
          <div id="rechner" className="bg-slate-900 py-24 px-6 rounded-[3rem] relative overflow-hidden border border-white/5 shadow-2xl scroll-mt-24">
            {/* Premium Background Ambient Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
              <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-violet-600/20 blur-[120px] rounded-full animate-pulse" />
              <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </div>
            <div className="max-w-4xl mx-auto relative z-10 text-center">
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Notfall-Umzug anfragen</h2>
              <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto">
                Geben Sie uns die wichtigsten Details durch. Wir reagieren schnellstmöglich und erstellen eine erste belastbare Einschätzung.
              </p>
              {/* The Premium Glass Container */}
              <div className="relative group text-start">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-[#0A0C10] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-sm p-4 md:p-8">
                  <SmartBookingWizard
                    dict={{
                      common: dict.common as any,
                      calculator: (dict as any).calculator,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
