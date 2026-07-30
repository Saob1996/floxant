export type FaqLocale = "de" | "en";

export type FaqCategory =
  | "Leistungen"
  | "Angebot"
  | "Preisfaktoren"
  | "Ablauf"
  | "Termin"
  | "Turnus"
  | "Fotos"
  | "Besichtigung"
  | "Zugang"
  | "Schlüssel"
  | "Material"
  | "Entsorgung"
  | "Umzug"
  | "Reinigung"
  | "Büro und Gewerbe"
  | "Praxis"
  | "Fenster"
  | "Räumung"
  | "Übergabe"
  | "Datenschutz"
  | "englischsprachige Anfrage"
  | "Servicegebiet"
  | "besondere Situationen";

export type FaqRegion = "Deutschland" | "Düsseldorf" | "Regensburg" | "Bayern";

export type FaqCta = {
  label: string;
  href: string;
};

export type FaqRegistryEntry = {
  id: string;
  locale: FaqLocale;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  category: FaqCategory;
  region: readonly FaqRegion[];
  serviceIds: readonly string[];
  audience: readonly string[];
  intent: string;
  evidenceSource: readonly string[];
  verified: boolean;
  reviewedAt: string;
  owner: string;
  publicAllowed: boolean;
  relatedArticle: string | null;
  relatedService: string;
  CTA: FaqCta;
  alternateLocaleId: string;
};

export type PriorityFaqAssignmentStatus = "ACTIVE" | "PLANNED";

export type PriorityFaqPageType =
  | "home"
  | "service-hub"
  | "service"
  | "offer-service"
  | "english-hub"
  | "english-service";

export type PriorityFaqAssignment = {
  route: string;
  locale: FaqLocale;
  pageType: PriorityFaqPageType;
  status: PriorityFaqAssignmentStatus;
  faqIds: readonly string[];
  schemaFaqIds: readonly string[];
  note?: string;
};

type LocalizedFaqCopy = {
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  relatedArticle: string | null;
  relatedService: string;
  CTA: FaqCta;
};

type FaqPairSeed = {
  key: string;
  category: FaqCategory;
  region: readonly FaqRegion[];
  serviceIds: readonly string[];
  audience: readonly string[];
  intent: string;
  evidenceSource: readonly string[];
  reviewedAt?: string;
  de: LocalizedFaqCopy;
  en: LocalizedFaqCopy;
};

const REVIEWED_AT = "2026-07-19";
const OWNER = "FLOXANT";

const faqPairSeeds: readonly FaqPairSeed[] = [
  {
    key: "request-next-step",
    category: "Ablauf",
    region: ["Deutschland"],
    serviceIds: ["reinigung", "umzug", "entruempelung", "angebot-pruefen"],
    audience: ["Privatkunden", "Unternehmen"],
    intent: "Ablauf nach dem Absenden verstehen",
    evidenceSource: ["components/SeoLeadForm.tsx", "lib/faqs.ts"],
    de: {
      question: "Was passiert nach dem Absenden einer Anfrage?",
      shortAnswer: "FLOXANT prüft die übermittelten Eckdaten und meldet sich mit Rückfragen oder dem nächsten möglichen Schritt.",
      detailedAnswer:
        "Die Anfrage ist noch keine Buchung. FLOXANT prüft Leistung, Ort, Umfang, Terminwunsch und Kontaktweg. Wenn Angaben fehlen oder die Machbarkeit noch offen ist, folgt zunächst eine Rückfrage; eine Beauftragung entsteht erst nach gesonderter Abstimmung.",
      relatedArticle: null,
      relatedService: "/kontakt",
      CTA: { label: "Anfrage vorbereiten", href: "/kontakt" },
    },
    en: {
      question: "What happens after I submit a request?",
      shortAnswer: "FLOXANT reviews the details and responds with questions or the next possible step.",
      detailedAnswer:
        "A request is not an automatic booking. FLOXANT checks the service, location, scope, preferred timing and contact method. Missing details or open feasibility points are clarified before any separate agreement is made.",
      relatedArticle: null,
      relatedService: "/en",
      CTA: { label: "Prepare your request", href: "/kontakt?intent=english-request" },
    },
  },
  {
    key: "request-photos",
    category: "Fotos",
    region: ["Deutschland"],
    serviceIds: ["reinigung", "umzug", "entruempelung"],
    audience: ["Privatkunden", "Unternehmen"],
    intent: "Hilfreiche Fotos auswählen",
    evidenceSource: ["lib/faqs.ts", "lib/local-seo/englishLocalSeoPages.ts"],
    de: {
      question: "Welche Fotos helfen bei einer ersten Einschätzung?",
      shortAnswer: "Hilfreich sind Übersichtsaufnahmen, Zugänge, Laufwege und auffällige oder schwer beschreibbare Bereiche.",
      detailedAnswer:
        "Zeigen Sie den Gesamtumfang und die Stellen, die Aufwand oder Zugang beeinflussen. Bei Reinigung helfen Räume, Böden, Küche, Bad oder Fenster; bei Umzug und Räumung zusätzlich Treppen, große Gegenstände, Keller, Garage und Ladewege. Persönliche Dokumente sollten nicht sichtbar sein.",
      relatedArticle: null,
      relatedService: "/kontakt",
      CTA: { label: "Angaben zusammenstellen", href: "/kontakt" },
    },
    en: {
      question: "Which photos are useful for an initial assessment?",
      shortAnswer: "Overview photos, access routes and areas that are difficult to describe are most useful.",
      detailedAnswer:
        "Show the overall scope and any point that affects effort or access. For cleaning, include rooms, floors, kitchens, bathrooms or windows; for moving and clearance, also show stairs, large items, cellars, garages and carrying routes. Avoid showing personal documents.",
      relatedArticle: null,
      relatedService: "/en",
      CTA: { label: "Prepare the details", href: "/kontakt?intent=english-request" },
    },
  },
  {
    key: "cleaning-details-duesseldorf",
    category: "Reinigung",
    region: ["Düsseldorf"],
    serviceIds: ["reinigung"],
    audience: ["Privatkunden", "Unternehmen", "Hausverwaltungen"],
    intent: "Reinigungsanfrage vollständig beschreiben",
    evidenceSource: ["components/duesseldorf/DuesseldorfCleaningServicePage.tsx"],
    de: {
      question: "Welche Angaben braucht FLOXANT für Reinigung in Düsseldorf?",
      shortAnswer: "Objektart, Fläche, Zustand, Terminwunsch, Turnus, Zugang und Fotos sind die wichtigsten Angaben.",
      detailedAnswer:
        "Beschreiben Sie Objektart, ungefähre Fläche, aktuellen Zustand und gewünschten Zielzustand. Ergänzen Sie Terminwunsch, einmalige oder regelmäßige Reinigung, Zugangsbedingungen, Fotos und ein vorhandenes Angebot, falls bereits eines vorliegt.",
      relatedArticle: null,
      relatedService: "/duesseldorf/reinigung",
      CTA: { label: "Reinigung Düsseldorf anfragen", href: "/kontakt?service=reinigung&city=duesseldorf" },
    },
    en: {
      question: "What details are needed for a cleaning request in Düsseldorf?",
      shortAnswer: "Property type, approximate size, condition, timing, frequency, access and photos are the key details.",
      detailedAnswer:
        "Describe the property type, approximate size, current condition and intended result. Add the preferred timing, whether cleaning is one-off or recurring, access details, photos and an existing quote if you already have one.",
      relatedArticle: null,
      relatedService: "/duesseldorf/reinigung",
      CTA: { label: "Request cleaning in Düsseldorf", href: "/kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning" },
    },
  },
  {
    key: "cleaning-effort-duesseldorf",
    category: "Preisfaktoren",
    region: ["Düsseldorf"],
    serviceIds: ["reinigung", "grundreinigung", "unterhaltsreinigung", "bauendreinigung"],
    audience: ["Privatkunden", "Unternehmen"],
    intent: "Aufwandstreiber einer Reinigung verstehen",
    evidenceSource: ["components/duesseldorf/DuesseldorfCleaningServicePage.tsx"],
    de: {
      question: "Was beeinflusst den Aufwand einer Reinigung in Düsseldorf?",
      shortAnswer: "Fläche, Objektart, Verschmutzung, Turnus, Zugang, Sonderflächen und Frist bestimmen den Aufwand.",
      detailedAnswer:
        "Relevant sind die zu reinigende Fläche, Nutzung und aktueller Zustand des Objekts. Hinzu kommen Turnus, Erreichbarkeit, Sanitär- und Küchenbereiche, Fenster oder Glas, Sonderflächen, vorhandene Fotos und ein knappes Terminfenster. Ohne diese Eckdaten ist ein belastbarer Vergleich nicht möglich.",
      relatedArticle: null,
      relatedService: "/duesseldorf/reinigung",
      CTA: { label: "Aufwand beschreiben", href: "/kontakt?service=reinigung&city=duesseldorf" },
    },
    en: {
      question: "What affects the effort required for cleaning in Düsseldorf?",
      shortAnswer: "Size, property type, condition, frequency, access, special areas and timing determine the effort.",
      detailedAnswer:
        "The relevant factors are the area, use and current condition of the property. Frequency, accessibility, sanitary and kitchen areas, windows or glass, special surfaces, available photos and a tight time window also matter. A reliable comparison needs these details.",
      relatedArticle: null,
      relatedService: "/duesseldorf/reinigung",
      CTA: { label: "Describe the scope", href: "/kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning" },
    },
  },
  {
    key: "cleaning-quote-duesseldorf",
    category: "Angebot",
    region: ["Düsseldorf"],
    serviceIds: ["reinigung", "angebot-pruefen"],
    audience: ["Privatkunden", "Unternehmen", "Hausverwaltungen"],
    intent: "Reinigungsangebot sachlich prüfen",
    evidenceSource: ["components/duesseldorf/DuesseldorfCleaningServicePage.tsx", "app/angebot-guenstiger-pruefen/page.tsx"],
    de: {
      question: "Kann FLOXANT ein Reinigungsangebot aus Düsseldorf prüfen?",
      shortAnswer: "Ja, FLOXANT kann Umfang, Turnus, Termin, Zugang und mögliche Zusatzpositionen sachlich einordnen.",
      detailedAnswer:
        "Senden Sie das Angebot zusammen mit Objektart, Fläche, Zustand, Turnus, Fotos und offenen Fragen. FLOXANT betrachtet Leistungsumfang und Annahmen, gibt aber keine Preisunterbietungs-, Ersparnis- oder Rechtsberatungsgarantie.",
      relatedArticle: "/blog/reinigungsangebot-duesseldorf-klar-vergleichen",
      relatedService: "/angebot-vergleichen-duesseldorf",
      CTA: { label: "Reinigungsangebot prüfen", href: "/kontakt?service=angebot-pruefen&city=duesseldorf" },
    },
    en: {
      question: "Can FLOXANT review a cleaning quote from Düsseldorf?",
      shortAnswer: "Yes, FLOXANT can review scope, frequency, timing, access and possible extra line items.",
      detailedAnswer:
        "Send the quote together with the property type, size, condition, frequency, photos and your open questions. FLOXANT reviews scope and assumptions but does not promise to underbid the price, guarantee savings or provide legal advice.",
      relatedArticle: null,
      relatedService: "/angebot-vergleichen-duesseldorf",
      CTA: { label: "Request a quote review", href: "/kontakt?service=offer-check&city=duesseldorf&intent=english-offer-check" },
    },
  },
  {
    key: "cleaning-scope-boundary",
    category: "Leistungen",
    region: ["Deutschland"],
    serviceIds: ["reinigung", "grundreinigung", "unterhaltsreinigung", "bauendreinigung"],
    audience: ["Privatkunden", "Unternehmen"],
    intent: "Reinigungsarten voneinander abgrenzen",
    evidenceSource: ["components/duesseldorf/DuesseldorfCleaningServicePage.tsx", "lib/regensburg-service-pages.ts"],
    de: {
      question: "Wie wird die passende Reinigungsart eingeordnet?",
      shortAnswer: "Objekt, Zustand, Nutzung, Ziel und Turnus entscheiden zwischen laufender, gründlicher oder abschließender Reinigung.",
      detailedAnswer:
        "Unterhaltsreinigung beschreibt einen wiederkehrenden Umfang. Eine Grundreinigung betrifft stärkere oder länger aufgebaute Verschmutzungen, während End- oder Bauendreinigung an einen konkreten Abschlusszustand gebunden ist. FLOXANT prüft die Einordnung anhand der tatsächlichen Angaben statt nur anhand eines Begriffs.",
      relatedArticle: "/ratgeber/reinigung-nach-umzug",
      relatedService: "/reinigung",
      CTA: { label: "Reinigungsart klären", href: "/kontakt?service=reinigung" },
    },
    en: {
      question: "How is the suitable type of cleaning determined?",
      shortAnswer: "The property, condition, use, intended result and frequency determine the suitable cleaning type.",
      detailedAnswer:
        "Maintenance cleaning covers a recurring scope. Deep cleaning addresses heavier or accumulated dirt, while final or post-construction cleaning is linked to a specific completion state. FLOXANT checks the actual details rather than relying on a label alone.",
      relatedArticle: null,
      relatedService: "/en/services",
      CTA: { label: "Clarify the cleaning type", href: "/kontakt?service=cleaning&intent=english-cleaning" },
    },
  },
  {
    key: "apartment-cleaning-details-duesseldorf",
    category: "Reinigung",
    region: ["Düsseldorf"],
    serviceIds: ["ferienwohnung-reinigung"],
    audience: ["Hosts", "Vermieter", "Betreiber möblierter Apartments"],
    intent: "Ferienwohnungsreinigung in Düsseldorf vollständig beschreiben",
    evidenceSource: [
      "app/reinigung-moeblierte-wohnung-duesseldorf/page.tsx",
      "app/airbnb-turnover-express/page.tsx",
    ],
    reviewedAt: "2026-07-23",
    de: {
      question: "Welche Angaben braucht eine Ferienwohnungsreinigung in Düsseldorf?",
      shortAnswer:
        "Objektart, Fläche, Zustand, Checkout, nächster Check-in, Zugang und gewünschte Zusatzleistungen sind die wichtigsten Angaben.",
      detailedAnswer:
        "Beschreiben Sie Ferienwohnung oder Apartment mit Fläche, Zimmern, Bädern und aktuellem Zustand. Ergänzen Sie Checkout, nächsten Check-in, Schlüsselweg, Etage, Parkmöglichkeit sowie Wünsche zu Wäsche, Fotos oder Inventar. Erst danach lässt sich prüfen, welcher Umfang und welches Zeitfenster realistisch sind.",
      relatedArticle: null,
      relatedService: "/reinigung-moeblierte-wohnung-duesseldorf",
      CTA: {
        label: "Apartment-Reinigung Düsseldorf anfragen",
        href: "/kontakt?service=reinigung&city=duesseldorf&intent=ferienwohnung-reinigung",
      },
    },
    en: {
      question: "Which details are needed for holiday apartment cleaning in Düsseldorf?",
      shortAnswer:
        "Property type, size, condition, checkout, next check-in, access and requested extras are the key details.",
      detailedAnswer:
        "Describe the holiday apartment or furnished unit, including size, rooms, bathrooms and current condition. Add checkout, next check-in, key arrangements, floor, parking and any request for laundry, photos or inventory notes. FLOXANT can then assess a realistic scope and time window.",
      relatedArticle: null,
      relatedService: "/en/services",
      CTA: {
        label: "Prepare an apartment cleaning request",
        href: "/kontakt?service=cleaning&city=duesseldorf&intent=english-holiday-apartment-cleaning",
      },
    },
  },
  {
    key: "apartment-cleaning-details-regensburg",
    category: "Reinigung",
    region: ["Regensburg"],
    serviceIds: ["ferienwohnung-reinigung"],
    audience: ["Hosts", "Vermieter", "Betreiber möblierter Apartments"],
    intent: "Ferienwohnungsreinigung in Regensburg vollständig beschreiben",
    evidenceSource: [
      "app/reinigung-moeblierte-wohnung-regensburg/page.tsx",
      "app/airbnb-turnover-express/page.tsx",
    ],
    reviewedAt: "2026-07-23",
    de: {
      question: "Welche Angaben braucht eine Ferienwohnungsreinigung in Regensburg?",
      shortAnswer:
        "Objektart, Fläche, Zustand, Terminfenster, Zugang und gewünschter Zielzustand sollten von Anfang an genannt werden.",
      detailedAnswer:
        "Nennen Sie Ort, Fläche, Zimmer, Bäder, Möblierung und aktuellen Zustand. Bei einem Gästewechsel gehören Checkout, nächster Check-in, Schlüsselweg und mögliche Wünsche zu Wäsche, Fotos oder Inventar dazu. Für Reinigungsservices bleibt die Prüfung auf Regensburg und den Umkreis bis 50 Kilometer begrenzt.",
      relatedArticle: null,
      relatedService: "/reinigung-moeblierte-wohnung-regensburg",
      CTA: {
        label: "Apartment-Reinigung Regensburg anfragen",
        href: "/reinigung-moeblierte-wohnung-regensburg#anfrage",
      },
    },
    en: {
      question: "Which details are needed for holiday apartment cleaning in Regensburg?",
      shortAnswer:
        "Property type, size, condition, time window, access and intended result should be included from the start.",
      detailedAnswer:
        "Include the location, size, rooms, bathrooms, furnishing and current condition. For a guest turnover, add checkout, next check-in, key arrangements and any request for laundry, photos or inventory notes. Cleaning requests are assessed within Regensburg and a radius of up to 50 kilometres.",
      relatedArticle: null,
      relatedService: "/en/services",
      CTA: {
        label: "Prepare an apartment cleaning request",
        href: "/kontakt?service=cleaning&city=regensburg&intent=english-holiday-apartment-cleaning",
      },
    },
  },
  {
    key: "guest-turnover-scope",
    category: "Leistungen",
    region: ["Düsseldorf", "Regensburg"],
    serviceIds: ["ferienwohnung-reinigung"],
    audience: ["Hosts", "Vermieter", "Betreiber möblierter Apartments"],
    intent: "Leistungsumfang eines Gästewechsels verstehen",
    evidenceSource: [
      "lib/property-operations-pages.ts",
      "app/reinigung-moeblierte-wohnung-regensburg/page.tsx",
    ],
    reviewedAt: "2026-07-23",
    de: {
      question: "Was kann zu einem Gästewechsel in Ferienwohnung oder Apartment gehören?",
      shortAnswer:
        "Reinigung, Sichtkontrolle und Vorbereitung können vereinbart werden; der genaue Umfang wird für jedes Objekt festgelegt.",
      detailedAnswer:
        "Typische Punkte sind Bad, Küche, Schlafbereich, Böden, sichtbare Oberflächen und eine kurze Zustandsrückmeldung. Wäsche, Schlüsselkoordination, Fotodokumentation, Inventarhinweise oder Restmengen sind nicht automatisch enthalten und müssen vorab ausdrücklich abgestimmt werden.",
      relatedArticle: null,
      relatedService: "/airbnb-turnover-express",
      CTA: {
        label: "Gästewechsel einordnen",
        href: "/kontakt?service=reinigung&intent=gaestewechsel",
      },
    },
    en: {
      question: "What can be included in a guest turnover for a holiday apartment?",
      shortAnswer:
        "Cleaning, a visual check and preparation can be agreed; the exact scope is defined for each property.",
      detailedAnswer:
        "Typical points include the bathroom, kitchen, sleeping area, floors, visible surfaces and a brief condition update. Laundry, key coordination, photo documentation, inventory notes or leftover items are not automatically included and must be agreed in advance.",
      relatedArticle: null,
      relatedService: "/en/services",
      CTA: {
        label: "Clarify the turnover scope",
        href: "/kontakt?service=cleaning&intent=english-guest-turnover",
      },
    },
  },
  {
    key: "guest-turnover-access",
    category: "Schlüssel",
    region: ["Düsseldorf", "Regensburg"],
    serviceIds: ["ferienwohnung-reinigung"],
    audience: ["Hosts", "Vermieter", "Betreiber möblierter Apartments"],
    intent: "Zugang und Schlüsselweg beim Gästewechsel klären",
    evidenceSource: [
      "lib/property-operations-pages.ts",
      "components/RegensburgApartmentCleaningForm.tsx",
    ],
    reviewedAt: "2026-07-23",
    de: {
      question: "Wie werden Zugang und Schlüssel beim Gästewechsel geklärt?",
      shortAnswer:
        "Zugangsweg, verantwortliche Person und erlaubtes Zeitfenster müssen vor dem Einsatz eindeutig abgestimmt sein.",
      detailedAnswer:
        "Teilen Sie mit, ob der Zugang über persönliche Übergabe, Schlüsselbox, Verwaltung oder einen anderen vereinbarten Weg erfolgt. Codes oder sensible Zugangsdaten gehören nicht in öffentlich sichtbare Felder. Eine Schlüsselkoordination ist nur Teil des Auftrags, wenn sie ausdrücklich bestätigt wurde.",
      relatedArticle: null,
      relatedService: "/airbnb-turnover-express",
      CTA: {
        label: "Zugang sicher abstimmen",
        href: "/kontakt?service=reinigung&intent=gaestewechsel",
      },
    },
    en: {
      question: "How are access and keys handled for a guest turnover?",
      shortAnswer:
        "The access route, responsible person and permitted time window must be agreed before the service.",
      detailedAnswer:
        "State whether access is provided in person, through a key box, by property management or by another agreed method. Codes and sensitive access details should not be entered into public-facing fields. Key coordination is included only when it has been explicitly confirmed.",
      relatedArticle: null,
      relatedService: "/en/services",
      CTA: {
        label: "Clarify access safely",
        href: "/kontakt?service=cleaning&intent=english-guest-turnover",
      },
    },
  },
  {
    key: "guest-turnover-platform-boundary",
    category: "Leistungen",
    region: ["Düsseldorf", "Regensburg"],
    serviceIds: ["ferienwohnung-reinigung"],
    audience: ["Hosts", "Vermieter", "Betreiber möblierter Apartments"],
    intent: "Plattformunabhängigkeit des Services verstehen",
    evidenceSource: [
      "app/reinigung-moeblierte-wohnung-regensburg/page.tsx",
      "lib/property-operations-pages.ts",
    ],
    reviewedAt: "2026-07-23",
    de: {
      question: "Ist FLOXANT Partner von Airbnb oder einer anderen Buchungsplattform?",
      shortAnswer:
        "Nein, FLOXANT bietet die Leistung plattformunabhängig an und behauptet keine Partnerschaft mit einer Buchungsplattform.",
      detailedAnswer:
        "Die Leistung richtet sich an Ferienwohnungen, möblierte Apartments und vergleichbare Kurzzeitvermietungen unabhängig vom verwendeten Buchungsportal. Plattformkommunikation, Gästesupport, Schadensregulierung und Bewertungsmanagement bleiben beim Host oder Betreiber, sofern nichts anderes ausdrücklich vereinbart wurde.",
      relatedArticle: null,
      relatedService: "/airbnb-turnover-express",
      CTA: {
        label: "Plattformunabhängig anfragen",
        href: "/kontakt?service=reinigung&intent=ferienwohnung-reinigung",
      },
    },
    en: {
      question: "Is FLOXANT a partner of Airbnb or another booking platform?",
      shortAnswer:
        "No, FLOXANT provides the service independently and does not claim a partnership with any booking platform.",
      detailedAnswer:
        "The service is for holiday apartments, furnished units and similar short-term rentals regardless of the booking portal used. Platform communication, guest support, damage claims and review management remain the host's or operator's responsibility unless a separate scope is explicitly agreed.",
      relatedArticle: null,
      relatedService: "/en/services",
      CTA: {
        label: "Send a platform-independent request",
        href: "/kontakt?service=cleaning&intent=english-holiday-apartment-cleaning",
      },
    },
  },
  {
    key: "office-scope",
    category: "Büro und Gewerbe",
    region: ["Düsseldorf", "Regensburg"],
    serviceIds: ["bueroreinigung"],
    audience: ["Unternehmen", "Kanzleien", "Bürobetreiber"],
    intent: "Leistungsumfang einer Büroreinigung beschreiben",
    evidenceSource: ["components/duesseldorf/DuesseldorfCleaningServicePage.tsx", "lib/regensburg-service-pages.ts"],
    de: {
      question: "Welche Bereiche gehören in eine Büroreinigungsanfrage?",
      shortAnswer: "Arbeitsflächen, Empfang, Küche, Sanitär, Böden und gemeinsam genutzte Bereiche sollten einzeln benannt werden.",
      detailedAnswer:
        "Nennen Sie Fläche, Raumliste, Anzahl der Arbeitsplätze, Küche, Sanitärbereiche, Böden und besondere Zonen. Turnus, Reinigungszeiten, Ansprechpartner, Zugang und Schlüsselweg gehören ebenfalls in die Anfrage, damit der Umfang nicht nur als pauschale Büroreinigung beschrieben bleibt.",
      relatedArticle: "/blog/bueroreinigung-regensburg-angebot-einholen",
      relatedService: "/duesseldorf/bueroreinigung",
      CTA: { label: "Büroreinigung beschreiben", href: "/kontakt?service=bueroreinigung&city=duesseldorf" },
    },
    en: {
      question: "Which areas should be listed in an office cleaning request?",
      shortAnswer: "Work areas, reception, kitchens, washrooms, floors and shared areas should be listed separately.",
      detailedAnswer:
        "Include the size, room list, number of workstations, kitchen, washrooms, floors and any special zones. Cleaning frequency, preferred time window, contact person, access and key arrangements are also needed so that the scope is not described only as general office cleaning.",
      relatedArticle: null,
      relatedService: "/en/regensburg/office-cleaning",
      CTA: { label: "Describe office cleaning", href: "/kontakt?service=office-cleaning&intent=english-office-cleaning" },
    },
  },
  {
    key: "office-frequency",
    category: "Turnus",
    region: ["Düsseldorf", "Regensburg"],
    serviceIds: ["bueroreinigung", "unterhaltsreinigung"],
    audience: ["Unternehmen", "Hausverwaltungen"],
    intent: "Passenden Reinigungsturnus vorbereiten",
    evidenceSource: ["components/duesseldorf/DuesseldorfCleaningServicePage.tsx", "lib/regensburg-service-pages.ts"],
    de: {
      question: "Welche Angaben helfen bei der Wahl des Reinigungsturnus?",
      shortAnswer: "Nutzung, Personenanzahl, Sanitär und Küche sowie der gewünschte Zustand zwischen den Einsätzen sind entscheidend.",
      detailedAnswer:
        "Beschreiben Sie, wie viele Personen die Räume nutzen, welche Bereiche besonders häufig beansprucht werden und ob feste Öffnungs- oder Arbeitszeiten gelten. Aus Raumliste, Nutzung und Zielzustand lässt sich ein Turnus prüfen; eine pauschale Häufigkeit ohne Objektangaben ist nicht belastbar.",
      relatedArticle: "/blog/unterhaltsreinigung-regensburg-buero-praxis-hotel",
      relatedService: "/duesseldorf/bueroreinigung",
      CTA: { label: "Turnus einordnen", href: "/kontakt?service=bueroreinigung" },
    },
    en: {
      question: "Which details help determine an office cleaning frequency?",
      shortAnswer: "Usage, number of people, kitchens, washrooms and the expected condition between visits are decisive.",
      detailedAnswer:
        "Describe how many people use the rooms, which areas receive the most traffic and whether fixed opening or working hours apply. A frequency can be assessed from the room list, use and intended result; a generic schedule without property details is not reliable.",
      relatedArticle: null,
      relatedService: "/en/regensburg/office-cleaning",
      CTA: { label: "Clarify the frequency", href: "/kontakt?service=office-cleaning&intent=english-office-cleaning" },
    },
  },
  {
    key: "office-access",
    category: "Schlüssel",
    region: ["Düsseldorf", "Regensburg"],
    serviceIds: ["bueroreinigung", "praxisreinigung", "unterhaltsreinigung"],
    audience: ["Unternehmen", "Praxen", "Hausverwaltungen"],
    intent: "Zugang außerhalb der Nutzungszeit klären",
    evidenceSource: ["components/duesseldorf/DuesseldorfCleaningServicePage.tsx", "lib/regensburg-service-pages.ts"],
    de: {
      question: "Was sollte bei Zugang und Schlüsselweg geklärt werden?",
      shortAnswer: "Zeitfenster, Ansprechpartner, Schlüsselübergabe, Alarmanlage und gesperrte Bereiche müssen vorab eindeutig sein.",
      detailedAnswer:
        "Legen Sie fest, wer Zugang gewährt, wann gereinigt werden darf und wie Schlüssel ausgegeben und zurückgegeben werden. Hinweise zu Alarmanlage, Hausordnung, Aufzug, verschlossenen Räumen oder vertraulichen Bereichen gehören ebenfalls in die Abstimmung; Zugangsdaten sollten nicht öffentlich übermittelt werden.",
      relatedArticle: "/blog/unterhaltsreinigung-regensburg-buero-praxis-hotel",
      relatedService: "/duesseldorf/bueroreinigung",
      CTA: { label: "Zugang abstimmen", href: "/kontakt?service=bueroreinigung" },
    },
    en: {
      question: "What should be clarified about access and key handling?",
      shortAnswer: "Time windows, contact person, key handover, alarm systems and restricted areas must be clear in advance.",
      detailedAnswer:
        "Define who provides access, when cleaning may take place and how keys are handed over and returned. Alarm systems, building rules, lifts, locked rooms and confidential areas should also be discussed. Access credentials should not be sent through public content fields.",
      relatedArticle: null,
      relatedService: "/en/regensburg/office-cleaning",
      CTA: { label: "Clarify access", href: "/kontakt?service=office-cleaning&intent=english-office-cleaning" },
    },
  },
  {
    key: "office-quote",
    category: "Angebot",
    region: ["Düsseldorf", "Regensburg"],
    serviceIds: ["bueroreinigung", "angebot-pruefen"],
    audience: ["Unternehmen", "Hausverwaltungen"],
    intent: "Büroreinigungsangebote vergleichbar machen",
    evidenceSource: ["components/duesseldorf/DuesseldorfCleaningServicePage.tsx", "lib/regensburg-service-pages.ts"],
    de: {
      question: "Was sollte in einem Büroreinigungsangebot klar benannt sein?",
      shortAnswer: "Fläche, Raumliste, Turnus, Zeiten, Sanitär, Küche, Zugang und Zusatzleistungen sollten eindeutig aufgeführt sein.",
      detailedAnswer:
        "Vergleichen Sie nicht nur den Endbetrag. Prüfen Sie, welche Räume und Tätigkeiten enthalten sind, wie oft gereinigt wird, welche Zeitfenster gelten und wie Verbrauchsmaterial, Fenster, Sonderflächen oder Zusatzarbeiten behandelt werden. Unklare Positionen sollten vor einer Zusage nachgefragt werden.",
      relatedArticle: "/blog/bueroreinigung-regensburg-kostenfaktoren-checkliste",
      relatedService: "/duesseldorf/bueroreinigung",
      CTA: { label: "Büroreinigungsangebot prüfen", href: "/kontakt?service=angebot-pruefen&intent=bueroreinigung" },
    },
    en: {
      question: "What should be clearly stated in an office cleaning quote?",
      shortAnswer: "Area, room list, frequency, time windows, washrooms, kitchen, access and extra services should be explicit.",
      detailedAnswer:
        "Do not compare only the final amount. Check which rooms and tasks are included, how often cleaning takes place, which time windows apply and how consumables, windows, special areas or extra work are handled. Ask about unclear line items before accepting a quote.",
      relatedArticle: null,
      relatedService: "/en/regensburg/office-cleaning",
      CTA: { label: "Review an office cleaning quote", href: "/kontakt?service=offer-check&intent=english-office-cleaning" },
    },
  },
  {
    key: "practice-details-duesseldorf",
    category: "Praxis",
    region: ["Düsseldorf"],
    serviceIds: ["praxisreinigung"],
    audience: ["Praxen", "Therapieeinrichtungen"],
    intent: "Praxisreinigungsanfrage vorbereiten",
    evidenceSource: ["components/duesseldorf/DuesseldorfCleaningServicePage.tsx"],
    de: {
      question: "Welche Angaben braucht eine Praxisreinigungsanfrage in Düsseldorf?",
      shortAnswer: "Räume, sensible Bereiche, Fläche, Turnus, Zeitfenster, Zugang und Ansprechpartner sollten beschrieben werden.",
      detailedAnswer:
        "Nennen Sie Empfang, Behandlungs- oder Therapieräume, Sanitärbereiche, Böden und weitere relevante Zonen. Ergänzen Sie Öffnungszeiten, bevorzugte Reinigungszeiten, Turnus, Zugang, Ansprechpartner und den konkret gewünschten Leistungsumfang.",
      relatedArticle: "/blog/reinigungsfirma-regensburg-buero-praxis-auswahl",
      relatedService: "/duesseldorf/praxisreinigung",
      CTA: { label: "Praxisreinigung anfragen", href: "/kontakt?service=praxisreinigung&city=duesseldorf" },
    },
    en: {
      question: "What details are needed for a practice cleaning request in Düsseldorf?",
      shortAnswer: "Rooms, sensitive areas, size, frequency, time window, access and contact person should be described.",
      detailedAnswer:
        "List reception, treatment or therapy rooms, washrooms, floors and other relevant zones. Add opening hours, preferred cleaning times, frequency, access, contact person and the specific scope you need.",
      relatedArticle: null,
      relatedService: "/duesseldorf/praxisreinigung",
      CTA: { label: "Request practice cleaning", href: "/kontakt?service=praxisreinigung&city=duesseldorf&intent=english-cleaning" },
    },
  },
  {
    key: "practice-boundaries-duesseldorf",
    category: "Leistungen",
    region: ["Düsseldorf"],
    serviceIds: ["praxisreinigung"],
    audience: ["Praxen", "Therapieeinrichtungen"],
    intent: "Grenzen der Praxisreinigung verstehen",
    evidenceSource: ["components/duesseldorf/DuesseldorfCleaningServicePage.tsx"],
    de: {
      question: "Ersetzt die Praxisreinigung eine medizinische Hygieneberatung?",
      shortAnswer: "Nein, FLOXANT beschreibt und prüft den Reinigungsumfang, bietet aber keine medizinische oder rechtliche Hygieneberatung.",
      detailedAnswer:
        "Anforderungen an sensible Bereiche, interne Vorgaben und freigegebene Mittel müssen vom Auftraggeber klar benannt werden. FLOXANT erfindet keine Zertifikate und gibt ohne Prüfung keine Desinfektions- oder Sicherheitszusage; fachliche Hygienevorgaben bleiben davon getrennt.",
      relatedArticle: null,
      relatedService: "/duesseldorf/praxisreinigung",
      CTA: { label: "Leistungsumfang klären", href: "/kontakt?service=praxisreinigung&city=duesseldorf" },
    },
    en: {
      question: "Does practice cleaning replace medical hygiene advice?",
      shortAnswer: "No, FLOXANT can assess the cleaning scope but does not provide medical or legal hygiene advice.",
      detailedAnswer:
        "The client must state requirements for sensitive areas, internal procedures and approved products. FLOXANT does not invent certificates or make unverified disinfection or safety promises; professional hygiene requirements remain separate.",
      relatedArticle: null,
      relatedService: "/duesseldorf/praxisreinigung",
      CTA: { label: "Clarify the scope", href: "/kontakt?service=praxisreinigung&city=duesseldorf&intent=english-cleaning" },
    },
  },
  {
    key: "window-details-duesseldorf",
    category: "Fenster",
    region: ["Düsseldorf"],
    serviceIds: ["fensterreinigung"],
    audience: ["Privatkunden", "Unternehmen", "Hausverwaltungen"],
    intent: "Fensterreinigungsanfrage vorbereiten",
    evidenceSource: ["components/duesseldorf/DuesseldorfCleaningServicePage.tsx"],
    de: {
      question: "Welche Angaben helfen bei Fensterreinigung in Düsseldorf?",
      shortAnswer: "Fensterzahl, Glasflächen, Innen- und Außenseiten, Rahmen, Etage, Erreichbarkeit, Termin und Fotos helfen am meisten.",
      detailedAnswer:
        "Beschreiben Sie Anzahl und ungefähre Größe der Fenster, ob Innen- und Außenseiten sowie Rahmen oder Falze gemeint sind und in welcher Etage sie liegen. Fotos von Zugängen, Balkonen, Dachflächen oder schwer erreichbaren Elementen erleichtern die Machbarkeitsprüfung.",
      relatedArticle: null,
      relatedService: "/duesseldorf/fensterreinigung",
      CTA: { label: "Fensterreinigung anfragen", href: "/kontakt?service=fensterreinigung&city=duesseldorf" },
    },
    en: {
      question: "Which details help with window cleaning in Düsseldorf?",
      shortAnswer: "Number and size of windows, sides, frames, floor, accessibility, timing and photos are most useful.",
      detailedAnswer:
        "Describe the number and approximate size of the windows, whether inside and outside surfaces, frames or rebates are included and on which floor they are located. Photos of access points, balconies, roof areas or hard-to-reach elements support the feasibility check.",
      relatedArticle: null,
      relatedService: "/duesseldorf/fensterreinigung",
      CTA: { label: "Request window cleaning", href: "/kontakt?service=fensterreinigung&city=duesseldorf&intent=english-cleaning" },
    },
  },
  {
    key: "window-scope-duesseldorf",
    category: "Leistungen",
    region: ["Düsseldorf"],
    serviceIds: ["fensterreinigung"],
    audience: ["Privatkunden", "Unternehmen", "Hausverwaltungen"],
    intent: "Umfang der Fensterreinigung abgrenzen",
    evidenceSource: ["components/duesseldorf/DuesseldorfCleaningServicePage.tsx"],
    de: {
      question: "Sind Rahmen und Falze automatisch Teil der Fensterreinigung?",
      shortAnswer: "Nicht automatisch; Glas, Rahmen, Falze sowie Innen- und Außenseiten sollten ausdrücklich vereinbart werden.",
      detailedAnswer:
        "Der Begriff Fensterreinigung beschreibt nicht auf jeder Anfrage denselben Umfang. Benennen Sie deshalb Glasflächen, Rahmen, Falze, Fensterbänke und die gewünschten Seiten getrennt. So bleibt erkennbar, welche Arbeiten enthalten sind und welche zusätzlich geprüft werden müssen.",
      relatedArticle: null,
      relatedService: "/duesseldorf/fensterreinigung",
      CTA: { label: "Umfang beschreiben", href: "/kontakt?service=fensterreinigung&city=duesseldorf" },
    },
    en: {
      question: "Are frames and rebates automatically included in window cleaning?",
      shortAnswer: "Not automatically; glass, frames, rebates and inside or outside surfaces should be agreed explicitly.",
      detailedAnswer:
        "Window cleaning does not describe the same scope in every request. List glass surfaces, frames, rebates, sills and the required sides separately. This makes clear which tasks are included and which need an additional check.",
      relatedArticle: null,
      relatedService: "/duesseldorf/fensterreinigung",
      CTA: { label: "Describe the scope", href: "/kontakt?service=fensterreinigung&city=duesseldorf&intent=english-cleaning" },
    },
  },
  {
    key: "window-access-duesseldorf",
    category: "Zugang",
    region: ["Düsseldorf"],
    serviceIds: ["fensterreinigung"],
    audience: ["Privatkunden", "Unternehmen", "Hausverwaltungen"],
    intent: "Erreichbarkeit von Glasflächen klären",
    evidenceSource: ["components/duesseldorf/DuesseldorfCleaningServicePage.tsx"],
    de: {
      question: "Wie werden schwer erreichbare Fenster vorab geprüft?",
      shortAnswer: "Etage, Höhe, Öffnungsart, Zugangsweg und Fotos müssen vor einer Machbarkeitszusage bekannt sein.",
      detailedAnswer:
        "Zeigen Sie, ob die Fenster geöffnet werden können und ob Zugang über Innenräume, Balkon oder andere sichere Bereiche besteht. Für Höhe, Dachflächen oder besondere Zugangsbedingungen gibt FLOXANT ohne konkrete Prüfung keine Geräte-, Sicherheits- oder Durchführungszusage.",
      relatedArticle: null,
      relatedService: "/duesseldorf/fensterreinigung",
      CTA: { label: "Erreichbarkeit prüfen", href: "/kontakt?service=fensterreinigung&city=duesseldorf" },
    },
    en: {
      question: "How are hard-to-reach windows assessed in advance?",
      shortAnswer: "Floor, height, opening method, access route and photos are needed before feasibility can be confirmed.",
      detailedAnswer:
        "Show whether the windows can be opened and whether access is available through rooms, a balcony or another safe area. FLOXANT does not make unverified equipment, safety or feasibility promises for height, roof areas or special access conditions.",
      relatedArticle: null,
      relatedService: "/duesseldorf/fensterreinigung",
      CTA: { label: "Check accessibility", href: "/kontakt?service=fensterreinigung&city=duesseldorf&intent=english-cleaning" },
    },
  },
  {
    key: "moving-details-regensburg",
    category: "Umzug",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["umzug"],
    audience: ["Privatkunden", "Unternehmen"],
    intent: "Umzugsanfrage vollständig beschreiben",
    evidenceSource: ["app/regensburg/umzug/page.tsx", "lib/regensburg-service-pages.ts"],
    de: {
      question: "Welche Angaben braucht FLOXANT für einen Umzug in Regensburg?",
      shortAnswer: "Start, Ziel, Etagen, Aufzug, Tragewege, Haltemöglichkeit, Umfang, Termin und Fotos sind entscheidend.",
      detailedAnswer:
        "Nennen Sie Start- und Zieladresse, Etage, Aufzug, Laufwege und Park- oder Haltemöglichkeiten. Ergänzen Sie Möbelumfang, Kartons, besondere Stücke, Montagebedarf, Terminwunsch, Fotos und gewünschte Zusatzleistungen wie Reinigung oder Räumung.",
      relatedArticle: "/blog/umzug-regensburg-tipps",
      relatedService: "/regensburg/umzug",
      CTA: { label: "Umzug Regensburg anfragen", href: "/kontakt?service=umzug&city=regensburg" },
    },
    en: {
      question: "What details does FLOXANT need for a move in Regensburg?",
      shortAnswer: "Origin, destination, floors, lift, carrying routes, parking, volume, timing and photos are decisive.",
      detailedAnswer:
        "Provide the origin and destination, floor, lift, carrying routes and parking or loading options. Add furniture volume, boxes, special items, dismantling or assembly needs, preferred date, photos and any extra service such as cleaning or clearance.",
      relatedArticle: null,
      relatedService: "/en/regensburg/moving",
      CTA: { label: "Request moving in Regensburg", href: "/kontakt?service=moving&city=regensburg&intent=english-moving" },
    },
  },
  {
    key: "moving-effort-regensburg",
    category: "Preisfaktoren",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["umzug"],
    audience: ["Privatkunden", "Unternehmen"],
    intent: "Aufwandstreiber eines Umzugs verstehen",
    evidenceSource: ["app/regensburg/umzug/page.tsx", "lib/regensburg-service-pages.ts"],
    de: {
      question: "Was beeinflusst den Aufwand eines Umzugs in Regensburg?",
      shortAnswer: "Volumen, Strecke, Etagen, Laufwege, Parken, Termin, Montage und Sonderstücke beeinflussen den Aufwand.",
      detailedAnswer:
        "Neben Möbeln und Kartons zählen Entfernung, Etagen, Aufzug, Trageweg und Haltemöglichkeit. Ein knappes Zeitfenster, Demontage oder Montage, Packhilfe, schwere Einzelstücke sowie Reinigung oder Entrümpelung als getrennte Zusatzleistungen verändern den Umfang ebenfalls.",
      relatedArticle: "/blog/umzug-kosten-regensburg",
      relatedService: "/regensburg/umzug-kosten",
      CTA: { label: "Umzugsaufwand beschreiben", href: "/kontakt?service=umzug&city=regensburg" },
    },
    en: {
      question: "What affects the effort required for a move in Regensburg?",
      shortAnswer: "Volume, distance, floors, carrying routes, parking, timing, assembly and special items affect the effort.",
      detailedAnswer:
        "In addition to furniture and boxes, distance, floors, lift, carrying route and loading options matter. A tight time window, dismantling or assembly, packing help, heavy individual items and separate cleaning or clearance services also change the scope.",
      relatedArticle: null,
      relatedService: "/en/regensburg/moving-costs",
      CTA: { label: "Describe the moving scope", href: "/kontakt?service=moving&city=regensburg&intent=english-moving" },
    },
  },
  {
    key: "moving-mini-regensburg",
    category: "Leistungen",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["umzug", "moebeltransport"],
    audience: ["Privatkunden"],
    intent: "Kleinen Umzug einordnen",
    evidenceSource: ["app/regensburg/umzug/page.tsx", "lib/faqs.ts"],
    de: {
      question: "Kann ich in Regensburg auch einen Mini-Umzug anfragen?",
      shortAnswer: "Ja, wenige Möbel oder Kartons können anhand von Strecke, Zugang, Volumen und Terminfenster geprüft werden.",
      detailedAnswer:
        "Listen Sie die zu transportierenden Stücke auf und nennen Sie Start, Ziel, Etagen, Aufzug, Laufweg und mögliche Zeitfenster. FLOXANT ordnet dann ein, ob ein kleiner Umzug, Möbeltransport oder eine flexible Beiladung praktisch passt; eine Anfrage ist noch keine Zusage.",
      relatedArticle: null,
      relatedService: "/regensburg/umzug",
      CTA: { label: "Mini-Umzug beschreiben", href: "/kontakt?service=umzug&city=regensburg&intent=mini-umzug" },
    },
    en: {
      question: "Can I request a small move in Regensburg?",
      shortAnswer: "Yes, a few items or boxes can be assessed using distance, access, volume and possible time windows.",
      detailedAnswer:
        "List the items and provide origin, destination, floors, lift, carrying route and possible dates. FLOXANT can then assess whether a small move, furniture transport or flexible shared transport is practical; a request is not a confirmation.",
      relatedArticle: null,
      relatedService: "/en/regensburg/moving",
      CTA: { label: "Describe a small move", href: "/kontakt?service=moving&city=regensburg&intent=english-moving" },
    },
  },
  {
    key: "moving-combined-regensburg",
    category: "Übergabe",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["umzug", "reinigung", "entruempelung"],
    audience: ["Privatkunden", "Angehörige"],
    intent: "Umzug mit Reinigung oder Räumung koordinieren",
    evidenceSource: ["app/regensburg/umzug/page.tsx", "lib/regensburg-service-pages.ts"],
    de: {
      question: "Kann ein Umzug mit Reinigung oder Entrümpelung kombiniert werden?",
      shortAnswer: "Ja, wenn Reihenfolge, Umfang, Zugang und Termin für jede Leistung getrennt geklärt werden.",
      detailedAnswer:
        "Beschreiben Sie Umzug, Restmengen und gewünschten Reinigungszustand als getrennte Arbeitspakete. FLOXANT prüft, ob Zeitfenster und Ablauf zusammenpassen. Die Leistungen werden nicht automatisch in eine unklare Pauschale oder eine garantierte Eintageszusage zusammengefasst.",
      relatedArticle: "/blog/umzug-reinigung-entruempelung-regensburg-koordinieren",
      relatedService: "/umzug-mit-reinigung",
      CTA: { label: "Kombination anfragen", href: "/kontakt?service=umzug&city=regensburg&intent=umzug-reinigung" },
    },
    en: {
      question: "Can moving be combined with cleaning or clearance?",
      shortAnswer: "Yes, if sequence, scope, access and timing are clarified separately for each service.",
      detailedAnswer:
        "Describe the move, remaining items and intended cleaning result as separate work packages. FLOXANT checks whether the time windows and sequence fit together. The services are not automatically bundled into an unclear flat rate or a guaranteed same-day completion.",
      relatedArticle: "/blog/remote-move-out-service",
      relatedService: "/en/regensburg/cleaning-after-moving",
      CTA: { label: "Request combined services", href: "/kontakt?service=moving&city=regensburg&intent=english-moving-cleaning" },
    },
  },
  {
    key: "moving-quote-regensburg",
    category: "Angebot",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["umzug", "angebot-pruefen"],
    audience: ["Privatkunden", "Unternehmen"],
    intent: "Umzugsangebot sachlich vergleichen",
    evidenceSource: ["app/regensburg/umzug/page.tsx", "app/angebot-guenstiger-pruefen/page.tsx"],
    de: {
      question: "Welche Punkte gehören in den Vergleich von Umzugsangeboten?",
      shortAnswer: "Volumen, Etagen, Laufwege, Haltezone, Strecke, Termin und enthaltene Zusatzleistungen müssen vergleichbar sein.",
      detailedAnswer:
        "Prüfen Sie neben dem Endbetrag, welche Möbel und Kartons angesetzt sind, wie Etagen, Aufzug, Tragewege und Entfernung berücksichtigt werden und ob Montage, Packhilfe oder Reinigung enthalten sind. FLOXANT ordnet die Angaben praktisch ein, ohne Rechts- oder Ersparnisgarantie.",
      relatedArticle: "/blog/umzugsangebot-pruefen-regensburg-bayern",
      relatedService: "/angebot-vergleichen-regensburg",
      CTA: { label: "Umzugsangebot prüfen", href: "/kontakt?service=angebot-pruefen&city=regensburg&intent=umzug" },
    },
    en: {
      question: "Which points belong in a comparison of moving quotes?",
      shortAnswer: "Volume, floors, carrying routes, loading access, distance, timing and included extras must be comparable.",
      detailedAnswer:
        "Check more than the final amount: compare the furniture and boxes assumed, floors, lift, carrying routes, distance and whether assembly, packing help or cleaning are included. FLOXANT provides a practical review without legal advice or a savings promise.",
      relatedArticle: null,
      relatedService: "/en/regensburg/moving-quote-review",
      CTA: { label: "Review a moving quote", href: "/kontakt?service=offer-check&city=regensburg&intent=english-moving" },
    },
  },
  {
    key: "clearance-photos-regensburg",
    category: "Fotos",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["entruempelung", "wohnungsaufloesung"],
    audience: ["Privatkunden", "Angehörige", "Hausverwaltungen"],
    intent: "Räumungsumfang mit Fotos dokumentieren",
    evidenceSource: ["lib/regensburg-service-pages.ts", "lib/faqs.ts"],
    de: {
      question: "Welche Fotos helfen bei Entrümpelung oder Wohnungsauflösung?",
      shortAnswer: "Übersichten der Räume, Keller oder Garage sowie Menge, Materialien, Laufwege und Zugang sind hilfreich.",
      detailedAnswer:
        "Fotografieren Sie jeden betroffenen Bereich aus einer übersichtlichen Perspektive und zeigen Sie größere Gegenstände, Restmengen, Treppen, Etagen und Ladewege. Sensible Dokumente, Fotos von Personen oder Wertgegenstände sollten nicht unnötig abgebildet werden.",
      relatedArticle: "/blog/umzug-reinigung-entruempelung-regensburg-koordinieren",
      relatedService: "/regensburg/entruempelung",
      CTA: { label: "Räumung beschreiben", href: "/kontakt?service=entruempelung&city=regensburg" },
    },
    en: {
      question: "Which photos help with clearance or apartment clearance?",
      shortAnswer: "Overview photos of rooms, cellars or garages plus items, materials, carrying routes and access are useful.",
      detailedAnswer:
        "Photograph each affected area from an overview perspective and show larger items, remaining quantities, stairs, floors and loading routes. Avoid unnecessarily showing personal documents, photographs of people or valuables.",
      relatedArticle: null,
      relatedService: "/en/regensburg/house-clearance",
      CTA: { label: "Describe the clearance", href: "/kontakt?service=house-clearance&city=regensburg&intent=english-house-clearance" },
    },
  },
  {
    key: "clearance-materials-regensburg",
    category: "Entsorgung",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["entruempelung", "wohnungsaufloesung"],
    audience: ["Privatkunden", "Angehörige", "Hausverwaltungen"],
    intent: "Entsorgungsgrenzen vorab klären",
    evidenceSource: ["lib/regensburg-service-pages.ts"],
    de: {
      question: "Übernimmt FLOXANT bei einer Räumung jede Art von Material?",
      shortAnswer: "Nein, Gefahrstoffe und unklare Spezialmaterialien werden ohne Prüfung nicht zugesagt.",
      detailedAnswer:
        "Normale Möbel, Hausrat und reguläre Restmengen können anhand von Fotos und Beschreibung geprüft werden. Asbest, Chemikalien, kontaminierte Materialien oder andere Gefahrstoffe benötigen eine gesonderte fachliche Klärung und werden nicht pauschal als Teil der Räumung bestätigt.",
      relatedArticle: null,
      relatedService: "/regensburg/entruempelung",
      CTA: { label: "Materialien beschreiben", href: "/kontakt?service=entruempelung&city=regensburg" },
    },
    en: {
      question: "Does FLOXANT accept every type of material during a clearance?",
      shortAnswer: "No, hazardous substances and unclear specialist materials are not accepted without a separate check.",
      detailedAnswer:
        "Normal furniture, household contents and regular remaining items can be assessed from photos and a description. Asbestos, chemicals, contaminated material and other hazardous substances require specialist clarification and are not automatically confirmed as part of the clearance.",
      relatedArticle: null,
      relatedService: "/en/regensburg/house-clearance",
      CTA: { label: "Describe the materials", href: "/kontakt?service=house-clearance&city=regensburg&intent=english-house-clearance" },
    },
  },
  {
    key: "clearance-effort-regensburg",
    category: "Preisfaktoren",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["entruempelung", "wohnungsaufloesung"],
    audience: ["Privatkunden", "Angehörige", "Hausverwaltungen"],
    intent: "Aufwandstreiber einer Räumung verstehen",
    evidenceSource: ["lib/regensburg-service-pages.ts", "lib/local-service-seo-pages.ts"],
    de: {
      question: "Was beeinflusst den Aufwand einer Entrümpelung in Regensburg?",
      shortAnswer: "Menge, Material, Gewicht, Sortierung, Etage, Laufweg, Zugang, Entsorgung und Zielzustand bestimmen den Aufwand.",
      detailedAnswer:
        "Entscheidend ist nicht nur die Wohnfläche, sondern was tatsächlich entfernt werden soll. Sperrige Stücke, Demontage, fehlender Aufzug, lange Ladewege, eingeschränkte Parkmöglichkeiten, Sortierbedarf, besondere Materialien, Zeitdruck und eine anschließende Reinigung verändern den Umfang.",
      relatedArticle: "/blog/umzug-reinigung-entruempelung-regensburg-koordinieren",
      relatedService: "/regensburg/entruempelung",
      CTA: { label: "Entrümpelungsumfang senden", href: "/kontakt?service=entruempelung&city=regensburg" },
    },
    en: {
      question: "What affects the effort required for a clearance in Regensburg?",
      shortAnswer: "Quantity, material, weight, sorting, floor, carrying route, access, disposal and intended result determine the effort.",
      detailedAnswer:
        "The relevant factor is not only the floor area but what actually needs to be removed. Bulky items, dismantling, missing lifts, long loading routes, restricted parking, sorting, special materials, time pressure and cleaning afterwards all change the scope.",
      relatedArticle: null,
      relatedService: "/en/regensburg/house-clearance",
      CTA: { label: "Send the clearance scope", href: "/kontakt?service=house-clearance&city=regensburg&intent=english-house-clearance" },
    },
  },
  {
    key: "clearance-cleaning-regensburg",
    category: "Übergabe",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["entruempelung", "wohnungsaufloesung", "reinigung"],
    audience: ["Privatkunden", "Angehörige", "Hausverwaltungen"],
    intent: "Reinigung nach Räumung vorbereiten",
    evidenceSource: ["lib/regensburg-service-pages.ts"],
    de: {
      question: "Kann nach einer Räumung auch gereinigt werden?",
      shortAnswer: "Ja, End- oder Übergabereinigung kann nach vollständiger Freigabe separat geprüft werden.",
      detailedAnswer:
        "Zuerst muss klar sein, welche Gegenstände bleiben und welche Räume freigegeben sind. Danach werden Fläche, Zustand, Restmengen, Küche, Bad, Böden, Fenster und gewünschter Zielzustand als eigener Reinigungsumfang betrachtet. Eine erfolgreiche Abnahme wird dadurch nicht garantiert.",
      relatedArticle: "/ratgeber/reinigung-nach-umzug",
      relatedService: "/regensburg/endreinigung",
      CTA: { label: "Räumung und Reinigung abstimmen", href: "/kontakt?service=entruempelung&city=regensburg&intent=reinigung-danach" },
    },
    en: {
      question: "Can cleaning be arranged after a clearance?",
      shortAnswer: "Yes, final or move-out cleaning can be assessed separately once the areas are fully released.",
      detailedAnswer:
        "First clarify which items remain and which rooms are released. The area, condition, remaining items, kitchen, bathroom, floors, windows and intended result are then treated as a separate cleaning scope. This does not guarantee acceptance by a landlord or another party.",
      relatedArticle: null,
      relatedService: "/en/regensburg/cleaning-after-moving",
      CTA: { label: "Coordinate clearance and cleaning", href: "/kontakt?service=house-clearance&city=regensburg&intent=english-clearance-cleaning" },
    },
  },
  {
    key: "clearance-sensitive-regensburg",
    category: "besondere Situationen",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["entruempelung", "wohnungsaufloesung", "diskret-service"],
    audience: ["Privatkunden", "Angehörige", "Bevollmächtigte"],
    intent: "Sensiblen Räumungsfall datensparsam anfragen",
    evidenceSource: ["lib/regensburg-service-pages.ts", "lib/service-faqs.ts"],
    de: {
      question: "Wie kann ein sensibler Räumungsfall angefragt werden?",
      shortAnswer: "Für den ersten Schritt reichen Ort, grober Umfang, Frist, Berechtigung und bevorzugter Kontaktweg.",
      detailedAnswer:
        "Private Hintergründe müssen nicht vollständig im ersten Formular erklärt werden. Wichtig sind eine berechtigte Ansprechperson, die Freigabe, betroffene Räume, grobe Menge, Zugang und Zielzustand. Weitere sensible Angaben werden nur geklärt, soweit sie für die praktische Durchführung nötig sind.",
      relatedArticle: "/blog/diskreter-umzug-sensible-situationen",
      relatedService: "/diskret-service",
      CTA: { label: "Diskrete Anfrage starten", href: "/kontakt?service=diskret-service&intent=raeumung" },
    },
    en: {
      question: "How can I request help with a sensitive clearance case?",
      shortAnswer: "For the first step, location, approximate scope, deadline, authority to act and preferred contact method are sufficient.",
      detailedAnswer:
        "You do not need to explain every private circumstance in the initial form. A responsible contact person, permission, affected rooms, approximate quantity, access and intended result are important. Further sensitive details are only clarified when needed for practical delivery.",
      relatedArticle: "/blog/remote-move-out-service",
      relatedService: "/en/regensburg/house-clearance",
      CTA: { label: "Start a discreet request", href: "/kontakt?service=house-clearance&city=regensburg&intent=english-discreet" },
    },
  },
  {
    key: "household-inspection-regensburg",
    category: "Besichtigung",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["wohnungsaufloesung"],
    audience: ["Privatkunden", "Angehörige", "Bevollmächtigte"],
    intent: "Besichtigungsbedarf einschätzen",
    evidenceSource: ["lib/regensburg-service-pages.ts"],
    de: {
      question: "Ist für eine Wohnungsauflösung immer eine Besichtigung nötig?",
      shortAnswer: "Nein, Fotos und eine klare Beschreibung reichen häufig für die erste Einschätzung.",
      detailedAnswer:
        "Eine Besichtigung kann bei größeren, unübersichtlichen oder zugangskritischen Fällen sinnvoll sein. Für den ersten Schritt helfen Raumanzahl, Fläche, Fotos, Etage, Laufweg, Menge, Freigabe und gewünschter Endzustand. Ob ein Vor-Ort-Termin nötig ist, wird danach entschieden.",
      relatedArticle: "/blog/wohnungsaufloesung-was-tun",
      relatedService: "/regensburg/wohnungsaufloesung",
      CTA: { label: "Wohnungsauflösung beschreiben", href: "/kontakt?service=wohnungsaufloesung&city=regensburg" },
    },
    en: {
      question: "Is an on-site visit always required for an apartment clearance?",
      shortAnswer: "No, photos and a clear description are often sufficient for the first assessment.",
      detailedAnswer:
        "A visit can be useful for larger, unclear or access-sensitive cases. For the first step, provide room count, size, photos, floor, carrying route, quantity, permission and intended result. The need for an on-site appointment is assessed afterwards.",
      relatedArticle: null,
      relatedService: "/en/regensburg/house-clearance",
      CTA: { label: "Describe the apartment clearance", href: "/kontakt?service=house-clearance&city=regensburg&intent=english-house-clearance" },
    },
  },
  {
    key: "household-details-regensburg",
    category: "Räumung",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["wohnungsaufloesung"],
    audience: ["Privatkunden", "Angehörige", "Bevollmächtigte"],
    intent: "Wohnungsauflösung vollständig beschreiben",
    evidenceSource: ["lib/regensburg-service-pages.ts"],
    de: {
      question: "Welche Angaben braucht FLOXANT für eine Wohnungsauflösung?",
      shortAnswer: "Ort, Räume, Fotos, Menge, Etage, Zugang, Freigabe, Ansprechpartner, Termin und Zielzustand sind wichtig.",
      detailedAnswer:
        "Beschreiben Sie die betroffenen Räume und was bleiben oder entfernt werden soll. Nennen Sie Zugang, Etage, Laufwege, mögliche sensible Gegenstände, berechtigte Ansprechperson, gewünschte Frist und ob Reinigung oder Übergabevorbereitung danach geprüft werden soll.",
      relatedArticle: "/blog/wohnungsaufloesung-was-tun",
      relatedService: "/regensburg/wohnungsaufloesung",
      CTA: { label: "Wohnungsauflösung anfragen", href: "/kontakt?service=wohnungsaufloesung&city=regensburg" },
    },
    en: {
      question: "What details does FLOXANT need for an apartment clearance?",
      shortAnswer: "Location, rooms, photos, quantity, floor, access, permission, contact person, timing and intended result are important.",
      detailedAnswer:
        "Describe the affected rooms and what should remain or be removed. Include access, floor, carrying routes, possible sensitive items, the authorised contact person, preferred deadline and whether cleaning or handover preparation should be assessed afterwards.",
      relatedArticle: null,
      relatedService: "/en/regensburg/house-clearance",
      CTA: { label: "Request apartment clearance", href: "/kontakt?service=house-clearance&city=regensburg&intent=english-house-clearance" },
    },
  },
  {
    key: "household-boundaries-regensburg",
    category: "besondere Situationen",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["wohnungsaufloesung"],
    audience: ["Privatkunden", "Angehörige", "Bevollmächtigte"],
    intent: "Leistungsgrenzen bei Nachlassfällen verstehen",
    evidenceSource: ["lib/regensburg-service-pages.ts"],
    de: {
      question: "Übernimmt FLOXANT bei Nachlassfällen auch Bewertung oder Rechtsberatung?",
      shortAnswer: "Nein, FLOXANT übernimmt keine Nachlassbewertung und ersetzt keine Rechtsberatung.",
      detailedAnswer:
        "FLOXANT kann den praktischen Ablauf von Freigabe, Räumung, Entsorgung, Reinigung und Übergabevorbereitung strukturieren. Eigentumsfragen, Wertanrechnung, Erbauseinandersetzungen und rechtliche Entscheidungen müssen unabhängig fachlich geklärt werden.",
      relatedArticle: "/blog/wohnungsaufloesung-was-tun",
      relatedService: "/regensburg/wohnungsaufloesung",
      CTA: { label: "Praktischen Umfang klären", href: "/kontakt?service=wohnungsaufloesung&city=regensburg" },
    },
    en: {
      question: "Does FLOXANT provide estate valuation or legal advice?",
      shortAnswer: "No, FLOXANT does not value an estate and does not replace legal advice.",
      detailedAnswer:
        "FLOXANT can structure the practical process of permission, clearance, disposal, cleaning and handover preparation. Ownership questions, value offsets, inheritance disputes and legal decisions require separate professional advice.",
      relatedArticle: null,
      relatedService: "/en/regensburg/house-clearance",
      CTA: { label: "Clarify the practical scope", href: "/kontakt?service=house-clearance&city=regensburg&intent=english-house-clearance" },
    },
  },
  {
    key: "offer-comparison-scope",
    category: "Angebot",
    region: ["Düsseldorf", "Regensburg", "Bayern"],
    serviceIds: ["angebot-pruefen"],
    audience: ["Privatkunden", "Unternehmen"],
    intent: "Angebote nach Leistungsumfang vergleichen",
    evidenceSource: ["app/angebot-guenstiger-pruefen/page.tsx", "lib/faqs.ts"],
    de: {
      question: "Welche Angaben machen zwei Dienstleistungsangebote vergleichbar?",
      shortAnswer: "Leistungsumfang, Menge oder Fläche, Termin, Zugang, Zusatzpositionen und gewünschtes Ergebnis müssen übereinstimmen.",
      detailedAnswer:
        "Vergleichen Sie zunächst, ob beide Angebote denselben Umfang und dieselben Annahmen abdecken. Je nach Leistung gehören Fläche, Volumen, Räume, Turnus, Etage, Laufweg, Entsorgung, Material, Termin und Zusatzleistungen dazu. Ein niedrigerer Endbetrag allein zeigt keinen gleichwertigen Umfang.",
      relatedArticle: "/blog/umzugsangebot-pruefen-regensburg-bayern",
      relatedService: "/angebot-guenstiger-pruefen",
      CTA: { label: "Angebot prüfen lassen", href: "/kontakt?service=angebot-pruefen" },
    },
    en: {
      question: "Which details make two service quotes comparable?",
      shortAnswer: "Scope, quantity or size, timing, access, extra line items and intended result need to match.",
      detailedAnswer:
        "First check whether both quotes cover the same scope and assumptions. Depending on the service, this includes area, volume, rooms, frequency, floor, carrying route, disposal, materials, timing and extras. A lower final amount alone does not show an equivalent scope.",
      relatedArticle: null,
      relatedService: "/en/regensburg/cleaning-quote-review",
      CTA: { label: "Request a quote review", href: "/kontakt?service=offer-check&intent=english-offer-check" },
    },
  },
  {
    key: "offer-no-savings-guarantee",
    category: "Angebot",
    region: ["Düsseldorf", "Regensburg", "Bayern"],
    serviceIds: ["angebot-pruefen"],
    audience: ["Privatkunden", "Unternehmen"],
    intent: "Grenzen der Angebotsprüfung verstehen",
    evidenceSource: ["app/angebot-guenstiger-pruefen/page.tsx", "lib/faqs.ts"],
    de: {
      question: "Garantiert FLOXANT bei einer Angebotsprüfung einen niedrigeren Preis?",
      shortAnswer: "Nein, FLOXANT gibt keine Preis-, Unterbietungs- oder Ersparnisgarantie.",
      detailedAnswer:
        "Die Prüfung ordnet Leistungsumfang, Preislogik, Termin, Zugang, Fotos, Zusatzkosten und offene Annahmen ein. Ob FLOXANT selbst eine passende Alternative anbieten kann, hängt zusätzlich von Region, Machbarkeit und Verfügbarkeit ab und wird nicht vorab garantiert.",
      relatedArticle: "/blog/umzugsangebot-pruefen-regensburg-bayern",
      relatedService: "/angebot-guenstiger-pruefen",
      CTA: { label: "Angebot sachlich prüfen", href: "/kontakt?service=angebot-pruefen" },
    },
    en: {
      question: "Does FLOXANT guarantee a lower price after reviewing a quote?",
      shortAnswer: "No, FLOXANT does not guarantee a lower price, underbid or savings.",
      detailedAnswer:
        "The review considers scope, price structure, timing, access, photos, extra costs and open assumptions. Whether FLOXANT can offer a suitable alternative also depends on region, feasibility and availability and is not promised in advance.",
      relatedArticle: null,
      relatedService: "/en/regensburg/cleaning-quote-review",
      CTA: { label: "Request a practical review", href: "/kontakt?service=offer-check&intent=english-offer-check" },
    },
  },
  {
    key: "offer-no-legal-advice",
    category: "Leistungen",
    region: ["Düsseldorf", "Regensburg", "Bayern"],
    serviceIds: ["angebot-pruefen"],
    audience: ["Privatkunden", "Unternehmen"],
    intent: "Angebotsprüfung von Rechtsberatung abgrenzen",
    evidenceSource: ["app/angebot-guenstiger-pruefen/page.tsx", "lib/faqs.ts"],
    de: {
      question: "Ist die FLOXANT-Angebotsprüfung eine Rechtsberatung?",
      shortAnswer: "Nein, FLOXANT prüft Angebote praktisch und organisatorisch, nicht rechtlich.",
      detailedAnswer:
        "FLOXANT kann unklare Leistungspositionen, fehlende Eckdaten, wichtige Kostenfaktoren und Rückfragen sichtbar machen. Vertragsauslegung, Kündigungen, Haftung, Streitfragen oder rechtliche Bewertungen gehören nicht zu dieser Leistung und müssen fachlich oder juristisch geklärt werden.",
      relatedArticle: null,
      relatedService: "/angebot-guenstiger-pruefen",
      CTA: { label: "Praktische Prüfung starten", href: "/kontakt?service=angebot-pruefen" },
    },
    en: {
      question: "Is the FLOXANT quote review legal advice?",
      shortAnswer: "No, FLOXANT reviews quotes from a practical and organisational perspective, not a legal one.",
      detailedAnswer:
        "FLOXANT can identify unclear scope, missing details, effort factors and useful follow-up questions. Contract interpretation, termination, liability, disputes and legal assessments are outside this service and require separate professional advice.",
      relatedArticle: null,
      relatedService: "/en/regensburg/cleaning-quote-review",
      CTA: { label: "Start a practical review", href: "/kontakt?service=offer-check&intent=english-offer-check" },
    },
  },
  {
    key: "offer-without-document",
    category: "Angebot",
    region: ["Düsseldorf", "Regensburg", "Bayern"],
    serviceIds: ["angebot-pruefen"],
    audience: ["Privatkunden", "Unternehmen"],
    intent: "Anfrage ohne schriftliches Angebot vorbereiten",
    evidenceSource: ["app/angebot-guenstiger-pruefen/page.tsx", "lib/faqs.ts"],
    de: {
      question: "Kann ich auch ohne schriftliches Angebot anfragen?",
      shortAnswer: "Ja, eine Preisangabe, Beschreibung, Fotos, Ort, Termin und offene Frage reichen für eine erste Einordnung.",
      detailedAnswer:
        "Wenn kein Dokument vorliegt, beschreiben Sie die angebotene Leistung so genau wie möglich. Nennen Sie Preisrahmen, Umfang, Ort, Termin, Zugang, Fotos und die Punkte, die unklar wirken. Die Rückmeldung bleibt eine erste praktische Einordnung und keine Zusage.",
      relatedArticle: null,
      relatedService: "/angebot-guenstiger-pruefen",
      CTA: { label: "Eckdaten senden", href: "/kontakt?service=angebot-pruefen" },
    },
    en: {
      question: "Can I ask for a review without a written quote?",
      shortAnswer: "Yes, a stated price, description, photos, location, timing and your open question are enough for an initial review.",
      detailedAnswer:
        "If there is no document, describe the proposed service as precisely as possible. Include the price range, scope, location, timing, access, photos and the points that seem unclear. The response remains an initial practical assessment, not a confirmation.",
      relatedArticle: null,
      relatedService: "/en/regensburg/cleaning-quote-review",
      CTA: { label: "Send the key details", href: "/kontakt?service=offer-check&intent=english-offer-check" },
    },
  },
  {
    key: "moving-from-to-regensburg",
    category: "Servicegebiet",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["umzug"],
    audience: ["Privatkunden", "Unternehmen"],
    intent: "Umzug innerhalb, aus oder nach Regensburg einordnen",
    evidenceSource: ["app/regensburg/umzug/page.tsx", "app/umzug-regensburg/anfrage/page.tsx"],
    reviewedAt: "2026-07-26",
    de: {
      question: "Kann ich einen Umzug innerhalb, aus oder nach Regensburg anfragen?",
      shortAnswer: "Ja, wenn Start oder Ziel im bedienten Regensburger Gebiet liegt und die Strecke mit den übrigen Eckdaten geprüft werden kann.",
      detailedAnswer:
        "Nennen Sie Start, Ziel, gewünschten Zeitraum, Umfang, Etagen, Aufzug und Zugang. FLOXANT prüft dann die konkrete Strecke und Kapazität. Aus der Anfrage entsteht noch keine Zusage für jeden Ort oder Termin.",
      relatedArticle: "/blog/umzug-regensburg-laengere-strecke",
      relatedService: "/regensburg/umzug",
      CTA: { label: "Strecke beschreiben", href: "/umzug-regensburg/anfrage" },
    },
    en: {
      question: "Can I request a move within, from or to Regensburg?",
      shortAnswer: "Yes, if the origin or destination is in the served Regensburg area and the route can be reviewed with the other details.",
      detailedAnswer:
        "Provide the origin, destination, preferred period, volume, floors, lift and access. FLOXANT then reviews the specific route and capacity. The request is not a confirmation for every location or date.",
      relatedArticle: "/en/blog/request-moving-quote-regensburg",
      relatedService: "/en/regensburg/moving",
      CTA: { label: "Describe the route", href: "/kontakt?service=moving&city=regensburg&intent=english-moving" },
    },
  },
  {
    key: "moving-long-distance-regensburg",
    category: "Servicegebiet",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["umzug"],
    audience: ["Privatkunden", "Unternehmen"],
    intent: "Längere Umzugsstrecke realistisch anfragen",
    evidenceSource: ["app/regensburg/umzug/page.tsx", "app/umzug-regensburg/anfrage/page.tsx"],
    reviewedAt: "2026-07-26",
    de: {
      question: "Sind von Regensburg aus auch längere Umzugsstrecken möglich?",
      shortAnswer: "Umzüge mit Start oder Ziel im bedienten Regensburger Gebiet können auch über längere Strecken angefragt werden.",
      detailedAnswer:
        "Die Angabe beschreibt eine mögliche Anfrage, keinen garantierten Radius. Entscheidend sind die konkrete Route, Volumen, Zugänge, Zeitraum, Fahrzeugbedarf und verfügbare Kapazität.",
      relatedArticle: "/blog/umzug-regensburg-laengere-strecke",
      relatedService: "/regensburg/umzug",
      CTA: { label: "Längere Strecke anfragen", href: "/umzug-regensburg/anfrage" },
    },
    en: {
      question: "Can I request a longer-distance move from Regensburg?",
      shortAnswer: "Moves with an origin or destination in the served Regensburg area can also be requested for longer routes.",
      detailedAnswer:
        "This describes a possible enquiry, not a guaranteed radius. The specific route, volume, access, timing, vehicle requirements and available capacity must be reviewed.",
      relatedArticle: "/en/blog/request-moving-quote-regensburg",
      relatedService: "/en/regensburg/moving",
      CTA: { label: "Request a longer route", href: "/kontakt?service=moving&city=regensburg&intent=english-moving" },
    },
  },
  {
    key: "moving-floors-lift-regensburg",
    category: "Zugang",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["umzug", "moebeltransport"],
    audience: ["Privatkunden", "Unternehmen"],
    intent: "Etagen und Aufzug eindeutig angeben",
    evidenceSource: ["app/regensburg/umzug/page.tsx", "lib/request-checklists.ts"],
    reviewedAt: "2026-07-26",
    de: {
      question: "Wie gebe ich Etagen und Aufzug für einen Umzug richtig an?",
      shortAnswer: "Nennen Sie Start- und Zieletage getrennt und beschreiben Sie, ob ein nutzbarer Aufzug vorhanden ist.",
      detailedAnswer:
        "Ergänzen Sie Treppenform, Aufzuggröße, Laufweg, Haustür, Innenhof und Haltemöglichkeit, wenn diese Punkte den Transport beeinflussen. Fotos helfen besonders bei engen oder schwer beschreibbaren Zugängen.",
      relatedArticle: "/blog/etage-aufzug-umzugsanfrage",
      relatedService: "/regensburg/umzug",
      CTA: { label: "Zugänge angeben", href: "/umzug-regensburg/anfrage" },
    },
    en: {
      question: "How should I describe floors and lifts for a move?",
      shortAnswer: "State the origin and destination floors separately and say whether a usable lift is available.",
      detailedAnswer:
        "Add the stair layout, lift size, carrying route, entrance, courtyard and loading access where relevant. Photos are particularly useful for narrow or difficult-to-describe access.",
      relatedArticle: "/en/blog/ten-details-clear-moving-request",
      relatedService: "/en/regensburg/moving",
      CTA: { label: "Describe the access", href: "/kontakt?service=moving&city=regensburg&intent=english-moving" },
    },
  },
  {
    key: "moving-assembly-regensburg",
    category: "Leistungen",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["umzug", "moebeltransport"],
    audience: ["Privatkunden", "Unternehmen"],
    intent: "Demontage und Montage abgrenzen",
    evidenceSource: ["app/regensburg/umzug/page.tsx", "lib/request-checklists.ts"],
    reviewedAt: "2026-07-26",
    de: {
      question: "Sind Demontage und Montage bei einem Umzug automatisch enthalten?",
      shortAnswer: "Nein, betroffene Möbel und der gewünschte Arbeitsumfang müssen ausdrücklich genannt werden.",
      detailedAnswer:
        "Listen Sie Schränke, Betten, Tische oder andere Möbel einzeln auf und geben Sie Besonderheiten, Maße und vorhandene Anleitungen an. Elektro-, Sanitär- oder Küchenanschlüsse sind nicht automatisch Teil einer Möbelmontage.",
      relatedArticle: "/blog/demontage-montage-umzug-anfragen",
      relatedService: "/regensburg/umzug",
      CTA: { label: "Montagebedarf beschreiben", href: "/umzug-regensburg/anfrage" },
    },
    en: {
      question: "Are dismantling and assembly automatically included in a move?",
      shortAnswer: "No, the relevant furniture and requested work must be stated explicitly.",
      detailedAnswer:
        "List wardrobes, beds, tables and other furniture separately and include special features, dimensions and available instructions. Electrical, plumbing or kitchen connections are not automatically part of furniture assembly.",
      relatedArticle: "/en/blog/ten-details-clear-moving-request",
      relatedService: "/en/regensburg/moving",
      CTA: { label: "Describe assembly needs", href: "/kontakt?service=moving&city=regensburg&intent=english-moving" },
    },
  },
  {
    key: "piano-details-regensburg",
    category: "Umzug",
    region: ["Regensburg", "Bayern"],
    serviceIds: ["klaviertransport", "umzug"],
    audience: ["Privatkunden", "Unternehmen"],
    intent: "Klaviertransport mit geeigneten Angaben vorbereiten",
    evidenceSource: ["app/klaviertransport-regensburg/page.tsx", "lib/request-checklists.ts"],
    reviewedAt: "2026-07-26",
    de: {
      question: "Welche Angaben helfen bei einer Klaviertransport-Anfrage?",
      shortAnswer: "Instrumentart, Maße, Gewicht, Start, Ziel, Etagen, Aufzug, Treppen und Fotos der Zugänge sind wichtig.",
      detailedAnswer:
        "Zeigen Sie das Instrument und die vollständigen Wege an Start und Ziel. Enge Kurven, Stufen, Türbreiten und besondere Bodenverhältnisse sollten sichtbar oder beschrieben sein. Die Machbarkeit wird anhand dieser Angaben geprüft.",
      relatedArticle: "/blog/klaviertransport-regensburg-vorbereiten",
      relatedService: "/klaviertransport-regensburg",
      CTA: { label: "Klaviertransport vorbereiten", href: "/kontakt?service=klaviertransport&city=regensburg" },
    },
    en: {
      question: "Which details help with a piano transport request?",
      shortAnswer: "Instrument type, dimensions, weight, origin, destination, floors, lift, stairs and access photos are important.",
      detailedAnswer:
        "Show the instrument and the complete routes at origin and destination. Narrow turns, steps, door widths and unusual flooring should be visible or described. Feasibility is reviewed from these details.",
      relatedArticle: "/en/blog/ten-details-clear-moving-request",
      relatedService: "/en/regensburg/piano-transport",
      CTA: { label: "Prepare piano transport", href: "/kontakt?service=piano-transport&city=regensburg&intent=english-moving" },
    },
  },
  {
    key: "practice-areas-duesseldorf",
    category: "Praxis",
    region: ["Düsseldorf"],
    serviceIds: ["praxisreinigung", "reinigung"],
    audience: ["Praxen", "Praxismanagement"],
    intent: "Praxisbereiche für eine Reinigungsanfrage abgrenzen",
    evidenceSource: ["app/duesseldorf/praxisreinigung/page.tsx", "lib/services/service-registry.ts"],
    reviewedAt: "2026-07-26",
    de: {
      question: "Welche Bereiche sollte eine Praxis in der Reinigungsanfrage nennen?",
      shortAnswer: "Empfang, Wartebereich, Behandlungsräume, Sanitär, Personalräume und Nebenflächen sollten getrennt beschrieben werden.",
      detailedAnswer:
        "Nennen Sie Fläche, Nutzung, Turnus, Zugangszeiten und interne Vorgaben je Bereich. Allgemeine Reinigung, gesonderte Desinfektionsanforderungen und medizinische Prozesse dürfen nicht unklar miteinander vermischt werden.",
      relatedArticle: "/blog/praxisreinigung-duesseldorf-bereiche",
      relatedService: "/duesseldorf/praxisreinigung",
      CTA: { label: "Praxisreinigung anfragen", href: "/kontakt?service=praxisreinigung&city=duesseldorf" },
    },
    en: {
      question: "Which areas should a medical practice include in a cleaning request?",
      shortAnswer: "Reception, waiting areas, treatment rooms, washrooms, staff rooms and ancillary spaces should be described separately.",
      detailedAnswer:
        "State the area, use, frequency, access times and internal requirements for each zone. General cleaning, separate disinfection requirements and medical processes must not be mixed into an unclear scope.",
      relatedArticle: "/en/blog/request-office-cleaning-duesseldorf",
      relatedService: "/en/duesseldorf/practice-cleaning",
      CTA: { label: "Request practice cleaning", href: "/kontakt?service=practice-cleaning&city=duesseldorf&intent=english-cleaning" },
    },
  },
  {
    key: "window-frame-scope-duesseldorf",
    category: "Fenster",
    region: ["Düsseldorf"],
    serviceIds: ["fensterreinigung", "reinigung"],
    audience: ["Privatkunden", "Unternehmen", "Hausverwaltungen"],
    intent: "Glas, Rahmen und Zugang unterscheiden",
    evidenceSource: ["app/duesseldorf/fensterreinigung/page.tsx", "lib/services/service-registry.ts"],
    reviewedAt: "2026-07-26",
    de: {
      question: "Wie beschreibe ich Glas, Rahmen und Zugänglichkeit für eine Fensterreinigung?",
      shortAnswer: "Fensterzahl, Glasflächen, Rahmen und Falze sowie Etage, Öffnungsart und sichere Zugänge sollten getrennt angegeben werden.",
      detailedAnswer:
        "Fotos von innen und außen helfen bei großen, geteilten oder schwer erreichbaren Flächen. Rahmen, Falze, Jalousien oder besondere Höhen sind nicht automatisch enthalten und müssen ausdrücklich geprüft werden.",
      relatedArticle: "/blog/fensterreinigung-duesseldorf-zugang",
      relatedService: "/duesseldorf/fensterreinigung",
      CTA: { label: "Fensterumfang beschreiben", href: "/kontakt?service=fensterreinigung&city=duesseldorf" },
    },
    en: {
      question: "How should I describe glass, frames and access for window cleaning?",
      shortAnswer: "State the number of windows, glass areas, frames and rebates plus floor, opening method and safe access separately.",
      detailedAnswer:
        "Photos from inside and outside help with large, divided or difficult-to-reach areas. Frames, rebates, blinds and work at height are not automatically included and must be reviewed explicitly.",
      relatedArticle: "/en/blog/request-office-cleaning-duesseldorf",
      relatedService: "/en/duesseldorf/window-cleaning",
      CTA: { label: "Describe the window scope", href: "/kontakt?service=window-cleaning&city=duesseldorf&intent=english-cleaning" },
    },
  },
  {
    key: "construction-cleaning-duesseldorf",
    category: "Reinigung",
    region: ["Düsseldorf"],
    serviceIds: ["baureinigung", "grundreinigung"],
    audience: ["Unternehmen", "Bauverantwortliche", "Hausverwaltungen"],
    intent: "Bauendreinigung und Baufeinreinigung unterscheiden",
    evidenceSource: ["app/duesseldorf/baureinigung/page.tsx", "lib/services/service-registry.ts"],
    reviewedAt: "2026-07-26",
    de: {
      question: "Wie unterscheiden sich Bauendreinigung und Baufeinreinigung in der Anfrage?",
      shortAnswer: "Entscheidend sind Bauphase, vorhandene Restarbeiten, Verschmutzung, Oberflächen und der gewünschte Übergabezustand.",
      detailedAnswer:
        "Beschreiben Sie, ob grobe Baustellenreste, Staub, Schutzfolien, Kleberückstände oder eine abschließende Feinreinigung gemeint sind. Gefahrstoffe, Mängelbeseitigung und Handwerkerarbeiten sind nicht automatisch Teil der Reinigung.",
      relatedArticle: "/blog/bauendreinigung-baufeinreinigung-duesseldorf",
      relatedService: "/duesseldorf/baureinigung",
      CTA: { label: "Bauphase beschreiben", href: "/kontakt?service=baureinigung&city=duesseldorf" },
    },
    en: {
      question: "How should final construction cleaning and fine cleaning be distinguished?",
      shortAnswer: "The construction phase, remaining work, soiling, surfaces and intended handover condition must be described.",
      detailedAnswer:
        "Explain whether the scope includes coarse site residue, dust, protective film, adhesive residue or final fine cleaning. Hazardous substances, defect correction and trade work are not automatically part of cleaning.",
      relatedArticle: "/en/blog/compare-cleaning-quotes-germany",
      relatedService: "/en/duesseldorf/construction-cleaning",
      CTA: { label: "Describe the construction phase", href: "/kontakt?service=construction-cleaning&city=duesseldorf&intent=english-cleaning" },
    },
  },
  {
    key: "cleaning-material-duesseldorf",
    category: "Material",
    region: ["Düsseldorf"],
    serviceIds: ["reinigung", "bueroreinigung", "gewerbereinigung"],
    audience: ["Unternehmen", "Hausverwaltungen", "Privatkunden"],
    intent: "Reinigungsmaterial und Verbrauchsmittel klären",
    evidenceSource: ["app/duesseldorf/reinigung/page.tsx", "lib/services/service-registry.ts"],
    reviewedAt: "2026-07-26",
    de: {
      question: "Sind Reinigungsmittel und Verbrauchsmaterial automatisch enthalten?",
      shortAnswer: "Nicht immer; Mittel, Geräte und Verbrauchsmaterial sollten im gewünschten Leistungsumfang ausdrücklich zugeordnet werden.",
      detailedAnswer:
        "Klären Sie, welche Reinigungsmittel und Geräte gestellt werden und ob Papier, Seife, Müllbeutel oder andere Verbrauchsartikel dazugehören. Besondere Oberflächen oder interne Produktvorgaben müssen vorab genannt werden.",
      relatedArticle: "/blog/bueroreinigung-duesseldorf-anfrage",
      relatedService: "/duesseldorf/reinigung",
      CTA: { label: "Material klären", href: "/kontakt?service=reinigung&city=duesseldorf" },
    },
    en: {
      question: "Are cleaning products and consumables automatically included?",
      shortAnswer: "Not always; products, equipment and consumables should be assigned explicitly in the requested scope.",
      detailedAnswer:
        "Clarify who supplies cleaning products and equipment and whether paper, soap, bin liners or other consumables are included. Special surfaces and internal product requirements must be stated in advance.",
      relatedArticle: "/en/blog/compare-cleaning-quotes-germany",
      relatedService: "/en/duesseldorf/cleaning",
      CTA: { label: "Clarify materials", href: "/kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning" },
    },
  },
  {
    key: "cleaning-photos-visit-duesseldorf",
    category: "Besichtigung",
    region: ["Düsseldorf"],
    serviceIds: ["reinigung", "bueroreinigung", "gewerbereinigung"],
    audience: ["Unternehmen", "Hausverwaltungen", "Privatkunden"],
    intent: "Fotos und mögliche Besichtigung sinnvoll nutzen",
    evidenceSource: ["app/duesseldorf/reinigung/page.tsx", "lib/content/faq-registry.ts"],
    reviewedAt: "2026-07-26",
    de: {
      question: "Reichen Fotos für eine Reinigungsanfrage oder ist eine Besichtigung nötig?",
      shortAnswer: "Fotos und klare Eckdaten reichen oft für den Start; ob eine Besichtigung sinnvoll ist, hängt von Objekt und Umfang ab.",
      detailedAnswer:
        "Zeigen Sie typische Räume, Böden, Sanitär, Küche, Fenster, Zugänge und auffällige Bereiche. Bei größeren, wiederkehrenden oder schwer abgrenzbaren Objekten kann eine gesondert abgestimmte Besichtigung für den Leistungsumfang hilfreich sein.",
      relatedArticle: "/blog/reinigungsanfrage-duesseldorf-fotos",
      relatedService: "/duesseldorf/reinigung",
      CTA: { label: "Objekt beschreiben", href: "/kontakt?service=reinigung&city=duesseldorf" },
    },
    en: {
      question: "Are photos enough for a cleaning request, or is a site visit needed?",
      shortAnswer: "Photos and clear details are often enough to start; whether a visit is useful depends on the property and scope.",
      detailedAnswer:
        "Show typical rooms, floors, washrooms, kitchen, windows, access and unusual areas. For larger, recurring or difficult-to-define properties, a separately arranged visit may help to clarify the scope.",
      relatedArticle: "/en/blog/request-office-cleaning-duesseldorf",
      relatedService: "/en/duesseldorf/cleaning",
      CTA: { label: "Describe the property", href: "/kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning" },
    },
  },
];

function buildFaqPair(seed: FaqPairSeed): [FaqRegistryEntry, FaqRegistryEntry] {
  const deId = `faq-${seed.key}-de`;
  const enId = `faq-${seed.key}-en`;
  const shared = {
    category: seed.category,
    region: seed.region,
    serviceIds: seed.serviceIds,
    audience: seed.audience,
    intent: seed.intent,
    evidenceSource: seed.evidenceSource,
    verified: true,
    reviewedAt: seed.reviewedAt ?? REVIEWED_AT,
    owner: OWNER,
    publicAllowed: true,
  } as const;

  return [
    { id: deId, locale: "de", ...shared, ...seed.de, alternateLocaleId: enId },
    { id: enId, locale: "en", ...shared, ...seed.en, alternateLocaleId: deId },
  ];
}

export const faqRegistry: readonly FaqRegistryEntry[] = faqPairSeeds.flatMap(buildFaqPair);

export const publicFaqs: readonly FaqRegistryEntry[] = faqRegistry.filter(
  (faq) => faq.publicAllowed && faq.verified,
);

export const priorityFaqAssignments: readonly PriorityFaqAssignment[] = [
  {
    route: "/",
    locale: "de",
    pageType: "home",
    status: "ACTIVE",
    faqIds: [
      "faq-request-next-step-de",
      "faq-cleaning-details-duesseldorf-de",
      "faq-office-scope-de",
      "faq-moving-details-regensburg-de",
      "faq-clearance-photos-regensburg-de",
      "faq-offer-comparison-scope-de",
    ],
    schemaFaqIds: ["faq-request-next-step-de", "faq-offer-comparison-scope-de"],
  },
  {
    route: "/duesseldorf/reinigung",
    locale: "de",
    pageType: "service-hub",
    status: "ACTIVE",
    faqIds: [
      "faq-cleaning-details-duesseldorf-de",
      "faq-cleaning-effort-duesseldorf-de",
      "faq-cleaning-quote-duesseldorf-de",
      "faq-cleaning-scope-boundary-de",
      "faq-cleaning-material-duesseldorf-de",
      "faq-cleaning-photos-visit-duesseldorf-de",
      "faq-request-photos-de",
      "faq-request-next-step-de",
    ],
    schemaFaqIds: [
      "faq-cleaning-details-duesseldorf-de",
      "faq-cleaning-effort-duesseldorf-de",
      "faq-cleaning-quote-duesseldorf-de",
      "faq-cleaning-scope-boundary-de",
      "faq-cleaning-material-duesseldorf-de",
      "faq-cleaning-photos-visit-duesseldorf-de",
      "faq-request-photos-de",
      "faq-request-next-step-de",
    ],
  },
  {
    route: "/reinigung-moeblierte-wohnung-duesseldorf",
    locale: "de",
    pageType: "service",
    status: "ACTIVE",
    faqIds: [
      "faq-apartment-cleaning-details-duesseldorf-de",
      "faq-guest-turnover-scope-de",
      "faq-guest-turnover-access-de",
      "faq-guest-turnover-platform-boundary-de",
      "faq-request-next-step-de",
    ],
    schemaFaqIds: [
      "faq-apartment-cleaning-details-duesseldorf-de",
      "faq-guest-turnover-scope-de",
      "faq-guest-turnover-access-de",
      "faq-guest-turnover-platform-boundary-de",
      "faq-request-next-step-de",
    ],
  },
  {
    route: "/reinigung-moeblierte-wohnung-regensburg",
    locale: "de",
    pageType: "service",
    status: "ACTIVE",
    faqIds: [
      "faq-apartment-cleaning-details-regensburg-de",
      "faq-guest-turnover-scope-de",
      "faq-guest-turnover-access-de",
      "faq-guest-turnover-platform-boundary-de",
      "faq-request-next-step-de",
    ],
    schemaFaqIds: [
      "faq-apartment-cleaning-details-regensburg-de",
      "faq-guest-turnover-scope-de",
      "faq-guest-turnover-access-de",
      "faq-guest-turnover-platform-boundary-de",
      "faq-request-next-step-de",
    ],
  },
  {
    route: "/duesseldorf/bueroreinigung",
    locale: "de",
    pageType: "service",
    status: "ACTIVE",
    faqIds: [
      "faq-office-scope-de",
      "faq-office-frequency-de",
      "faq-office-access-de",
      "faq-office-quote-de",
      "faq-cleaning-effort-duesseldorf-de",
      "faq-request-next-step-de",
    ],
    schemaFaqIds: [
      "faq-office-scope-de",
      "faq-office-frequency-de",
      "faq-office-access-de",
      "faq-office-quote-de",
      "faq-cleaning-effort-duesseldorf-de",
      "faq-request-next-step-de",
    ],
  },
  {
    route: "/duesseldorf/praxisreinigung",
    locale: "de",
    pageType: "service",
    status: "ACTIVE",
    faqIds: [
      "faq-practice-details-duesseldorf-de",
      "faq-practice-areas-duesseldorf-de",
      "faq-practice-boundaries-duesseldorf-de",
      "faq-office-frequency-de",
      "faq-office-access-de",
      "faq-cleaning-quote-duesseldorf-de",
    ],
    schemaFaqIds: [
      "faq-practice-details-duesseldorf-de",
      "faq-practice-areas-duesseldorf-de",
      "faq-practice-boundaries-duesseldorf-de",
      "faq-office-frequency-de",
      "faq-office-access-de",
      "faq-cleaning-quote-duesseldorf-de",
    ],
  },
  {
    route: "/duesseldorf/fensterreinigung",
    locale: "de",
    pageType: "service",
    status: "ACTIVE",
    faqIds: [
      "faq-window-details-duesseldorf-de",
      "faq-window-frame-scope-duesseldorf-de",
      "faq-window-scope-duesseldorf-de",
      "faq-window-access-duesseldorf-de",
      "faq-cleaning-quote-duesseldorf-de",
      "faq-request-next-step-de",
    ],
    schemaFaqIds: [
      "faq-window-details-duesseldorf-de",
      "faq-window-frame-scope-duesseldorf-de",
      "faq-window-scope-duesseldorf-de",
      "faq-window-access-duesseldorf-de",
      "faq-cleaning-quote-duesseldorf-de",
      "faq-request-next-step-de",
    ],
  },
  {
    route: "/duesseldorf/baureinigung",
    locale: "de",
    pageType: "service",
    status: "ACTIVE",
    faqIds: [
      "faq-construction-cleaning-duesseldorf-de",
      "faq-cleaning-details-duesseldorf-de",
      "faq-cleaning-effort-duesseldorf-de",
      "faq-cleaning-scope-boundary-de",
      "faq-cleaning-photos-visit-duesseldorf-de",
      "faq-request-next-step-de",
    ],
    schemaFaqIds: [
      "faq-construction-cleaning-duesseldorf-de",
      "faq-cleaning-details-duesseldorf-de",
      "faq-cleaning-effort-duesseldorf-de",
      "faq-cleaning-scope-boundary-de",
      "faq-cleaning-photos-visit-duesseldorf-de",
      "faq-request-next-step-de",
    ],
  },
  {
    route: "/regensburg/umzug",
    locale: "de",
    pageType: "service-hub",
    status: "ACTIVE",
    faqIds: [
      "faq-moving-details-regensburg-de",
      "faq-moving-from-to-regensburg-de",
      "faq-moving-long-distance-regensburg-de",
      "faq-moving-floors-lift-regensburg-de",
      "faq-moving-assembly-regensburg-de",
      "faq-piano-details-regensburg-de",
      "faq-moving-effort-regensburg-de",
      "faq-moving-combined-regensburg-de",
    ],
    schemaFaqIds: [
      "faq-moving-details-regensburg-de",
      "faq-moving-from-to-regensburg-de",
      "faq-moving-long-distance-regensburg-de",
      "faq-moving-floors-lift-regensburg-de",
      "faq-moving-assembly-regensburg-de",
      "faq-piano-details-regensburg-de",
      "faq-moving-effort-regensburg-de",
      "faq-moving-combined-regensburg-de",
    ],
  },
  {
    route: "/umzug-regensburg/anfrage",
    locale: "de",
    pageType: "service",
    status: "ACTIVE",
    faqIds: [
      "faq-moving-details-regensburg-de",
      "faq-moving-from-to-regensburg-de",
      "faq-moving-long-distance-regensburg-de",
      "faq-moving-floors-lift-regensburg-de",
      "faq-moving-assembly-regensburg-de",
      "faq-piano-details-regensburg-de",
      "faq-moving-effort-regensburg-de",
      "faq-moving-combined-regensburg-de",
    ],
    schemaFaqIds: [],
    note: "Conversion-nahe FAQ für die noindex-Anfrageseite; bewusst ohne FAQ-Schema.",
  },
  {
    route: "/regensburg/entruempelung",
    locale: "de",
    pageType: "service",
    status: "ACTIVE",
    faqIds: [
      "faq-clearance-photos-regensburg-de",
      "faq-clearance-materials-regensburg-de",
      "faq-clearance-effort-regensburg-de",
      "faq-clearance-cleaning-regensburg-de",
      "faq-clearance-sensitive-regensburg-de",
      "faq-request-next-step-de",
    ],
    schemaFaqIds: [
      "faq-clearance-photos-regensburg-de",
      "faq-clearance-materials-regensburg-de",
      "faq-clearance-effort-regensburg-de",
      "faq-clearance-cleaning-regensburg-de",
      "faq-clearance-sensitive-regensburg-de",
      "faq-request-next-step-de",
    ],
  },
  {
    route: "/regensburg/wohnungsaufloesung",
    locale: "de",
    pageType: "service",
    status: "ACTIVE",
    faqIds: [
      "faq-household-inspection-regensburg-de",
      "faq-household-details-regensburg-de",
      "faq-household-boundaries-regensburg-de",
      "faq-clearance-sensitive-regensburg-de",
      "faq-clearance-cleaning-regensburg-de",
      "faq-request-next-step-de",
    ],
    schemaFaqIds: [
      "faq-household-inspection-regensburg-de",
      "faq-household-details-regensburg-de",
      "faq-household-boundaries-regensburg-de",
      "faq-clearance-sensitive-regensburg-de",
      "faq-clearance-cleaning-regensburg-de",
      "faq-request-next-step-de",
    ],
  },
  {
    route: "/angebot-guenstiger-pruefen",
    locale: "de",
    pageType: "offer-service",
    status: "ACTIVE",
    faqIds: [
      "faq-offer-comparison-scope-de",
      "faq-offer-no-savings-guarantee-de",
      "faq-offer-no-legal-advice-de",
      "faq-offer-without-document-de",
      "faq-cleaning-quote-duesseldorf-de",
      "faq-moving-quote-regensburg-de",
    ],
    schemaFaqIds: [
      "faq-offer-comparison-scope-de",
      "faq-offer-no-savings-guarantee-de",
      "faq-offer-no-legal-advice-de",
      "faq-offer-without-document-de",
      "faq-cleaning-quote-duesseldorf-de",
      "faq-moving-quote-regensburg-de",
    ],
  },
  {
    route: "/en",
    locale: "en",
    pageType: "english-hub",
    status: "ACTIVE",
    faqIds: [
      "faq-request-next-step-en",
      "faq-request-photos-en",
      "faq-cleaning-scope-boundary-en",
      "faq-moving-details-regensburg-en",
      "faq-clearance-photos-regensburg-en",
      "faq-offer-comparison-scope-en",
    ],
    schemaFaqIds: ["faq-request-next-step-en", "faq-offer-comparison-scope-en"],
  },
  {
    route: "/en/regensburg/office-cleaning",
    locale: "en",
    pageType: "english-service",
    status: "ACTIVE",
    faqIds: [
      "faq-office-scope-en",
      "faq-office-frequency-en",
      "faq-office-access-en",
      "faq-office-quote-en",
      "faq-request-photos-en",
    ],
    schemaFaqIds: [
      "faq-office-scope-en",
      "faq-office-frequency-en",
      "faq-office-access-en",
      "faq-office-quote-en",
      "faq-request-photos-en",
    ],
  },
  {
    route: "/en/regensburg/move-out-cleaning",
    locale: "en",
    pageType: "english-service",
    status: "ACTIVE",
    faqIds: [
      "faq-cleaning-scope-boundary-en",
      "faq-request-photos-en",
      "faq-clearance-cleaning-regensburg-en",
      "faq-office-access-en",
      "faq-request-next-step-en",
    ],
    schemaFaqIds: [
      "faq-cleaning-scope-boundary-en",
      "faq-request-photos-en",
      "faq-clearance-cleaning-regensburg-en",
      "faq-office-access-en",
      "faq-request-next-step-en",
    ],
  },
  {
    route: "/en/regensburg/moving",
    locale: "en",
    pageType: "english-service",
    status: "ACTIVE",
    faqIds: [
      "faq-moving-details-regensburg-en",
      "faq-moving-from-to-regensburg-en",
      "faq-moving-long-distance-regensburg-en",
      "faq-moving-floors-lift-regensburg-en",
      "faq-moving-assembly-regensburg-en",
      "faq-piano-details-regensburg-en",
      "faq-moving-effort-regensburg-en",
      "faq-moving-combined-regensburg-en",
    ],
    schemaFaqIds: [
      "faq-moving-details-regensburg-en",
      "faq-moving-from-to-regensburg-en",
      "faq-moving-long-distance-regensburg-en",
      "faq-moving-floors-lift-regensburg-en",
      "faq-moving-assembly-regensburg-en",
      "faq-piano-details-regensburg-en",
      "faq-moving-effort-regensburg-en",
      "faq-moving-combined-regensburg-en",
    ],
  },
  {
    route: "/en/regensburg/house-clearance",
    locale: "en",
    pageType: "english-service",
    status: "ACTIVE",
    faqIds: [
      "faq-clearance-photos-regensburg-en",
      "faq-clearance-materials-regensburg-en",
      "faq-clearance-effort-regensburg-en",
      "faq-clearance-cleaning-regensburg-en",
      "faq-clearance-sensitive-regensburg-en",
      "faq-household-boundaries-regensburg-en",
    ],
    schemaFaqIds: [
      "faq-clearance-photos-regensburg-en",
      "faq-clearance-materials-regensburg-en",
      "faq-clearance-effort-regensburg-en",
      "faq-clearance-cleaning-regensburg-en",
      "faq-clearance-sensitive-regensburg-en",
      "faq-household-boundaries-regensburg-en",
    ],
  },
  {
    route: "/duesseldorf/grundreinigung",
    locale: "de",
    pageType: "service",
    status: "PLANNED",
    faqIds: [
      "faq-cleaning-details-duesseldorf-de",
      "faq-cleaning-effort-duesseldorf-de",
      "faq-cleaning-scope-boundary-de",
      "faq-request-photos-de",
    ],
    schemaFaqIds: [],
    note: "Route war beim Review nicht vorhanden; Zuordnung erst bei redaktionell freigegebener Seite aktivieren.",
  },
  {
    route: "/duesseldorf/unterhaltsreinigung",
    locale: "de",
    pageType: "service",
    status: "PLANNED",
    faqIds: ["faq-office-frequency-de", "faq-office-access-de", "faq-office-scope-de", "faq-office-quote-de"],
    schemaFaqIds: [],
    note: "Route war beim Review nicht vorhanden; Zuordnung erst bei redaktionell freigegebener Seite aktivieren.",
  },
  {
    route: "/duesseldorf/bauendreinigung",
    locale: "de",
    pageType: "service",
    status: "PLANNED",
    faqIds: [
      "faq-cleaning-details-duesseldorf-de",
      "faq-cleaning-effort-duesseldorf-de",
      "faq-cleaning-scope-boundary-de",
      "faq-request-photos-de",
    ],
    schemaFaqIds: [],
    note: "Route war beim Review nicht vorhanden; Zuordnung erst bei redaktionell freigegebener Seite aktivieren.",
  },
  {
    route: "/anbieter-vergleichen",
    locale: "de",
    pageType: "offer-service",
    status: "ACTIVE",
    faqIds: [
      "faq-offer-comparison-scope-de",
      "faq-offer-no-savings-guarantee-de",
      "faq-offer-no-legal-advice-de",
      "faq-offer-without-document-de",
    ],
    schemaFaqIds: [
      "faq-offer-comparison-scope-de",
      "faq-offer-no-savings-guarantee-de",
      "faq-offer-no-legal-advice-de",
      "faq-offer-without-document-de",
    ],
  },
  {
    route: "/en/duesseldorf/cleaning",
    locale: "en",
    pageType: "english-service",
    status: "ACTIVE",
    faqIds: [
      "faq-cleaning-details-duesseldorf-en",
      "faq-cleaning-effort-duesseldorf-en",
      "faq-cleaning-quote-duesseldorf-en",
      "faq-cleaning-scope-boundary-en",
      "faq-cleaning-material-duesseldorf-en",
      "faq-cleaning-photos-visit-duesseldorf-en",
      "faq-request-photos-en",
    ],
    schemaFaqIds: [
      "faq-cleaning-details-duesseldorf-en",
      "faq-cleaning-effort-duesseldorf-en",
      "faq-cleaning-quote-duesseldorf-en",
      "faq-cleaning-scope-boundary-en",
      "faq-cleaning-material-duesseldorf-en",
      "faq-cleaning-photos-visit-duesseldorf-en",
      "faq-request-photos-en",
    ],
  },
  {
    route: "/en/duesseldorf/office-cleaning",
    locale: "en",
    pageType: "english-service",
    status: "ACTIVE",
    faqIds: ["faq-office-scope-en", "faq-office-frequency-en", "faq-office-access-en", "faq-office-quote-en"],
    schemaFaqIds: [
      "faq-office-scope-en",
      "faq-office-frequency-en",
      "faq-office-access-en",
      "faq-office-quote-en",
    ],
  },
  {
    route: "/en/duesseldorf/move-out-cleaning",
    locale: "en",
    pageType: "english-service",
    status: "PLANNED",
    faqIds: [
      "faq-cleaning-details-duesseldorf-en",
      "faq-cleaning-scope-boundary-en",
      "faq-request-photos-en",
      "faq-request-next-step-en",
    ],
    schemaFaqIds: [],
    note: "English Düsseldorf route was not present at review time; do not expose until route and hreflang are approved.",
  },
];

function normalizeRoute(route: string) {
  const pathname = route.split(/[?#]/, 1)[0] || "/";
  if (pathname === "/") return pathname;
  return `/${pathname.replace(/^\/+|\/+$/g, "")}`;
}

export function getFaqById(id: string): FaqRegistryEntry | undefined {
  return faqRegistry.find((faq) => faq.id === id);
}

export function getActivePriorityFaqAssignment(route: string): PriorityFaqAssignment | undefined {
  return priorityFaqAssignments.find(
    (item) => item.status === "ACTIVE" && item.route === normalizeRoute(route),
  );
}

export function getFaqsForRoute(route: string): readonly FaqRegistryEntry[] {
  const assignment = getActivePriorityFaqAssignment(route);
  if (!assignment) return [];

  return assignment.faqIds
    .map((id) => getFaqById(id))
    .filter((faq): faq is FaqRegistryEntry => Boolean(faq?.publicAllowed && faq.verified));
}

export function getSchemaFaqsForRoute(route: string): readonly FaqRegistryEntry[] {
  const assignment = getActivePriorityFaqAssignment(route);
  if (!assignment) return [];

  return assignment.schemaFaqIds
    .map((id) => getFaqById(id))
    .filter((faq): faq is FaqRegistryEntry => Boolean(faq?.publicAllowed && faq.verified));
}

export function getFaqsForService(serviceId: string, locale?: FaqLocale): readonly FaqRegistryEntry[] {
  const normalizedServiceId = serviceId.trim().toLowerCase();
  return publicFaqs.filter(
    (faq) =>
      (!locale || faq.locale === locale) &&
      faq.serviceIds.some((candidate) => candidate.toLowerCase() === normalizedServiceId),
  );
}

export function getFaqsForLocale(locale: FaqLocale): readonly FaqRegistryEntry[] {
  return publicFaqs.filter((faq) => faq.locale === locale);
}

export function toVisibleFaq(faq: FaqRegistryEntry) {
  return { q: faq.question, a: faq.detailedAnswer };
}

export function getVisibleFaqsForRoute(route: string) {
  return getFaqsForRoute(route).map(toVisibleFaq);
}
