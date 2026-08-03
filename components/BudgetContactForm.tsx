"use client";

import { bookingFetch, bookingFieldErrors } from "@/lib/booking-submission-client";

import React, { useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  AlertCircle,
  Banknote,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { validateRequestContact } from "@/lib/booking/request-service-policy.js";

interface BudgetContactFormProps {
  className?: string;
}

type BudgetFieldErrors = Partial<
  Record<"name" | "email" | "phone" | "contact" | "contactMethod" | "privacyConsent" | "budget" | "cityOrZip" | "service" | "message" | "form", string>
>;

export function BudgetContactForm({ className }: BudgetContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<BudgetFieldErrors>({});
  const idempotencyKeyRef = useRef<string | null>(null);
  const submitLockRef = useRef(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cityOrZip: "",
    service: "umzug",
    urgency: "normal",
    preferredContact: "telefon",
    budget: "",
    message: "",
    privacyConsent: false,
  });

  function focusFirstError(errors: BudgetFieldErrors) {
    const firstField = ["name", "email", "phone", "contact", "contactMethod", "cityOrZip", "service", "budget", "message", "privacyConsent"].find(
      (field) => errors[field as keyof BudgetFieldErrors],
    );
    const target =
      firstField === "contact"
        ? formData.preferredContact === "email" ? "email" : "phone"
        : firstField === "contactMethod"
          ? "contactMethod"
        : firstField === "privacyConsent"
          ? "privacy"
          : firstField;
    if (target) requestAnimationFrame(() => document.getElementById(`budget-${target}`)?.focus());
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLockRef.current || status === "loading") return;
    submitLockRef.current = true;
    setErrorDetails(null);
    setFieldErrors({});

    const email = formData.email.trim();
    const contactValidation = validateRequestContact(
      {
        name: formData.name,
        email,
        phone: formData.phone,
        contactMethod: formData.preferredContact,
        privacyConsent: formData.privacyConsent,
      },
      { requireContactMethod: true, requireConsent: true },
    );
    const nextErrors: BudgetFieldErrors = { ...contactValidation.fields };
    if (formData.budget.trim().length < 2) {
      nextErrors.budget = "Bitte geben Sie Ihren Preisrahmen an.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setErrorDetails("Bitte prüfen Sie die markierten Angaben.");
      focusFirstError(nextErrors);
      setStatus("error");
      submitLockRef.current = false;
      return;
    }

    const attemptKey =
      idempotencyKeyRef.current ??
      `budget_contact:${Date.now()}:${globalThis.crypto.randomUUID()}`;
    idempotencyKeyRef.current = attemptKey;
    let completedSuccessfully = false;
    setStatus("loading");

    try {
      const fd = new FormData();
      fd.append("type", "budget_inquiry");
      fd.append("source", "budget_contact_form");
      fd.append("sourceComponent", "BudgetContactForm");
      fd.append("sourcePage", "/anfrage-mit-preisrahmen");
      fd.append("intent", "budget_inquiry");
      fd.append("name", formData.name.trim());
      fd.append("email", email);
      fd.append("phone", formData.phone.trim());
      fd.append("cityOrZip", formData.cityOrZip.trim());
      fd.append("service", formData.service);
      fd.append("serviceCategory", formData.service);
      fd.append("urgency", formData.urgency);
      fd.append("preferredContact", formData.preferredContact);
      fd.append("contactMethod", formData.preferredContact);
      fd.append("preferredContactMethod", formData.preferredContact);
      fd.append("budget", formData.budget.trim());
      fd.append("privacyConsent", "true");
      fd.append("pageType", "budget_contact");
      fd.append("funnelStage", "lead");
      fd.append("ctaLabel", "Unverbindlich absenden");
      fd.append(
        "message",
        [
          formData.message.trim(),
          formData.cityOrZip.trim() ? `Ort/PLZ: ${formData.cityOrZip.trim()}` : "",
          `Dringlichkeit: ${formData.urgency}`,
          `Kontaktwunsch: ${formData.preferredContact}`,
        ]
          .filter(Boolean)
          .join("\n"),
      );
      fd.append("timestamp", new Date().toISOString());

      const response = await bookingFetch("/api/bookings", {
        method: "POST",
        body: fd,
        headers: { "Idempotency-Key": attemptKey },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        if (idempotencyKeyRef.current !== attemptKey) return;
        const serverFields = bookingFieldErrors(data);
        const mappedErrors: BudgetFieldErrors = {};
        for (const field of ["name", "email", "phone", "contact", "contactMethod", "cityOrZip", "service", "budget", "message", "privacyConsent"] as const) {
          if (serverFields[field]) mappedErrors[field] = serverFields[field];
        }
        if (serverFields.preferredContact || serverFields.preferredContactMethod) {
          mappedErrors.contactMethod = serverFields.preferredContact || serverFields.preferredContactMethod;
        }
        if (serverFields.city) mappedErrors.cityOrZip = serverFields.city;
        if (Object.keys(mappedErrors).length > 0) {
          setFieldErrors(mappedErrors);
          setErrorDetails("Bitte prüfen Sie die markierten Angaben.");
          focusFirstError(mappedErrors);
        } else {
          setErrorDetails(data.error || "Die Anfrage konnte nicht gesendet werden.");
        }
        setStatus("error");
        return;
      }

      if (idempotencyKeyRef.current !== attemptKey) return;
      completedSuccessfully = true;
      idempotencyKeyRef.current = null;
      setStatus("success");
    } catch (error: unknown) {
      if (idempotencyKeyRef.current !== attemptKey) return;
      setErrorDetails(error instanceof Error ? error.message : "Übertragung fehlgeschlagen");
      setStatus("error");
    } finally {
      if (!completedSuccessfully && idempotencyKeyRef.current !== attemptKey) setStatus("idle");
      submitLockRef.current = false;
    }
  }

  if (status === "success") {
    return (
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        aria-live="polite"
        className="glass-elevated flex flex-col items-center justify-center rounded-3xl px-6 py-16 text-center"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 shadow-[0_0_30px_rgba(16,185,129,0.08)]">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="mb-3 text-3xl font-bold tracking-tight text-slate-950">
          Preisvorstellung eingegangen
        </h3>
        <p className="max-w-md leading-relaxed text-slate-600">
          Ihre Anfrage wurde gesendet. FLOXANT prüft jetzt Ihre Angaben und
          gleicht Preisvorstellung, Umfang, Termin und Verfügbarkeit miteinander ab.
        </p>
        <button
          onClick={() => {
            idempotencyKeyRef.current = null;
            submitLockRef.current = false;
            setFieldErrors({});
            setErrorDetails(null);
            setStatus("idle");
          }}
          className="mt-10 rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-slate-600 transition-all hover:bg-blue-50 hover:text-slate-950 active:scale-95"
        >
          Neue Anfrage erstellen
        </button>
      </m.div>
    );
  }

  return (
    <div
      className={cn(
        "glass-elevated overflow-hidden rounded-3xl p-4 shadow-[0_18px_50px_rgba(15,23,42,0.1)] sm:p-8",
        className
      )}
    >
      <form
        data-booking-field-errors="managed"
        onSubmit={handleSubmit}
        onChange={() => {
          idempotencyKeyRef.current = null;
          setFieldErrors({});
          setErrorDetails(null);
          if (status === "error") setStatus("idle");
        }}
        className="space-y-6"
        noValidate
      >
        <fieldset disabled={status === "loading"} className="contents">
        <div className="mb-2">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
            Unverbindliche Budget-Anfrage
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
            Ihre Preisvorstellung wird als zusätzlicher Hinweis gespeichert. Sie ersetzt keine
            fachliche Einschätzung und ist keine Preiszusage. Name, E-Mail oder Telefon und Preisrahmen
            reichen für den ersten Kontakt; Ort/PLZ hilft bei der Einschätzung.
          </p>
          <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-blue-700">
            Anfrage auf Deutsch oder Englisch möglich: cleaning service, moving help, quote check
            oder house clearance reichen als Stichwort.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="budget-name" className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
              Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="budget-name"
                aria-label="Name"
                required
                type="text"
                placeholder="Max Mustermann"
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "budget-name-error" : undefined}
                className={cn("w-full rounded-2xl border bg-white py-4 pl-12 pr-4 text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40", fieldErrors.name ? "border-red-300 bg-red-50" : "border-slate-200")}
              />
            </div>
            {fieldErrors.name ? <p id="budget-name-error" className="text-xs font-semibold text-red-700">{fieldErrors.name}</p> : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="budget-email" className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
              E-Mail
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="budget-email"
                aria-label="E-Mail"
                type="email"
                placeholder="name@beispiel.de"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                aria-invalid={Boolean(fieldErrors.email || fieldErrors.contact)}
                aria-describedby={[fieldErrors.email ? "budget-email-error" : "", fieldErrors.contact ? "budget-contact-error" : ""].filter(Boolean).join(" ") || undefined}
                className={cn("w-full rounded-2xl border bg-white py-4 pl-12 pr-4 text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40", fieldErrors.email || fieldErrors.contact ? "border-red-300 bg-red-50" : "border-slate-200")}
              />
            </div>
            {fieldErrors.email ? <p id="budget-email-error" className="text-xs font-semibold text-red-700">{fieldErrors.email}</p> : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="budget-phone" className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
              Telefonnummer
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="budget-phone"
                aria-label="Telefonnummer"
                type="tel"
                placeholder="+49 123 4567890"
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                aria-invalid={Boolean(fieldErrors.phone || fieldErrors.contact)}
                aria-describedby={[fieldErrors.phone ? "budget-phone-error" : "", fieldErrors.contact ? "budget-contact-error" : ""].filter(Boolean).join(" ") || undefined}
                className={cn("w-full rounded-2xl border bg-white py-4 pl-12 pr-4 text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40", fieldErrors.phone || fieldErrors.contact ? "border-red-300 bg-red-50" : "border-slate-200")}
              />
            </div>
            {fieldErrors.phone ? <p id="budget-phone-error" className="text-xs font-semibold text-red-700">{fieldErrors.phone}</p> : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="budget-cityOrZip" className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
              Ort / PLZ
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="budget-cityOrZip"
                aria-label="Ort oder PLZ"
                type="text"
                placeholder="z.B. Düsseldorf, Regensburg, Neuss"
                value={formData.cityOrZip}
                onChange={(event) => setFormData({ ...formData, cityOrZip: event.target.value })}
                aria-invalid={Boolean(fieldErrors.cityOrZip)}
                aria-describedby={fieldErrors.cityOrZip ? "budget-city-error" : undefined}
                className={cn("w-full rounded-2xl border bg-white py-4 pl-12 pr-4 text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40", fieldErrors.cityOrZip ? "border-red-300 bg-red-50" : "border-slate-200")}
              />
            </div>
            {fieldErrors.cityOrZip ? <p id="budget-city-error" className="text-xs font-semibold text-red-700">{fieldErrors.cityOrZip}</p> : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="budget-service" className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
              Projekt-Art
            </label>
            <select
              id="budget-service"
              aria-label="Projekt-Art"
              value={formData.service}
              onChange={(event) => setFormData({ ...formData, service: event.target.value })}
              aria-invalid={Boolean(fieldErrors.service)}
              aria-describedby={fieldErrors.service ? "budget-service-error" : undefined}
              className={cn("w-full appearance-none rounded-2xl border bg-white px-6 py-4 text-slate-950 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40", fieldErrors.service ? "border-red-300 bg-red-50" : "border-slate-200")}
            >
              <option value="umzug">Umzug und Transport / Moving help</option>
              <option value="reinigung">Reinigung / Cleaning service</option>
              <option value="glas_fassade_event">Glas, Fassade oder Eventreinigung / Glass cleaning</option>
              <option value="entsorgung">Entrümpelung / Decluttering</option>
              <option value="nachlass_lager">Keller, Nachlass oder Lagerauflösung / House clearance</option>
              <option value="mini_transport">Mini-Umzug, Express oder Möbeltransport / Small move</option>
              <option value="signature">Fairpreis, Plan B oder Übergabe-Service / Second opinion</option>
              <option value="mixed">Kombination</option>
            </select>
            {fieldErrors.service ? <p id="budget-service-error" className="text-xs font-semibold text-red-700">{fieldErrors.service}</p> : null}
          </div>

          <div className="space-y-2">
            <label className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
              Dringlichkeit
            </label>
            <div className="relative">
              <Clock3 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                aria-label="Dringlichkeit"
                value={formData.urgency}
                onChange={(event) => setFormData({ ...formData, urgency: event.target.value })}
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-950 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40"
              >
                <option value="normal">Normal, Termin ist flexibel</option>
                <option value="soon">Bald, innerhalb von 7 Tagen</option>
                <option value="urgent">Dringend, Deadline steht</option>
                <option value="offer_check">Erst Angebot / Preis prüfen</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="budget-contactMethod" className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
              Kontaktwunsch
            </label>
            <div className="relative">
              <MessageCircle className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                id="budget-contactMethod"
                aria-label="Kontaktwunsch"
                value={formData.preferredContact}
                onChange={(event) => setFormData({ ...formData, preferredContact: event.target.value })}
                aria-invalid={Boolean(fieldErrors.contactMethod)}
                aria-describedby={fieldErrors.contactMethod ? "budget-contact-method-error" : undefined}
                className={cn("w-full appearance-none rounded-2xl border bg-white py-4 pl-12 pr-4 text-slate-950 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40", fieldErrors.contactMethod ? "border-red-300 bg-red-50" : "border-slate-200")}
              >
                <option value="telefon">Telefon</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">E-Mail</option>
              </select>
            </div>
            {fieldErrors.contactMethod ? <p id="budget-contact-method-error" className="text-xs font-semibold text-red-700">{fieldErrors.contactMethod}</p> : null}
          </div>
        </div>

        {fieldErrors.contact ? <p id="budget-contact-error" className="text-sm font-semibold text-red-700">{fieldErrors.contact}</p> : null}

        <div className="space-y-2">
          <label htmlFor="budget-budget" className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
            Ihre Preisvorstellung
          </label>
          <div className="relative">
            <Banknote className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="budget-budget"
              aria-label="Ihre Preisvorstellung"
              required
              type="text"
              placeholder="z.B. 600 bis 900 EUR"
              value={formData.budget}
              onChange={(event) => setFormData({ ...formData, budget: event.target.value })}
              aria-invalid={Boolean(fieldErrors.budget)}
              aria-describedby={fieldErrors.budget ? "budget-budget-error" : undefined}
              className={cn("w-full rounded-2xl border bg-white py-4 pl-12 pr-4 text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40", fieldErrors.budget ? "border-red-300 bg-red-50" : "border-slate-200")}
            />
          </div>
          {fieldErrors.budget ? <p id="budget-budget-error" className="text-xs font-semibold text-red-700">{fieldErrors.budget}</p> : null}
          <p className="ml-1 text-[10px] italic text-slate-500">
            Nennen Sie Ihren Rahmen in Kundensprache. FLOXANT prüft danach, welche Leistung dazu
            realistisch passt.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="budget-message" className="ml-1 text-xs font-bold uppercase tracking-widest text-slate-500">
            Zusatzinfos
          </label>
          <textarea
            id="budget-message"
            aria-label="Zusatzinfos"
            rows={3}
            placeholder="Ein paar Details zu Ihrem Projekt, z.B. Termin, Umfang oder besondere Bedingungen."
            value={formData.message}
            onChange={(event) => setFormData({ ...formData, message: event.target.value })}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "budget-message-error" : undefined}
            className={cn("w-full rounded-2xl border bg-white p-6 text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-blue-300 focus:bg-blue-50/40", fieldErrors.message ? "border-red-300 bg-red-50" : "border-slate-200")}
          />
          {fieldErrors.message ? <p id="budget-message-error" className="text-xs font-semibold text-red-700">{fieldErrors.message}</p> : null}
        </div>

        <label className={cn("flex items-start gap-3 rounded-2xl border bg-white px-4 py-3 text-sm leading-6 text-slate-700", fieldErrors.privacyConsent ? "border-red-300 bg-red-50" : "border-slate-200")}>
          <input
            id="budget-privacy"
            type="checkbox"
            checked={formData.privacyConsent}
            onChange={(event) => setFormData({ ...formData, privacyConsent: event.target.checked })}
            aria-invalid={Boolean(fieldErrors.privacyConsent)}
            aria-describedby={fieldErrors.privacyConsent ? "budget-privacy-error" : undefined}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700"
          />
          <span>Ich stimme zu, dass FLOXANT meine Angaben zur Bearbeitung dieser Anfrage verarbeitet.</span>
        </label>
        {fieldErrors.privacyConsent ? <p id="budget-privacy-error" className="text-sm font-semibold text-red-700">{fieldErrors.privacyConsent}</p> : null}

        {errorDetails && status === "error" ? (
          <div role="alert" className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{errorDetails}</span>
          </div>
        ) : null}

        <button
          aria-label="Budget-Anfrage senden"
          disabled={status === "loading"}
          type="submit"
          className={cn(
            "group relative flex h-16 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl shadow-xl transition-all duration-300",
            status === "loading"
              ? "cursor-not-allowed bg-slate-300"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
          )}
        >
          <AnimatePresence mode="wait">
            {status === "loading" ? (
              <m.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                  Übertrage...
                </span>
              </m.div>
            ) : (
              <m.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                  Unverbindlich absenden
                </span>
                <Send
                  size={16}
                  className="text-white/70 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </m.div>
            )}
          </AnimatePresence>
        </button>

        <div className="flex items-center justify-center gap-4 py-2">
          <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase text-slate-500">
            <Sparkles size={10} className="text-blue-600" />
            Unverbindlich
          </div>
          <div className="h-1 w-1 rounded-full bg-slate-300" />
          <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase text-slate-500">
            <CheckCircle2 size={10} className="text-emerald-600" />
            Für die Einschätzung vorbereitet
          </div>
        </div>
        </fieldset>
      </form>
    </div>
  );
}
