import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  ClipboardList,
  Clock3,
  FileSearch,
  Gift,
  Home,
  KeyRound,
  MapPin,
  PackageCheck,
  Route,
  ShieldCheck,
  Sparkles,
  Trash2,
  Truck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export type PublicAuthorityModuleId =
  | "regensburg_core"
  | "regensburg_200km"
  | "bavaria_availability"
  | "photo_check"
  | "budget_check"
  | "move_cleaning_combo"
  | "clear_cleaning_combo"
  | "handover_preparation"
  | "price_umzug"
  | "price_cleaning"
  | "price_clearance"
  | "price_transport"
  | "offer_check"
  | "tenant_turnover"
  | "handover_file"
  | "rental_ready"
  | "damage_control"
  | "cellar_trashroom_rescue"
  | "realtor_landlord_link"
  | "referral_partnercode"
  | "route_board"
  | "empty_return_fit"
  | "premium_discreet"
  | "duesseldorf_cleaning_private"
  | "duesseldorf_cleaning_b2b"
  | "duesseldorf_apartment_cleaning"
  | "duesseldorf_disposal_private"
  | "duesseldorf_disposal_b2b";

type AuthorityModule = {
  badge: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  Icon: LucideIcon;
  event?: string;
  service?: string;
  region?: string;
};

const authorityModules: Record<PublicAuthorityModuleId, AuthorityModule> = {
  regensburg_core: {
    badge: "Lokaler Kern",
    title: "Regensburg ist der Ausgangspunkt",
    text:
      "Viele Anfragen werden schneller klar, wenn Ort, Termin, Zugang und Ziel der Uebergabe von Regensburg aus eingeordnet werden. Bayern bleibt wichtig, aber Regensburg ist der erste Schwerpunkt.",
    href: "/umzug-regensburg",
    cta: "Regensburg-Services ansehen",
    Icon: MapPin,
    region: "regensburg",
  },
  regensburg_200km: {
    badge: "Servicegebiet",
    title: "Regensburg, Umgebung und Bayern sauber einordnen",
    text:
      "FLOXANT arbeitet mit Regensburg als Kern. Orte wie Neutraubling, Lappersdorf, Pentling, Sinzing oder Regenstauf sind Nahbereich; Bayern wird nach Strecke, Termin und Umfang geprueft.",
    href: "/einsatzgebiet-regensburg-200km",
    cta: "Servicegebiet ansehen",
    Icon: Route,
    region: "bayern",
  },
  bavaria_availability: {
    badge: "Bayern",
    title: "Bayern nach Verfuegbarkeit",
    text:
      "Bayern wird nicht als pauschales Versprechen behandelt. FLOXANT prueft Strecke, Kapazitaet, Termin und Leistungsumfang, bevor ein Auftrag zugesagt wird.",
    href: "/service-area-bayern",
    cta: "Bayern-Logik lesen",
    Icon: ShieldCheck,
    region: "bayern",
  },
  photo_check: {
    badge: "Foto-Pruefung",
    title: "Fotos machen Angebote realistischer",
    text:
      "Bilder von Moebeln, Raeumen, Etage, Zugang, Verschmutzung oder Menge sparen Rueckfragen und helfen, Aufwand und Preisrahmen fairer einzuschaetzen.",
    href: "/buchung#buchungssystem",
    cta: "Anfrage mit Fotos starten",
    Icon: Camera,
    event: "upload_images",
  },
  budget_check: {
    badge: "Budget",
    title: "Preisrahmen nennen, ohne Druck",
    text:
      "Ein Budget ist kein Festpreisversprechen. Es hilft, Machbarkeit, Umfang und Alternativen ehrlich einzuordnen, bevor falsche Erwartungen entstehen.",
    href: "/anfrage-mit-preisrahmen",
    cta: "Budget pruefen lassen",
    Icon: Banknote,
    event: "submit_budget_request",
  },
  move_cleaning_combo: {
    badge: "Kombi-Service",
    title: "Umzug und Endreinigung in einem Ablauf",
    text:
      "Wenn Auszug, Transport, Reinigung und Rueckgabe dicht beieinanderliegen, reduziert ein gemeinsamer Ablauf Koordinationsstress vor der Uebergabe.",
    href: "/umzug-mit-reinigung",
    cta: "Kombi-Service ansehen",
    Icon: Sparkles,
    service: "umzug_reinigung",
  },
  clear_cleaning_combo: {
    badge: "Erst leer, dann sauber",
    title: "Entruempelung und Reinigung kombiniert",
    text:
      "Bei Keller, Wohnung, Garage oder Nachlass ist oft nicht nur der Abtransport wichtig. Nach dem Leeren kann die Flaeche fuer Uebergabe, Verkauf oder Nutzung vorbereitet werden.",
    href: "/entruempelung-regensburg",
    cta: "Kombi anfragen",
    Icon: PackageCheck,
    service: "entruempelung",
  },
  handover_preparation: {
    badge: "Uebergabe",
    title: "Wohnungsuebergabe frueh mitdenken",
    text:
      "Bad, Kueche, Boeden, Restgegenstaende, Schluessel und Zeitfenster sollten nicht erst am letzten Tag auffallen. FLOXANT ordnet diese Punkte vorab ein.",
    href: "/blog/wohnungsuebergabe-regensburg-vorbereiten",
    cta: "Uebergabe vorbereiten",
    Icon: KeyRound,
    event: "open_handover_content",
  },
  price_umzug: {
    badge: "Preislogik",
    title: "Was den Umzugspreis beeinflusst",
    text:
      "Strecke, Volumen, Etage, Aufzug, Laufweg, Parken, Datum und Zusatzservices wie Reinigung oder Schluesseluebergabe entscheiden ueber den Aufwand.",
    href: "/blog/umzug-kosten-regensburg",
    cta: "Kostenfaktoren lesen",
    Icon: Truck,
    service: "umzug",
  },
  price_cleaning: {
    badge: "Preislogik",
    title: "Was Reinigung realistisch macht",
    text:
      "Flaeche, Reinigungsart, Zustand, Termin, Fotos und Ziel der Uebergabe bestimmen, ob eine Reinigung sauber kalkuliert werden kann.",
    href: "/reinigung-regensburg#faq",
    cta: "Reinigung einordnen",
    Icon: Sparkles,
    service: "reinigung",
  },
  price_clearance: {
    badge: "Preislogik",
    title: "Was Entruempelung oder Entsorgung beeinflusst",
    text:
      "Menge, Materialart, Etage, Zugang, Laufweg, Fotos und Entsorgungsaufwand bestimmen, wie belastbar ein Angebot werden kann.",
    href: "/entruempelung-regensburg#faq",
    cta: "Aufwand klaeren",
    Icon: Trash2,
    service: "entsorgung",
  },
  price_transport: {
    badge: "Preislogik",
    title: "Transport braucht Strecke, Zugang und Umfang",
    text:
      "Einzelstuecke wirken klein, koennen aber wegen Etage, Gewicht, Ladeweg oder Zugang mehr Planung brauchen. Fotos und Masse machen den Rahmen klarer.",
    href: "/kleintransport-regensburg#wizard",
    cta: "Transport anfragen",
    Icon: Truck,
    service: "transport",
  },
  offer_check: {
    badge: "Angebotscheck",
    title: "Vorhandenes Angebot vor Zusage prüfen",
    text:
      "Wenn bereits ein Angebot vorliegt, kann FLOXANT Umfang, Zugang, Termin, Fotos, Zusatzservices und Preisrahmen sachlich einordnen, bevor Sie endgültig zusagen.",
    href: "/angebotscheck",
    cta: "Angebot prüfen lassen",
    Icon: FileSearch,
    event: "start_offer_check",
    service: "offer_check",
  },
  tenant_turnover: {
    badge: "Mieterwechsel",
    title: "Wohnung nach Auszug wieder nutzbar vorbereiten",
    text:
      "Fuer Hausverwaltungen, Vermieter, Makler und Eigentuemer: Raeumung, Entsorgung, Endreinigung, Schluesselkoordination und Uebergabevorbereitung nach Absprache.",
    href: "/mieterwechsel-service-regensburg",
    cta: "Mieterwechsel-Service ansehen",
    Icon: BriefcaseBusiness,
    event: "start_tenant_turnover_lead",
    service: "mieterwechsel_service",
    region: "regensburg",
  },
  handover_file: {
    badge: "Uebergabeakte",
    title: "Dokumentation fuer Auszug und Uebergabe",
    text:
      "Die FLOXANT Uebergabeakte kann erledigte Leistungen, Fotos, Schluesselstatus und Hinweise nach Absprache organisatorisch dokumentieren. Keine Rechtsberatung, sondern mehr Kontrolle im Ablauf.",
    href: "/uebergabeakte",
    cta: "Uebergabeakte ansehen",
    Icon: ClipboardList,
    event: "start_handover_file_lead",
    service: "uebergabeakte",
    region: "regensburg",
  },
  rental_ready: {
    badge: "Objekt-Ready",
    title: "Wohnung wieder nutzbarer vorbereiten",
    text:
      "Fuer Vermieter, Makler, Eigentuemer und Hausverwaltungen: Raeumung, Entsorgung, Reinigung und Dokumentation nach Auszug, Leerstand oder Mieterwechsel nach Absprache pruefen.",
    href: "/wohnung-wieder-vermietbar",
    cta: "Wohnung vorbereiten",
    Icon: Home,
    event: "start_rental_ready_lead",
    service: "wohnung_wieder_vermietbar",
    region: "regensburg",
  },
  damage_control: {
    badge: "Rettungsmodus",
    title: "Schadensbegrenzung, wenn der Plan kippt",
    text:
      "Wenn Umzug, Reinigung, Entruempelung oder Uebergabe kurzfristig wackeln, zaehlen Ort, Deadline, Fotos und offene Punkte. FLOXANT prueft nach Verfuegbarkeit, was noch machbar ist.",
    href: "/schadensbegrenzung",
    cta: "Schadensbegrenzung pruefen",
    Icon: AlertTriangle,
    event: "start_damage_control_lead",
    service: "schadensbegrenzung",
    region: "regensburg",
  },
  cellar_trashroom_rescue: {
    badge: "Objektflaechen",
    title: "Keller- und Muellraum-Rettung fuer Verwaltungen",
    text:
      "Wenn Keller, Muellraum, Garage oder Nebenflaeche blockiert sind, helfen Fotos, Zugang, Freigabe und Materialart. FLOXANT prueft Raeumung, Entsorgung und Reinigung nach Absprache.",
    href: "/keller-muellraum-rettung-regensburg",
    cta: "Objektflaeche pruefen",
    Icon: Trash2,
    event: "start_cellar_trashroom_lead",
    service: "keller_muellraum_rettung",
    region: "regensburg",
  },
  realtor_landlord_link: {
    badge: "Objekt-Link",
    title: "Direkter Link fuer Makler und Vermieter",
    text:
      "Makler, Vermieter, Eigentuemer und Hausverwaltungen koennen einen Objektfall mit Ort, Termin, Fotos und offenen Punkten direkt an FLOXANT senden.",
    href: "/makler-vermieter-link",
    cta: "Objektfall direkt senden",
    Icon: UsersRound,
    event: "start_object_case_lead",
    service: "makler_vermieter_link",
    region: "regensburg",
  },
  referral_partnercode: {
    badge: "Empfehlung",
    title: "FLOXANT mit Partnercode empfehlen",
    text:
      "Kunden, Freunde, Vermieter, Makler oder Unternehmen koennen FLOXANT per Link oder Code empfehlen. Bei bestaetigtem und bezahltem Auftrag wird der 50-Euro-Bonus geprueft.",
    href: "/empfehlen",
    cta: "FLOXANT empfehlen",
    Icon: Gift,
    event: "start_referral_form",
    service: "referral_partnercode",
    region: "regensburg",
  },
  route_board: {
    badge: "Streckenradar",
    title: "Rückfahrt-Börse: Strecke eintragen",
    text:
      "Start, Ziel, Datum, Umfang und Flexibilität eintragen. FLOXANT prüft, ob die Strecke zu einer Rückfahrt, Leerfahrt oder flexiblen Transportlösung passt.",
    href: "/rueckfahrt-boerse",
    cta: "Rückfahrt-Börse öffnen",
    Icon: Route,
    event: "start_route_check",
    service: "leerfahrt",
    region: "bayern",
  },
  empty_return_fit: {
    badge: "Leerfahrt",
    title: "Rueckfahrt nur, wenn Route und Termin passen",
    text:
      "Leerfahrt oder Rueckfahrt ist stark bei flexiblen Daten. Strecke, Datum, Umfang, Fotos und Zugang entscheiden, ob freie Kapazitaet genutzt werden kann.",
    href: "/leerfahrt-rueckfahrt",
    cta: "Strecke pruefen lassen",
    Icon: Route,
    service: "leerfahrt",
  },
  premium_discreet: {
    badge: "Diskret",
    title: "Sensible Aufträge brauchen ruhige Vorpruefung",
    text:
      "Bei sensiblen Haushalten zaehlen Zugang, Schutzbedarf, Diskretion, Werte, Reinigung und Rueckrufwunsch mehr als ein schneller Standardrechner.",
    href: "/private-client-service",
    cta: "Diskreten Pfad ansehen",
    Icon: ShieldCheck,
    service: "diskret",
  },
  duesseldorf_cleaning_private: {
    badge: "Privat",
    title: "Reinigung Duesseldorf fuer Wohnung und Auszug",
    text:
      "Bei Wohnungsreinigung, Endreinigung und Reinigung nach Auszug zählen Fläche, Zustand, Termin, Fotos und ein klares Übergabeziel.",
    href: "/duesseldorf/reinigung#leistungen",
    cta: "Private Reinigung ansehen",
    Icon: Home,
    service: "reinigung",
    region: "duesseldorf",
  },
  duesseldorf_cleaning_b2b: {
    badge: "Firma",
    title: "Firmenreinigung Düsseldorf mit Objektangaben",
    text:
      "Büros und kleine Gewerbeflächen brauchen Angaben zu Objektart, Fläche, Turnus, Zeitfenster und besonderen Bereichen, damit der Ablauf zum Betrieb passt.",
    href: "/duesseldorf/reinigung#leistungen",
    cta: "Firmenreinigung anfragen",
    Icon: BriefcaseBusiness,
    service: "reinigung_b2b",
    region: "duesseldorf",
  },
  duesseldorf_apartment_cleaning: {
    badge: "Apartment-Reset",
    title: "Möblierte Wohnung und Kurzzeitvermietung reinigen",
    text:
      "Für Hosts, Vermieter und kleine Betreiber in Düsseldorf: Gästewechsel, Endreinigung, Fotos, Zeitfenster und Zusatzwünsche werden ohne Airbnb-Partnerschaftsversprechen geprüft.",
    href: "/reinigung-moeblierte-wohnung-duesseldorf",
    cta: "Apartment-Reinigung ansehen",
    Icon: Sparkles,
    event: "start_apartment_cleaning_lead",
    service: "duesseldorf_moeblierte_wohnung_reinigung",
    region: "duesseldorf",
  },
  duesseldorf_disposal_private: {
    badge: "Privat",
    title: "Entsorgung Düsseldorf mit Fotoeinschätzung",
    text:
      "Möbel, Sperrmüll, Haushaltsgegenstände oder kleine Räumungen werden nach Umfang, Zugang, Etage, Materialart und Fotos geprüft.",
    href: "/entsorgung-duesseldorf#preislogik",
    cta: "Entsorgung einordnen",
    Icon: Trash2,
    service: "entsorgung",
    region: "duesseldorf",
  },
  duesseldorf_disposal_b2b: {
    badge: "Firma",
    title: "Inventar und Nebenräume für kleine Unternehmen",
    text:
      "Bei Büromöbeln, Lagerbereichen oder Inventar zählen Menge, Zugang, Termin, Materialart und ob eine Reinigung separat sinnvoll ist.",
    href: "/entsorgung-duesseldorf",
    cta: "Firmenentsorgung prüfen",
    Icon: BriefcaseBusiness,
    service: "entsorgung_b2b",
    region: "duesseldorf",
  },
};

type PublicAuthorityModulesProps = {
  moduleIds: readonly PublicAuthorityModuleId[];
  badge?: string;
  title?: string;
  subtitle?: string;
  source?: string;
};

export function PublicAuthorityModules({
  moduleIds,
  badge = "Themenbereich",
  title = "Was Kunden vor der Anfrage wirklich wissen muessen",
  subtitle = "Kurze Module statt Textwand: lokale Einordnung, Preislogik, Fotos, Budget und passende Signature Services werden direkt auf der Seite sichtbar.",
  source = "public_authority_modules",
}: PublicAuthorityModulesProps) {
  const modules = moduleIds.map((id) => authorityModules[id]).filter(Boolean);

  if (modules.length === 0) return null;

  return (
    <section className="flox-section flox-authority-section content-auto py-14">
      <div className="flox-shell">
        <div className="flox-section-intro mb-8 max-w-3xl">
          <div className="flox-kicker">{badge}</div>
          <h2 className="mt-4 flox-title-lg flox-display-section text-slate-950">
            {title}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-700">{subtitle}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((item) => {
            const Icon = item.Icon;

            return (
              <article
                key={`${source}-${item.title}`}
                className="flox-authority-card group p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flox-icon-tile h-12 w-12 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flox-tag text-slate-500">
                    {item.badge}
                  </span>
                </div>
                <h3 className="flox-card-title-lg mt-5 text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                <Link
                  href={item.href}
                  className="flox-row-link mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700"
                  data-event={item.event || "internal_authority_link"}
                  data-source={source}
                  data-service={item.service}
                  data-region={item.region}
                >
                  {item.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="flox-authority-note mt-6 px-5 py-4 text-sm leading-7">
          <div className="flex gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
            <p>
              Jede Anfrage bleibt unverbindlich. FLOXANT prueft Umfang, Ort, Termin,
              Zugang, Fotos, Budget und Zusatzservices, bevor ein verbindlicher Auftrag entsteht.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
