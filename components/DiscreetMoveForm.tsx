"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { UploadDropCard } from "@/components/UploadDropCard";

const PHONE_DISPLAY = "01577 1105087";
const PHONE_TEL = "+4915771105087";
const EMAIL = "info@floxant.de";
const MAX_FILE_BYTES = 12 * 1024 * 1024;

const requestTypeOptions = [
  {
    value: "diskreter_auszug",
    title: "Diskreter Auszug",
    text: "Auszug aus einer privaten oder gemeinsamen Wohnung ruhig abstimmen.",
    services: ["Transport / Umzug", "Rueckruf"],
  },
  {
    value: "moebel_gegenstaende",
    title: "Moebel / Gegenstaende abholen",
    text: "Einzelne Moebel oder persoenliche Gegenstaende nach Umfang und Zugang pruefen.",
    services: ["Moebel oder persoenliche Gegenstaende abholen", "Rueckruf"],
  },
  {
    value: "auszug_reinigung",
    title: "Auszug + Reinigung",
    text: "Transport und Reinigung nach Auszug in einem ruhig abgestimmten Ablauf pruefen.",
    services: ["Transport / Umzug", "Reinigung nach Auszug"],
  },
  {
    value: "schluesseluebergabe",
    title: "Schluesseluebergabe",
    text: "Schluesselstatus, Zugang und Uebergabe nach Absprache organisatorisch klaeren.",
    services: ["Schluesseluebergabe nach Absprache"],
  },
  {
    value: "uebergabeakte",
    title: "Uebergabeakte",
    text: "Fotos, Leistungen, Schluesselstatus und Hinweise nach Absprache buendeln.",
    services: ["Uebergabeakte / Foto-Dokumentation"],
  },
  {
    value: "premium_diskret",
    title: "Sensible Abstimmung",
    text: "Sensible oder komplexere Abstimmung mit Rueckruf priorisieren.",
    services: ["Diskrete Abstimmung", "Rueckruf"],
  },
  {
    value: "telefonisch_klaeren",
    title: "Telefonisch klaeren",
    text: "Wenn die Situation nicht schriftlich erklaert werden soll.",
    services: ["Rueckruf"],
  },
] as const;

const safeContactMethods = ["Telefon", "WhatsApp", "E-Mail", "Bitte nur zu bestimmter Uhrzeit"];

const contactRestrictionOptions = [
  "bitte nur zu bestimmter Uhrzeit",
  "keine Details per E-Mail",
  "Rueckruf bevorzugt",
  "WhatsApp nur kurz",
];

const serviceOptions = [
  "Transport / Umzug",
  "Moebel oder persoenliche Gegenstaende abholen",
  "Reinigung nach Auszug",
  "Entruempelung / Entsorgung nach Absprache",
  "Schluesseluebergabe nach Absprache",
  "Uebergabeakte / Foto-Dokumentation",
  "Diskrete Abstimmung",
  "Rueckruf",
];

const packageOptions = [
  {
    title: "Diskreter Auszug",
    text: "Transport, Zeitfenster, Umfang, Fotos und Rueckruf nach Absprache.",
    cta: "Diskreten Auszug pruefen",
  },
  {
    title: "Moebel & persoenliche Gegenstaende",
    text: "Gegenstandsliste, Zugang, Etage und Zeitfenster fuer einzelne Abholungen.",
    cta: "Abholung pruefen",
  },
  {
    title: "Auszug + Reinigung",
    text: "Transport, Endreinigung und Uebergabevorbereitung als kombinierter Ablauf.",
    cta: "Auszug + Reinigung anfragen",
  },
  {
    title: "Schluessel & Uebergabe",
    text: "Schluesseluebergabe, Uebergabeakte und Foto-Dokumentation nach Absprache.",
    cta: "Uebergabe abstimmen",
  },
  {
    title: "Sensible Abstimmung",
    text: "Rueckruf, Planung, Zusatzleistungen und diskrete Abstimmung fuer komplexe Faelle.",
    cta: "Diskreten Rueckruf anfragen",
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

function servicesForRequestType(requestType: string) {
  const selected = requestTypeOptions.find((item) => item.value === requestType);
  return selected ? [...selected.services] : ["Rueckruf"];
}

export function DiscreetMoveForm() {
  const [requestType, setRequestType] = useState("diskreter_auszug");
  const [safeContactMethod, setSafeContactMethod] = useState("Telefon");
  const [selectedServices, setSelectedServices] = useState<string[]>(servicesForRequestType("diskreter_auszug"));
  const [contactRestrictions, setContactRestrictions] = useState<string[]>(["Rueckruf bevorzugt"]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappText = useMemo(
    () =>
      encodeURIComponent(
        "Hallo FLOXANT, ich moechte eine diskrete Anfrage stellen. Es geht um einen Auszug / Transport / Reinigung in [Ort]. Ich moechte Details ruhig abstimmen. Rueckruf oder WhatsApp ist moeglich.",
      ),
    [],
  );

  function applyRequestType(value: string) {
    setRequestType(value);
    const defaults = servicesForRequestType(value);
    setSelectedServices((current) => Array.from(new Set([...defaults, ...current.filter((item) => item === "Rueckruf")])));
  }

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service) ? current.filter((item) => item !== service) : [...current, service],
    );
  }

  function toggleRestriction(restriction: string) {
    setContactRestrictions((current) =>
      current.includes(restriction) ? current.filter((item) => item !== restriction) : [...current, restriction],
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
    const cityOrZip = String(formData.get("cityOrZip") || "").trim();
    const desiredDate = String(formData.get("desiredDate") || "").trim();

    if (name.length < 2) {
      setErrorMessage("Bitte geben Sie einen Namen oder Ansprechpartner an.");
      return;
    }
    if (!safeContactMethod) {
      setErrorMessage("Bitte sichere Kontaktmethode auswaehlen.");
      return;
    }
    if (!phone && !email) {
      setErrorMessage("Bitte Telefonnummer oder E-Mail angeben, damit FLOXANT diskret Rueckfragen stellen kann.");
      return;
    }
    if (phone && phone.length < 6) {
      setErrorMessage("Bitte pruefen Sie die Telefonnummer.");
      return;
    }
    if (!cityOrZip) {
      setErrorMessage("Bitte Ort oder PLZ angeben.");
      return;
    }
    if (!desiredDate) {
      setErrorMessage("Bitte gewuenschten Zeitraum oder Zeitfenster angeben.");
      return;
    }
    if (!requestType) {
      setErrorMessage("Bitte Anfrageart auswaehlen.");
      return;
    }
    if (!selectedServices.length) {
      setErrorMessage("Bitte mindestens einen Baustein auswaehlen.");
      return;
    }
    if (formData.get("authorizationConfirmed") !== "on") {
      setErrorMessage("Bitte bestaetigen Sie, dass Berechtigung und Eigentumsfragen fuer die Anfrage geklaert sind.");
      return;
    }
    if (formData.get("privacy") !== "on") {
      setErrorMessage("Bitte Datenschutz-Zustimmung bestaetigen.");
      return;
    }

    const fileError = validatePhotos(photos);
    if (fileError) {
      setErrorMessage(fileError);
      return;
    }

    formData.set("type", "discreet_move");
    formData.set("lead_type", "diskreter_trennungsumzug");
    formData.set("leadSubtype", "trennung_scheidung");
    formData.set("service", "diskreter_trennungsumzug");
    formData.set("requestType", requestType);
    formData.set("safeContactMethod", safeContactMethod);
    formData.set("contactRestrictions", JSON.stringify(contactRestrictions));
    formData.set("selectedServices", JSON.stringify(selectedServices));
    formData.set("authorizationConfirmed", "true");
    formData.set("region", "regensburg_bayern");
    formData.set("timestamp", new Date().toISOString());
    formData.set("leadSource", "discreet_move_service");
    formData.set("source", "discreet_move_service");
    formData.set("sourceComponent", "discreet_move_form");
    formData.set("sourcePage", "/diskreter-umzug-trennung-scheidung");
    formData.set(
      "landingPage",
      typeof window === "undefined"
        ? "/diskreter-umzug-trennung-scheidung"
        : `${window.location.pathname}${window.location.search}`,
    );
    formData.set("referrer", typeof document === "undefined" ? "" : document.referrer);
    formData.set("utmSource", getUtmValue("utm_source"));
    formData.set("utmMedium", getUtmValue("utm_medium"));
    formData.set("utmCampaign", getUtmValue("utm_campaign"));
    formData.set("utmContent", getUtmValue("utm_content"));
    formData.set("referralCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    formData.set("partnerCode", getUtmValue("ref") || getUtmValue("partner_code") || getUtmValue("referral_code"));
    photos.forEach((file) => formData.append("discreetMovePhoto", file));

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
      setRequestType("diskreter_auszug");
      setSafeContactMethod("Telefon");
      setSelectedServices(servicesForRequestType("diskreter_auszug"));
      setContactRestrictions(["Rueckruf bevorzugt"]);
      setPhotos([]);
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <div
      id="diskret-form"
      className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-2xl shadow-stone-950/10 sm:p-7"
    >
      <div>
        <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">Rueckruf-First</div>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-stone-950">
          Sie muessen nicht alles schriftlich erklaeren
        </h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Fuer die erste Anfrage reichen Ort, Zeitraum, Anfrageart und sicherer Kontaktweg. Private Details koennen
          spaeter ruhig telefonisch geklaert werden.
        </p>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        {requestTypeOptions.map((item) => {
          const active = requestType === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => applyRequestType(item.value)}
              data-event="service_card_click"
              data-request-type={item.value}
              className={`rounded-[1.25rem] border p-4 text-left transition hover:-translate-y-0.5 ${
                active
                  ? "border-stone-950 bg-stone-950 text-white shadow-lg shadow-stone-950/20"
                  : "border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400"
              }`}
            >
              <span className="block text-sm font-black">{item.title}</span>
              <span className={`mt-2 block text-xs leading-5 ${active ? "text-stone-200" : "text-stone-600"}`}>
                {item.text}
              </span>
            </button>
          );
        })}
      </div>

      <form className="mt-7 grid gap-4" onSubmit={handleSubmit} data-event="form_submit">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Name oder Ansprechpartner*
            <input
              name="name"
              className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-stone-600"
              placeholder="Name"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Sichere Kontaktmethode*
            <select
              name="safeContactMethod"
              value={safeContactMethod}
              onChange={(event) => setSafeContactMethod(event.target.value)}
              data-event="hero_cta_click"
              className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-stone-600"
            >
              {safeContactMethods.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Telefon
            <input
              name="phone"
              type="tel"
              className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-stone-600"
              placeholder="fuer Rueckruf"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            E-Mail
            <input
              name="email"
              type="email"
              className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-stone-600"
              placeholder={EMAIL}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Ort / PLZ*
            <input
              name="cityOrZip"
              className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-stone-600"
              placeholder="Regensburg, Landkreis, Bayern nach Verfuegbarkeit"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Gewuenschter Zeitraum*
            <input
              name="desiredDate"
              className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-stone-600"
              placeholder="z. B. diese Woche, bestimmtes Zeitfenster"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Rueckrufzeitfenster
            <input
              name="callbackTimeWindow"
              data-event="hero_cta_click"
              className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-stone-600"
              placeholder="z. B. 18-20 Uhr, nur vormittags"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Budget / Preisrahmen optional
            <input
              name="budget"
              className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-stone-600"
              placeholder="falls es einen Rahmen gibt"
            />
          </label>
        </div>

        <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
          <div className="text-sm font-black text-stone-950">Kontakt-Hinweise</div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {contactRestrictionOptions.map((item) => {
              const active = contactRestrictions.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleRestriction(item)}
                  className={`rounded-xl border px-3 py-3 text-left text-xs font-black transition ${
                    active
                      ? "border-stone-950 bg-stone-950 text-white"
                      : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
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
                  className={`rounded-xl border px-3 py-3 text-left text-xs font-black transition ${
                    active
                      ? "border-stone-950 bg-stone-950 text-white"
                      : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
                  }`}
                >
                  {service}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Startort optional
            <input
              name="startLocation"
              className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-stone-600"
              placeholder="nur grob, keine Details noetig"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Zielort optional
            <input
              name="destinationLocation"
              className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-stone-600"
              placeholder="nur grob"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Uebergabetermin optional
            <input
              name="handoverDate"
              className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-stone-600"
              placeholder="falls relevant"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Etage
            <input
              name="floor"
              className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-stone-600"
              placeholder="z. B. 2. OG"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Aufzug
            <select
              name="elevator"
              className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-stone-600"
            >
              <option value="">Nicht angegeben</option>
              <option value="ja">Ja</option>
              <option value="nein">Nein</option>
              <option value="unklar">Unklar</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Schluesselstatus
            <input
              name="keyStatus"
              className="min-h-12 rounded-xl border border-stone-200 px-4 text-sm outline-none transition focus:border-stone-600"
              placeholder="z. B. bei mir, unklar, nach Absprache"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Umfang / Gegenstaende optional
            <textarea
              name="itemDescription"
              rows={4}
              className="rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-stone-600"
              placeholder="z. B. Kartons, Kleidung, Bett, Sofa, wenige Moebel. Keine sensiblen privaten Details noetig."
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-stone-800">
            Kurze Beschreibung optional
            <textarea
              name="message"
              rows={4}
              className="rounded-xl border border-stone-200 px-4 py-3 text-sm outline-none transition focus:border-stone-600"
              placeholder="Was soll praktisch geklaert werden? Details koennen telefonisch folgen."
            />
          </label>
        </div>

        <div className="rounded-[1.75rem] border border-stone-200 bg-gradient-to-br from-stone-50 via-white to-slate-50 p-4 shadow-sm shadow-slate-950/5">
          <UploadDropCard
            title="Fotos optional"
            description="Gegenstaende, Zugang oder Raeume fuer die Einschaetzung."
            helper="Bitte keine sensiblen privaten Details in Dateinamen oder Fotobeschreibungen übermitteln."
            accept="image/jpeg,image/png,image/webp"
            files={photos}
            dataEvent="upload_discreet_move_photos"
            onFilesChange={setPhotos}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <label className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm leading-6 text-stone-700">
            <input name="cleaningRequested" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-stone-300 text-stone-800" />
            Reinigung nach Auszug gewuenscht.
          </label>
          <label className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm leading-6 text-stone-700">
            <input name="disposalRequested" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-stone-300 text-stone-800" />
            Entruempelung / Entsorgung nach Absprache.
          </label>
          <label className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm leading-6 text-stone-700">
            <input name="handoverFileRequested" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-stone-300 text-stone-800" />
            Uebergabeakte gewuenscht.
          </label>
        </div>

        <label className="flex items-start gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-700">
          <input name="authorizationConfirmed" type="checkbox" className="mt-1 h-4 w-4 rounded border-stone-300 text-stone-800" />
          <span>
            Ich bestaetige, dass ich berechtigt bin, die angefragten Gegenstaende / Leistungen zu beauftragen.
          </span>
        </label>

        <label className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm leading-6 text-stone-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-stone-300 text-stone-800" />
          <span>
            Ich stimme zu, dass FLOXANT meine Angaben zur Bearbeitung der Anfrage verarbeitet. Mir ist bewusst, dass
            FLOXANT keine Rechtsberatung, Sicherheitsdienstleistung, Mediation oder Konfliktloesung uebernimmt.
          </span>
        </label>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {errorMessage}
          </div>
        ) : null}
        {submitState === "success" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-bold leading-7 text-emerald-800">
            <CheckCircle2 className="mb-2 h-5 w-5" />
            Danke. Ihre diskrete Anfrage ist eingegangen. FLOXANT prueft Ort, Zeitraum, Umfang und gewuenschte
            Kontaktmethode. Falls Angaben fehlen, melden wir uns ueber den von Ihnen gewuenschten sicheren Kontaktweg.
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto_auto]">
          <button
            type="submit"
            disabled={isSubmitting}
            data-event="form_submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-stone-950 px-6 text-sm font-black text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Sensible Anfrage senden
          </button>
          <a
            href={`https://wa.me/${PHONE_TEL.replace("+", "")}?text=${whatsappText}`}
            data-event="whatsapp_click"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            data-event="phone_click"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-5 text-sm font-black text-stone-800 transition hover:bg-stone-100"
          >
            <Phone className="h-4 w-4" />
            Rueckruf
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-5 text-sm font-black text-stone-800 transition hover:bg-stone-50"
          >
            <Mail className="h-4 w-4" />
            E-Mail
          </a>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-2 text-xs font-bold text-stone-600">
            <ShieldCheck className="h-3 w-3" /> Keine Rechts- oder Sicherheitsberatung
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-2 text-xs font-bold text-stone-600">
            <Camera className="h-3 w-3" /> Fotos optional
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-2 text-xs font-bold text-stone-600">
            <Clock3 className="h-3 w-3" /> {PHONE_DISPLAY}
          </span>
        </div>
      </form>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {packageOptions.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => document.getElementById("diskret-form")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-stone-400 hover:bg-white"
          >
            <span className="block text-sm font-black text-stone-950">{item.title}</span>
            <span className="mt-2 block text-xs leading-5 text-stone-600">{item.text}</span>
            <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-stone-700">
              {item.cta}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
