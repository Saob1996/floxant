import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = {
 width: 1200,
 height: 630,
};

const imageProfiles: Record<
 string,
 {
  eyebrow: string;
  title: string;
  subtitle: string;
  chips: string[];
  accent: string;
 }
> = {
 floxant: {
  eyebrow: "Regensburg + Bayern",
  title: "Umzug, Reinigung und Entrümpelung klar geplant.",
  subtitle: "FLOXANT verbindet Vorprüfung, Preisrahmen und Umsetzung ohne Lockpreis-Versprechen.",
  chips: ["Rechner", "Preisrahmen", "Spezialservices"],
  accent: "#60a5fa",
 },
 rechner: {
  eyebrow: "FLOXANT Rechner",
  title: "Orientierungsrahmen statt künstlicher Exaktheit.",
  subtitle: "Umzug, Reinigung, Entrümpelung und Büroumzug mit sichtbaren Kostentreibern.",
  chips: ["Unverbindlich", "Vorprüfung", "Preisvorstellung"],
  accent: "#38bdf8",
 },
 buchung: {
  eyebrow: "Buchung Regensburg",
  title: "Direkt anfragen. Klar starten. Ohne Umwege.",
  subtitle: "Google-Maps-tauglicher Einstieg für Rechner, Express-Check, Preisvorschlag und Kontakt.",
  chips: ["Buchung", "Google Maps", "Anfrage"],
  accent: "#60a5fa",
 },
 umzug: {
  eyebrow: "Umzug Regensburg + Bayern",
  title: "Umzug mit klarer Planung und starkem Ablauf.",
  subtitle: "Volumen, Strecke, Zugang, Montage und Zusatzleistungen sauber einordnen.",
  chips: ["Privatumzug", "Firmenumzug", "Beiladung"],
  accent: "#3b82f6",
 },
 reinigung: {
  eyebrow: "Reinigung Regensburg + Bayern",
  title: "Reinigung für Übergabe, Objekt und Neustart.",
  subtitle: "Fläche, Zustand, Fenster, Küche, Bad und Terminlage realistisch prüfen.",
  chips: ["Endreinigung", "Übergabe", "Objektservice"],
  accent: "#22d3ee",
 },
 entruempelung: {
  eyebrow: "Entrümpelung Regensburg + Bayern",
  title: "Räumung, Entsorgung und Übergabe ohne Chaos.",
  subtitle: "Volumen, Materialarten, Laufwege und Demontage sauber vorprüfen.",
  chips: ["Räumung", "Entsorgung", "Wohnungsauflösung"],
  accent: "#34d399",
 },
 bueroumzug: {
  eyebrow: "Büroumzug + Firmenumzug",
  title: "Büros verlagern, Betrieb planbar halten.",
  subtitle: "Arbeitsplätze, IT, Archiv, Zeitfenster und Firmenentsorgung im Blick.",
  chips: ["Arbeitsplätze", "IT & Archiv", "Zeitfenster"],
  accent: "#818cf8",
 },
 firmenentsorgung: {
  eyebrow: "Firmenentsorgung",
  title: "Büroinventar und Gewerbemengen sauber abholen lassen.",
  subtitle: "Für Firmen, Praxen, Kanzleien und Büros ohne Sonderabfall-Risiko.",
  chips: ["Büroinventar", "Möbel", "Gewerbe"],
  accent: "#f59e0b",
 },
 "leerfahrt-rueckfahrt": {
  eyebrow: "Leer-Rückfahrt Richtung Regensburg",
  title: "Freie Rückfahrt fair für Transport nutzen.",
  subtitle: "Möbel, Kartons, Büroinventar oder Teilmengen mit passender Route mitnehmen lassen.",
  chips: ["Datum", "Route", "Faire Beiladung"],
  accent: "#fbbf24",
 },
 "private-client-service": {
  eyebrow: "Private Client",
  title: "Diskreter Service für Anwesen und hochwertige Haushalte.",
  subtitle: "Umzug, Reinigung und Räumung mit ruhiger Abstimmung in Bayern und Baden-Württemberg.",
  chips: ["Diskretion", "Anwesen", "Hochwertig"],
  accent: "#d6b56d",
 },
 "service-area-bayern": {
  eyebrow: "Servicegebiet Bayern",
  title: "FLOXANT ab Regensburg in Bayern einordnen.",
  subtitle: "Region, Strecke, Terminlage und Leistung realistisch prüfen.",
  chips: ["Regensburg", "Bayern", "Einsatzgebiet"],
  accent: "#60a5fa",
 },
 "qualitaet-ablauf": {
  eyebrow: "Qualität und Ablauf",
  title: "Erst sauber prüfen, dann stark umsetzen.",
  subtitle: "Vorprüfung, Preisrahmen, Kommunikation und Abschluss verständlich erklärt.",
  chips: ["Sorgfalt", "Transparenz", "Planung"],
  accent: "#93c5fd",
 },
 praxisfaelle: {
  eyebrow: "Praxisfälle",
  title: "Typische Situationen. Klare Servicewege.",
  subtitle: "Umzug, Reinigung, Entrümpelung, Büroumzug und Leer-Rückfahrt richtig einordnen.",
  chips: ["Entscheidung", "Serviceweg", "Regensburg"],
  accent: "#38bdf8",
 },
 kostenfaktoren: {
  eyebrow: "Kostenfaktoren",
  title: "Preisrahmen verstehen, bevor die Anfrage startet.",
  subtitle: "Volumen, Fläche, Zugang, Terminlage und Extras je Service realistisch einordnen.",
  chips: ["Preisrahmen", "Kostentreiber", "Vorprüfung"],
  accent: "#60a5fa",
 },
 "leistungen-vergleichen": {
  eyebrow: "Service-Kompass",
  title: "Den passenden FLOXANT Service schneller finden.",
  subtitle: "Umzug, Reinigung, Entrümpelung, Büroumzug und Spezialservices klar vergleichen.",
  chips: ["Vergleich", "Servicewahl", "Regensburg"],
  accent: "#38bdf8",
 },
 "anbieter-vergleichen": {
  eyebrow: "Anbieter vergleichen",
  title: "Preis, Ablauf und Serviceklarheit richtig prüfen.",
  subtitle: "FLOXANT transparent gegen andere Dienstleister in Regensburg und Bayern einordnen.",
  chips: ["Preiswahrheit", "Ablauf", "Kriterien"],
  accent: "#60a5fa",
 },
 "buchung-ablauf": {
  eyebrow: "Buchung und Ablauf",
  title: "Direkt rechnen. Anfrage sauber vorbereiten.",
  subtitle: "Von Vorprüfung über Angebot bis Auftragsbestätigung und Rechnung klar geführt.",
  chips: ["Rechner", "Angebot", "Dokumente"],
  accent: "#38bdf8",
 },
 kontakt: {
  eyebrow: "Kontakt Regensburg",
  title: "FLOXANT erreichen und Anfrage richtig starten.",
  subtitle: "Telefon, WhatsApp, E-Mail, Standort und direkter Rechner für klare nächste Schritte.",
  chips: ["Kontakt", "Regensburg", "Rechner"],
  accent: "#60a5fa",
 },
 "express-anfrage": {
  eyebrow: "Express-Check Regensburg",
  title: "Schnelle Machbarkeit mit wenigen Eckdaten.",
  subtitle: "Für knappe Termine, kurzfristige Räumung, Transport oder schnelle Vorprüfung.",
  chips: ["Kurzformular", "Machbarkeit", "Rückmeldung"],
  accent: "#f59e0b",
 },
 "anfrage-mit-preisrahmen": {
  eyebrow: "Preisvorstellung",
  title: "Eigenes Budget nennen, sauber prüfen lassen.",
  subtitle: "Kundenwunsch und FLOXANT Orientierungsrahmen bleiben getrennt und nachvollziehbar.",
  chips: ["Budget", "Vorprüfung", "Kein Lockpreis"],
  accent: "#60a5fa",
 },
 beiladung: {
  eyebrow: "Beiladung Regensburg",
  title: "Einzelstücke und Teilmengen fair mitnehmen.",
  subtitle: "Möbel, Kartons oder kleinere Mengen prüfen, wenn Route und Zeitfenster passen.",
  chips: ["Teilmengen", "Möbel", "Route"],
  accent: "#34d399",
 },
 "umzug-mit-reinigung": {
  eyebrow: "Umzug + Reinigung",
  title: "Transport und Übergabe zusammen planen.",
  subtitle: "Umzug, Endreinigung, Restmengen und Schlüsselübergabe sauber verbinden.",
  chips: ["Übergabe", "Endreinigung", "Ablauf"],
  accent: "#38bdf8",
 },
 "kleinmengen-entsorgung": {
  eyebrow: "Kleinmengen-Entsorgung",
  title: "Möbel, Kartons und Restmengen sauber abholen.",
  subtitle: "Kleine Entsorgungen in Regensburg und Bayern ohne unnötigen Vollauftrag prüfen.",
  chips: ["Kleinmengen", "Abholung", "Regensburg"],
  accent: "#22d3ee",
 },
};

imageProfiles["leerfahrt-rueckfahrt"] = {
 eyebrow: "Leerfahrt Richtung Regensburg",
 title: "Freier Laderaum. Fairer Rücktransport.",
 subtitle: "Wenn unser Fahrzeug leer zurückfährt, können Möbel, Kartons, Paletten oder Büroinventar mit.",
 chips: ["Leerfahrt", "Rücktransport", "Regensburg"],
 accent: "#34d399",
};

imageProfiles["private-client-service"] = {
 eyebrow: "Private Client Bayern",
 title: "Diskreter Luxusservice für Anwesen.",
 subtitle: "Umzug, Reinigung, Räumung und reguläre Entsorgung für hochwertige Privathaushalte.",
 chips: ["Diskret", "Villen", "Family Office"],
 accent: "#d8b76e",
};

imageProfiles.floxant = {
 eyebrow: "Regensburg + Bayern",
 title: "Direkt buchen oder erst fair rechnen.",
 subtitle: "Umzug, Reinigung, Entrümpelung, Büroumzug und Leer-Rückfahrt ohne anonyme Lead-Runde.",
 chips: ["Buchung", "Rechner", "Direktkontakt"],
 accent: "#60a5fa",
};

imageProfiles.buchung = {
 eyebrow: "FLOXANT Buchung",
 title: "Direkter Buchungslink für Google Maps.",
 subtitle: "Anfrage starten, Express-Check nutzen oder Preisrahmen sauber vorbereiten.",
 chips: ["Google Maps", "Anfrage", "Regensburg"],
 accent: "#60a5fa",
};

imageProfiles["anbieter-vergleichen"] = {
 eyebrow: "Direkt statt Leadbörse",
 title: "FLOXANT gegen Portale richtig vergleichen.",
 subtitle: "Klare Vorprüfung, sichtbare Kostentreiber und Verantwortung statt anonymer Anfrageverteilung.",
 chips: ["Vergleich", "Preiswahrheit", "Ablauf"],
 accent: "#fbbf24",
};

imageProfiles.rechner = {
 eyebrow: "Kostenrahmen Regensburg",
 title: "Erst fair rechnen, dann sicher anfragen.",
 subtitle: "Unverbindlicher Preisrahmen mit sichtbaren Kostentreibern für Umzug, Reinigung und Entrümpelung.",
 chips: ["Preisrahmen", "Kostentreiber", "Ohne Lockpreis"],
 accent: "#38bdf8",
};

imageProfiles.umzug = {
 eyebrow: "Umzug Regensburg",
 title: "Direkt anfragen statt anonym vergleichen.",
 subtitle: "Volumen, Strecke, Zugang, Montage und Terminlage sauber vorprüfen lassen.",
 chips: ["Umzug", "Regensburg", "Bayern"],
 accent: "#3b82f6",
};

imageProfiles.reinigung = {
 eyebrow: "Reinigung Regensburg",
 title: "Endreinigung und Übergabe klar vorbereiten.",
 subtitle: "Fläche, Zustand, Küche, Bad, Fenster und Termin realistisch einordnen.",
 chips: ["Endreinigung", "Übergabe", "Objekt"],
 accent: "#22d3ee",
};

imageProfiles.entruempelung = {
 eyebrow: "Entrümpelung Regensburg",
 title: "Räumung ohne Chaos sauber planen.",
 subtitle: "Volumen, Material, Zugang, Laufwege und Entsorgung vor der Anfrage klären.",
 chips: ["Räumung", "Entsorgung", "Wohnung"],
 accent: "#34d399",
};

imageProfiles["qualitaet-ablauf"] = {
 eyebrow: "Qualität & Ablauf",
 title: "Vorprüfung, Auftrag und Dokumente klar verbunden.",
 subtitle: "So erkennt der Kunde vor der Anfrage, wie FLOXANT sauber arbeitet.",
 chips: ["Ablauf", "Vertrauen", "Dokumente"],
 accent: "#93c5fd",
};

imageProfiles.kostenfaktoren = {
 eyebrow: "Kosten verstehen",
 title: "Preisrahmen ohne Lockpreis-Falle.",
 subtitle: "Volumen, Fläche, Zugang, Strecke, Termin und Extras richtig einordnen.",
 chips: ["Kosten", "Planung", "Klarheit"],
 accent: "#60a5fa",
};

imageProfiles["leistungen-vergleichen"] = {
 eyebrow: "Service-Kompass",
 title: "Schnell den richtigen FLOXANT Service finden.",
 subtitle: "Umzug, Reinigung, Entrümpelung, Büroumzug, Leer-Rückfahrt und Private Client vergleichen.",
 chips: ["Servicewahl", "Regensburg", "Bayern"],
 accent: "#38bdf8",
};

function normalizeSlug(value: string) {
 if (value in imageProfiles) return value;
 if (value.startsWith("umzug-")) return "umzug";
 if (value.startsWith("reinigung-")) return "reinigung";
 if (value.startsWith("entruempelung-")) return "entruempelung";
 if (value.startsWith("bueroumzug-")) return "bueroumzug";
 return "floxant";
}

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
 const { slug } = await context.params;
 const profile = imageProfiles[normalizeSlug(slug)];

 return new ImageResponse(
  (
   <div
    style={{
     width: "100%",
     height: "100%",
     display: "flex",
     flexDirection: "column",
     justifyContent: "space-between",
     padding: 64,
     color: "white",
     background:
      "radial-gradient(circle at 76% 10%, rgba(96,165,250,0.28), transparent 32%), linear-gradient(135deg, #05070d 0%, #0b1020 54%, #111827 100%)",
     fontFamily: "Arial, sans-serif",
     position: "relative",
     overflow: "hidden",
    }}
   >
    <div
     style={{
      position: "absolute",
      inset: 0,
      opacity: 0.16,
      backgroundImage:
       "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
      backgroundSize: "58px 58px",
     }}
    />
    <div
     style={{
      position: "absolute",
      right: -70,
      bottom: -90,
      width: 410,
      height: 410,
      borderRadius: 999,
      border: `2px solid ${profile.accent}55`,
      boxShadow: `0 0 120px ${profile.accent}33`,
     }}
    />

    <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
     <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <div
       style={{
        width: 64,
        height: 64,
        borderRadius: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(145deg, ${profile.accent}, #1d4ed8)`,
        fontSize: 36,
        fontWeight: 900,
        boxShadow: `0 18px 60px ${profile.accent}44`,
       }}
      >
       F
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
       <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: 4 }}>FLOXANT</div>
       <div style={{ fontSize: 15, color: "rgba(255,255,255,0.52)", letterSpacing: 4 }}>
        PREMIUM SERVICES
       </div>
      </div>
     </div>
     <div
      style={{
       border: "1px solid rgba(255,255,255,0.14)",
       borderRadius: 999,
       padding: "14px 22px",
       color: profile.accent,
       fontSize: 18,
       fontWeight: 800,
       background: "rgba(255,255,255,0.045)",
      }}
     >
      {profile.eyebrow}
     </div>
    </div>

    <div style={{ display: "flex", flexDirection: "column", position: "relative", maxWidth: 940 }}>
     <div
      style={{
       color: profile.accent,
       fontSize: 20,
       fontWeight: 900,
       letterSpacing: 4,
       textTransform: "uppercase",
       marginBottom: 24,
      }}
     >
      Klarheit vor Auftrag
     </div>
     <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1, letterSpacing: -3 }}>
      {profile.title}
     </div>
     <div style={{ marginTop: 28, fontSize: 29, lineHeight: 1.35, color: "rgba(255,255,255,0.66)" }}>
      {profile.subtitle}
     </div>
    </div>

    <div style={{ display: "flex", gap: 14, position: "relative", flexWrap: "wrap" }}>
     {profile.chips.map((label) => (
      <div
       key={label}
       style={{
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 18,
        padding: "14px 18px",
        background: "rgba(255,255,255,0.052)",
        color: "rgba(255,255,255,0.78)",
        fontSize: 18,
        fontWeight: 800,
       }}
      >
       {label}
      </div>
     ))}
    </div>
   </div>
  ),
  size
 );
}
