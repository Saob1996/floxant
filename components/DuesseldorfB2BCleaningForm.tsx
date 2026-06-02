"use client";

import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

import { UploadDropCard } from "@/components/UploadDropCard";

const PHONE_DISPLAY = "01577 1105087";
const PHONE_TEL = "+4915771105087";
const EMAIL = "info@floxant.de";
const MAX_FILE_BYTES = 12 * 1024 * 1024;

const roleOptions = ["Inhaber", "Office Manager", "Verwaltung", "Hausverwaltung", "Mitarbeiter", "Sonstiges"];
const objectTypeOptions = [
  "Büro",
  "Agentur",
  "Studio",
  "Kanzlei",
  "Arztpraxis",
  "Praxisfläche",
  "Treppenhaus",
  "Hausverwaltung / Objekt",
  "Gewerbefläche",
  "Sonstiges",
];
const cleaningTypeOptions = [
  "Gewerbereinigung",
  "Büroreinigung",
  "Praxisreinigung",
  "Unterhaltsreinigung",
  "Treppenhausreinigung",
  "regelmäßige Reinigung",
  "Grundreinigung",
  "Sanitär/Küche/Böden",
  "einmalige Reinigung",
  "Reinigung nach Auszug/Objektwechsel",
  "Sonstiges",
];
const frequencyOptions = [
  "einmalig",
  "wöchentlich",
  "zwei- bis dreimal pro Woche",
  "monatlich",
  "nach Bedarf",
  "noch unklar",
];
const timeWindowOptions = [
  "vor Arbeitsbeginn",
  "nach Feierabend",
  "am Wochenende",
  "während Öffnungszeiten nach Absprache",
  "flexibel",
  "noch unklar",
];

const quickObjects = [
  { value: "Büro", title: "Büro", text: "Arbeitsplätze, Meetingräume, Küche und Sanitär.", Icon: Building2 },
  { value: "Arztpraxis", title: "Praxis", text: "Empfang, Wartebereich und Behandlungsräume.", Icon: Clock3 },
  { value: "Kanzlei", title: "Kanzlei", text: "Diskrete Zeitfenster und gepflegte Besprechungsräume.", Icon: CalendarClock },
  { value: "Treppenhaus", title: "Treppenhaus", text: "Eingang, Etagen, Geländer und Gemeinschaftsflächen.", Icon: CheckCircle2 },
];

type SubmitState = "idle" | "submitting" | "success" | "error";

function getQueryValue(key: string) {
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

type DuesseldorfB2BCleaningFormProps = {
  context?: "bueroreinigung" | "gewerbereinigung";
};

export function DuesseldorfB2BCleaningForm({
  context = "bueroreinigung",
}: DuesseldorfB2BCleaningFormProps = {}) {
  const [objectType, setObjectType] = useState("Büro");
  const [cleaningType, setCleaningType] = useState(
    context === "gewerbereinigung" ? "Gewerbereinigung" : "Büroreinigung",
  );
  const [frequency, setFrequency] = useState("wöchentlich");
  const [timeWindow, setTimeWindow] = useState("nach Feierabend");
  const [smallDisposal, setSmallDisposal] = useState("nein");
  const [regularInvoice, setRegularInvoice] = useState("unklar");
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappText = useMemo(
    () =>
      encodeURIComponent(
        "Hallo FLOXANT, ich möchte eine Gewerbereinigung in Düsseldorf anfragen. Es geht um [Büro/Praxis/Kanzlei/Gewerbeobjekt/Treppenhaus]. Fläche, Häufigkeit, Zeitfenster und Fotos kann ich senden.",
      ),
    [],
  );

  const formCopy = {
    eyebrow: context === "gewerbereinigung" ? "Gewerbereinigung anfragen" : "Reinigung für Unternehmen anfragen",
    title:
      context === "gewerbereinigung"
        ? "Objekt kurz beschreiben und unverbindliche Rückmeldung erhalten"
        : "Reinigung kurz einordnen und Rückmeldung erhalten",
    intro:
      "Teilen Sie uns kurz mit, um welches Objekt es geht, wann gereinigt werden soll und wie wir Sie erreichen. Fotos sind hilfreich, aber nicht zwingend.",
    success:
      context === "gewerbereinigung"
        ? "Danke. Ihre Anfrage zur Gewerbereinigung in Düsseldorf ist eingegangen. FLOXANT prüft Objektart, Fläche, Turnus, Zeitfenster und gewünschte Leistungen. Wenn Angaben fehlen, melden wir uns mit Rückfragen."
        : "Danke. Ihre Anfrage für Reinigung in Düsseldorf ist eingegangen. FLOXANT prüft Objektart, Fläche, Turnus, Zeitfenster und gewünschte Leistungen. Wenn Angaben fehlen, melden wir uns mit Rückfragen.",
    submit: context === "gewerbereinigung" ? "Unverbindliches Angebot erhalten" : "Kostenlose Anfrage senden",
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const companyName = String(formData.get("companyName") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const objectLocation = String(formData.get("objectLocation") || "").trim();
    const desiredStartDate = String(formData.get("desiredStartDate") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (name.length < 2) {
      setErrorMessage("Bitte geben Sie einen Ansprechpartner an.");
      return;
    }
    if (!companyName) {
      setErrorMessage("Bitte Firma oder Organisation angeben.");
      return;
    }
    if (!phone && !email) {
      setErrorMessage("Bitte Telefonnummer oder E-Mail angeben.");
      return;
    }
    if (phone && phone.length < 6) {
      setErrorMessage("Bitte prüfen Sie die Telefonnummer.");
      return;
    }
    if (!objectLocation) {
      setErrorMessage("Bitte Objektort oder PLZ in Düsseldorf angeben.");
      return;
    }
    if (!desiredStartDate) {
      setErrorMessage("Bitte Starttermin, Zeitraum oder Wunschfenster angeben.");
      return;
    }
    if (message.length < 10) {
      setErrorMessage("Bitte beschreiben Sie kurz Objekt, Umfang oder offene Punkte.");
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

    formData.set("type", context === "gewerbereinigung" ? "duesseldorf_gewerbereinigung" : "duesseldorf_b2b_cleaning");
    formData.set("lead_type", context === "gewerbereinigung" ? "duesseldorf_gewerbereinigung" : "duesseldorf_b2b_reinigung");
    formData.set("leadSubtype", "b2b");
    formData.set("service", context === "gewerbereinigung" ? "gewerbereinigung" : "b2b_reinigung");
    formData.set("region", "duesseldorf");
    formData.set("objectType", objectType);
    formData.set("cleaningType", cleaningType);
    formData.set("recurringFrequency", frequency);
    formData.set("timeWindow", timeWindow);
    formData.set("smallDisposalRequested", smallDisposal);
    formData.set("disposalSmallItemsRequested", smallDisposal);
    formData.set("regularInvoiceRequested", regularInvoice);
    formData.set("timestamp", new Date().toISOString());
    formData.set(
      "leadSource",
      context === "gewerbereinigung" ? "duesseldorf_gewerbereinigung" : "duesseldorf_b2b_cleaning",
    );
    formData.set("sourceComponent", "duesseldorf_b2b_cleaning_form");
    formData.set(
      "sourceContext",
      context === "gewerbereinigung" ? "duesseldorf_gewerbereinigung_landingpage" : "duesseldorf_b2b_reinigung",
    );
    formData.set(
      "landingPage",
      typeof window === "undefined"
        ? context === "gewerbereinigung"
          ? "/duesseldorf/gewerbereinigung"
          : "/duesseldorf/bueroreinigung"
        : `${window.location.pathname}${window.location.search}`,
    );
    formData.set("referrer", typeof document === "undefined" ? "" : document.referrer);
    formData.set("utmSource", getQueryValue("utm_source"));
    formData.set("utmMedium", getQueryValue("utm_medium"));
    formData.set("utmCampaign", getQueryValue("utm_campaign"));
    formData.set("utmContent", getQueryValue("utm_content"));
    const referralCode = getQueryValue("ref") || getQueryValue("partner_code") || getQueryValue("referral_code");
    formData.set("referralCode", referralCode);
    formData.set("partnerCode", referralCode);

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
      setObjectType("Büro");
      setCleaningType(context === "gewerbereinigung" ? "Gewerbereinigung" : "Büroreinigung");
      setFrequency("wöchentlich");
      setTimeWindow("nach Feierabend");
      setSmallDisposal("nein");
      setRegularInvoice("unklar");
      setPhotos([]);
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Anfrage konnte nicht gesendet werden.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <div id="b2b-reinigung-form" className="rounded-[0.95rem] border border-cyan-200 bg-white p-5 shadow-2xl shadow-cyan-950/10 sm:p-7">
      <div>
        <div className="text-xs font-black uppercase tracking-normal text-cyan-700">{formCopy.eyebrow}</div>
        <h2 className="mt-2 text-2xl font-black tracking-normal text-slate-950">{formCopy.title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {formCopy.intro}
        </p>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-4">
        {quickObjects.map((item) => {
          const Icon = item.Icon;
          const active = objectType === item.value || (item.value === "Agentur" && objectType === "Studio");
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setObjectType(item.value)}
              data-event={context === "gewerbereinigung" ? "select_gewerbereinigung_object_type" : "select_b2b_object_type"}
              data-object-type={item.value}
              className={`rounded-[0.85rem] border p-4 text-left transition hover:-translate-y-0.5 ${
                active ? "border-cyan-700 bg-cyan-50 shadow-lg shadow-cyan-950/10" : "border-slate-200 bg-white hover:border-cyan-200"
              }`}
            >
              <Icon className="h-5 w-5 text-cyan-700" />
              <div className="mt-3 text-sm font-black text-slate-950">{item.title}</div>
              <p className="mt-2 text-xs leading-5 text-slate-600">{item.text}</p>
            </button>
          );
        })}
      </div>

      <form
        className="mt-7 grid gap-4"
        onSubmit={handleSubmit}
        data-event={context === "gewerbereinigung" ? "start_gewerbereinigung_duesseldorf_lead" : "start_b2b_cleaning_lead"}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Ansprechpartner*">
            <input name="name" className="duesseldorf-input" placeholder="Name" autoComplete="name" />
          </Field>
          <Field label="Firma / Organisation*">
            <input name="companyName" className="duesseldorf-input" placeholder="z. B. Firma, Praxis, Kanzlei, Verwaltung" autoComplete="organization" />
          </Field>
          <Field label="Rolle*">
            <select name="roleType" className="duesseldorf-input">
              {roleOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Objektort / PLZ in Düsseldorf*">
            <input name="objectLocation" className="duesseldorf-input" placeholder="z. B. 40213, Pempelfort, Bilk" />
          </Field>
          <Field label="Telefon">
            <input name="phone" type="tel" className="duesseldorf-input" placeholder={PHONE_DISPLAY} autoComplete="tel" />
          </Field>
          <Field label="E-Mail">
            <input name="email" type="email" className="duesseldorf-input" placeholder={EMAIL} autoComplete="email" />
          </Field>
          <Field label="Objektart*">
            <select
              name="objectType"
              value={objectType}
              onChange={(event) => setObjectType(event.target.value)}
              data-event="select_b2b_object_type"
              className="duesseldorf-input"
            >
              {objectTypeOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Gewünschte Reinigung*">
            <select name="cleaningType" value={cleaningType} onChange={(event) => setCleaningType(event.target.value)} className="duesseldorf-input">
              {cleaningTypeOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Frequenz*">
            <select
              name="recurringFrequency"
              value={frequency}
              onChange={(event) => setFrequency(event.target.value)}
              data-event={context === "gewerbereinigung" ? "select_gewerbereinigung_frequency" : "select_b2b_frequency"}
              className="duesseldorf-input"
            >
              {frequencyOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Starttermin / Zeitraum*">
            <input name="desiredStartDate" className="duesseldorf-input" placeholder="z. B. ab Juni, nächste Woche, flexibel" />
          </Field>
          <Field label="Zeitfenster">
            <select
              name="timeWindow"
              value={timeWindow}
              onChange={(event) => setTimeWindow(event.target.value)}
              data-event={context === "gewerbereinigung" ? "select_gewerbereinigung_time_window" : "select_b2b_time_window"}
              className="duesseldorf-input"
            >
              {timeWindowOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </Field>
          <Field label="Fläche ca. in m²">
            <input name="areaM2" inputMode="numeric" className="duesseldorf-input" placeholder="z. B. 95" />
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Field label="Räume">
            <input name="roomsCount" inputMode="numeric" className="duesseldorf-input" placeholder="z. B. 4" />
          </Field>
          <Field label="Sanitärbereiche">
            <input name="sanitaryCount" inputMode="numeric" className="duesseldorf-input" placeholder="z. B. 2" />
          </Field>
          <Field label="Küche / Pausenbereich">
            <select name="kitchenOrBreakroom" className="duesseldorf-input">
              <option>ja</option>
              <option>nein</option>
              <option>unklar</option>
            </select>
          </Field>
          <Field label="Bodenart optional">
            <input name="floorType" className="duesseldorf-input" placeholder="z. B. Vinyl, Teppich" />
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Zugang / Schlüsselstatus">
            <textarea name="accessNotes" rows={3} className="duesseldorf-input min-h-[112px] py-3" placeholder="Zugang, Etage, Ansprechpartner oder Schlüsselstatus. Keine Zugangscodes im Formular erzwingen." />
          </Field>
          <Field label="Budget / Preisrahmen optional">
            <textarea name="budget" rows={3} className="duesseldorf-input min-h-[112px] py-3" placeholder="z. B. monatlicher Rahmen, pro Einsatz oder bitte prüfen" />
          </Field>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <OptionSelect label="Entsorgung kleiner Gegenstände" value={smallDisposal} onChange={setSmallDisposal} />
          <OptionSelect label="regelmäßige Rechnung gewünscht" value={regularInvoice} onChange={setRegularInvoice} />
        </div>

        <div className="rounded-[0.9rem] border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-sky-50/70 p-4 shadow-sm shadow-slate-950/5">
          <UploadDropCard
            title="Fotos optional"
            description="Räume, Böden, Sanitärbereiche, Küche, Eingang oder Treppenhaus."
            helper="JPG, PNG oder WebP. Zugangscodes bitte nicht im Formular senden."
            accept="image/jpeg,image/png,image/webp"
            files={photos}
            dataEvent={context === "gewerbereinigung" ? "upload_gewerbereinigung_duesseldorf_photos" : "upload_b2b_cleaning_photos"}
            tone="emerald"
            onFilesChange={setPhotos}
          />
        </div>

        <Field label="Kurze Beschreibung*">
          <textarea name="message" rows={4} className="duesseldorf-input min-h-[132px] py-3" placeholder="Was soll gereinigt werden? Welche Flächen, Uhrzeiten oder Besonderheiten sollen wir kennen?" />
        </Field>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex items-start gap-3 rounded-[0.8rem] border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
            <input name="callbackWanted" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-700" />
          Rückruf zur kurzen Abstimmung gewünscht.
          </label>
          <label className="flex items-start gap-3 rounded-[0.8rem] border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
            <input name="whatsappPreferred" type="checkbox" value="true" className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-700" />
          WhatsApp für Fotos oder Rückfragen bevorzugt.
          </label>
        </div>

        <label className="flex items-start gap-3 rounded-[0.8rem] border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-700" />
          Ich stimme zu, dass FLOXANT meine Angaben zur Bearbeitung der Anfrage verarbeitet. Mir ist klar: Umfang, feste Zeiten und regelmäßige Reinigung werden nach Objekt, Zugang und Absprache geprüft.
        </label>

        {errorMessage ? <div className="rounded-[0.8rem] border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{errorMessage}</div> : null}
        {submitState === "success" ? (
          <div className="rounded-[0.8rem] border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-bold leading-7 text-emerald-800">
            <CheckCircle2 className="mb-2 h-5 w-5" />
            {formCopy.success}
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <button
            type="submit"
            disabled={isSubmitting}
            data-event={context === "gewerbereinigung" ? "submit_gewerbereinigung_duesseldorf_lead" : "submit_b2b_cleaning_lead"}
            className="flox-readable-cta-dark inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.8rem] px-6 text-sm font-black transition"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            {formCopy.submit}
          </button>
          <a
            href={`https://wa.me/${PHONE_TEL.replace("+", "")}?text=${whatsappText}`}
            data-event={context === "gewerbereinigung" ? "click_gewerbereinigung_duesseldorf_whatsapp_form" : "click_b2b_cleaning_whatsapp"}
            data-contact-channel="whatsapp"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.8rem] border border-emerald-200 bg-emerald-50 px-5 text-sm font-black text-emerald-800 transition hover:bg-emerald-100"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href={`mailto:${EMAIL}`}
            data-event={context === "gewerbereinigung" ? "click_gewerbereinigung_duesseldorf_email_form" : "click_b2b_cleaning_email"}
            data-contact-channel="email"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.8rem] border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 transition hover:bg-slate-50"
          >
            <Mail className="h-4 w-4" />
            E-Mail
          </a>
        </div>
        <a
          href={`tel:${PHONE_TEL}`}
          data-event={context === "gewerbereinigung" ? "click_gewerbereinigung_duesseldorf_phone_form" : "click_b2b_cleaning_phone"}
          data-contact-channel="phone"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-cyan-800"
        >
          <Phone className="h-4 w-4" />
          Telefonisch nachfragen: {PHONE_DISPLAY}
        </a>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-800">
      {label}
      {children}
    </label>
  );
}

function OptionSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 rounded-[0.8rem] border border-slate-200 bg-slate-50 p-3 text-xs font-black text-slate-800">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-10 rounded-[0.7rem] border border-slate-200 bg-white px-3 text-xs font-bold outline-none transition focus:border-cyan-700">
        <option>ja</option>
        <option>nein</option>
        <option>unklar</option>
      </select>
    </label>
  );
}
