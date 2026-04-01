"use client";

import React, { useState, useEffect } from 'react';
import { m } from "framer-motion";
import { useCalculatorStore } from '@/store/calculatorStore';
import { User, Phone, Mail, Send, CheckCircle2, PhoneCall, ArrowLeft, Info, Camera } from 'lucide-react';

export default function LeadCaptureForm({ dic }: { dic?: any }) {
  const store = useCalculatorStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      store.incrementTimeOnPage(1);
    }, 1000);

    return () => clearInterval(timer);
  }, [store]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          send_to: 'AW-CONVERSION_ID_HIER_EINTRAGEN/CONVERSION_LABEL_HIER_EINTRAGEN',
        });
        console.log("Fired Google Ads Conversion Event");
      }
    } catch (err) {
      console.warn("GTAG error", err);
    }

    try {
      const formData = new FormData();

      formData.append("service", store.serviceType || "");
      formData.append("upgrades", JSON.stringify([]));

      formData.append(
        "details",
        JSON.stringify({
          calculator_inputs: {
            umzug: store.serviceType === 'umzug' ? store.umzugData : null,
            reinigung: store.serviceType === 'reinigung' ? store.reinigungData : null,
            entsorgung: store.serviceType === 'entsorgung' ? store.entsorgungData : null,
          },
          estimate_data: store.advancedEstimate,
          time_to_convert_seconds: store.timeOnPage,
          device_type: typeof window !== "undefined" && window.innerWidth < 768 ? 'mobile' : 'desktop',
          callback_time: store.leadDetails.callbackTime,
          wants_photos_link: store.leadDetails.wantsPhotosLink,
          customer_details: store.leadDetails,
        })
      );

      formData.append("name", store.leadDetails.customerName || "");
      formData.append("email", store.leadDetails.customerEmail || "");
      formData.append("phone", store.leadDetails.customerPhone || "");
      formData.append("timestamp", new Date().toISOString());

      const res = await fetch("/api/bookings", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Booking API error:", result);
        throw new Error(result?.error || "Fehler beim Speichern");
      }

      console.log("Booking saved:", result);
      setIsSuccess(true);
    } catch (err) {
      console.error("Submit error:", err);
      alert("Fehler beim Senden. Bitte erneut versuchen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const { min, max } = store.advancedEstimate?.priceRange || { min: 0, max: 0 };

  if (isSuccess) {
    return (
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto p-8 lg:p-12 bg-secondary rounded-3xl border border-border/80 shadow-[0_8px_30px_rgb(0,0,0,0.4)] text-center flex flex-col items-center justify-center min-h-[400px]"
      >
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="text-primary" size={40} />
        </div>

        <h2 className="text-2xl text-foreground font-light mb-4">
          {dic?.calculator?.success_title || "Anfrage erfolgreich übermittelt"}
        </h2>

        <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm leading-relaxed">
          {dic?.calculator?.success_description || "Vielen Dank für Ihre detaillierten Angaben..."}
        </p>

        {store.leadDetails.wantsPhotosLink && (
          <div className="bg-background/50 border border-border rounded-lg p-4 mb-8 flex items-center gap-3 text-left">
            <Camera size={20} className="text-blue-400 shrink-0" />
            <span className="text-xs text-foreground/80">
              Den Link für den Upload von Fotos senden wir Ihnen separat via E-Mail & WhatsApp zu.
            </span>
          </div>
        )}

        <button
          onClick={() => {
            store.setMode('express');
          }}
          className="px-8 py-3 bg-background border border-border hover:bg-background/80 text-foreground rounded-full transition-all text-sm font-medium"
        >
          {dic?.common?.back_to_home || "Zurück zur Startseite"}
        </button>
      </m.div>
    );
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto bg-secondary rounded-3xl border border-border/80 shadow-[0_8px_30px_rgb(0,0,0,0.6)] overflow-hidden"
    >
      <div className="p-6 md:p-10 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center bg-white/[0.01] gap-8">
        <div>
          <h2 className="text-2xl tracking-tight font-medium text-foreground mb-2">
            {dic?.calculator?.submit_details || "Details übermitteln"}
          </h2>
          <p className="text-sm text-muted-foreground font-normal">
            {dic?.calculator?.submit_details_subtitle || "Teilen Sie uns mit..."}
          </p>
        </div>

        <div className="text-left md:text-right bg-white/[0.02] border border-white/5 px-6 py-4 rounded-xl shadow-sm w-full md:w-auto">
          <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-[0.15em] mb-2">
            {dic?.calculator?.your_price_range || "Ihr Preisrahmen"}
          </span>
          <span className="text-2xl tracking-tight font-medium text-foreground whitespace-nowrap">
            {min}€ – {max}€
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background/50 border border-border/50 rounded-xl p-4 flex flex-col gap-2 relative">
            <label className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <User size={12} className="text-primary" /> {dic?.calculator?.contact_person || "Ansprechpartner"}
            </label>
            <input
              required
              type="text"
              placeholder={dic?.calculator?.name_placeholder || "Vor- und Nachname"}
              className="bg-transparent text-foreground text-sm outline-none w-full"
              value={store.leadDetails.customerName}
              onChange={(e) => store.updateLeadDetails({ customerName: e.target.value })}
            />
          </div>

          <div className="bg-background/50 border border-border/50 rounded-xl p-4 flex flex-col gap-2">
            <label className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Phone size={12} className="text-primary" /> {dic?.calculator?.phone_number || "Telefonnummer"}
            </label>
            <input
              required
              type="tel"
              placeholder="+49 170 1234567"
              className="bg-transparent text-foreground text-sm outline-none w-full"
              value={store.leadDetails.customerPhone}
              onChange={(e) => store.updateLeadDetails({ customerPhone: e.target.value })}
            />
          </div>
        </div>

        <div className="bg-background/50 border border-border/50 rounded-xl p-4 flex flex-col gap-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <Mail size={12} className="text-primary" /> {dic?.calculator?.email_address || "E-Mail Adresse"}
          </label>
          <input
            required
            type="email"
            placeholder="max@beispiel.de"
            className="bg-transparent text-foreground text-sm outline-none w-full"
            value={store.leadDetails.customerEmail}
            onChange={(e) => store.updateLeadDetails({ customerEmail: e.target.value })}
          />
        </div>

        <div className="bg-background/30 border border-border/40 rounded-xl p-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
            <PhoneCall size={14} className="text-primary" />
            {dic?.calculator?.preferred_contact_time || "Bevorzugte Kontaktzeit"}
          </label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(['jederzeit', 'vormittags', 'nachmittags', 'abends'] as const).map((time) => (
              <label
                key={time}
                className={`flex items-center justify-center p-3 rounded-lg border cursor-pointer transition-all text-center ${store.leadDetails.callbackTime === time
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'bg-background/50 border-border/50 hover:bg-background text-muted-foreground'
                  }`}
              >
                <input
                  type="radio"
                  name="callback"
                  value={time}
                  required
                  checked={store.leadDetails.callbackTime === time}
                  onChange={(e) => store.updateLeadDetails({ callbackTime: e.target.value as any })}
                  className="hidden"
                />
                <span className="text-xs capitalize font-medium">
                  {dic?.calculator?.[time] || time}
                </span>
              </label>
            ))}
          </div>
        </div>

        <label className="flex items-start gap-4 p-4 rounded-xl border border-border bg-background/30 cursor-pointer hover:bg-background/60 transition-colors">
          <input
            type="checkbox"
            checked={store.leadDetails.wantsPhotosLink}
            onChange={(e) => store.updateLeadDetails({ wantsPhotosLink: e.target.checked })}
            className="mt-1 accent-primary"
          />
          <div>
            <span className="text-sm font-medium text-foreground block">
              {dic?.calculator?.submit_photos || "Fotos vom Objekt übermitteln (Empfohlen)"}
            </span>
            <span className="text-xs text-muted-foreground">
              {dic?.calculator?.submit_photos_subtitle || "Wir senden Ihnen einen sicheren WhatsApp/Upload-Link..."}
            </span>
          </div>
        </label>

        <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex gap-3 text-left">
          <Info className="text-primary shrink-0 mt-0.5" size={16} />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">
              {dic?.calculator?.important_price_note || "Wichtiger Hinweis zum Preis:"}
            </strong>{" "}
            {dic?.calculator?.price_disclaimer || "Der angezeigte Wert..."}
          </p>
        </div>

        <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => store.setMode('advanced')}
            className="w-full md:w-auto px-6 py-3.5 text-muted-foreground hover:text-foreground hover:bg-background/50 rounded-lg transition-all flex items-center justify-center gap-2 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            {dic?.calculator?.back_to_overview || "Zurück zur Übersicht"}
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-8 py-3.5 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-wait text-primary-foreground rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 font-medium"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                {dic?.calculator?.submitting || "Wird übermittelt..."}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {dic?.calculator?.submit_request || "Unverbindliche Anfrage absenden"} <Send size={16} />
              </span>
            )}
          </button>
        </div>

        <div className="text-center pt-4 flex items-center justify-center gap-2 text-muted-foreground/60">
          <Info size={12} />
          <span className="text-[10px] uppercase tracking-widest">
            {dic?.calculator?.ssl_encryption_note || "Ihre Daten werden SSL-verschlüsselt übertragen."}
          </span>
        </div>
      </form>
    </m.div>
  );
}