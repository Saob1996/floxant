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
  if (payload.requestId) {
    return locale === "en"
      ? `Your request could not be processed technically. Reference: ${payload.requestId}`
      : `Die Anfrage konnte technisch nicht verarbeitet werden. Referenz: ${payload.requestId}`;
  }
  return fallbackMessage(locale);
}

async function executeRequest(input: RequestInfo | URL, init?: RequestInit): Promise<ResponseSnapshot> {
  let response: Response;
  try {
    response = await fetch(input, init);
  } catch {
    return {
      status: 500,
      headers: new Headers({ "Content-Type": "application/json; charset=utf-8" }),
      payload: { ok: false, code: "SUBMISSION_FAILED" },
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

function requestKey(input: RequestInfo | URL) {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.toString();
  return input.url;
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
  const key = requestKey(input);
  let request = inFlightRequests.get(key);
  if (!request) {
    request = executeRequest(input, init);
    inFlightRequests.set(key, request);
    request.finally(() => {
      if (inFlightRequests.get(key) === request) inFlightRequests.delete(key);
    });
  }
  return responseFromSnapshot(await request);
}

export function bookingFieldErrors(payload: unknown): BookingSubmissionFields {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return {};
  const fields = (payload as BookingResponsePayload).fields;
  return fields && typeof fields === "object" ? fields : {};
}
