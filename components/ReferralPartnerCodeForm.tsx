"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clipboard,
  Copy,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  QrCode,
} from "lucide-react";

const PHONE_DISPLAY = "01577 1105087";
const PHONE_TEL = "+4915771105087";
const EMAIL = "info@floxant.de";
const BASE_PATH = "/buchung";

const serviceOptions = [
  "Umzug",
  "Reinigung",
  "Entrümpelung",
  "Haushaltsauflösung",
  "Übergabereinigung",
  "Angebotsprüfung",
  "Düsseldorf Reinigung",
  "Düsseldorf Angebotsprüfung",
  "Regensburg Umzug",
  "Regensburg Entrümpelung",
  "Sonstiges",
];

const bonusContactOptions = [
  "Auszahlung später klären",
  "PayPal später klären",
  "Verrechnung / nach Absprache",
  "noch offen",
];

type SubmitState = "idle" | "submitting" | "success" | "error";

function getUrlParam(key: string) {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get(key) || "";
}

function sanitizePartnerCode(value: string) {
  return value
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 24);
}

function createNeutralCode(seed = "") {
  const cleanSeed = sanitizePartnerCode(seed);
  const suffix =
    typeof crypto !== "undefined" && "getRandomValues" in crypto
      ? Array.from(crypto.getRandomValues(new Uint8Array(3)))
          .map((value) => value.toString(36).padStart(2, "0").slice(-2))
          .join("")
          .toUpperCase()
      : Math.floor(Math.random() * 900000 + 100000).toString();

  return cleanSeed || `FLX-${suffix}`;
}

function buildReferralLink(code: string) {
  if (typeof window === "undefined") return `${BASE_PATH}?ref=${encodeURIComponent(code)}`;
  return `${window.location.origin}${BASE_PATH}?ref=${encodeURIComponent(code)}`;
}

export function ReferralPartnerCodeForm() {
  const [partnerCode, setPartnerCode] = useState("FLOXANT50");
  const [copied, setCopied] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const referralLink = useMemo(() => buildReferralLink(partnerCode), [partnerCode]);
  const whatsappHref = useMemo(() => {
    const text = encodeURIComponent(
      `Ich empfehle dir FLOXANT für Umzug, Reinigung, Entrümpelung, Haushaltsauflösung, Übergabevorbereitung oder Angebotsprüfung. Du kannst hier direkt anfragen: ${referralLink}. Bitte nenne meinen Namen oder diesen Empfehlungscode: ${partnerCode}`,
    );
    return `https://wa.me/?text=${text}`;
  }, [partnerCode, referralLink]);
  const mailHref = useMemo(() => {
    const subject = encodeURIComponent("FLOXANT Empfehlung");
    const body = encodeURIComponent(
      `Ich empfehle dir FLOXANT für Umzug, Reinigung, Entrümpelung, Haushaltsauflösung, Übergabevorbereitung oder Angebotsprüfung.\n\nDirekt anfragen: ${referralLink}\nEmpfehlungscode: ${partnerCode}`,
    );
    return `mailto:?subject=${subject}&body=${body}`;
  }, [partnerCode, referralLink]);

  function updatePartnerCode(value: string) {
    const nextCode = sanitizePartnerCode(value);
    setPartnerCode(nextCode || "FLOXANT50");
    setCopied(false);
  }

  async function copyLink() {
    setCopied(false);
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
    } catch {
      setErrorMessage("Link konnte nicht automatisch kopiert werden. Bitte markieren und manuell kopieren.");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const referrerName = String(formData.get("referrerName") || "").trim();
    const referrerEmail = String(formData.get("referrerEmail") || "").trim();
    const referrerPhone = String(formData.get("referrerPhone") || "").trim();
    const desiredCode = sanitizePartnerCode(String(formData.get("partnerCode") || ""));
    const referredName = String(formData.get("referredPersonName") || "").trim();
    const referredPhone = String(formData.get("referredPersonPhone") || "").trim();
    const referredEmail = String(formData.get("referredPersonEmail") || "").trim();
    const hasReferredContact = Boolean(referredName || referredPhone || referredEmail);
    const consentConfirmed = formData.get("referredPersonConsentConfirmed") === "on";

    if (referrerName.length < 2) {
      setErrorMessage("Bitte geben Sie Ihren Namen an.");
      return;
    }
    if (!referrerPhone && !referrerEmail) {
      setErrorMessage("Bitte Telefonnummer oder E-Mail angeben, damit FLOXANT den Bonus später klären kann.");
      return;
    }
    if (!formData.get("preferredBonusContactMethod")) {
      setErrorMessage("Bitte wählen Sie, wie die Auszahlung später geklärt werden soll.");
      return;
    }
    if (hasReferredContact && !consentConfirmed) {
      setErrorMessage("Bitte bestätigen Sie, dass die empfohlene Person mit der Kontaktaufnahme einverstanden ist.");
      return;
    }
    if (formData.get("privacy") !== "on") {
      setErrorMessage("Bitte bestätigen Sie den Datenschutz-Hinweis.");
      return;
    }

    const finalCode = desiredCode || partnerCode || createNeutralCode();
    setPartnerCode(finalCode);

    formData.set("type", "referral_partnercode");
    formData.set("lead_type", "referral_partnercode");
    formData.set("service", "referral_partnercode");
    formData.set("name", referrerName);
    formData.set("phone", referrerPhone);
    formData.set("email", referrerEmail);
    formData.set("partnerCode", finalCode);
    formData.set("referralStatus", hasReferredContact ? "empfehlung_eingegangen" : "partnercode_erstellt");
    formData.set("bonusStatus", "neu");
    formData.set("timestamp", new Date().toISOString());
    formData.set("leadSource", "referral_partnercode");
    formData.set("source", "referral_partnercode");
    formData.set("landingPage", typeof window === "undefined" ? "/empfehlen" : `${window.location.pathname}${window.location.search}`);
    formData.set("referrer", typeof document === "undefined" ? "" : document.referrer);
    formData.set("utmSource", getUrlParam("utm_source"));
    formData.set("utmMedium", getUrlParam("utm_medium"));
    formData.set("utmCampaign", getUrlParam("utm_campaign"));
    formData.set("utmContent", getUrlParam("utm_content"));

    setSubmitState("submitting");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        body: formData,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || result.error || "Die Empfehlung konnte nicht gespeichert werden.");
      }

      form.reset();
      setSubmitState("success");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Empfehlung konnte nicht gespeichert werden.");
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <div id="empfehlungsformular" className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10 sm:p-7">
      <div>
        <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Empfehlung starten</div>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Empfehlungslink erstellen oder Namen nennen lassen</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Am einfachsten ist es, wenn die empfohlene Person selbst Kontakt aufnimmt und Ihren Namen nennt.
          Der Link hilft nur bei der Zuordnung.
        </p>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-blue-200 bg-blue-50 p-4">
        <label className="grid gap-2 text-sm font-bold text-blue-950">
          Empfehlungscode
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              name="partnerCodePreview"
              value={partnerCode}
              onChange={(event) => updatePartnerCode(event.target.value)}
              className="min-h-12 flex-1 rounded-xl border border-blue-200 bg-white px-4 text-sm font-black uppercase outline-none transition focus:border-blue-600"
              data-event="form_submit"
            />
            <button
              type="button"
              onClick={() => updatePartnerCode(createNeutralCode())}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-black text-white"
              data-event="form_submit"
            >
              Code erstellen
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </label>
        <div className="mt-3 rounded-xl bg-white px-4 py-3 text-xs font-bold text-slate-700">{referralLink}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-800"
            data-event="form_submit"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Kopiert" : "Link kopieren"}
          </button>
          <a
            href={whatsappHref}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-xs font-black text-white"
            data-event="whatsapp_click"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp teilen
          </a>
          <a
            href={mailHref}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-800"
          >
            <Mail className="h-4 w-4" />
            E-Mail teilen
          </a>
        </div>
      </div>

      <form className="mt-7 grid gap-4" onSubmit={handleSubmit} data-event="form_submit">
        <input type="hidden" name="partnerCode" value={partnerCode} />
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Ihr Name*
            <input name="referrerName" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-600" placeholder="Empfehlender" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Telefon
            <input name="referrerPhone" type="tel" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-600" placeholder={PHONE_DISPLAY} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            E-Mail
            <input name="referrerEmail" type="email" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-600" placeholder={EMAIL} />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Auszahlung / Kontakt später klären*
            <select name="preferredBonusContactMethod" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-600">
              <option value="">Bitte wählen</option>
              {bonusContactOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Empfohlener Service optional
            <select name="referredService" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-600">
              {serviceOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            Ort / PLZ optional
            <input name="referredCityOrZip" className="min-h-12 rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-600" placeholder="z. B. Regensburg, 93047" />
          </label>
        </div>

        <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4" data-event="form_submit">
          <div className="flex items-start gap-3">
            <Clipboard className="mt-1 h-5 w-5 text-amber-700" />
            <div>
              <div className="text-sm font-black text-amber-950">Direkte Empfehlung nur mit Einwilligung</div>
              <p className="mt-1 text-xs leading-5 text-amber-900">
                Tragen Sie fremde Kontaktdaten nur ein, wenn diese Person mit der Kontaktaufnahme durch FLOXANT einverstanden ist.
                Sie können FLOXANT auch einfach weiterempfehlen, ohne Kontaktdaten anderer Personen einzutragen.
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-800">
              Name der empfohlenen Person
              <input name="referredPersonName" className="min-h-12 rounded-xl border border-amber-200 bg-white px-4 text-sm outline-none transition focus:border-amber-600" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-800">
              Telefon/E-Mail der empfohlenen Person
              <input name="referredPersonPhone" className="min-h-12 rounded-xl border border-amber-200 bg-white px-4 text-sm outline-none transition focus:border-amber-600" placeholder="Telefon oder E-Mail" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-800 md:col-span-2">
              Alternative E-Mail der empfohlenen Person
              <input name="referredPersonEmail" type="email" className="min-h-12 rounded-xl border border-amber-200 bg-white px-4 text-sm outline-none transition focus:border-amber-600" />
            </label>
          </div>
          <label className="mt-4 flex items-start gap-3 rounded-xl bg-white px-4 py-3 text-xs font-bold leading-5 text-slate-700">
            <input name="referredPersonConsentConfirmed" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" />
            Ich bestätige, dass die empfohlene Person mit der Kontaktaufnahme durch FLOXANT einverstanden ist.
          </label>
        </div>

        <label className="grid gap-2 text-sm font-bold text-slate-800">
          Nachricht optional
          <textarea name="message" rows={4} className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-600" placeholder="z. B. Person sucht Endreinigung in Regensburg oder ein Unternehmen braucht Reinigung in Düsseldorf." />
        </label>

        <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold leading-5 text-slate-700">
          <input name="privacy" type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600" />
          Ich stimme zu, dass FLOXANT meine Angaben zur Bearbeitung der Empfehlung nutzt. Bankdaten werden im ersten Schritt nicht erhoben.
        </label>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{errorMessage}</div>
        ) : null}
        {submitState === "success" ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold leading-6 text-emerald-800">
            Danke. Ihre Empfehlung wurde gespeichert. Wenn daraus ein verbindlicher Auftrag entsteht und die Rechnung vollständig bezahlt wird, erhalten Sie den 50 Euro Empfehlungsbonus.
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-black text-white transition hover:bg-blue-800 disabled:cursor-wait disabled:opacity-70"
          data-event="form_submit"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
          Empfehlung speichern
        </button>
      </form>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-700" data-event="phone_click">
          <Phone className="h-4 w-4" />
          Anrufen
        </a>
        <a href={`mailto:${EMAIL}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-700">
          <Mail className="h-4 w-4" />
          E-Mail
        </a>
        <div className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-black text-slate-700">
          <QrCode className="h-4 w-4" />
          QR-Code möglich
        </div>
      </div>
    </div>
  );
}
