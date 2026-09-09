"use client";

import { ClipboardCheck, Mail, Phone, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";
import { WhatsAppMark } from "@/components/icons/WhatsAppMark";
import { company } from "@/lib/company";
import { floxantLocations, type FloxantLocationKey } from "@/lib/floxant-locations";
import { getPublicRouteContext } from "@/lib/public-route-context";
import { buildWhatsAppHref } from "@/lib/whatsapp";

export default function MobileFloatingContact({ location: locationOverride }: { location?: FloxantLocationKey } = {}) {
  const pathname = usePathname() || "/";
  const { location: routeLocation, service, intent, isEnglish } = getPublicRouteContext(pathname);
  if (/^\/(?:dashboard|admin|login)(?:\/|$)/.test(pathname)) return null;
  const location = locationOverride || routeLocation;
  const contact = location ? floxantLocations[location] : null;
  const phoneRaw = contact?.phoneRaw || company.phoneRaw;
  const email = contact?.email || company.email;
  const name = contact?.displayName || company.name;
  const params = new URLSearchParams({ source: "global_floating", entryPage: pathname });
  if (location) params.set(isEnglish ? "city" : "location", location);
  if (service) params.set("service", service);
  if (intent) params.set("intent", intent);
  const isContactPage = pathname === "/kontakt" || pathname === "/en/contact";
  // A same-page anchor preserves an in-progress request; other channels open independently.
  const requestHref = isContactPage ? (isEnglish ? "#english-service-request-form" : "#direktanfrage")
    : `${isEnglish ? "/en/contact" : "/kontakt"}?${params.toString()}${isEnglish ? "#english-service-request-form" : "#direktanfrage"}`;
  const budgetParams = new URLSearchParams(params);
  budgetParams.set("source", "budget-request");
  budgetParams.set("intent", "budget-request");
  const budgetHref = isContactPage ? "#request-budget"
    : `${isEnglish ? "/en/contact" : "/kontakt"}?${budgetParams.toString()}${isEnglish ? "#english-service-request-form" : "#direktanfrage"}`;
  const emailHref = `mailto:${email}?subject=${encodeURIComponent(isEnglish ? `Service enquiry – ${name}` : `Anfrage – ${name}`)}`;
  const whatsappHref = buildWhatsAppHref(phoneRaw,
    isEnglish ? `Hello ${name}, I would like to discuss a service enquiry.`
      : `Hallo ${name}, ich möchte mein Anliegen besprechen.`);
  return (
    <nav className="flox-mobile-action-wrap flox-universal-action-wrap" data-nosnippet
      data-contact-location={location || "both"} aria-label={isEnglish ? "Contact FLOXANT" : "FLOXANT Schnellkontakt"}>
      <div className="flox-mobile-action-shell safe-area-bottom">
        <div className="flox-mobile-action-grid">
          <a href={`tel:${phoneRaw}`} className="flox-mobile-action flox-mobile-action-light"
            aria-label={isEnglish ? `Call ${name}` : `${name} anrufen`} data-event="phone_click" data-contact-channel="phone" data-source="floating_contact">
            <Phone aria-hidden="true" /><span>{isEnglish ? "Call" : "Anrufen"}</span>
          </a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flox-mobile-action flox-mobile-action-whatsapp"
            aria-label={isEnglish ? `Message ${name} on WhatsApp` : `${name} per WhatsApp schreiben`} data-event="whatsapp_click" data-contact-channel="whatsapp" data-source="floating_contact">
            <WhatsAppMark aria-hidden="true" /><span>WhatsApp</span>
          </a>
          <a href={requestHref} className="flox-mobile-action flox-mobile-action-primary"
            aria-label={isEnglish ? `Request a quote from ${name}` : `Angebot von ${name} anfragen`} data-event="request_cta_click" data-contact-channel="form" data-source="global_floating">
            <ClipboardCheck aria-hidden="true" /><span>{isEnglish ? "Get a quote" : "Angebot"}</span>
          </a>
          <a href={budgetHref} className="flox-mobile-action flox-mobile-action-light"
            onClick={(event) => { if (isContactPage) { event.preventDefault(); window.dispatchEvent(new Event("floxant:budget-request")); } }}
            aria-label={isEnglish ? `Share your budget with ${name}` : `${name} Ihr Budget nennen`} data-event="request_cta_click" data-contact-channel="budget" data-source="global_floating">
            <Wallet aria-hidden="true" /><span>{isEnglish ? "Your budget" : "Budget nennen"}</span>
          </a>
          <a href={emailHref} className="flox-mobile-action flox-mobile-action-light"
            aria-label={isEnglish ? `Email ${name}` : `${name} per E-Mail kontaktieren`} data-event="email_click" data-contact-channel="email" data-source="global_floating">
            <Mail aria-hidden="true" /><span>{isEnglish ? "Email" : "E-Mail"}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
