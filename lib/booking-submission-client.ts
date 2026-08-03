export type BookingSubmissionFields = Record<string, string>;

type BookingResponsePayload = {
  ok?: boolean;
  code?: string;
  requestId?: string;
  bookingId?: string;
  fields?: BookingSubmissionFields;
};

type ResponseSnapshot = {
  status: number;
  headers: Headers;
  payload: BookingResponsePayload;
};

const inFlightRequests = new Map<string, Promise<ResponseSnapshot>>();
const requestBodyKeys = new WeakMap<object, string>();
const automaticAttemptKeys = new Map<string, { key: string; touchedAt: number }>();
let anonymousRequestSequence = 0;
const structuredFormFields = new Set([
  "details",
  "upgrades",
  "selectedAddons",
  "selectedServices",
]);
const volatileFingerprintFields = new Set([
  "timestamp",
  "createdat",
  "submittedat",
  "updatedat",
  "formstartedat",
  "formdurationms",
  "eventtimestamp",
  "eventtime",
  "occurredat",
  "recordedat",
  "trackedat",
  "capturedat",
  "source",
  "leadsource",
  "sourcecomponent",
  "sourcecontext",
  "sourcepage",
  "landingpage",
  "entrypage",
  "entrypoint",
  "campaign",
  "clientcontext",
  "locale",
  "priority",
]);

const visibleFieldAliases: Record<string, string[]> = {
  name: ["name", "fullName", "contactName"],
  email: ["email", "emailAddress"],
  phone: ["phone", "telephone", "tel"],
  contact: ["email", "emailAddress", "phone", "telephone", "tel"],
  contactMethod: ["preferredContactMethod", "contactMethod", "callbackPreference"],
  privacyConsent: ["privacyConsent", "privacy", "consent", "dataProtectionConsent"],
  files: ["files", "file", "uploads", "photos"],
};

const generatedFieldErrorSelector = "[data-booking-field-error='true']";
const generatedFieldErrorListeners = new WeakMap<HTMLElement, EventListener>();

function escapeSelectorValue(value: string) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") return CSS.escape(value);
  return value.replace(/[^a-zA-Z0-9_-]/g, (character) => `\\${character}`);
}

function fieldCandidates(field: string) {
  return visibleFieldAliases[field] || [field];
}

function semanticFormField(form: HTMLFormElement, candidate: string) {
  const controls = [...form.querySelectorAll<HTMLElement>("input, select, textarea")];
  const normalizedCandidate = candidate.toLowerCase();
  if (["email", "emailaddress"].includes(normalizedCandidate)) {
    return form.querySelector<HTMLElement>("input[type='email'], input[autocomplete='email']");
  }
  if (["phone", "telephone", "tel"].includes(normalizedCandidate)) {
    return form.querySelector<HTMLElement>("input[type='tel'], input[autocomplete='tel']");
  }
  if (["files", "file", "uploads", "photos"].includes(normalizedCandidate)) {
    return form.querySelector<HTMLElement>("input[type='file']");
  }

  const controlText = (control: HTMLElement) => {
    const id = control.getAttribute("id") || "";
    const escapedId = id ? escapeSelectorValue(id) : "";
    const externalLabel = escapedId
      ? form.querySelector(`label[for="${escapedId}"]`)?.textContent || ""
      : "";
    return [
      control.getAttribute("placeholder"),
      control.getAttribute("aria-label"),
      control.getAttribute("autocomplete"),
      control.closest("label")?.textContent,
      externalLabel,
    ].filter(Boolean).join(" ").toLocaleLowerCase("de-DE");
  };

  if (["name", "fullname", "contactname"].includes(normalizedCandidate)) {
    return controls.find((control) => {
      const type = control.getAttribute("type")?.toLowerCase() || "text";
      return (control.tagName === "INPUT" && ["text", ""].includes(type))
        && /\b(name|ansprechpartner|kontaktperson|full name)\b/i.test(controlText(control));
    }) || null;
  }
  if (["privacyconsent", "privacy", "consent", "dataprotectionconsent"].includes(normalizedCandidate)) {
    return controls.find((control) => control.matches("input[type='checkbox']")
      && /datenschutz|privacy|einwilligung|consent/i.test(controlText(control))) || null;
  }
  if (["preferredcontactmethod", "contactmethod", "callbackpreference"].includes(normalizedCandidate)) {
    return controls.find((control) => {
      if (control.matches("input[type='radio']")) {
        return /email|e-mail|telefon|phone|whatsapp/i.test(control.getAttribute("value") || controlText(control));
      }
      if (control.tagName !== "SELECT") return false;
      return /email|e-mail|telefon|phone|whatsapp/i.test(control.textContent || "");
    }) || null;
  }
  return null;
}

function formField(form: HTMLFormElement, candidate: string) {
  const escaped = escapeSelectorValue(candidate);
  return form.querySelector<HTMLElement>(`[name="${escaped}"], #${escaped}`)
    || semanticFormField(form, candidate);
}

function removeGeneratedFieldError(target: HTMLElement) {
  const clearListener = generatedFieldErrorListeners.get(target);
  if (clearListener) {
    target.removeEventListener("input", clearListener);
    target.removeEventListener("change", clearListener);
    generatedFieldErrorListeners.delete(target);
  }
  const errorId = target.dataset.bookingErrorId;
  if (errorId) {
    document.getElementById(errorId)?.remove();
    const describedBy = (target.getAttribute("aria-describedby") || "")
      .split(/\s+/)
      .filter(Boolean)
      .filter((id) => id !== errorId);
    if (describedBy.length) target.setAttribute("aria-describedby", describedBy.join(" "));
    else target.removeAttribute("aria-describedby");
  }
  const originalAriaInvalid = target.dataset.bookingAriaInvalid;
  if (originalAriaInvalid === "absent") target.removeAttribute("aria-invalid");
  else if (originalAriaInvalid?.startsWith("value:")) {
    target.setAttribute("aria-invalid", originalAriaInvalid.slice("value:".length));
  }
  target.classList.remove("border-red-500", "ring-2", "ring-red-200");
  delete target.dataset.bookingErrorId;
  delete target.dataset.bookingAriaInvalid;
}

function clearBookingFieldErrors(form: HTMLFormElement | null) {
  if (!form) return;
  form.querySelectorAll<HTMLElement>("[data-booking-error-id]").forEach(removeGeneratedFieldError);
  form.querySelectorAll<HTMLElement>(generatedFieldErrorSelector).forEach((error) => error.remove());
}

function submissionBodyKeys(body: BodyInit | null | undefined) {
  if (body instanceof FormData) return [...new Set([...body.keys()])];
  if (typeof body === "string") {
    try {
      const payload = JSON.parse(body);
      return payload && typeof payload === "object" && !Array.isArray(payload)
        ? Object.keys(payload)
        : [];
    } catch {
      return [];
    }
  }
  return [];
}

function submittingForm(body: BodyInit | null | undefined) {
  if (typeof document === "undefined" || typeof HTMLFormElement === "undefined") return null;
  const activeForm = document.activeElement?.closest?.("form");
  if (activeForm instanceof HTMLFormElement) return activeForm;

  const keys = submissionBodyKeys(body);
  let best: { form: HTMLFormElement; score: number } | null = null;
  for (const form of document.querySelectorAll<HTMLFormElement>("form")) {
    const score = keys.reduce(
      (total, key) => total + (fieldCandidates(key).some((candidate) => formField(form, candidate)) ? 1 : 0),
      0,
    );
    if (score > (best?.score || 0)) best = { form, score };
  }
  return best?.form || null;
}

function applyBookingFieldErrors(
  form: HTMLFormElement | null,
  fields: BookingSubmissionFields | undefined,
) {
  if (
    !form
    || form.dataset.bookingFieldErrors === "managed"
    || !fields
    || typeof document === "undefined"
  ) return 0;
  // Multiple callers can await the same in-flight request. Replacing the prior
  // generation keeps one alert/ARIA relationship and removes its old listeners.
  clearBookingFieldErrors(form);
  const marked = new Set<HTMLElement>();
  let firstInvalid: HTMLElement | null = null;

  for (const [field, message] of Object.entries(fields)) {
    if (!message?.trim() || field === "form") continue;
    const targets = fieldCandidates(field)
      .map((candidate) => formField(form, candidate))
      .filter((target): target is HTMLElement => Boolean(target));
    const fieldTargets: HTMLElement[] = [];
    for (const target of targets) {
      if (marked.has(target)) continue;
      const errorId = `booking-error-${field}-${crypto.randomUUID()}`;
      const existingDescription = (target.getAttribute("aria-describedby") || "").trim();
      target.setAttribute("aria-describedby", [existingDescription, errorId].filter(Boolean).join(" "));
      target.dataset.bookingAriaInvalid = target.hasAttribute("aria-invalid")
        ? `value:${target.getAttribute("aria-invalid") || ""}`
        : "absent";
      target.setAttribute("aria-invalid", "true");
      target.dataset.bookingErrorId = errorId;
      target.classList.add("border-red-500", "ring-2", "ring-red-200");

      const error = document.createElement("p");
      error.id = errorId;
      error.dataset.bookingFieldError = "true";
      error.className = "mt-1 text-sm font-semibold text-red-700";
      error.setAttribute("role", "alert");
      error.textContent = message.trim();
      const insertionTarget = target.matches("[type='checkbox'], [type='radio']")
        ? target.parentElement || target
        : target;
      insertionTarget.insertAdjacentElement("afterend", error);

      fieldTargets.push(target);
      marked.add(target);
      firstInvalid ||= target;
    }
    const clearFieldGroup = () => fieldTargets.forEach(removeGeneratedFieldError);
    for (const target of fieldTargets) {
      generatedFieldErrorListeners.set(target, clearFieldGroup);
      target.addEventListener("input", clearFieldGroup, { once: true });
      target.addEventListener("change", clearFieldGroup, { once: true });
    }
  }

  if (firstInvalid) {
    firstInvalid.focus({ preventScroll: true });
    firstInvalid.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }
  return marked.size;
}

function isVolatileFingerprintField(key: string) {
  const normalized = key.replace(/[^a-z0-9]/gi, "").toLowerCase();
  return volatileFingerprintFields.has(normalized)
    || /^(?:utm|gclid|gbraid|wbraid|fbclid|msclkid)/.test(normalized)
    || /^(?:conversion|journey|analytics|attribution|tracking)/.test(normalized);
}

function stableBusinessValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stableBusinessValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !isVolatileFingerprintField(key))
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => [key, stableBusinessValue(item)]),
    );
  }
  return value;
}

async function sha256Hex(value: string | ArrayBuffer) {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : value;
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function stableStringValue(value: string) {
  const normalized = value.trim();
  if (!normalized || !/^[{[]/.test(normalized)) return normalized;
  try {
    return JSON.stringify(stableBusinessValue(JSON.parse(normalized)));
  } catch {
    return normalized;
  }
}

async function requestBodyFingerprint(body: BodyInit) {
  if (body instanceof FormData) {
    const entries: Array<Record<string, string | number>> = [];
    for (const [key, value] of body.entries()) {
      if (isVolatileFingerprintField(key)) continue;
      if (typeof value === "string") {
        entries.push({ key, type: "text", value: stableStringValue(value) });
      } else {
        entries.push({
          key,
          type: value.type || "file",
          name: value.name,
          size: value.size,
          digest: await sha256Hex(await value.arrayBuffer()),
        });
      }
    }
    entries.sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)));
    return sha256Hex(JSON.stringify(entries));
  }
  if (typeof body === "string") {
    try {
      return sha256Hex(JSON.stringify(stableBusinessValue(JSON.parse(body))));
    } catch {
      return sha256Hex(body.trim());
    }
  }
  return "";
}

function pruneAutomaticAttemptKeys(now: number) {
  for (const [fingerprint, entry] of automaticAttemptKeys) {
    if (now - entry.touchedAt > 24 * 60 * 60 * 1000) automaticAttemptKeys.delete(fingerprint);
  }
  while (automaticAttemptKeys.size > 128) {
    const oldest = automaticAttemptKeys.keys().next().value;
    if (!oldest) break;
    automaticAttemptKeys.delete(oldest);
  }
}

async function withAutomaticIdempotency(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<{ init?: RequestInit; fingerprint?: string }> {
  const method = String(init?.method || "GET").toUpperCase();
  const url = typeof input === "string"
    ? input
    : input instanceof URL
      ? input.toString()
      : input.url;
  const headers = new Headers(init?.headers);
  if (
    method !== "POST"
    || !/^\/api\/(?:bookings|intake)(?:[/?#]|$)/.test(new URL(url, "https://www.floxant.de").pathname + new URL(url, "https://www.floxant.de").search)
    || headers.has("Idempotency-Key")
    || !init?.body
  ) return { init };

  const bodyFingerprint = await requestBodyFingerprint(init.body);
  if (!bodyFingerprint) return { init };
  const fingerprint = `${new URL(url, "https://www.floxant.de").pathname}::${bodyFingerprint}`;
  const now = Date.now();
  pruneAutomaticAttemptKeys(now);
  let attempt = automaticAttemptKeys.get(fingerprint);
  if (!attempt) {
    attempt = {
      key: `booking_auto:${now}:${crypto.randomUUID()}`,
      touchedAt: now,
    };
    automaticAttemptKeys.set(fingerprint, attempt);
  } else {
    attempt.touchedAt = now;
  }
  headers.set("Idempotency-Key", attempt.key);
  return { init: { ...init, headers }, fingerprint };
}

function pruneEmptySubmissionValue(value: unknown): unknown {
  if (typeof value === "string") {
    const normalized = value.trim();
    return normalized || undefined;
  }
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
  if (typeof value === "boolean") return value;
  if (!value || typeof value !== "object") return undefined;
  if (Array.isArray(value)) {
    const normalized = value
      .map(pruneEmptySubmissionValue)
      .filter((item) => item !== undefined);
    return normalized.length ? normalized : undefined;
  }
  const normalized = Object.fromEntries(
    Object.entries(value)
      .map(([key, item]) => [key, pruneEmptySubmissionValue(item)] as const)
      .filter(([, item]) => item !== undefined),
  );
  return Object.keys(normalized).length ? normalized : undefined;
}

function normalizeJsonString(value: string) {
  try {
    const normalized = pruneEmptySubmissionValue(JSON.parse(value));
    return normalized === undefined ? "" : JSON.stringify(normalized);
  } catch {
    return value.trim();
  }
}

function normalizeFormData(body: FormData) {
  const normalized = new FormData();
  for (const [key, value] of body.entries()) {
    if (typeof value === "string") {
      const nextValue = structuredFormFields.has(key)
        ? normalizeJsonString(value)
        : value.trim();
      if (nextValue) normalized.append(key, nextValue);
    } else if (value.size > 0) {
      normalized.append(key, value);
    }
  }
  return normalized;
}

function normalizeRequestInit(init?: RequestInit): RequestInit | undefined {
  if (!init?.body) return init;
  if (init.body instanceof FormData) return { ...init, body: normalizeFormData(init.body) };
  if (typeof init.body !== "string") return init;
  const contentType = new Headers(init.headers).get("Content-Type") || "";
  if (!contentType.includes("application/json")) return init;
  try {
    const normalized = pruneEmptySubmissionValue(JSON.parse(init.body));
    return { ...init, body: JSON.stringify(normalized || {}) };
  } catch {
    return init;
  }
}

function currentLocale() {
  if (typeof document !== "undefined" && document.documentElement.lang.toLowerCase().startsWith("en")) {
    return "en";
  }
  return "de";
}

function fallbackMessage(locale: "de" | "en") {
  return locale === "en"
    ? "Your request could not be processed. Please check your details and try again."
    : "Die Anfrage konnte nicht verarbeitet werden. Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut.";
}

function clientMessage(payload: BookingResponsePayload, locale: "de" | "en") {
  const firstFieldError = payload.fields && Object.values(payload.fields).find(Boolean);
  if (firstFieldError) return firstFieldError;
  return fallbackMessage(locale);
}

async function executeRequest(input: RequestInfo | URL, init?: RequestInit): Promise<ResponseSnapshot> {
  let response: Response;
  try {
    response = await fetch(input, normalizeRequestInit(init));
  } catch {
    return {
      status: 500,
      headers: new Headers({ "Content-Type": "application/json; charset=utf-8" }),
      payload: { ok: false, code: "NETWORK_ERROR" },
    };
  }

  let payload: BookingResponsePayload = {};
  try {
    const parsed = await response.json();
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) payload = parsed;
  } catch {
    payload = {};
  }

  const isConfirmedSuccess = response.status === 201
    && payload.ok === true
    && typeof payload.requestId === "string"
    && typeof payload.bookingId === "string";

  return {
    status: isConfirmedSuccess ? 201 : (response.ok ? 500 : response.status),
    headers: new Headers(response.headers),
    payload: isConfirmedSuccess
      ? payload
      : { ...payload, ok: false, code: payload.code || "SUBMISSION_FAILED" },
  };
}

function requestKey(input: RequestInfo | URL, init?: RequestInit) {
  const url = typeof input === "string"
    ? input
    : input instanceof URL
      ? input.toString()
      : input.url;
  const idempotencyKey = new Headers(init?.headers).get("Idempotency-Key");
  if (idempotencyKey) return `${url}::${idempotencyKey}`;

  const body = init?.body;
  if (body && typeof body === "object") {
    let bodyKey = requestBodyKeys.get(body);
    if (!bodyKey) {
      anonymousRequestSequence += 1;
      bodyKey = `body-${anonymousRequestSequence}`;
      requestBodyKeys.set(body, bodyKey);
    }
    return `${url}::${bodyKey}`;
  }
  return "";
}

function responseFromSnapshot(snapshot: ResponseSnapshot) {
  const locale = currentLocale();
  const headers = new Headers(snapshot.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  const payload = snapshot.status === 201
    ? snapshot.payload
    : { ...snapshot.payload, error: clientMessage(snapshot.payload, locale) };
  return new Response(JSON.stringify(payload), { status: snapshot.status, headers });
}

export async function bookingFetch(input: RequestInfo | URL, init?: RequestInit) {
  const normalizedInit = normalizeRequestInit(init);
  const form = submittingForm(normalizedInit?.body);
  clearBookingFieldErrors(form);
  const prepared = await withAutomaticIdempotency(input, normalizedInit);
  const key = requestKey(input, prepared.init);
  if (!key) {
    const snapshot = await executeRequest(input, prepared.init);
    if (snapshot.status === 400) applyBookingFieldErrors(form, snapshot.payload.fields);
    return responseFromSnapshot(snapshot);
  }
  let request = inFlightRequests.get(key);
  if (!request) {
    request = executeRequest(input, prepared.init);
    inFlightRequests.set(key, request);
    request.finally(() => {
      if (inFlightRequests.get(key) === request) inFlightRequests.delete(key);
    });
  }
  const snapshot = await request;
  if (snapshot.status === 201 && prepared.fingerprint) {
    const attempt = automaticAttemptKeys.get(prepared.fingerprint);
    if (attempt?.key === new Headers(prepared.init?.headers).get("Idempotency-Key")) {
      automaticAttemptKeys.delete(prepared.fingerprint);
    }
  }
  if (snapshot.status === 400) applyBookingFieldErrors(form, snapshot.payload.fields);
  return responseFromSnapshot(snapshot);
}

export function bookingFieldErrors(payload: unknown): BookingSubmissionFields {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return {};
  const fields = (payload as BookingResponsePayload).fields;
  if (!fields || typeof fields !== "object" || Array.isArray(fields)) return {};
  return Object.fromEntries(
    Object.entries(fields)
      .filter(([, value]) => typeof value === "string" && value.trim())
      .map(([key, value]) => [key, value.trim()]),
  );
}
