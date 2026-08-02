import {
  CANONICAL_REQUEST_NESTED_FIELDS,
  CANONICAL_REQUEST_TOP_LEVEL_FIELDS,
  normalizeRequestAliases,
} from "../../lib/booking/request-schema.js";

export const MAX_PAYLOAD_FIELDS = 240;
export const MAX_RAW_PAYLOAD_FIELDS = 480;
export const MAX_TOP_LEVEL_FIELDS = 140;
export const MAX_PAYLOAD_DEPTH = 8;
export const MAX_ARRAY_ITEMS = 64;

const TOP_LEVEL_FIELD_NAMES = `
accessNotes additionalSpaces affectedService areaM2 areaOrRooms areaSize areaType attachments authorizationConfirmed
bathroomsCount bonusStatus budget callback callbackTimeWindow callbackWanted cellarTrashroomPhoto checkoutTime city cityOrZip
cleaningFrequency cleaningRequested cleaningType company companyName companyWebsite configuration consent contact contactMethod
contactName contactPersonRole contactRestrictions conversionJourneyId conversionLastChannel conversionLastEvent conversionLastIntent
conversionLastPriority conversionLastSource ctaLabel damageOfferFile damagePhoto damageSituation dataProtectionConsent dateFlexibility
deadline desiredDate desiredPlanBPackage destinationElevator destinationFloor destinationLocation details discreetMovePhoto
disposalRequested documentationScope elevator email entry entryPoint estateClearancePhoto estateStatus estimatedVolume
existingCleaningOffer existingOffer exportStatus exposePhotoDate file fileStatus floor formDurationMs formStartedAt funnelStage
furnishedStatus fullName gbraid gclid goalType handoverCondition handoverDate handoverDeadline handoverExtraNeeds handoverFileRequested
handoverKeyAccess handoverPhoto handoverSituation hasOffer hasPhotos hazardousMaterialsStatus intent involvedParties
isSensitiveCase itemDescription itemTypes keyHandoverDate keyHandoverRecipient keyNotes keyStatus kitchenPresent landingPage locale
lead_type leadPriority leadSource leadSubtype legalClearanceStatus message metadata missingInfoFlags missingInfoQuestions name
nextCheckinTime note objectCasePhoto objectCaseType objectLabel objectLocation objectScope objectStatus objectType offerAmount
offerCheckGoal offerCheckIntent offerConcern offerFile offerProvider offerSourceType offerStatus offerText openItems pageType
partnerCode partnerCodePreview phone photo photoSections pianoConcern pianoDestination pianoDestinationFloor pianoElevator
pianoExistingOffer pianoInstrumentType pianoNarrowStairs pianoPhotos pianoStartFloor pianoStartLocation planBOfferFile planBPhoto
platformSituation platformType preferredBonusContactMethod preferredCleaningTime preferredContact preferredContactMethod
previousOfferSource privacy privacyConsent problemType propertyCleaningAccess propertyCleaningAreas propertyCleaningContactPerson
propertyCleaningExistingOffer propertyCleaningFrequency propertyCleaningObjectType propertyCleaningRole propertyCleaningStartDate
propertyReadyPhoto propertyType publicSummary quickEntry quotedPrice recipientType recommendedNextStep recurringFrequency
recurringInterest redFlagCategories redFlagItems redFlagSummary referralCode referralStatus referredCityOrZip
referredPersonConsentConfirmed referredPersonEmail referredPersonName referredPersonPhone referredService referrer referrerEmail
referrerName referrerPhone region regionPreset rentalReadyPhoto requestedService requestSummary requestType responseTemplateKey
riskLevel roleType roomsCount routePhoto safeContactMethod saleDeadline scannerScoreLabel scannerScoreLevel scannerScoreValue
scope selectedAddons selectedOpenItems selectedServices seniorDeadline seniorDestination seniorDestinationFloor seniorElevator
seniorExistingOffer seniorExtraNeeds seniorRequesterRole seniorScope seniorSensitiveSituation seniorStartFloor seniorStartLocation
service serviceCategory serviceScope signatureServiceHint solarAccess solarExistingOffer solarModuleScope solarObjectType solarRoofType
solarTimeframe solarVisibleDirt source sourceComponent sourceContext sourceFlow sourcePage specialAreas specialNotes startElevator
startFloor startLocation tenantPhoto timestamp timeWindow type uncertainArea unitsCount upgrades urgency url utmCampaign utmContent
utmMedium utmSource utmTerm valuation viewingDate wbraid website whatsappPreferred zip
`.trim().split(/\s+/);

const NESTED_SCHEMA_FIELD_NAMES = `
access accessDifficulty accessNotes accuracyState adminNote advancedEstimate archiveMeters areaM2 areaRange areaSize
akteneinlagerung assemblyService attribution availableCapacity bookingMode bookingService boxCount boxesCount budgetText
bueroumzug cadence calculatorInputs callbackPreference callbackTime
channel city citySlug cleaningControl cleaningFrequency cleaningGoal clientContext companyName config configuration contact
contactChannel contactMethod contactPersonRole conversionJourney conversionJourneyId conversionLastChannel conversionLastEvent
conversionLastIntent conversionLastPriority conversionLastSource createdAt created_at ctaLabel customerBudget customerBudgetProvided
customerBudgetText customerMessage dataset date dateFlexibility deadline deliveryLocation desiredDate destination destinationRadius
details digitalization disassembly disassemblyRequired disassemblyService discretionNeeds distanceKm durationMonths email endAddress
einlagerung entry entryPath entryPoint entsorgung entsorgungData estimatedVolume event eventId existingCleaningOffer existingOffer extras extraServices
fairPriceNote formStartedAt fromAddress fromFloor fullName funnelStage gclid handoverCondition handoverDeadline
handoverExtraNeeds handoverKeyAccess handoverSituation hasElevatorFrom hasElevatorTo hasOffer hasPhotos hasUploads href id
heavyItems includesCeiling includesDoors inquiryMode insuranceValue intakeVersion intent isFurnished isPartialMove isSensitiveCase items itSetup
journeyId keysHandover kitchen landingPage landing_page lastChannel lastEvent lastEventName lastHref lastIntent lastPath
lastPriority lastSource leadChannel leadDetails leadPriority leadResponseHints leadSource leadType lead_source loadingDistanceMeters location
locationContext materialTypes message metadata missingInfoFlags missingInfoQuestions moveDate name note notes objectLocation
objectType offerAmountText offerConcern offerStatus origin packing packingService pagePath pageType paintQuality path pathname
phone pianoConcern pianoDestination pianoDestinationFloor pianoElevator pianoExistingOffer pianoInstrumentType pianoNarrowStairs
pianoPhotos pianoStartFloor pianoStartLocation pianoType pickupLocation pickupRequired preferredCleaningTime preferredContact
preferred_contact preferredContactMethod preferredDate preferredWindow presetFromUrl priceExplanation priceHint priceRangeMax
priceRangeMin priceSuggestion pricingSignals primaryFactors priority privacyConsent privacyNoticeShown propertyCleaningAccess
propertyCleaningAreas propertyCleaningContactPerson propertyCleaningExistingOffer propertyCleaningFrequency
propertyCleaningObjectType propertyCleaningRole propertyCleaningStartDate propertyType recommendedNextStep recentEvents
recurringFrequency referralCode referralLandingPage referralSource referral_code referral_landing_page referral_source referrer
region regionPreset reinigung reinigungData requestContext requestedDate requestedService requestSummary responseTemplateKey rooms roomsCount
routeAreas scopeSummary search securityShredding selectedOffer selectedOfferId selectedOfferTitle selectedUpgrades seniorCarePackage
seniorDeadline seniorDestination seniorDestinationFloor seniorElevator seniorenumzug seniorExistingOffer seniorExtraNeeds seniorRequesterRole
seniorScope seniorSensitiveSituation seniorStartFloor seniorStartLocation service serviceCategory serviceLabel servicePresetFromUrl
serviceScope serviceSlug serviceType shelfMeters signatureServiceHint solarAccess solarExistingOffer solarModuleScope solarObjectType
solarRoofType solarTimeframe solarVisibleDirt source sourceComponent sourcePage spaceRange specialAreas sqm startAddress status
subjectSuggestion submittedAt systemPriceRangeMax systemPriceRangeMin timeConstraint timeWindow timestamp title toAddress
toAddressDetailed toFloor topDrivers type umzug umzugData unpackingService
uncertainVolume updatedAt upgrades urgency utmCampaign utmContent utmMedium utmSource utm_campaign utm_content utm_medium
utm_source valuation valuationLabel valuationStage values vehicleType volumeEstimate volumeM3 wantsPhotosLink wasteCategories
wasteVolumeM3 windowsCount workstations conversion_journey_id conversion_last_channel conversion_last_event conversion_last_intent
conversion_last_priority conversion_last_source referral_landing_page referral_source
calculatorMode cleaningGuarantee condition courtyardAccessFrom courtyardAccessTo customerAcknowledgement deviceType
estimatedHours freeTextNote frequency fromAddressDetailed furnitureList hazardMaterials kitchenAssembly klaviertransport
malerarbeiten metrics narrowStairsFrom narrowStairsTo noParkingZoneFrom noParkingZoneTo operationalDrivers operationalFlags
recommendedTeam selectedAddons selectedOpenItems selectedServices timeToConvertSeconds walkingDistanceFrom walkingDistanceTo
`.trim().split(/\s+/);

const FILE_FIELD_NAMES = `
attachments cellarTrashroomPhoto damageOfferFile damagePhoto discreetMovePhoto estateClearancePhoto file files handoverPhoto
objectCasePhoto offerFile photo planBOfferFile planBPhoto propertyReadyPhoto rentalReadyPhoto routePhoto tenantPhoto
`.trim().split(/\s+/);

export const ALLOWED_TOP_LEVEL_FIELDS = new Set([...TOP_LEVEL_FIELD_NAMES, ...CANONICAL_REQUEST_TOP_LEVEL_FIELDS]);
export const ALLOWED_NESTED_FIELDS = new Set([
  ...TOP_LEVEL_FIELD_NAMES,
  ...NESTED_SCHEMA_FIELD_NAMES,
  ...CANONICAL_REQUEST_NESTED_FIELDS,
]);
export const ALLOWED_FILE_FIELDS = new Set(FILE_FIELD_NAMES);

const OMIT = Symbol("omit-empty-payload-value");

export class PayloadValidationError extends Error {
  constructor(fields, code = "VALIDATION_ERROR", unsupportedFields = []) {
    super("VALIDATION_ERROR");
    this.fields = fields;
    this.code = code;
    this.unsupportedFields = unsupportedFields;
  }
}

function isEnglishRequest(request) {
  return /^en(?:[-_,;]|$)/i.test(String(request?.headers?.get("Accept-Language") || "").trim());
}

function localized(request, german, english) {
  return isEnglishRequest(request) ? english : german;
}

function tooManyFields(request) {
  return localized(
    request,
    "Die Anfrage konnte nicht verarbeitet werden, weil zu viele einzelne Felder übertragen wurden.",
    "The request could not be processed because too many individual fields were submitted.",
  );
}

function unsupportedFields(request) {
  return localized(
    request,
    "Die Anfrage enthält nicht unterstützte Angaben.",
    "The request contains unsupported fields.",
  );
}

function assertRawShape(value, request, depth = 0, counter = { fields: 0 }) {
  if (depth > MAX_PAYLOAD_DEPTH) {
    throw new PayloadValidationError({ form: "Die Anfrage enthält zu viele verschachtelte Angaben." });
  }
  if (!value || typeof value !== "object") return;
  const entries = Object.entries(value);
  if (Array.isArray(value) && entries.length > MAX_ARRAY_ITEMS) {
    throw new PayloadValidationError({ form: tooManyFields(request) });
  }
  for (const [, childValue] of entries) {
    counter.fields += 1;
    if (counter.fields > MAX_RAW_PAYLOAD_FIELDS) {
      throw new PayloadValidationError({ form: tooManyFields(request) });
    }
    assertRawShape(childValue, request, depth + 1, counter);
  }
}

function normalizeValue(value, request, depth = 0, root = false, path = "") {
  if (depth > MAX_PAYLOAD_DEPTH) {
    throw new PayloadValidationError({ form: "Die Anfrage enthält zu viele verschachtelte Angaben." });
  }
  if (typeof value === "string") {
    const normalized = value.trim();
    return normalized ? normalized : OMIT;
  }
  if (typeof value === "number") return Number.isFinite(value) ? value : OMIT;
  if (typeof value === "boolean") return value;
  if (!value || typeof value !== "object") return OMIT;

  if (Array.isArray(value)) {
    if (value.length > MAX_ARRAY_ITEMS) {
      throw new PayloadValidationError({ form: tooManyFields(request) });
    }
    const normalizedItems = value
      .map((item) => normalizeValue(item, request, depth + 1, false, path))
      .filter((item) => item !== OMIT);
    return normalizedItems.length ? normalizedItems : OMIT;
  }

  const entries = Object.entries(value);
  if (root && entries.length > MAX_TOP_LEVEL_FIELDS) {
    throw new PayloadValidationError({ form: tooManyFields(request) });
  }
  const allowedFields = root ? ALLOWED_TOP_LEVEL_FIELDS : ALLOWED_NESTED_FIELDS;
  const normalized = {};
  for (const [key, childValue] of entries) {
    if (!allowedFields.has(key) || (root && ALLOWED_FILE_FIELDS.has(key))) {
      const safePath = path ? `${path}.${key}` : key;
      throw new PayloadValidationError(
        { form: unsupportedFields(request) },
        "UNSUPPORTED_FIELDS",
        [safePath],
      );
    }
    const child = normalizeValue(childValue, request, depth + 1, false, path ? `${path}.${key}` : key);
    if (child !== OMIT) normalized[key] = child;
  }
  return Object.keys(normalized).length || root ? normalized : OMIT;
}

function assertNormalizedShape(value, request, depth = 0, counter = { fields: 0 }, key = "") {
  if (depth > MAX_PAYLOAD_DEPTH) {
    throw new PayloadValidationError({ form: "Die Anfrage enthält zu viele verschachtelte Angaben." });
  }
  if (typeof value === "string") {
    const longField = /message|note|details|description|scope|items/i.test(key);
    if (value.length > (longField ? 10_000 : 2_000)) {
      throw new PayloadValidationError({ [key || "form"]: "Die Angabe ist zu lang." });
    }
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [childKey, childValue] of Object.entries(value)) {
    counter.fields += 1;
    if (counter.fields > MAX_PAYLOAD_FIELDS) {
      throw new PayloadValidationError({ form: tooManyFields(request) });
    }
    assertNormalizedShape(childValue, request, depth + 1, counter, childKey);
  }
}

export function countPayloadFields(value) {
  if (!value || typeof value !== "object") return 0;
  return Object.entries(value).reduce(
    (total, [, childValue]) => total + 1 + countPayloadFields(childValue),
    0,
  );
}

export function normalizeLeadPayload(payload, request) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new PayloadValidationError({ form: "Das Anfrageformat ist ungültig." });
  }
  const aliasedPayload = normalizeRequestAliases(payload);
  if (Object.keys(aliasedPayload).length > MAX_TOP_LEVEL_FIELDS) {
    throw new PayloadValidationError({ form: tooManyFields(request) });
  }
  assertRawShape(aliasedPayload, request);
  const normalized = normalizeValue(aliasedPayload, request, 0, true);
  assertNormalizedShape(normalized, request);
  return normalized;
}

export function assertAllowedFileFields(files, request) {
  if (files.some(({ field }) => !ALLOWED_FILE_FIELDS.has(field))) {
    throw new PayloadValidationError({ files: unsupportedFields(request) });
  }
}
