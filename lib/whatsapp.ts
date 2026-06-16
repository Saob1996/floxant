type WhatsAppContext = {
  title: string;
  teaser: string;
  buttonLabel: string;
  message: string;
};

const SERVICE_LABELS: Record<string, string> = {
  umzug: "Umzug",
  reinigung: "Reinigung",
  entsorgung: "Entruempelung",
  entruempelung: "Entruempelung",
  bueroumzug: "Bueroumzug",
};

function normalizeService(service?: string | null) {
  if (!service) return null;
  return SERVICE_LABELS[service] ? service : null;
}

function getServiceLabel(service?: string | null) {
  const normalized = normalizeService(service);
  return normalized ? SERVICE_LABELS[normalized] : null;
}

function buildPathLabel(pathname: string) {
  if (pathname === "/") return "Startseite";
  if (pathname === "/rechner") return "Rechner";
  if (pathname === "/buchung") return "Buchung";
  if (pathname === "/kontakt") return "Kontakt";
  if (pathname === "/service-area-bayern") return "Servicegebiet Bayern";
  if (pathname === "/standorte") return "Standorte";

  const slug = pathname.replace(/^\//, "");
  if (!slug) return "Website";

  return slug
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export function getWhatsAppContext(pathname: string, service?: string | null): WhatsAppContext {
  const serviceLabel = getServiceLabel(service);
  const pathLabel = buildPathLabel(pathname);

  if (pathname === "/rechner") {
    const selectedLabel = serviceLabel || "Service";

    return {
      title: `${selectedLabel} direkt weiterklaeren`,
      teaser: "Die Nachricht startet schon mit Ihrem Rechner-Kontext und fuehrt schneller zur echten Rueckfrage.",
      buttonLabel: serviceLabel ? `${serviceLabel} per WhatsApp` : "Rechner per WhatsApp",
      message: [
        "Hallo FLOXANT,",
        `ich moechte den ${selectedLabel}-Rechner weiter per WhatsApp abstimmen.`,
        "Bitte melden Sie sich zu Preisrahmen, Machbarkeit oder den naechsten Schritten.",
        "Region: Regensburg / Bayern",
      ].join("\n"),
    };
  }

  if (serviceLabel) {
    return {
      title: `${serviceLabel} per WhatsApp anfragen`,
      teaser: "Der Chat startet nicht leer, sondern mit Leistungs- und Seitenkontext fuer eine schnellere Einordnung.",
      buttonLabel: `${serviceLabel} anfragen`,
      message: [
        "Hallo FLOXANT,",
        `ich interessiere mich fuer ${serviceLabel} und moechte den Fall kurz per WhatsApp einordnen.`,
        `Ausgangspunkt: ${pathLabel}`,
        "Bitte melden Sie sich zu Aufwand, Preisrahmen oder Terminlage.",
      ].join("\n"),
    };
  }

  return {
    title: "WhatsApp mit vorbereitetem Startpunkt",
    teaser: "Startet direkt mit Regensburg-, Service- und Anfragekontext statt mit einer leeren Nachricht.",
    buttonLabel: "WhatsApp starten",
    message: [
      "Hallo FLOXANT,",
      `ich komme von Ihrer Seite "${pathLabel}" und moechte meine Anfrage kurz per WhatsApp abstimmen.`,
      "Bitte melden Sie sich zu Service, Preisrahmen oder Verfuegbarkeit.",
    ].join("\n"),
  };
}

export function buildWhatsAppHref(phoneRaw: string, message: string) {
  const phoneClean = phoneRaw.replace(/\D/g, "");
  return `https://wa.me/${phoneClean}?text=${encodeURIComponent(message)}`;
}
