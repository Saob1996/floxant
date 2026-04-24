import { MapPin, Activity, Search, Share2, CheckCircle2 } from "lucide-react";
import { applyCity } from "@/lib/specialty-page";

interface AuthorityMagnetProps {
  city: string;
  region?: string;
  showNAP?: boolean;
  dic: any;
}

export function AuthorityMagnet({ city, region = "Bayern", showNAP = true, dic }: AuthorityMagnetProps) {
  const am = dic?.authority_magnet;

  // Helper to safely apply city/region to localized strings
  const t = (text: string | undefined, fallback: string) => {
    if (!text) return fallback;
    let res = applyCity(text, city);
    res = res.replace(/{region}/g, region);
    return res;
  };

  return (
    <section className="py-20 px-6 bg-muted/10 border-y border-border/50">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* VIP / Link Magnet Intro */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <Activity className="w-8 h-8 text-primary" /> 
            {t(am?.title, `Transparenz & Lokale Expertise in ${city}`)}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t(am?.subtitle, `Ein erfolgreicher Projektverlauf benötigt echte Vor-Ort-Kenntnisse. Um Ihnen maximale Transparenz zu bieten, prüfen wir stetig unsere Kapazitäten und dokumentieren unsere logistische Reichweite im Raum ${city}.`)}
          </p>
        </div>

        {/* Phase 2: Local Proof Injection (Simulated Activity) */}
        <div>
          <h3 className="text-2xl font-bold mb-6">{t(am?.activity_title, "Aktuelle Planungs- & Flottenaktivität")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-border/50 bg-card shadow-sm hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <h4 className="font-semibold text-sm">{t(am?.services?.family?.title, "Privatumzug (Familie)")}</h4>
              </div>
              <p className="text-xs text-muted-foreground">{t(am?.services?.family?.desc, `Wird aktuell in ${city} geplant. Beinhaltet Full-Service mit Küchenmontage und Packmaterial-Bereitstellung.`)}</p>
            </div>
            <div className="p-5 rounded-2xl border border-border/50 bg-card shadow-sm hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <h4 className="font-semibold text-sm">{t(am?.services?.commercial?.title, "Firmen-Relocation")}</h4>
              </div>
              <p className="text-xs text-muted-foreground">{t(am?.services?.commercial?.desc, "Kurzfristige Terminierung für ein Gewerbeobjekt. Fokussiert auf sicheren IT-Transport und Akten-Archivierung.")}</p>
            </div>
            <div className="p-5 rounded-2xl border border-border/50 bg-card shadow-sm hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <h4 className="font-semibold text-sm">{t(am?.services?.clearance?.title, "Fachgerechte Räumung")}</h4>
              </div>
              <p className="text-xs text-muted-foreground">{t(am?.services?.clearance?.desc, `Besichtigung in ${city} angemeldet. Zielsetzung: Besenreine Wohnungsauflösung mit zertifizierter Entsorgung.`)}</p>
            </div>
            <div className="p-5 rounded-2xl border border-border/50 bg-card shadow-sm hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <h4 className="font-semibold text-sm">{t(am?.services?.special?.title, "Möbel-Spezialtransport")}</h4>
              </div>
              <p className="text-xs text-muted-foreground">{t(am?.services?.special?.desc, `Turnusmäßige Beiladung über unsere wöchentlichen Routen durch die Region ${region}.`)}</p>
            </div>
          </div>
        </div>

        {/* Phase 4 & 5: Brand Search Triggers & Citation NAP */}
        <div className="bg-gradient-to-br from-card to-background p-8 rounded-3xl border border-primary/10 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" /> 
              {t(am?.search_title, 'Gezielt nach "FLOXANT Erfahrungen" suchen')}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t(am?.search_desc, `Die Wahl des Dienstleisters für Ihren Umzug in ${city} ist absolute Vertrauenssache. Wir empfehlen unseren Kunden, unsere Bewertungen unabhängig zu prüfen. Geben Sie FLOXANT Umzug Erfahrungen in Ihre Suchmaschine ein und überzeugen Sie sich von unserer beständigen Qualität, regionalen Verlässlichkeit und den durchweg positiven Kundenresonanzen.`)}
            </p>
          </div>
          {showNAP && (
            <div className="flex-shrink-0 w-full md:w-[320px] p-5 bg-muted/30 rounded-2xl border border-border/80">
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-3">{t(am?.nap_title, "Zentrale Kontakt-Details (NAP)")}</p>
              <p className="font-bold text-foreground">FLOXANT GmbH</p>
              <p className="text-sm text-muted-foreground mt-1">Johanna-Kinkel-Straße 1 + 2</p>
              <p className="text-sm text-muted-foreground">93049 Regensburg</p>
              <p className="text-sm text-muted-foreground mt-2">{t(am?.nap_operating_area, `Einsatzgebiet: ${city} / ${region}`)}</p>
              <div className="mt-4 pt-4 border-t border-border/50">
                <a href="tel:+4915771105087" className="text-lg font-bold text-primary hover:underline">☎ 0157 71105087</a>
              </div>
            </div>
          )}
        </div>

        {/* Phase 7: Content Shareability */}
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Share2 className="w-6 h-6 text-primary" /> 
            {t(am?.useful_title, `Wissenswertes für Ihren Start in ${city}`)}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-border/50 bg-card p-6 rounded-2xl hover:shadow-md transition-shadow">
              <h4 className="font-bold mb-2">{t(am?.useful?.no_parking?.title, "Halteverbotszonen")}</h4>
              <p className="text-sm text-muted-foreground">
                {t(am?.useful?.no_parking?.desc, `Beantragen Sie (oder wir für Sie) frühzeitig eine amtliche Halteverbotszone beim zuständigen Amt in ${city}. Die Vorlaufzeit sollte idealerweise mind. 14 Tage betragen, um den Behördenweg rechtzeitig abzuschließen.`)}
              </p>
            </div>
            <div className="border border-border/50 bg-card p-6 rounded-2xl hover:shadow-md transition-shadow">
              <h4 className="font-bold mb-2">{t(am?.useful?.registration?.title, "Behörden-Ummeldung")}</h4>
              <p className="text-sm text-muted-foreground">
                {t(am?.useful?.registration?.desc, `Gemäß Bundesmeldegesetz haben Sie nach Bezug der neuen Wohnung 14 Tage Zeit, Ihren Wohnsitz beim Einwohnermeldeamt in ${city} umzumelden. Vergessen Sie nicht die Anmeldung Ihres Fahrzeugs!`)}
              </p>
            </div>
            <div className="border border-border/50 bg-card p-6 rounded-2xl hover:shadow-md transition-shadow">
              <h4 className="font-bold mb-2">{t(am?.useful?.insurance?.title, "Haftung & Versicherung")}</h4>
              <p className="text-sm text-muted-foreground">
                {t(am?.useful?.insurance?.desc, "Ein lizensierter Spediteur haftet nach § 451g HGB mit exakt 620 EUR pro Kubikmeter Ladevolumen. Bei Kunst, Antiquitäten oder hochpreisigem IT-Equipment empfehlen wir den Abschluss einer Transport-Zusatzversicherung.")}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
