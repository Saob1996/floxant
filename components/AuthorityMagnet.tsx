import Link from "next/link";
import { Activity, ArrowRight, Banknote, CheckCircle2, ClipboardCheck, MapPin, PhoneCall, Search, Share2 } from "lucide-react";

import { company } from "@/lib/company";
import { germanText } from "@/lib/german-text";
import { applyCity } from "@/lib/specialty-page";

interface AuthorityMagnetProps {
  city: string;
  region?: string;
  showNAP?: boolean;
  dic: any;
}

export function AuthorityMagnet({ city, region = "Bayern", showNAP = true, dic }: AuthorityMagnetProps) {
  const am = dic?.authority_magnet;

  const t = (text: string | undefined, fallback: string) => {
    if (!text) return germanText(fallback, fallback);
    return germanText(applyCity(text, city).replace(/{region}/g, region), fallback);
  };

  const planningSignals = [
    {
      title: t(am?.services?.family?.title, "Privatumzug mit sauberer Vorplanung"),
      desc: t(
        am?.services?.family?.desc,
        `Für ${city} prüfen wir Zugang, Volumen, Strecke und mögliche Zusatzleistungen früh, damit der Ablauf später ruhig bleibt.`,
      ),
    },
    {
      title: t(am?.services?.commercial?.title, "Firmenprojekt mit klarem Zeitfenster"),
      desc: t(
        am?.services?.commercial?.desc,
        `Gerade bei Firmen, Praxis oder Büro zählen in ${city} klare Übergänge, IT-Sicherheit und eine nachvollziehbare Terminführung.`,
      ),
    },
    {
      title: t(am?.services?.clearance?.title, "Räumung oder Entsorgung realistisch eingeordnet"),
      desc: t(
        am?.services?.clearance?.desc,
        "Materialarten, Laufwege und Abtransport werden vorab sichtbar gemacht, statt erst später unklar zu werden.",
      ),
    },
  ];

  const usefulHints = [
    {
      title: t(am?.useful?.no_parking?.title, "Zugang früh klären"),
      desc: t(
        am?.useful?.no_parking?.desc,
        `Wenn in ${city} enge Zufahrten oder knappe Ladezonen zu erwarten sind, spart eine frühe Klärung später viel Hektik.`,
      ),
    },
    {
      title: t(am?.useful?.registration?.title, "Behörden und Übergaben mitdenken"),
      desc: t(
        am?.useful?.registration?.desc,
        "Gerade bei Wohnungswechsel, Firmenfläche oder Objektübergabe hilft ein sauberer Ablaufplan mit allen Fristen.",
      ),
    },
    {
      title: t(am?.useful?.insurance?.title, "Haftung und sensible Werte einordnen"),
      desc: t(
        am?.useful?.insurance?.desc,
        "Bei wertvollem Inventar, Technik oder Spezialmöbeln sollte die Absicherung früh angesprochen werden.",
      ),
    },
  ];
  const authorityActions = [
    {
      title: "Anfrage strukturiert starten",
      desc: `Für ${city}, wenn Leistung, Ort und Termin schon grob feststehen.`,
      href: "/buchung",
      icon: ClipboardCheck,
      tone: "bg-blue-50 text-blue-700",
    },
    {
      title: "Preisrahmen nennen",
      desc: "Für Projekte, bei denen Budget und Machbarkeit gemeinsam eingeordnet werden sollen.",
      href: "/anfrage-mit-preisrahmen",
      icon: Banknote,
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Kontakt direkt klären",
      desc: "Für Rückfragen, Fotos, Sonderfälle oder schnelle Abstimmung vor der Planung.",
      href: "/kontakt",
      icon: PhoneCall,
      tone: "bg-amber-50 text-amber-700",
    },
  ];
  const localProofPoints = [
    `Regensburg als Kontakt- und Planungsbasis`,
    `${city} als sichtbares Einsatzgebiet`,
    `${region} als regionaler Such- und Servicekontext`,
  ];

  return (
    <section className="section-glow relative px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
          <div className="glass-elevated rounded-[1.8rem] px-7 py-7 md:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm shadow-slate-950/5">
              <Activity className="h-4 w-4" />
              {t(am?.title, `Lokale Stärke in ${city}`)}
            </div>
            <h2 className="mt-6 text-[2.2rem] font-bold tracking-tight text-slate-950 md:text-[2.7rem]">
              {t(am?.subtitle, `Für ${city} und ${region} nachvollziehbar geplant.`)}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-700">
              {t(
                am?.search_desc,
                `Wer in ${city} nicht nur irgendeinen Dienstleister, sondern einen planbaren Partner sucht, braucht klare lokale Signale: echte Kontaktwege, klare Zuständigkeiten und nachvollziehbare Leistungen.`,
              )}
            </p>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {planningSignals.map((signal) => (
                <div key={signal.title} className="card-premium rounded-[1.2rem] p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-blue-50 text-blue-700">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-[1.08rem] font-bold tracking-tight text-slate-950">{signal.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{signal.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-premium rounded-[1.8rem] px-7 py-7 md:px-8">
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
              <Search className="h-4 w-4" />
              {t(am?.search_title, 'Gezielt nach "FLOXANT Erfahrungen" suchen')}
            </div>
            <p className="mt-5 text-base leading-7 text-slate-700">
              {t(
                am?.search_desc,
                `Wenn Kunden aus ${city} oder dem Umland nach FLOXANT suchen, sollen sie direkt sehen: klare Buchungswege, klare Kontaktpunkte und ein Unternehmen aus Regensburg mit Fokus auf Bayern.`,
              )}
            </p>

            {showNAP ? (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="card-premium rounded-[1.2rem] p-5">
                  <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                    <MapPin className="h-4 w-4" />
                    Zentrale Kontaktbasis
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-lg font-bold text-slate-950">{company.name}</p>
                    <p className="text-sm leading-7 text-slate-700">
                      {germanText(company.streetAddress, company.streetAddress)}
                      <br />
                      {company.postalCode} {germanText(company.city, company.city)}
                      <br />
                      {germanText(company.country, company.country)}
                    </p>
                    <p className="pt-2 text-sm leading-7 text-slate-700">
                      Einsatzgebiet: {germanText(city, city)} / {germanText(region, region)}
                    </p>
                  </div>
                </div>

                <div className="card-premium rounded-[1.2rem] p-5">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                    Direktkontakt
                  </div>
                  <div className="mt-4 space-y-2">
                    <a href={`tel:${company.phoneRaw}`} className="block text-lg font-bold text-slate-950 hover:text-blue-700">
                      {company.phone}
                    </a>
                    <p className="text-sm leading-7 text-slate-700">{company.email}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

          <div className="rounded-[1.8rem] border border-slate-200 bg-white/96 px-7 py-7 shadow-[0_20px_48px_rgba(15,23,42,0.06)] md:px-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                <Share2 className="h-4 w-4" />
                {t(am?.useful_title, `Wissenswertes für ${city}`)}
              </div>
              <h3 className="mt-4 text-[2rem] font-bold tracking-tight text-slate-950">
                Klare Hinweise, die den nächsten Schritt leichter machen.
              </h3>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {usefulHints.map((hint) => (
              <article key={hint.title} className="card-premium rounded-[1.25rem] p-6">
                <h4 className="text-lg font-bold tracking-tight text-slate-950">{hint.title}</h4>
                <p className="mt-3 text-sm leading-7 text-slate-700">{hint.desc}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-slate-200 bg-slate-50/90 px-7 py-7 shadow-[0_20px_48px_rgba(15,23,42,0.05)] md:px-8">
          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                <CheckCircle2 className="h-4 w-4" />
                Lokale Vertrauenssignale
              </div>
              <h3 className="mt-4 text-[2rem] font-bold tracking-tight text-slate-950">
                Warum FLOXANT für {germanText(city, city)} klar zuordenbar bleibt.
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-700">
                Gute lokale Seiten brauchen mehr als Keywords. Sie müssen zeigen, wer erreichbar ist,
                welcher regionale Rahmen gilt und welcher nächste Schritt ohne Umweg möglich ist.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {localProofPoints.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-blue-100 bg-white px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-blue-700"
                  >
                    {germanText(point, point)}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {authorityActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="group rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-950/10"
                  >
                    <div className={`flex h-11 w-11 items-center justify-center rounded-[1rem] ${action.tone}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-5 flex items-center gap-2 text-lg font-bold tracking-tight text-slate-950 transition-colors group-hover:text-blue-700">
                      {action.title}
                      <ArrowRight className="h-4 w-4" />
                    </h4>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{action.desc}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
