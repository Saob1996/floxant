function text(value) {
  return String(value ?? "").trim();
}

function asRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function firstText(...values) {
  return values.map(text).find(Boolean) || "";
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

function uniqueValues(...items) {
  const values = items.flatMap((value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string") {
      return value.split(/[|,]/).map((item) => item.trim());
    }
    return value === null || value === undefined ? [] : [value];
  });
  return [...new Set(values.map(text).filter(Boolean))];
}

function compact(value) {
  if (Array.isArray(value)) {
    const items = value.map(compact).filter((item) => item !== undefined);
    return items.length ? items : undefined;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value)
      .map(([key, child]) => [key, compact(child)])
      .filter(([, child]) => child !== undefined);
    return entries.length ? Object.fromEntries(entries) : undefined;
  }
  if (typeof value === "string") return value.trim() || undefined;
  if (typeof value === "boolean" || typeof value === "number") return value;
  return undefined;
}

function serviceGroup(value) {
  const key = normalizedKey(value);
  if (/(^|_)(umzug|moving|transport)(_|$)/.test(key)) return "moving";
  if (
    /entruempelung|raeumung|raumung|aufloesung|auflosung|clearance|entsorgung/.test(
      key,
    )
  ) {
    return "clearance";
  }
  if (
    /reinigung|cleaning|bueroreinigung|praxisreinigung|fensterreinigung|grundreinigung|unterhaltsreinigung|baureinigung|treppenhausreinigung|gewerbereinigung|solarreinigung/.test(
      key,
    )
  ) {
    return "cleaning";
  }
  return "general";
}

export function normalizeServiceRequest(payload, service = "", locale = "de") {
  const details = asRecord(payload?.details);
  const detailService = asRecord(details.service);
  const configuration = asRecord(details.configuration);
  const rawFields = asRecord(configuration.rawFields);
  const metadata = asRecord(details.metadata);
  const clientContext = asRecord(metadata.clientContext);
  const calculatorInputs = asRecord(configuration.calculatorInputs);
  const movingCalculator = asRecord(calculatorInputs.umzug);
  const pricingSignals = asRecord(asRecord(details.valuation).pricingSignals);

  const normalizedService = firstText(
    detailService.type,
    typeof payload?.service === "string" ? payload.service : "",
    service,
    configuration.service,
    rawFields.service,
    payload?.serviceCategory,
  );
  const group = serviceGroup(normalizedService);
  const location = firstText(
    configuration.location,
    configuration.city,
    rawFields.cityOrZip,
    rawFields.location,
    payload?.cityOrZip,
    payload?.location,
    payload?.city,
    detailService.regionPreset,
  );
  const postalCode = firstText(
    configuration.postalCode,
    configuration.zip,
    rawFields.postalCode,
    rawFields.zip,
    payload?.postalCode,
    payload?.zip,
    location.match(/\b\d{5}\b/)?.[0],
  );
  const desiredPeriod = firstText(
    configuration.desiredDate,
    configuration.preferredDate,
    configuration.date,
    configuration.schedule,
    configuration.deadline,
    rawFields.desiredDate,
    rawFields.preferredDate,
    rawFields.date,
    rawFields.timeframe,
    payload?.desiredDate,
    payload?.preferredDate,
    payload?.deadline,
  );
  const scope = firstText(
    configuration.scope,
    configuration.message,
    rawFields.scope,
    rawFields.message,
    payload?.scope,
    payload?.message,
    asRecord(details.contact).notes,
  );

  const common = {
    schemaVersion: "service-request-1.0.0",
    group,
    service: normalizedService,
    location,
    postalCode,
    desiredPeriod,
    scope,
    selectedAddons: uniqueValues(
      configuration.selectedAddons,
      rawFields.selectedAddons,
      payload?.selectedAddons,
      payload?.upgrades,
    ),
    source: firstText(
      detailService.source,
      metadata.source,
      clientContext.source,
      clientContext.leadSource,
      rawFields.source,
      payload?.leadSource,
      payload?.source,
    ),
    entryPage: firstText(
      detailService.entryPoint,
      configuration.entryPoint,
      configuration.landingPage,
      configuration.sourcePage,
      clientContext.entryPoint,
      clientContext.landingPage,
      rawFields.entryPage,
      rawFields.landingPage,
      payload?.landingPage,
      payload?.sourcePage,
    ),
    locale: firstText(metadata.locale, clientContext.locale, rawFields.locale, payload?.locale, locale) || "de",
    campaign: {
      utmSource: firstText(clientContext.utmSource, rawFields.utmSource, payload?.utmSource, payload?.utm_source),
      utmMedium: firstText(clientContext.utmMedium, rawFields.utmMedium, payload?.utmMedium, payload?.utm_medium),
      utmCampaign: firstText(clientContext.utmCampaign, rawFields.utmCampaign, payload?.utmCampaign, payload?.utm_campaign),
      utmTerm: firstText(clientContext.utmTerm, rawFields.utmTerm, payload?.utmTerm, payload?.utm_term),
      utmContent: firstText(clientContext.utmContent, rawFields.utmContent, payload?.utmContent, payload?.utm_content),
      gclid: firstText(clientContext.gclid, rawFields.gclid, payload?.gclid),
      gbraid: firstText(clientContext.gbraid, rawFields.gbraid, payload?.gbraid),
      wbraid: firstText(clientContext.wbraid, rawFields.wbraid, payload?.wbraid),
    },
  };

  const serviceSpecific =
    group === "moving"
      ? {
          route: {
            startLocation: firstText(
              configuration.startLocation,
              configuration.fromAddress,
              rawFields.startLocation,
              rawFields.startAddress,
              payload?.startLocation,
              payload?.startAddress,
              movingCalculator.fromAddressDetailed,
            ),
            destinationLocation: firstText(
              configuration.destinationLocation,
              configuration.toAddress,
              rawFields.destinationLocation,
              rawFields.endAddress,
              payload?.destinationLocation,
              payload?.endAddress,
              movingCalculator.toAddressDetailed,
            ),
            startFloor: firstText(
              configuration.startFloor,
              configuration.fromFloor,
              rawFields.startFloor,
              payload?.startFloor,
              movingCalculator.fromFloor,
            ),
            destinationFloor: firstText(
              configuration.destinationFloor,
              configuration.toFloor,
              rawFields.destinationFloor,
              payload?.destinationFloor,
              movingCalculator.toFloor,
            ),
            startElevator: firstText(
              configuration.startElevator,
              rawFields.startElevator,
              payload?.startElevator,
              movingCalculator.hasElevatorFrom,
            ),
            destinationElevator: firstText(
              configuration.destinationElevator,
              rawFields.destinationElevator,
              payload?.destinationElevator,
              movingCalculator.hasElevatorTo,
            ),
          },
          size: firstText(
            configuration.areaSize,
            configuration.area,
            configuration.rooms,
            configuration.volume,
            rawFields.areaSize,
            rawFields.rooms,
            rawFields.volume,
            payload?.areaSize,
            payload?.rooms,
            movingCalculator.areaM2,
            movingCalculator.rooms,
            movingCalculator.volumeM3,
          ),
        }
      : group === "cleaning"
        ? {
            object: {
              type: firstText(
                configuration.objectType,
                configuration.propertyType,
                rawFields.objectType,
                rawFields.propertyType,
                payload?.objectType,
                payload?.propertyType,
                pricingSignals.propertyType,
              ),
              area: firstText(
                configuration.areaSize,
                configuration.area,
                rawFields.areaSize,
                rawFields.area,
                payload?.areaSize,
                payload?.area,
                pricingSignals.areaM2,
              ),
            },
            frequency: firstText(
              configuration.cleaningFrequency,
              configuration.frequency,
              rawFields.cleaningFrequency,
              rawFields.frequency,
              payload?.cleaningFrequency,
              payload?.frequency,
            ),
          }
        : group === "clearance"
          ? {
              object: {
                type: firstText(
                  configuration.objectType,
                  configuration.propertyType,
                  rawFields.objectType,
                  rawFields.propertyType,
                  payload?.objectType,
                  payload?.propertyType,
                ),
                size: firstText(
                  configuration.areaSize,
                  configuration.area,
                  configuration.size,
                  rawFields.areaSize,
                  rawFields.area,
                  payload?.areaSize,
                  payload?.area,
                ),
                floor: firstText(
                  configuration.floor,
                  rawFields.floor,
                  payload?.floor,
                ),
                elevator: firstText(
                  configuration.elevator,
                  rawFields.elevator,
                  payload?.elevator,
                ),
              },
              remainingItems: firstText(
                configuration.remainingItems,
                configuration.scope,
                rawFields.remainingItems,
                rawFields.scope,
                payload?.remainingItems,
                payload?.scope,
              ),
            }
          : {};

  return compact({ ...common, ...serviceSpecific }) || {};
}
