"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  Phone,
  ShieldAlert,
} from "lucide-react";

import { UploadDropCard } from "@/components/UploadDropCard";

const PHONE_DISPLAY = "01577 1105087";
const PHONE_TEL = "+4915771105087";
const EMAIL = "info@floxant.de";
const MAX_FILE_BYTES = 12 * 1024 * 1024;

const problemOptions = [
  "Umzug",
  "Reinigung",
  "Entrümpelung",
  "Entsorgung",
  "Transport",
  "Übergabe",
  "Schlüssel",
  "Kombination",
  "Düsseldorf Reinigung",
  "Düsseldorf Entsorgung",
  "Sonstiges",
];

const urgencyOptions = [
  "Heute",
  "Morgen",
  "In 2-3 Tagen",
  "Diese Woche",
  "Vor Übergabetermin",
  "Flexibel, aber bald",
];

const openItemOptions = [
  "Transport",
  "Tragen",
  "Möbel / Kartons",
  "Reinigung",
  "Bad / Küche / Böden",
  "Keller / Garage",
  "Sperrmüll / Entsorgung",
  "Entrümpelung",
  "Schlüsselübergabe",
  "Übergabeprotokoll / Übergabeakte",
  "Halteverbot",
  "Fahrzeugbedarf",
  "Rückfahrt / Leerfahrt",
  "Fotos vorhanden",
  "Budget vorhanden",
];

const addonOptions = [
  "Endreinigung",
  "Entrümpelung",
  "Entsorgung",
  "Schlüsselübergabe",
  "Übergabeakte",
  "Halteverbotszone",
  "Leerfahrt/Rückfahrt",
  "Premium/Rückruf",
];

const previousSourceOptions = [
  "Plattform",
  "lokaler Anbieter",
  "privat organisiert",
  "möchte ich nicht angeben",
];

const damageDefaults = {
  standard: {
    problemType: "Kombination",
    urgency: "Morgen",
    situation: "handover_soon",
    openItems: ["Reinigung", "Fotos vorhanden"],
    addons: ["Übergabeakte"],
    whatsappMessage:
      "Hallo FLOXANT, mein Plan ist kurzfristig gekippt. Es geht um [Umzug/Reinigung/Entrümpelung/Übergabe] in [Ort]. Deadline: [Datum]. Fotos und offene Punkte kann ich senden. Bitte prüfen, ob Schadensbegrenzung möglich ist.",
  },
  umzug: {
    problemType: "Umzug",
    urgency: "Morgen",
    situation: "move_kipped",
    openItems: ["Transport", "Tragen", "Möbel / Kartons", "Fahrzeugbedarf", "Fotos vorhanden"],
    addons: ["Halteverbotszone", "Leerfahrt/Rückfahrt", "Premium/Rückruf"],
    whatsappMessage:
      "Hallo FLOXANT, mein Umzug läuft nicht wie geplant. Ort/Strecke: [Ort], Deadline: [Datum]. Fotos und Umfang kann ich senden. Bitte prüfen, ob etwas machbar ist.",
  },
  reinigung: {
    problemType: "Reinigung",
    urgency: "Morgen",
    situation: "cleaning_not_ready",
    openItems: ["Reinigung", "Bad / Küche / Böden", "Übergabeprotokoll / Übergabeakte", "Fotos vorhanden"],
    addons: ["Endreinigung", "Übergabeakte", "Schlüsselübergabe"],
    whatsappMessage:
      "Hallo FLOXANT, ich brauche kurzfristig Reinigung vor Übergabe. Ort: [Ort], Termin: [Datum]. Fotos kann ich senden.",
  },
  entruempelung: {
    problemType: "Entrümpelung",
    urgency: "Morgen",
    situation: "clearance_open",
    openItems: ["Keller / Garage", "Sperrmüll / Entsorgung", "Entrümpelung", "Fotos vorhanden"],
    addons: ["Entrümpelung", "Entsorgung", "Endreinigung"],
    whatsappMessage:
      "Hallo FLOXANT, Wohnung/Keller ist noch nicht leer. Ort: [Ort], Deadline: [Datum]. Fotos kann ich senden. Bitte prüfen, ob Räumung/Entsorgung möglich ist.",
  },
  transport: {
    problemType: "Transport",
    urgency: "Morgen",
    situation: "vehicle_too_small",
    openItems: ["Transport", "Möbel / Kartons", "Fahrzeugbedarf", "Rückfahrt / Leerfahrt", "Fotos vorhanden"],
    addons: ["Leerfahrt/Rückfahrt", "Premium/Rückruf"],
    whatsappMessage:
      "Hallo FLOXANT, ich habe kurzfristig ein Transportproblem. Start/Ziel: [Ort], Deadline: [Datum]. Umfang und Fotos kann ich senden.",
  },
  objektfall: {
    problemType: "Übergabe",
    urgency: "Vor Übergabetermin",
    situation: "handover_soon",
    openItems: ["Reinigung", "Keller / Garage", "Sperrmüll / Entsorgung", "Schlüsselübergabe", "Übergabeprotokoll / Übergabeakte"],
    addons: ["Endreinigung", "Entrümpelung", "Entsorgung", "Schlüsselübergabe", "Übergabeakte"],
    whatsappMessage:
      "Hallo FLOXANT, ein Objektfall ist kurzfristig dringend. Es geht um Räumung/Reinigung/Übergabevorbereitung in [Ort]. Termin und Fotos kann ich senden.",
  },
  duesseldorf_reinigung: {
    problemType: "Düsseldorf Reinigung",
    urgency: "Morgen",
    situation: "cleaning_not_ready",
    openItems: ["Reinigung", "Bad / Küche / Böden", "Fotos vorhanden", "Budget vorhanden"],
    addons: ["Endreinigung", "Premium/Rückruf"],
    whatsappMessage:
      "Hallo FLOXANT, ich brauche kurzfristig Reinigung in Düsseldorf. Ort, Termin und Fotos kann ich senden. Bitte prüfen, ob etwas machbar ist.",
  },
  duesseldorf_entsorgung: {
    problemType: "Düsseldorf Entsorgung",
    urgency: "Morgen",
    situation: "clearance_open",
    openItems: ["Sperrmüll / Entsorgung", "Möbel / Kartons", "Fotos vorhanden", "Budget vorhanden"],
    addons: ["Entsorgung", "Premium/Rückruf"],
    whatsappMessage:
      "Hallo FLOXANT, ich brauche kurzfristig Entsorgung in Düsseldorf. Umfang, Zugang, Termin und Fotos kann ich senden. Bitte prüfen, ob etwas machbar ist.",
  },
  duesseldorf_apartment_cleaning: {
    problemType: "Düsseldorf Reinigung",
    urgency: "Morgen",
    situation: "cleaning_not_ready",
    openItems: ["Reinigung", "Bad / Küche / Böden", "Fotos vorhanden"],
    addons: ["Endreinigung", "Premium/Rückruf"],
    whatsappMessage:
      "Hallo FLOXANT, ich brauche kurzfristig Reinigung für eine möblierte Wohnung / ein Apartment in Düsseldorf. Termin, Fotos und Objektangaben kann ich senden.",
  },
} as const;

function getDamageDefaults(context: string | null) {
  if (context && context in damageDefaults) return damageDefaults[context as keyof typeof damageDefaults];
  return damageDefaults.standard;
}

const situationCards = [
  {
    value: "move_kipped",
    title: "Umzug läuft nicht wie geplant",
    text: "Umfang, Helfer, Fahrzeug oder Zeitfenster reichen nicht aus.",
    services: "Umzug, Transport, Tragen, Rückfahrt",
  },
  {
    value: "provider_cancelled",
    title: "Anbieter oder Helfer hat abgesagt",
    text: "Kurzfristig braucht es eine realistische Kapazitätsprüfung.",
    services: "Umzug, Reinigung, Entrümpelung",
  },
  {
    value: "vehicle_too_small",
    title: "Transporter/Fahrzeug reicht nicht",
    text: "Restmenge, Einzelstücke oder Zusatzfahrt müssen eingeordnet werden.",
    services: "Transport, Leerfahrt/Rückfahrt",
  },
  {
    value: "cleaning_not_ready",
    title: "Wohnung ist noch nicht sauber",
    text: "Bad, Küche, Böden oder sichtbare Übergabepunkte sind offen.",
    services: "Endreinigung, Übergabevorbereitung",
  },
  {
    value: "clearance_open",
    title: "Entrümpelung ist nicht fertig",
    text: "Keller, Garage, Sperrmüll oder Restmöbel blockieren die Übergabe.",
    services: "Entrümpelung, Entsorgung, Reinigung",
  },
  {
    value: "handover_soon",
    title: "Übergabetermin steht kurz bevor",
    text: "Schlüssel, Reinigung, Fotos und offene Punkte müssen schnell klar werden.",
    services: "Übergabeakte, Schlüssel, Reinigung",
  },
];

type SubmitState = "idle" | "submitting" | "success" | "error";

function getUtmValue(key: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key) || "";
}

function validatePhotos(files: File[]) {
  const invalidType = files.find((file) => !["image/jpeg", "image/png", "image/webp"].includes(file.type));
  if (invalidType) return "Bitte nur JPG, PNG oder WebP als Fotos hochladen.";
  const oversized = files.find((file) => file.size > MAX_FILE_BYTES);
  if (oversized) return "Bitte einzelne Fotos unter 12 MB hochladen oder per WhatsApp senden.";
  return "";
}

function validateOfferFiles(files: File[]) {
  const allowed = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
  const invalidType = files.find((file) => !allowed.includes(file.type));
  if (invalidType) return "Bitte vorhandene Angebote nur als PDF, JPG, PNG oder WebP hochladen.";
  const oversized = files.find((file) => file.size > MAX_FILE_BYTES);
  if (oversized) return "Bitte einzelne Angebotsdateien unter 12 MB hochladen oder per WhatsApp senden.";
  return "";
}

export function DamageControlForm() {
  const [queryContext, setQueryContext] = useState({
    source: "",
    context: "standard",
    sourcePage: "",
  });
  const sourceParam = queryContext.source;
  const sourceContext = queryContext.context;
  const sourcePage = queryContext.sourcePage;
  const planButtonSource = sourceParam === "plan_gekippt_button";
  const currentDefaults = useMemo(() => getDamageDefaults(sourceContext), [sourceContext]);
  const [problemType, setProblemType] = useState<string>(currentDefaults.problemType);
  const [urgency, setUrgency] = useState<string>(currentDefaults.urgency);
  const [situation, setSituation] = useState<string>(currentDefaults.situation);
  const [selectedOpenItems, setSelectedOpenItems] = useState<string[]>([...currentDefaults.openItems]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([...currentDefaults.addons]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [offerFiles, setOfferFiles] = useState<File[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappText = useMemo(
    () =>
      encodeURIComponent(currentDefaults.whatsappMessage),
    [currentDefaults],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    setQueryContext({
      source: params.get("source") || "",
      context: params.get("context") || "standard",
      sourcePage: params.get("source_page") || "",
    });
  }, []);

  useEffect(() => {
    if (!planButtonSource) return;
    setProblemType(currentDefaults.problemType);
    setUrgency(currentDefaults.urgency);
    setSituation(currentDefaults.situation);
    setSelectedOpenItems([...currentDefaults.openItems]);
    setSelectedAddons([...currentDefaults.addons]);
  }, [currentDefaults, planButtonSource]);

  function toggleItem(value: string, setter: (value: string[]) => void, current: string[]) {
    setter(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const cityOrZip = String(formData.get("cityOrZip") || "").trim();
    const deadline = String(formData.get("deadline") || "").trim();
    const description = String(formData.get("message") || "").trim();

    if (name.length < 2) {
      setErrorMessage("Bitte geben Sie einen Namen an.");
      return;
    }
    if (!phone && !email) {
      setErrorMessage("Bitte Telefonnummer oder E-Mail angeben, damit FLOXANT schnell reagieren kann.");
      return;
    }
    if (phone && phone.length < 6) {
      setErrorMessage("Bitte prüfen Sie die Telefonnummer.");
      return;
    }
    if (!cityOrZip) {
      setErrorMessage("Bitte Ort oder PLZ angeben.");
      return;
    }
    if (!deadline) {
      setErrorMessage("Bitte Deadline, Übergabetermin oder Wunschzeitraum angeben.");
      return;
    }
    if (!description || description.length < 10) {
      setErrorMessage("Bitte beschreiben Sie kurz, was gekippt ist und was noch offen ist.");
      return;
    }
    if (formData.get("privacy") !== "on") {
      setErrorMessage("Bitte bestätigen Sie den Datenschutz-Hinweis.");
      return;
    }

    const photoError = validatePhotos(photos);
    if (photoError) {
      setErrorMessage(photoError);
      return;
    }
    const offerError = validateOfferFiles(offerFiles);
    if (offerError) {
      setErrorMessage(offerError);
      return;
    }

    formData.set("type", "damage_control");
    formData.set("lead_type", "schadensbegrenzung");
    formData.set("service", "schadensbegrenzung");
    formData.set("problemType", problemType);
    formData.set("urgency", urgency);
    formData.set("damageSituation", situation);
    formData.set("selectedOpenItems", JSON.stringify(selectedOpenItems));
    formData.set("selectedAddons", JSON.stringify(selectedAddons));
    formData.set("region", "regensburg_bayern_duesseldorf_cleaning_disposal");
    formData.set("timestamp", new Date().toISOString());
    formData.set("leadSource", planButtonSource ? "plan_gekippt_button" : "damage_control");
    formData.set("source", planButtonSource ? "plan_gekippt_button" : "damage_control");
    formData.set("sourceComponent", planButtonSource ? "plan_gekippt_button" : "damage_control_form");
    formData.set("sourceContext", sourceContext);
    formData.set("sourcePage", sourcePage);
    formData.set("landingPage", typeof window === "undefined" ? "/schadensbegrenzung" : `${window.location.pathname}${window.location.search}`);
    formData.set("referrer", typeof document === "undefined" ? "" : document.referrer);
    formData.set("utmSource", getUtmValue("utm_source"));
    formData.set("utmMedium", getUtmValue("utm_medium"));
    formData.set("utmCampaign", getUtmValue("utm_campaign"));
    formData.set("utmContent", getUtmValue("utm_content"));
    formData.set("referralCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    formData.set("partnerCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    photos.forEach((file) => formData.append("damagePhoto", file));
    offerFiles.forEach((file) => formData.append("damageOfferFile", file));

    setSubmitState("submitting");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        body: formData,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || result.error || "Die Anfrage konnte nicht gesendet werden.");
      }

      form.reset();
      setProblemType(currentDefaults.problemType);
      setUrgency(currentDefaults.urgency);
      setSituation(currentDefaults.situation);
      setSelectedOpenItems([...currentDefaults.openItems]);
      setSelectedAddons([...currentDefaults.addons]);
      setPhotos([]);
      setOfferFiles([]);
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <div id="schadensbegrenzung-form" className="rounded-[2rem] border border-red-200 bg-white p-5 shadow-2xl shadow-red-950/10 sm:p-7">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-red-700">
          <ShieldAlert className="h-4 w-4" />
          Rettungsmodus
        </div>
        <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">Was ist passiert?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Wählen Sie die nächste Situation. FLOXANT nutzt die Angaben nur zur schnellen Machbarkeitsprüfung nach Verfügbarkeit.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {situationCards.map((item) => {
          const active = situation === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setSituation(item.value)}
              data-event="select_damage_problem_type"
              data-problem={item.value}
              className={`rounded-[1.2rem] border p-4 text-left transition ${
                active ? "border-red-500 bg-red-50 text-red-950" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-red-200"
              }`}
            >
              <span className="block text-sm font-black">{item.title}</span>
              <span className="mt-1 block text-xs leading-5">{item.text}</span>
              <span className="mt-3 block rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-red-700">
                {item.services}
              </span>
            </button>
          );
        })}
      </div>

      <form className="mt-7 grid gap-4" onSubmit={handleSubmit} data-event={planButtonSource ? "start_plan_gekippt_form" : "start_damage_control_lead"}>
        <input type="hidden" name="sourceComponent" value={planButtonSource ? "plan_gekippt_button" : "damage_control_form"} />
        <input type="hidden" name="sourceContext" value={sourceContext} />
        <input type="hidden" name="sourcePage" value={sourcePage} />
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Name*
            <input name="name" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-red-500" placeholder="Ansprechpartner" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Telefon
            <input name="phone" type="tel" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-red-500" placeholder="für schnelle Rückfragen" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            E-Mail
            <input name="email" type="email" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-red-500" placeholder={EMAIL} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Ort / PLZ*
            <input name="cityOrZip" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-red-500" placeholder="Regensburg, Kelheim, Düsseldorf..." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Art des Problems*
            <select
              name="problemType"
              value={problemType}
              onChange={(event) => setProblemType(event.target.value)}
              data-event="select_damage_problem_type"
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-red-500"
            >
              {problemOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Dringlichkeit*
            <select
              name="urgency"
              value={urgency}
              onChange={(event) => setUrgency(event.target.value)}
              data-event="select_damage_urgency"
              className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-red-500"
            >
              {urgencyOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Deadline / Termin*
            <input name="deadline" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-red-500" placeholder="Heute, morgen, Übergabe am..." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Bisherige Organisation optional
            <select name="previousOfferSource" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-red-500">
              {previousSourceOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Startort bei Umzug/Transport
            <input name="startLocation" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-red-500" placeholder="falls relevant" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Zielort bei Umzug/Transport
            <input name="destinationLocation" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-red-500" placeholder="falls relevant" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Etage
            <input name="floor" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-red-500" placeholder="z. B. 3. OG" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Aufzug
            <select name="elevator" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-red-500">
              <option value="">Bitte wählen</option>
              <option value="ja">Ja</option>
              <option value="nein">Nein</option>
              <option value="unklar">Unklar</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Umfang / Volumen
            <input name="estimatedVolume" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-red-500" placeholder="z. B. Restmöbel, Keller, 20 Kartons" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Budget / Preisrahmen optional
            <input name="budget" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium outline-none transition focus:border-red-500" placeholder="falls vorhanden" />
          </label>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-sm font-black text-slate-900">
            <CheckCircle2 className="h-4 w-4 text-red-700" />
            Was ist noch offen?
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {openItemOptions.map((item) => (
              <label key={item} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={selectedOpenItems.includes(item)}
                  onChange={() => toggleItem(item, setSelectedOpenItems, selectedOpenItems)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-red-600"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
          <div className="text-sm font-black text-slate-900">Zusatzservices, die helfen könnten</div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {addonOptions.map((item) => (
              <label key={item} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={selectedAddons.includes(item)}
                  onChange={() => toggleItem(item, setSelectedAddons, selectedAddons)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-red-600"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Zugang / Trageweg / Besonderheiten
            <textarea name="accessNotes" rows={4} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-red-500" placeholder="Parken, Hausflur, Etage, Schlüssel, Trageweg, Zugang..." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Kurze Beschreibung*
            <textarea name="message" rows={4} className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-red-500" placeholder="Was ist gekippt? Was muss bis wann stabilisiert werden?" />
          </label>
        </div>

        <div className="rounded-[1.75rem] border border-red-100 bg-gradient-to-br from-red-50 via-white to-orange-50/70 p-4 shadow-sm shadow-slate-950/5">
          <div className="mb-4">
            <p className="text-sm font-black text-slate-950">Fotos und Angebot für die Machbarkeitsprüfung</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              Dateien werden getrennt übernommen, damit im Dashboard sofort sichtbar ist, ob Zustand oder vorhandenes Angebot geprüft werden soll.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <UploadDropCard
              title="Fotos optional"
              description="Restmenge, Zustand, Zugang, Etage oder offene Punkte."
              helper="JPG, PNG oder WebP bis 12 MB je Datei."
              accept="image/jpeg,image/png,image/webp"
              files={photos}
              dataEvent="upload_damage_photos"
              tone="emerald"
              onFilesChange={setPhotos}
            />
            <UploadDropCard
              title="Vorhandenes Angebot optional"
              description="PDF, Screenshot oder Angebotsbild."
              helper="Keine Angebotsdatei wird in Tracking-Events gesendet."
              accept="application/pdf,image/jpeg,image/png,image/webp"
              files={offerFiles}
              dataEvent="upload_existing_offer"
              onFilesChange={setOfferFiles}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
            <input name="preferredContact" type="checkbox" value="whatsapp" className="mt-1 h-4 w-4 rounded border-slate-300 text-red-600" />
            <span>WhatsApp bevorzugt</span>
          </label>
          <label className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
            <input name="callbackWanted" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-red-600" />
            <span>Rückruf gewünscht</span>
          </label>
        </div>

        <label className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-red-600" />
          <span>
            Ich stimme zu, dass FLOXANT meine Angaben zur Bearbeitung dieser Anfrage verarbeitet. Keine personenbezogenen Daten werden in Tracking-Events gesendet.
          </span>
        </label>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{errorMessage}</div>
        ) : null}
        {submitState === "success" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
            Danke. Ihre Schadensbegrenzungs-Anfrage ist eingegangen. FLOXANT prüft Ort, Termin, offene Punkte, Fotos und Verfügbarkeit. Wenn etwas machbar ist oder Rückfragen nötig sind, melden wir uns.
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-center">
          <button
            type="submit"
            disabled={isSubmitting}
            data-event="submit_damage_control_lead"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Schadensbegrenzung anfragen
          </button>
          <a
            href={`https://wa.me/${PHONE_TEL.replace("+", "")}?text=${whatsappText}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
            data-event="click_damage_whatsapp"
          >
            <Phone className="h-4 w-4" />
            WhatsApp
          </a>
          <a href={`mailto:${EMAIL}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 transition hover:border-red-200 hover:bg-red-50">
            <Mail className="h-4 w-4" />
            E-Mail
          </a>
        </div>

        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-600">
          <AlertTriangle className="mr-1 inline h-4 w-4 text-red-700" />
          Keine Notdienst- oder Soforteinsatzgarantie. Machbarkeit hängt von Ort, Termin, Umfang und Kapazität ab. Direktkontakt:
          {" "}
          <a href={`tel:${PHONE_TEL}`} className="font-black text-slate-950" data-event="click_damage_phone">{PHONE_DISPLAY}</a>
          {" "}- {EMAIL}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Problem", "Was ist gekippt?"],
            ["Termin", "Bis wann muss etwas passieren?"],
            ["Fotos", "Was ist real offen?"],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[1rem] border border-red-100 bg-red-50 p-4 text-sm leading-6 text-red-950">
              <Clock3 className="mb-2 h-4 w-4 text-red-700" />
              <strong>{title}:</strong> {text}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
