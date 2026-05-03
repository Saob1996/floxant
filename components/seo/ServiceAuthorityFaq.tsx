import Link from "next/link";
import { ArrowRight, HelpCircle, ShieldCheck } from "lucide-react";

export type ServiceAuthorityKey =
 | "umzug"
 | "reinigung"
 | "entruempelung"
 | "bueroumzug"
 | "rechner";

type AuthorityFaq = {
 q: string;
 a: string;
};

type AuthorityData = {
 eyebrow: string;
 title: string;
 intro: string;
 faqs: AuthorityFaq[];
 links: Array<{ href: string; label: string }>;
};

export const serviceAuthorityFaqs: Record<ServiceAuthorityKey, AuthorityData> = {
 umzug: {
  eyebrow: "Umzug richtig einordnen",
  title: "Entscheidungsfragen vor einem Umzug",
  intro:
   "Diese Fragen helfen Kunden und Suchsystemen zu verstehen, wann ein Umzug mit FLOXANT sinnvoll ist und welche Angaben vor der Anfrage wirklich zählen.",
  faqs: [
   {
    q: "Warum kalkuliert FLOXANT nicht einfach den billigsten Umzugspreis?",
    a: "Weil ein vorschnell niedriger Preis am Einsatztag oft zu Problemen führt: zu wenig Zeit, zu wenig Fahrzeugkapazität, ungeklärte Laufwege oder Zusatzleistungen. Wir kalkulieren lieber realistisch, damit Durchführung und Erwartung zusammenpassen.",
   },
   {
    q: "Wann ist ein professioneller Umzug sinnvoller als ein Einzeltransport?",
    a: "Ein professioneller Umzug ist sinnvoll, wenn mehrere Faktoren zusammenkommen: Volumen, Etagen, lange Laufwege, Montage, enger Terminplan, empfindliches Inventar oder eine Übergabe mit Reinigung.",
   },
   {
    q: "Welche Angaben verbessern die erste Einschätzung?",
    a: "Hilfreich sind Zimmerzahl, grobes Volumen, Start- und Zielort, Etagen, Aufzug, Laufwege, gewünschter Termin, Montagebedarf und besondere Gegenstände.",
   },
  ],
  links: [
   { href: "/rechner", label: "Umzug im Rechner einordnen" },
   { href: "/umzug-mit-reinigung", label: "Umzug mit Reinigung kombinieren" },
   { href: "/beiladung", label: "Beiladung für kleinere Mengen prüfen" },
   { href: "/qualitaet-ablauf", label: "Qualität und Ablauf verstehen" },
  ],
 },
 reinigung: {
  eyebrow: "Reinigung mit klarem Ziel",
  title: "Entscheidungsfragen vor einer Reinigung",
  intro:
   "Die Reinigung wird besser planbar, wenn Objektart, Zustand, Fläche und Übergabeziel klar beschrieben sind.",
  faqs: [
   {
    q: "Wann ist eine Endreinigung besonders wichtig?",
    a: "Vor Wohnungsübergabe, Wiedervermietung, Verkauf oder nach einem Umzug ist eine strukturierte Endreinigung sinnvoll, weil Ergebnis, Termin und Leistungsumfang klar sein müssen.",
   },
   {
    q: "Welche Kostentreiber zählen bei Reinigung besonders?",
    a: "Entscheidend sind Fläche, Objektart, Zustand, Möblierung, Fenster, Küche, Bad, Sonderflächen und Terminlage.",
   },
   {
    q: "Warum ist eine Wohnungsübergabe mehr als nur Reinigung?",
    a: "Weil bei einer Übergabe nicht nur Sauberkeit zählt. Auch Restgegenstände, Schlüssel, Zustand, Fotos, Zeitfenster und Kommunikation mit Vermieter oder Hausverwaltung können entscheidend sein.",
   },
  ],
  links: [
   { href: "/rechner", label: "Reinigung im Rechner einordnen" },
   { href: "/umzug-mit-reinigung", label: "Umzug und Reinigung zusammen planen" },
   { href: "/blog/endreinigung-regensburg-checkliste", label: "Endreinigung-Checkliste lesen" },
   { href: "/qualitaet-ablauf", label: "Ablauf und Sorgfalt prüfen" },
  ],
 },
 entruempelung: {
  eyebrow: "Räumung ohne Chaos",
  title: "Entscheidungsfragen vor einer Entrümpelung",
  intro:
   "Bei Entrümpelung zählen Volumen, Materialarten, Zugang und Entsorgungsweg stärker als bei einem einfachen Transport.",
  faqs: [
   {
    q: "Wann ist eine Entrümpelung mehr als Sperrmüllabholung?",
    a: "Sobald Sortierung, Demontage, Tragearbeit, mehrere Räume, Keller, Nachlass, Gewerbeflächen oder besenreine Übergabe nötig sind, wird eine strukturierte Entrümpelung sinnvoll.",
   },
   {
    q: "Welche Angaben braucht FLOXANT für eine erste Einschätzung?",
    a: "Wichtig sind Räume, geschätztes Volumen, Materialarten, Etagen, Aufzug, Laufwege, Demontagebedarf, Dringlichkeit und ob Sonderabfälle ausgeschlossen sind.",
   },
   {
    q: "Was bedeutet Entrümpelung im Übergabeprozess?",
    a: "Entrümpelung bedeutet nicht nur Wegtragen. Es geht darum, Räume wieder entscheidbar zu machen: trennen, tragen, entsorgen und die Fläche so hinterlassen, dass der nächste Schritt möglich wird.",
   },
  ],
  links: [
   { href: "/rechner", label: "Entrümpelung im Rechner einordnen" },
   { href: "/kleinmengen-entsorgung", label: "Kleinmengen-Entsorgung prüfen" },
   { href: "/firmenentsorgung", label: "Firmenentsorgung für Büroinventar" },
   { href: "/blog/wohnungsaufloesung-was-tun", label: "Wohnungsauflösung vorbereiten" },
  ],
 },
 bueroumzug: {
  eyebrow: "Firmenumzug planbar machen",
  title: "Entscheidungsfragen vor einem Büroumzug",
  intro:
   "Beim Büroumzug geht es nicht nur um Möbel, sondern um Arbeitsplätze, Zeitfenster, Betriebsruhe und klare Verantwortung.",
  faqs: [
   {
    q: "Welche Faktoren sind beim Büroumzug wichtiger als beim Privatumzug?",
    a: "Arbeitsplätze, IT, Archiv, sensible Unterlagen, Zeitfenster, Ladezonen, Etagen, Abstimmung mit Mitarbeitenden und möglichst geringe Betriebsunterbrechung.",
   },
   {
    q: "Wann sollte eine Firma früher anfragen?",
    a: "Sobald mehrere Arbeitsplätze, IT, Archiv, Etagenwechsel, Wochenendfenster oder enge Übergabetermine betroffen sind, sollte die Einschätzung früh starten.",
   },
   {
    q: "Kann Büroumzug mit Firmenentsorgung kombiniert werden?",
    a: "Ja, wenn altes Büroinventar, Möbel, Kartons oder nicht mehr benötigte Gegenstände gleichzeitig abgeholt und eingeordnet werden sollen.",
   },
  ],
  links: [
   { href: "/rechner", label: "Büroumzug im Rechner vorbereiten" },
   { href: "/firmenentsorgung", label: "Firmenentsorgung ergänzen" },
   { href: "/leerfahrt-rueckfahrt", label: "Leer-Rückfahrt für Firmen nutzen" },
   { href: "/blog/bueroumzug-regensburg-kostenfaktoren-checkliste", label: "Büroumzug-Checkliste lesen" },
  ],
 },
 rechner: {
  eyebrow: "Preiswahrheit",
  title: "Was der Rechner leisten soll und was nicht",
  intro:
   "Der FLOXANT Rechner ist ein strukturierter Einstieg in die Einschätzung. Er soll Klarheit schaffen, ohne einen scheinbar sicheren Endpreis zu versprechen.",
  faqs: [
   {
    q: "Ist der Rechnerpreis verbindlich?",
    a: "Nein. Der Rechner dient als Orientierung. Verbindlich wird ein Auftrag erst nach Prüfung der Angaben und schriftlicher Bestätigung.",
   },
   {
    q: "Was verbessert die Qualität der Einschätzung?",
    a: "Je genauer Service, Ort, Umfang, Etagen, Aufzug, Zusatzleistungen, Terminwunsch und Preisvorstellung angegeben werden, desto nutzbarer wird die Einschätzung.",
   },
   {
    q: "Warum zeigt FLOXANT Orientierung statt vorschneller Preiszusage?",
    a: "Vorschnell niedrige Preise helfen niemandem, wenn am Einsatztag ein Fahrzeug, Team oder Zeitfenster fehlt. Der Rechner macht Kostentreiber sichtbar und führt danach in die realistische Einordnung.",
   },
  ],
  links: [
   { href: "/anfrage-mit-preisrahmen", label: "Preisvorstellung senden" },
   { href: "/express-anfrage", label: "Express-Check mit wenigen Angaben" },
   { href: "/blog/preisrahmen-vorpruefung-statt-festpreis", label: "Preisrahmen verstehen" },
   { href: "/qualitaet-ablauf", label: "Warum Einschätzung wichtig ist" },
  ],
 },
};

export function getServiceAuthorityFaqs(service: ServiceAuthorityKey) {
 return serviceAuthorityFaqs[service].faqs;
}

export function ServiceAuthorityFaq({ service }: { service: ServiceAuthorityKey }) {
 const data = serviceAuthorityFaqs[service];

 return (
  <section className="relative overflow-hidden border-t border-blue-100 bg-white px-6 py-20">
   <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent" />
   <div className="mx-auto max-w-6xl">
    <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
     <div>
      <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
       <ShieldCheck className="h-4 w-4" />
       {data.eyebrow}
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
       {data.title}
      </h2>
     </div>
     <p className="max-w-2xl text-lg leading-relaxed text-slate-600 lg:ml-auto">
      {data.intro}
     </p>
    </div>

    <div className="grid gap-5 lg:grid-cols-3">
     {data.faqs.map((item, index) => (
      <details
       key={item.q}
       open={index === 0}
       className="group rounded-[2rem] border border-slate-200 bg-[#f8fbff] p-7 shadow-sm"
      >
       <HelpCircle className="mb-5 h-6 w-6 text-blue-600" />
       <summary className="cursor-pointer list-none text-xl font-semibold leading-snug text-slate-950">
        <span className="flex items-start justify-between gap-4">
         <span>{item.q}</span>
         <span className="text-xl leading-none text-blue-700 transition-transform group-open:rotate-45">
          +
         </span>
        </span>
       </summary>
       <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.a}</p>
      </details>
     ))}
    </div>

    <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
     {data.links.map((link) => (
      <Link
       key={link.href}
       href={link.href}
       className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
      >
       {link.label}
       <ArrowRight className="h-4 w-4 text-blue-700 transition-transform group-hover:translate-x-1" />
      </Link>
     ))}
    </div>

    <div className="mt-8 grid gap-4 rounded-[2rem] border border-blue-100 bg-[#f8fbff] p-5 shadow-sm md:grid-cols-[1fr_auto_auto] md:items-center">
     <p className="text-sm leading-relaxed text-slate-600">
      Nach den Entscheidungsfragen führt der beste nächste Schritt in eine strukturierte Anfrage oder in eine kurze Rückfrage. So bleibt aus SEO-Sicht nicht nur die Antwort sichtbar, sondern auch der passende Anschluss.
     </p>
     <Link
      href="/buchung"
      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-sm hover:bg-blue-500"
     >
      Anfrage starten
      <ArrowRight className="h-3.5 w-3.5" />
     </Link>
     <Link
      href="/kontakt"
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-700 hover:border-blue-200 hover:text-blue-700"
     >
      Rückfrage klären
     </Link>
    </div>
   </div>
  </section>
 );
}
