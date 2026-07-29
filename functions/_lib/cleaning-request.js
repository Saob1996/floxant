function text(value) {
  return String(value ?? "").trim();
}

function asRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function firstText(...values) {
  return values.map(text).find(Boolean) || "";
}

function values(value) {
  if (Array.isArray(value)) return value.flatMap(values);
  if (value === null || value === undefined || value === "") return [];
  if (typeof value === "string") {
    const parsed = value
      .split(/[|,]/)
      .map((item) => item.trim())
      .filter(Boolean);
    return parsed.length ? parsed : [];
  }
  return [value];
}

function uniqueValues(...items) {
  return [...new Set(items.flatMap(values).map(text).filter(Boolean))];
}

function normalizedKey(value) {
  return text(value)
    .toLocaleLowerCase("de-DE")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

const CLEANING_ALIASES = {
  b2b_cleaning: "bueroreinigung",
  b2b_reinigung: "bueroreinigung",
  bau_oder_bauendreinigung: "baureinigung",
  bauendreinigung: "baureinigung",
  cleaning: "reinigung",
  cleaning_service: "reinigung",
  commercial_cleaning: "gewerbereinigung",
  deep_cleaning: "grundreinigung",
  office_cleaning: "bueroreinigung",
  practice_cleaning: "praxisreinigung",
  stairwell_cleaning: "treppenhausreinigung",
  window_cleaning: "fensterreinigung",
};

export function normalizeCleaningService(value) {
  const key = normalizedKey(value);
  const withoutLocation = key.replace(/_(duesseldorf|regensburg)$/, "");
  return CLEANING_ALIASES[withoutLocation] || withoutLocation;
}

export function isCleaningRequest(payload, service = "") {
  const details = asRecord(payload?.details);
  const detailService = asRecord(details.service);
  const configuration = asRecord(details.configuration);
  const candidates = [
    service,
    payload?.service,
    payload?.serviceCategory,
    payload?.serviceScope,
    payload?.requestedService,
    payload?.type,
    payload?.lead_type,
    detailService.type,
    configuration.service,
    configuration.serviceLabel,
    configuration.requestedService,
    configuration.serviceSlug,
  ]
    .map(normalizedKey)
    .filter(Boolean);

  return candidates.some((candidate) =>
    /(^|_)(reinigung|cleaning)(_|$)/.test(candidate) ||
    /(bueroreinigung|praxisreinigung|fensterreinigung|grundreinigung|unterhaltsreinigung|baureinigung|bauendreinigung|treppenhausreinigung|gewerbereinigung|solarreinigung)/.test(candidate),
  );
}

export function normalizeCleaningRequest(payload, service = "", locale = "de") {
  if (!isCleaningRequest(payload, service)) return null;

  const details = asRecord(payload.details);
  const contact = asRecord(details.contact);
  const detailService = asRecord(details.service);
  const configuration = asRecord(details.configuration);
  const metadata = asRecord(details.metadata);
  const clientContext = asRecord(metadata.clientContext);
  const pricingSignals = asRecord(asRecord(details.valuation).pricingSignals);
  const rawFields = asRecord(configuration.rawFields);

  const rawService = firstText(
    configuration.serviceSlug,
    configuration.requestedService,
    configuration.serviceLabel,
    rawFields.serviceScope,
    rawFields.requestedService,
    payload.serviceScope,
    payload.requestedService,
    detailService.type,
    service,
    payload.service,
  );
  const cityOrZip = firstText(
    configuration.location,
    configuration.city,
    configuration.objectLocation,
    pricingSignals.location,
    rawFields.cityOrZip,
    rawFields.location,
    payload.cityOrZip,
    payload.location,
    payload.city,
  );
  const postalCode = firstText(
    configuration.postalCode,
    configuration.zip,
    rawFields.postalCode,
    rawFields.zip,
    payload.postalCode,
    payload.zip,
    cityOrZip.match(/\b\d{5}\b/)?.[0],
  );

  return {
    service: normalizeCleaningService(rawService) || "reinigung",
    location: cityOrZip,
    postalCode,
    propertyType: firstText(
      configuration.propertyType,
      configuration.objectType,
      pricingSignals.propertyType,
      rawFields.propertyType,
      rawFields.objectType,
      payload.propertyType,
      payload.objectType,
    ),
    area: firstText(
      configuration.areaM2,
      configuration.areaSize,
      configuration.areaRange,
      configuration.spaceRange,
      pricingSignals.areaM2,
      pricingSignals.areaRange,
      rawFields.area,
      rawFields.areaM2,
      rawFields.areaSize,
      payload.area,
      payload.areaM2,
      payload.areaSize,
    ),
    rooms: firstText(
      configuration.rooms,
      configuration.roomsCount,
      rawFields.rooms,
      rawFields.roomsCount,
      payload.rooms,
      payload.roomsCount,
    ),
    frequency: firstText(
      configuration.cleaningFrequency,
      configuration.recurringFrequency,
      configuration.cadence,
      pricingSignals.cadence,
      rawFields.cleaningFrequency,
      rawFields.frequency,
      payload.cleaningFrequency,
      payload.frequency,
    ),
    preferredDate: firstText(
      configuration.preferredDate,
      configuration.desiredDate,
      configuration.date,
      rawFields.preferredDate,
      rawFields.desiredDate,
      payload.preferredDate,
      payload.desiredDate,
    ),
    flexibility: firstText(
      configuration.flexibility,
      configuration.dateFlexibility,
      rawFields.dateFlexibility,
      payload.dateFlexibility,
    ),
    accessTimes: firstText(
      configuration.accessTimes,
      configuration.preferredCleaningTime,
      configuration.timeWindow,
      rawFields.preferredCleaningTime,
      rawFields.timeWindow,
      payload.preferredCleaningTime,
      payload.timeWindow,
    ),
    selectedServices: uniqueValues(
      configuration.selectedServices,
      configuration.selectedAddons,
      rawFields.selectedServices,
      rawFields.selectedAddons,
      payload.selectedServices,
      payload.selectedAddons,
      payload.upgrades,
    ),
    specialConditions: uniqueValues(
      configuration.specialConditions,
      configuration.specialAreas,
      configuration.specialNotes,
      rawFields.specialAreas,
      rawFields.specialNotes,
      payload.specialAreas,
      payload.specialNotes,
    ),
    message: firstText(
      contact.notes,
      configuration.customerMessage,
      configuration.message,
      pricingSignals.customerMessage,
      rawFields.message,
      payload.message,
      typeof payload.details === "string" ? payload.details : "",
    ),
    contact: {
      name: firstText(contact.fullName, payload.name, payload.fullName),
      email: firstText(contact.email, payload.email),
      phone: firstText(contact.phone, payload.phone),
      preferredMethod: firstText(
        contact.callbackPreference,
        configuration.preferredContact,
        configuration.preferredContactMethod,
        rawFields.preferredContact,
        rawFields.preferredContactMethod,
        payload.preferredContact,
        payload.preferredContactMethod,
      ),
      company: firstText(
        configuration.companyName,
        configuration.company,
        pricingSignals.companyName,
        rawFields.companyName,
        rawFields.company,
        payload.companyName,
        payload.company,
      ),
    },
    source: firstText(
      detailService.source,
      configuration.leadSource,
      rawFields.leadSource,
      metadata.source,
      clientContext.leadSource,
      payload.leadSource,
      payload.source,
    ),
    entryPage: firstText(
      detailService.entryPoint,
      configuration.entryPoint,
      configuration.landingPage,
      configuration.sourcePage,
      clientContext.entryPoint,
      clientContext.landingPage,
      rawFields.landingPage,
      rawFields.sourcePage,
      payload.landingPage,
      payload.sourcePage,
    ),
    locale: firstText(metadata.locale, configuration.locale, payload.locale, locale) || "de",
    campaign: {
      utmSource: firstText(configuration.utmSource, rawFields.utmSource, payload.utmSource, payload.utm_source),
      utmMedium: firstText(configuration.utmMedium, rawFields.utmMedium, payload.utmMedium, payload.utm_medium),
      utmCampaign: firstText(configuration.utmCampaign, rawFields.utmCampaign, payload.utmCampaign, payload.utm_campaign),
      utmTerm: firstText(configuration.utmTerm, rawFields.utmTerm, payload.utmTerm, payload.utm_term),
      utmContent: firstText(configuration.utmContent, rawFields.utmContent, payload.utmContent, payload.utm_content),
      gclid: firstText(rawFields.gclid, clientContext.gclid, payload.gclid),
    },
  };
}
