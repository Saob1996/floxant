"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";

import { UploadDropCard } from "@/components/UploadDropCard";

const PHONE_DISPLAY = "01577 1105087";
const PHONE_TEL = "+4915771105087";
const EMAIL = "info@floxant.de";
const MAX_FILE_BYTES = 12 * 1024 * 1024;

const roleOptions = [
  "Eigentuemer",
  "Makler",
  "Vermieter",
  "Erbengemeinschaft",
  "Hausverwaltung",
  "Sonstiges",
];

const objectTypeOptions = [
  "Wohnung",
  "Haus",
  "Zimmer",
  "Keller",
  "Garage",
  "Dachboden",
  "mehrere Bereiche",
  "Gewerbeflaeche",
  "Sonstiges",
];

const goalOptions = [
  "Verkauf vorbereiten",
  "Besichtigung vorbereiten",
  "Expose-Fotos vorbereiten",
  "Objekt nach Auszug vorbereiten",
  "Nachlass / Erbfall raeumen",
  "wieder nutzbar machen",
  "anderes",
];

const serviceOptions = [
  "Raeumung / Entruempelung",
  "Entsorgung",
  "Reinigung vor Besichtigung",
  "Endreinigung",
  "Grundreinigung",
  "Keller / Garage / Dachboden",
  "Foto-Dokumentation",
  "Uebergabeakte",
  "Schluesselkoordination",
  "Makler-/Vermieter-Link",
  "Diskrete Abstimmung",
  "Rueckruf",
];

const statusCards = [
  {
    value: "moebliert",
    title: "Noch moebliert",
    text: "Moebel, Hausrat oder Restgegenstaende blockieren den ersten Eindruck.",
    services: "Raeumung + Entsorgung + Reinigung",
  },
  {
    value: "nebenflaechen_voll",
    title: "Keller/Garage voll",
    text: "Nebenflaechen stoeren Verkauf, Besichtigung oder Fototermin.",
    services: "Nebenflaechen pruefen",
  },
  {
    value: "reinigung_fehlt",
    title: "Reinigung fehlt",
    text: "Bad, Kueche, Boeden oder sichtbare Flaechen brauchen Vorbereitung.",
    services: "Reinigung vor Besichtigung",
  },
  {
    value: "fototermin_bald",
    title: "Foto-/Besichtigungstermin",
    text: "Der Termin steht bald an und offene Punkte muessen priorisiert werden.",
    services: "Besichtigungs-Ready",
  },
  {
    value: "nachlass",
    title: "Erbfall / Nachlass",
    text: "Objekt soll diskret geraeumt, gereinigt oder nutzbarer gemacht werden.",
    services: "Diskret + Raeumung",
  },
  {
    value: "mehrere_bereiche",
    title: "Mehrere Bereiche",
    text: "Wohnung, Keller, Garage oder Dachboden sollen zusammen betrachtet werden.",
    services: "Property-Ready Paket",
  },
];

const urgencyOptions = ["diese Woche", "naechste Woche", "vor Besichtigung", "vor Fototermin", "flexibel"];
const clearanceOptions = ["ja", "nein", "unklar"];
const hazardOptions = ["nein", "ja", "unklar"];

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

export function PropertyReadyForm() {
  const [role, setRole] = useState("Eigentuemer");
  const [goalType, setGoalType] = useState("Besichtigung vorbereiten");
  const [objectStatus, setObjectStatus] = useState("fototermin_bald");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Reinigung vor Besichtigung",
    "Foto-Dokumentation",
  ]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappText = useMemo(
    () =>
      encodeURIComponent(
        "Hallo FLOXANT, ich moechte eine Immobilie vor Verkauf/Besichtigung vorbereiten lassen. Es geht um [Wohnung/Haus/Keller/Garage] in [Ort]. Benoetigt werden Raeumung/Reinigung/Entsorgung nach Absprache. Fotos und Termin kann ich senden.",
      ),
    [],
  );

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service) ? current.filter((item) => item !== service) : [...current, service],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const objectLocation = String(formData.get("objectLocation") || "").trim();
    const desiredDate = String(formData.get("desiredDate") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (name.length < 2) {
      setErrorMessage("Bitte geben Sie einen Namen an.");
      return;
    }
    if (!phone && !email) {
      setErrorMessage("Bitte Telefonnummer oder E-Mail angeben, damit FLOXANT Rueckfragen stellen kann.");
      return;
    }
    if (phone && phone.length < 6) {
      setErrorMessage("Bitte pruefen Sie die Telefonnummer.");
      return;
    }
    if (!objectLocation) {
      setErrorMessage("Bitte Objektort oder PLZ angeben.");
      return;
    }
    if (!desiredDate) {
      setErrorMessage("Bitte Zeitraum, Besichtigungstermin oder Fototermin angeben.");
      return;
    }
    if (!selectedServices.length) {
      setErrorMessage("Bitte mindestens einen Service-Baustein auswaehlen.");
      return;
    }
    if (message.length < 10) {
      setErrorMessage("Bitte beschreiben Sie kurz, was vor Verkauf oder Besichtigung offen ist.");
      return;
    }
    if (formData.get("privacy") !== "on") {
      setErrorMessage("Bitte bestaetigen Sie den Datenschutz-Hinweis.");
      return;
    }

    const fileError = validatePhotos(photos);
    if (fileError) {
      setErrorMessage(fileError);
      return;
    }

    formData.set("type", "property_ready");
    formData.set("lead_type", "immobilie_verkaufsbereit");
    formData.set("service", "immobilie_verkaufsbereit");
    formData.set("roleType", role);
    formData.set("goalType", goalType);
    formData.set("objectStatus", objectStatus);
    formData.set("selectedServices", JSON.stringify(selectedServices));
    formData.set("region", "regensburg_bayern");
    formData.set("timestamp", new Date().toISOString());
    formData.set("leadSource", "property_ready_service");
    formData.set("source", "property_ready_service");
    formData.set("sourceComponent", "property_ready_form");
    formData.set(
      "landingPage",
      typeof window === "undefined" ? "/immobilie-verkaufsbereit-machen" : `${window.location.pathname}${window.location.search}`,
    );
    formData.set("referrer", typeof document === "undefined" ? "" : document.referrer);
    formData.set("utmSource", getUtmValue("utm_source"));
    formData.set("utmMedium", getUtmValue("utm_medium"));
    formData.set("utmCampaign", getUtmValue("utm_campaign"));
    formData.set("utmContent", getUtmValue("utm_content"));
    formData.set("referralCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    formData.set("partnerCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    photos.forEach((file) => formData.append("propertyReadyPhoto", file));

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
      setRole("Eigentuemer");
      setGoalType("Besichtigung vorbereiten");
      setObjectStatus("fototermin_bald");
      setSelectedServices(["Reinigung vor Besichtigung", "Foto-Dokumentation"]);
      setPhotos([]);
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <div id="property-ready-form" className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-2xl shadow-stone-950/10 sm:p-7">
      <div>
        <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-600">Objektstatus-Terminal</div>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-stone-950">Was muss vor Besichtigung oder Verkauf noch passieren?</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Waehlen Sie die naechstliegende Lage. FLOXANT nutzt diese Angabe zur praktischen Vorpruefung, nicht als Verkaufs- oder Preisversprechen.
        </p>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {statusCards.map((item) => {
          const active = objectStatus === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setObjectStatus(item.value)}
              data-event="select_property_ready_goal"
              data-property-status={item.value}
              className={`rounded-[1.25rem] border p-4 text-left transition hover:-translate-y-0.5 ${
                active
                  ? "border-stone-950 bg-stone-950 text-white shadow-lg shadow-stone-950/20"
                  : "border-stone-200 bg-stone-50 text-stone-700 hover:border-amber-300"
              }`}
            >
              <span className="block text-sm font-black">{item.title}</span>
              <span className={`mt-2 block text-xs leading-5 ${active ? "text-stone-200" : "text-stone-600"}`}>{item.text}</span>
              <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${active ? "bg-white/10 text-amber-100" : "bg-white text-amber-800"}`}>
                {item.services}
              </span>
            </button>
          );
        })}
      </div>

      <form className="mt-7 grid gap-4" onSubmit={handleSubmit} data-event="start_property_ready_lead">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Name*
            <input name="name" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600" placeholder="Ansprechpartner" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Firma / Organisation optional
            <input name="companyName" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600" placeholder="Maklerbuero, Hausverwaltung, Erbengemeinschaft..." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Rolle*
            <select
              name="roleType"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              data-event="select_property_ready_role"
              className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600"
            >
              {roleOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Objektart*
            <select name="objectType" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600">
              {objectTypeOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Telefon
            <input name="phone" type="tel" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600" placeholder="fuer schnelle Rueckfragen" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            E-Mail
            <input name="email" type="email" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600" placeholder={EMAIL} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Objektort / PLZ*
            <input name="objectLocation" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600" placeholder="Regensburg, Landkreis, Umgebung..." />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Ziel*
            <select
              name="goalType"
              value={goalType}
              onChange={(event) => setGoalType(event.target.value)}
              data-event="select_property_ready_goal"
              className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600"
            >
              {goalOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Gewuenschter Zeitraum / Termin*
            <input name="desiredDate" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600" placeholder="z. B. vor Besichtigung, naechste Woche" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Dringlichkeit
            <select name="urgency" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600">
              {urgencyOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Besichtigungstermin optional
            <input name="viewingDate" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600" placeholder="falls bekannt" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Expose-Fototermin optional
            <input name="exposePhotoDate" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600" placeholder="falls bekannt" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Verkaufsfrist optional
            <input name="saleDeadline" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600" placeholder="z. B. vor Notartermin / Eigentuerwechsel" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Budget / Preisrahmen optional
            <input name="budget" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600" placeholder="falls es einen Rahmen gibt" />
          </label>
        </div>

        <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
          <div className="text-sm font-black text-stone-950">Welche Bausteine sollen geprueft werden?</div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {serviceOptions.map((service) => {
              const active = selectedServices.includes(service);
              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  data-event={service === "Diskrete Abstimmung" ? "select_property_ready_package" : undefined}
                  className={`rounded-xl border px-3 py-3 text-left text-xs font-black transition ${
                    active ? "border-stone-950 bg-stone-950 text-white" : "border-stone-200 bg-white text-stone-700 hover:border-amber-300"
                  }`}
                >
                  {service}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Flaeche ca.
            <input name="areaM2" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600" placeholder="z. B. 120 m2" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Raeume
            <input name="roomsCount" inputMode="numeric" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600" placeholder="z. B. 4" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Nebenraeume
            <input name="additionalSpaces" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600" placeholder="Keller, Garage, Dachboden" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Etage
            <input name="floor" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600" placeholder="z. B. 2. OG" />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Aufzug
            <select name="elevator" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600">
              <option value="">Nicht angegeben</option>
              <option value="ja">Ja</option>
              <option value="nein">Nein</option>
              <option value="unklar">Unklar</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Freigabe / Berechtigung geklaert
            <select name="legalClearanceStatus" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600">
              {clearanceOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Problematische Stoffe
            <select name="hazardousMaterialsStatus" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600">
              {hazardOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Zugang / Schluesselstatus
            <input name="keyStatus" className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-amber-600" placeholder="Schluessel bei Eigentuemer, Makler, Verwaltung..." />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Zugang / Hinweise
            <textarea name="accessNotes" rows={4} className="rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-amber-600" placeholder="Parken, Trageweg, Kellerzugang, Schluessel, Ansprechpartner vor Ort" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Kurze Beschreibung*
            <textarea name="message" rows={4} className="rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-amber-600" placeholder="Was soll vor Verkauf, Besichtigung oder Fototermin vorbereitet werden?" />
          </label>
        </div>

        <div className="rounded-[1.75rem] border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-yellow-50/70 p-4 shadow-sm shadow-slate-950/5">
          <UploadDropCard
            title="Fotos optional"
            description="Raeume, Moebel, Keller, Garage, Dachboden, Zugang oder Verschmutzung."
            helper="Fotos helfen bei einer realistischen Einschaetzung. Keine Kundendaten in Tracking-Events."
            accept="image/jpeg,image/png,image/webp"
            files={photos}
            dataEvent="upload_property_ready_photos"
            onFilesChange={setPhotos}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm leading-6 text-stone-700">
            <input name="callbackWanted" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-stone-300 text-amber-700" />
            Rueckruf zur Objektvorbereitung gewuenscht.
          </label>
          <label className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm leading-6 text-stone-700">
            <input name="whatsappPreferred" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-stone-300 text-amber-700" />
            WhatsApp fuer Rueckfragen bevorzugt.
          </label>
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm leading-6 text-stone-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-stone-300 text-amber-700" />
          <span>
            Ich stimme zu, dass FLOXANT meine Angaben zur Bearbeitung der Anfrage verarbeitet. FLOXANT bietet praktische und organisatorische Unterstuetzung, keine Maklerleistung, keine Immobilienbewertung, keine Verkaufsgarantie und keine Rechtsberatung.
          </span>
        </label>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{errorMessage}</div>
        ) : null}
        {submitState === "success" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-bold leading-7 text-emerald-800">
            <CheckCircle2 className="mb-2 h-5 w-5" />
            Danke. Ihre Anfrage zur Objektvorbereitung ist eingegangen. FLOXANT prueft Objektart, Zustand, Ort, Termin, Fotos und gewuenschte Leistungen. Falls Angaben fehlen, melden wir uns mit Rueckfragen.
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto]">
          <button
            type="submit"
            disabled={isSubmitting}
            data-event="submit_property_ready_lead"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-stone-950 px-6 text-sm font-black text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Verkaufsbereit-Service anfragen
          </button>
          <a
            href={`https://wa.me/${PHONE_TEL.replace("+", "")}?text=${whatsappText}`}
            data-event="click_property_ready_whatsapp"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
          >
            <Phone className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            data-event="click_property_ready_phone"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-5 text-sm font-black text-amber-900 transition hover:bg-amber-100"
          >
            <Phone className="h-4 w-4" />
            Anrufen
          </a>
          <a href={`mailto:${EMAIL}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-5 text-sm font-black text-stone-800 transition hover:bg-stone-50">
            <Mail className="h-4 w-4" />
            E-Mail
          </a>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-bold text-stone-600">
          <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-1"><Sparkles className="h-3 w-3" /> Keine Verkaufsgarantie</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-1"><Camera className="h-3 w-3" /> Fotos helfen bei der Einschaetzung</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-1"><Phone className="h-3 w-3" /> {PHONE_DISPLAY}</span>
        </div>
      </form>
    </div>
  );
}
