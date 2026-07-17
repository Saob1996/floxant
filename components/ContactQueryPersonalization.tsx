"use client";

import { useEffect, useMemo, useState } from "react";

import { SeoLeadForm } from "@/components/SeoLeadForm";
import { resolveLeadIntent, type LeadIntent } from "@/lib/lead-intents";

function useCurrentQuery() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(window.location.search);
  }, []);

  return query;
}

function resolveQueryIntent(query: string, fallback: LeadIntent) {
  if (!query) return fallback;

  const params = new URLSearchParams(query);
  return resolveLeadIntent({
    path: "/kontakt",
    service: params.get("service"),
    city: params.get("city"),
    intent: params.get("intent"),
    priority: params.get("priority") || "p0",
  });
}

export function ContactHeroCopy({
  fallbackIntent,
}: {
  fallbackIntent: LeadIntent;
}) {
  const query = useCurrentQuery();
  const intent = useMemo(() => resolveQueryIntent(query, fallbackIntent), [fallbackIntent, query]);
  const heading = query ? intent.suggestedFormTitle : "Beschreiben Sie kurz, wobei Sie Hilfe brauchen";
  const intro = query
    ? intent.suggestedFormIntro
    : "Ort, gewünschte Leistung, Umfang, Termin und Kontaktweg reichen für den Start. Weitere Angaben können Sie später ergänzen.";

  return (
    <>
      <h1 className="mt-6 max-w-5xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
        {heading}
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/58">
        {intro} Hilfreich sind Leistung, Ort, Umfang, Fotos,
        Terminwunsch und der Kontaktweg, über den FLOXANT gezielt nachfragen darf.
      </p>
    </>
  );
}

export function ContactLeadForm({
  fallbackIntent,
}: {
  fallbackIntent: LeadIntent;
}) {
  const query = useCurrentQuery();
  const [handoff, setHandoff] = useState("");
  const intent = useMemo(() => resolveQueryIntent(query, fallbackIntent), [fallbackIntent, query]);
  const params = useMemo(() => new URLSearchParams(query), [query]);

  useEffect(() => {
    const storedHandoff = window.sessionStorage.getItem("floxant:tool-handoff") || "";
    setHandoff(storedHandoff);
    if (storedHandoff) window.sessionStorage.removeItem("floxant:tool-handoff");
  }, []);

  return (
    <SeoLeadForm
      key={query || "static-contact-default"}
      initialIntent={intent}
      sourcePage="/kontakt"
      initialOfferConcern={params.get("offerConcern") || ""}
      initialOfferStatus={params.get("offerStatus") || ""}
      initialMessage={handoff}
    />
  );
}
