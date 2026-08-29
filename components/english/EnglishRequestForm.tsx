"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, FileUp, Send } from "lucide-react";

import { PrivacyConsentField } from "@/components/PrivacyConsentField";
import { bookingFetch, bookingFieldErrors } from "@/lib/booking-submission-client";
import { REQUEST_ATTACHMENT_RULES } from "@/lib/booking/request-service-policy.js";

type SubmitState = "idle" | "sending" | "success" | "error";
type Step = 1 | 2 | 3;

const servicesByRegion = {
  "": [],
  duesseldorf: [
    { value: "reinigung", label: "Cleaning service" },
    { value: "bueroreinigung", label: "Office cleaning" },
    { value: "gewerbereinigung", label: "Commercial or maintenance cleaning" },
    { value: "praxisreinigung", label: "Practice cleaning" },
    { value: "fensterreinigung", label: "Window cleaning" },
    { value: "grundreinigung", label: "Deep or post-construction cleaning" },
    { value: "reinigung-nach-umzug", label: "Move-out cleaning" },
    { value: "treppenhausreinigung", label: "Stairwell cleaning" },
    { value: "angebot-vergleichen", label: "Cleaning quote review" },
  ],
  regensburg: [
    { value: "reinigung", label: "Cleaning service" },
    { value: "bueroreinigung", label: "Office cleaning" },
    { value: "gewerbereinigung", label: "Commercial cleaning" },
    { value: "praxisreinigung", label: "Practice cleaning" },
    { value: "fensterreinigung", label: "Window cleaning" },
    { value: "wohnungsreinigung", label: "Apartment cleaning" },
    { value: "grundreinigung", label: "Deep or post-construction cleaning" },
    { value: "treppenhausreinigung", label: "Stairwell cleaning" },
    { value: "umzug", label: "Moving, furniture or piano transport" },
    { value: "umzugsservice", label: "Moving help or furniture assembly" },
    { value: "umzug-kosten", label: "Moving costs" },
    { value: "seniorenumzug", label: "Senior moving" },
    { value: "entruempelung", label: "Clearance" },
    { value: "wohnungsaufloesung", label: "House or apartment clearance" },
    { value: "reinigung-nach-umzug", label: "Cleaning after moving" },
    { value: "angebot-vergleichen", label: "Quote review" },
  ],
} as const;

type Region = keyof typeof servicesByRegion;
type ServiceRegion = Exclude<Region, "">;

const serviceAliases: Readonly<Record<string, string>> = {
  angebotscheck: "angebot-vergleichen",
  endreinigung: "reinigung-nach-umzug",
  gebaeudereinigung: "gewerbereinigung",
  "umzug-mit-reinigung": "reinigung-nach-umzug",
};

const movingServices = new Set(["umzug", "umzugsservice", "umzugsunternehmen", "umzug-kosten", "seniorenumzug"]);
const clearanceServices = new Set(["entruempelung", "wohnungsaufloesung"]);
const acceptedFileTypes = new Set(REQUEST_ATTACHMENT_RULES.allowedMimeTypes);

function isServiceRegion(value: string | null): value is ServiceRegion {
  return value === "duesseldorf" || value === "regensburg";
}

function normalizeRequestedService(value: string | null) {
  if (!value) return "";
  return serviceAliases[value] ?? value;
}

function hasService(region: Region, service: string) {
  return region !== "" && servicesByRegion[region].some((option) => option.value === service);
}

function Progress({ step }: { step: Step }) {
  return (
    <ol className="grid grid-cols-3 gap-2" aria-label={`Step ${step} of 3`}>
      {["Service", "Details", "Contact"].map((label, index) => {
        const number = (index + 1) as Step;
        return (
          <li
            key={label}
            aria-current={step === number ? "step" : undefined}
            className={`rounded-lg border px-3 py-3 text-center text-xs font-black sm:text-sm ${
              step >= number ? "border-blue-700 bg-blue-50 text-blue-950" : "border-slate-200 text-slate-500"
            }`}
          >
            {number}. {label}
          </li>
        );
      })}
    </ol>
  );
}

export function EnglishRequestForm() {
  const [step, setStep] = useState<Step>(1);
  const [state, setState] = useState<SubmitState>("idle");
  const [region, setRegion] = useState<Region>("");
  const [service, setService] = useState("");
  const [cityOrZip, setCityOrZip] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [areaSize, setAreaSize] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [estimatedVolume, setEstimatedVolume] = useState("");
  const [offerConcern, setOfferConcern] = useState("");
  const [desiredDate, setDesiredDate] = useState("");
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState("email");
  const [responseLanguage, setResponseLanguage] = useState("en");
  const [errorMessage, setErrorMessage] = useState("");
  const [requestId, setRequestId] = useState("");
  const [submittedSummary, setSubmittedSummary] = useState("");
  const startedAtRef = useRef(Date.now());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedService = normalizeRequestedService(params.get("service"));
    const requestedRegion = params.get("city");
    let nextRegion: Region = isServiceRegion(requestedRegion) ? requestedRegion : "";

    if (!nextRegion && requestedService) {
      const matchingRegions = (["duesseldorf", "regensburg"] as const).filter((candidate) =>
        hasService(candidate, requestedService),
      );
      if (matchingRegions.length === 1) nextRegion = matchingRegions[0];
    }

    if (nextRegion) {
      setRegion(nextRegion);
      if (hasService(nextRegion, requestedService)) setService(requestedService);
    }
  }, []);

  const serviceLabel = useMemo(
    () => servicesByRegion[region].find((option) => option.value === service)?.label || "Not selected",
    [region, service],
  );
  const serviceGroup = service === "angebot-vergleichen"
    ? "offer"
    : movingServices.has(service)
      ? "moving"
      : clearanceServices.has(service)
        ? "clearance"
        : "cleaning";

  function showError(message: string) {
    setErrorMessage(message);
    setState("error");
  }

  function continueFromService() {
    if (!region || !service) {
      showError("Select a location and service before continuing.");
      return;
    }
    setErrorMessage("");
    setState("idle");
    setStep(2);
  }

  function continueFromDetails() {
    if (!cityOrZip.trim() || !details.trim()) {
      showError("Add the city or postcode and describe the requested scope.");
      return;
    }
    if (serviceGroup === "cleaning" && (!propertyType.trim() || !areaSize.trim())) {
      showError("For cleaning, add the property type and approximate size.");
      return;
    }
    if (serviceGroup === "moving" && (!startLocation.trim() || !destinationLocation.trim())) {
      showError("For moving or transport, add the start and destination.");
      return;
    }
    if (serviceGroup === "clearance" && (!propertyType.trim() || !estimatedVolume.trim())) {
      showError("For clearance, add the property type and an approximate volume or fill level.");
      return;
    }
    if (serviceGroup === "offer" && !offerConcern.trim()) {
      showError("Tell us what you want checked in the existing quote.");
      return;
    }
    setErrorMessage("");
    setState("idle");
    setStep(3);
  }

  function selectFiles(nextFiles: File[]) {
    if (nextFiles.length > REQUEST_ATTACHMENT_RULES.maxFiles) {
      showError(`Select no more than ${REQUEST_ATTACHMENT_RULES.maxFiles} files.`);
      return;
    }
    const invalid = nextFiles.find((file) => !acceptedFileTypes.has(file.type));
    if (invalid) {
      showError(`${invalid.name} is not a supported JPG, PNG, WebP or PDF file.`);
      return;
    }
    const oversized = nextFiles.find((file) => file.size > REQUEST_ATTACHMENT_RULES.maxFileBytes);
    if (oversized) {
      showError(`${oversized.name} is larger than 8 MB.`);
      return;
    }
    if (nextFiles.reduce((total, file) => total + file.size, 0) > REQUEST_ATTACHMENT_RULES.maxTotalBytes) {
      showError("The selected files exceed the 24 MB total limit.");
      return;
    }
    setFiles(nextFiles);
    setErrorMessage("");
    setState("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    if (!name.trim() || (contactMethod === "email" ? !email.trim() : !phone.trim())) {
      showError("Add your name and the contact detail required for your preferred contact method.");
      return;
    }

    setState("sending");
    setErrorMessage("");
    const data = new FormData(event.currentTarget);
    const query = new URLSearchParams(window.location.search);
    const fields: Record<string, string> = {
      type: "booking_request",
      lead_type: "english-service-request",
      leadSource: "english-service-request",
      source: "english-service-request",
      sourceComponent: "EnglishRequestForm",
      sourcePage: "/en/contact",
      landingPage: `${window.location.pathname}${window.location.search}`,
      intent: query.get("intent") || "english-contact",
      locale: responseLanguage,
      timestamp: new Date().toISOString(),
      formStartedAt: String(startedAtRef.current),
      city: region,
      region,
      cityOrZip: cityOrZip.trim(),
      service,
      requestedService: service,
      propertyType: propertyType.trim(),
      areaSize: areaSize.trim(),
      startLocation: startLocation.trim(),
      destinationLocation: destinationLocation.trim(),
      estimatedVolume: estimatedVolume.trim(),
      offerConcern: offerConcern.trim(),
      desiredDate,
      details: details.trim(),
      scope: details.trim(),
      preferredContactMethod: contactMethod,
      contactMethod,
      utmSource: query.get("utm_source") || "",
      utmMedium: query.get("utm_medium") || "",
      utmCampaign: query.get("utm_campaign") || "",
      utmTerm: query.get("utm_term") || "",
      utmContent: query.get("utm_content") || "",
      gclid: query.get("gclid") || "",
    };
    for (const [key, value] of Object.entries(fields)) data.set(key, value);
    data.delete("photo");
    for (const file of files) data.append("photo", file);

    try {
      const response = await bookingFetch("/api/bookings", { method: "POST", body: data });
      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        requestId?: string;
      };
      if (response.status !== 201 || payload.ok !== true || !payload.requestId) {
        const fieldErrors = bookingFieldErrors(payload);
        const firstFieldError = Object.values(fieldErrors).find(Boolean);
        throw new Error(firstFieldError || payload.error || "Request could not be submitted.");
      }
      setRequestId(payload.requestId);
      setSubmittedSummary(`${serviceLabel} · ${cityOrZip.trim()} · ${contactMethod} · ${responseLanguage === "en" ? "English" : "German"}`);
      setState("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Request could not be submitted.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6" role="status" data-request-success>
        <CheckCircle2 className="h-7 w-7 text-emerald-700" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-black text-slate-950">Your request has been sent.</h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">Reference: <strong>{requestId}</strong></p>
        <p className="mt-1 text-sm font-semibold leading-7 text-slate-700">Summary: {submittedSummary}</p>
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
          Next step: FLOXANT reviews the submitted facts and contacts you through your preferred channel. Price, scope and availability are confirmed only after that review.
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" aria-label="English FLOXANT request form">
      <Progress step={step} />
      {errorMessage ? (
        <p className="mt-5 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-800" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <form
        onSubmit={handleSubmit}
        onChange={() => {
          setErrorMessage("");
          if (state === "error") setState("idle");
        }}
        className="mt-6 grid gap-5"
        noValidate
      >
        {step === 1 ? (
          <div className="grid gap-5">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Select location and service</h2>
              <p className="mt-2 text-sm font-semibold text-slate-600">The selection controls which project details are required next.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-slate-800">Location
                <select value={region} onChange={(event) => { const next = event.target.value as Region; setRegion(next); setService((current) => hasService(next, current) ? current : ""); }} className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 font-semibold">
                  <option value="">Select a location</option><option value="duesseldorf">Düsseldorf</option><option value="regensburg">Regensburg</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-800">Service
                <select value={service} onChange={(event) => setService(event.target.value)} disabled={!region} className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 font-semibold disabled:bg-slate-100">
                  <option value="">{region ? "Select a service" : "Select a location first"}</option>
                  {servicesByRegion[region].map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </label>
            </div>
            <button type="button" onClick={continueFromService} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 text-sm font-black text-white">Continue to project details <ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-5">
            <div><h2 className="text-2xl font-black text-slate-950">Project details</h2><p className="mt-2 text-sm font-semibold text-slate-600">Required fields change with the selected service.</p></div>
            <label className="grid gap-2 text-sm font-bold text-slate-800">City or postcode *
              <input value={cityOrZip} onChange={(event) => setCityOrZip(event.target.value)} autoComplete="postal-code" className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" />
            </label>
            {serviceGroup === "cleaning" ? <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-slate-800">Property type *<input value={propertyType} onChange={(event) => setPropertyType(event.target.value)} placeholder="Flat, office, practice…" className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" /></label>
              <label className="grid gap-2 text-sm font-bold text-slate-800">Approximate size *<input value={areaSize} onChange={(event) => setAreaSize(event.target.value)} placeholder="e.g. 85 m² or 5 rooms" className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" /></label>
            </div> : null}
            {serviceGroup === "moving" ? <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-slate-800">Start location *<input value={startLocation} onChange={(event) => setStartLocation(event.target.value)} className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" /></label>
              <label className="grid gap-2 text-sm font-bold text-slate-800">Destination *<input value={destinationLocation} onChange={(event) => setDestinationLocation(event.target.value)} className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" /></label>
            </div> : null}
            {serviceGroup === "clearance" ? <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-slate-800">Property or area type *<input value={propertyType} onChange={(event) => setPropertyType(event.target.value)} placeholder="Flat, cellar, house…" className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" /></label>
              <label className="grid gap-2 text-sm font-bold text-slate-800">Approximate volume or fill level *<input value={estimatedVolume} onChange={(event) => setEstimatedVolume(event.target.value)} placeholder="e.g. half full or about 8 m³" className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" /></label>
            </div> : null}
            {serviceGroup === "offer" ? <label className="grid gap-2 text-sm font-bold text-slate-800">What should be checked? *<input value={offerConcern} onChange={(event) => setOfferConcern(event.target.value)} placeholder="Scope, extra items, assumptions…" className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" /></label> : null}
            <label className="grid gap-2 text-sm font-bold text-slate-800">Preferred date or deadline<input type="date" value={desiredDate} onChange={(event) => setDesiredDate(event.target.value)} className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" /></label>
            <label className="grid gap-2 text-sm font-bold text-slate-800">Scope, condition, access and timing *<textarea value={details} onChange={(event) => setDetails(event.target.value)} rows={6} className="rounded-lg border border-slate-300 px-4 py-3 font-semibold leading-7" /></label>
            <label className="grid gap-2 text-sm font-bold text-slate-800"><span className="inline-flex items-center gap-2"><FileUp className="h-4 w-4" aria-hidden="true" />Photos or documents (optional)</span>
              <input type="file" multiple accept="image/jpeg,image/png,image/webp,application/pdf" onChange={(event) => selectFiles(Array.from(event.currentTarget.files || []))} className="block w-full text-sm font-semibold file:mr-3 file:rounded-lg file:border-0 file:bg-blue-700 file:px-4 file:py-2 file:font-black file:text-white" />
              <span className="text-xs font-medium leading-5 text-slate-600">Up to {REQUEST_ATTACHMENT_RULES.maxFiles} files; JPG, PNG, WebP or PDF; 8 MB each and 24 MB total. Do not upload IDs, access codes or unnecessary personal documents.</span>
              {files.length ? <span className="text-xs font-semibold text-slate-700">Selected: {files.map((file) => file.name).join(", ")}</span> : null}
            </label>
            <div className="flex flex-wrap gap-3"><button type="button" onClick={() => setStep(1)} className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-black"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back</button><button type="button" onClick={continueFromDetails} className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-blue-700 px-5 text-sm font-black text-white">Continue to contact and summary<ArrowRight className="h-4 w-4" aria-hidden="true" /></button></div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-5">
            <div><h2 className="text-2xl font-black text-slate-950">Contact and summary</h2><p className="mt-2 text-sm font-semibold text-slate-600">Review the request before sending it.</p></div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-slate-800">Name *<input name="name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" /></label>
              <label className="grid gap-2 text-sm font-bold text-slate-800">Preferred contact method *<select name="preferredContactMethod" value={contactMethod} onChange={(event) => setContactMethod(event.target.value)} className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 font-semibold"><option value="email">Email</option><option value="telefon">Phone</option><option value="whatsapp">WhatsApp</option></select></label>
              <label className="grid gap-2 text-sm font-bold text-slate-800">Email{contactMethod === "email" ? " *" : ""}<input name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" /></label>
              <label className="grid gap-2 text-sm font-bold text-slate-800">Phone{contactMethod !== "email" ? " *" : ""}<input name="phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" className="min-h-12 rounded-lg border border-slate-300 px-4 font-semibold" /></label>
              <label className="grid gap-2 text-sm font-bold text-slate-800 sm:col-span-2">Response language *<select name="locale" value={responseLanguage} onChange={(event) => setResponseLanguage(event.target.value)} className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 font-semibold"><option value="en">English</option><option value="de">German</option></select></label>
            </div>
            <section className="rounded-lg border border-blue-200 bg-blue-50 p-5" aria-labelledby="english-request-summary"><h3 id="english-request-summary" className="text-lg font-black text-slate-950">Your request</h3><dl className="mt-3 grid gap-3 sm:grid-cols-2"><div><dt className="text-xs font-black uppercase text-slate-500">Location</dt><dd className="font-semibold">{region === "duesseldorf" ? "Düsseldorf" : "Regensburg"} · {cityOrZip}</dd></div><div><dt className="text-xs font-black uppercase text-slate-500">Service</dt><dd className="font-semibold">{serviceLabel}</dd></div><div className="sm:col-span-2"><dt className="text-xs font-black uppercase text-slate-500">Scope</dt><dd className="whitespace-pre-wrap font-semibold">{details}</dd></div>{files.length ? <div className="sm:col-span-2"><dt className="text-xs font-black uppercase text-slate-500">Files</dt><dd className="font-semibold">{files.map((file) => file.name).join(", ")}</dd></div> : null}</dl></section>
            <PrivacyConsentField locale="en" id="english-request-privacy" />
            <label className="sr-only" aria-hidden="true">Website<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
            <div className="flex flex-wrap gap-3"><button type="button" onClick={() => setStep(2)} disabled={state === "sending"} className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-black"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back</button><button type="submit" disabled={state === "sending"} className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-slate-950 px-6 text-sm font-black text-white disabled:opacity-60"><Send className="h-4 w-4" aria-hidden="true" />{state === "sending" ? "Sending…" : "Send non-binding request"}</button></div>
          </div>
        ) : null}
      </form>
    </section>
  );
}
