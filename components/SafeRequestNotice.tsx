import { ShieldCheck } from "lucide-react";

type SafeRequestNoticeProps = {
  tone?: "default" | "discreet" | "b2b";
};

export function SafeRequestNotice({ tone = "default" }: SafeRequestNoticeProps) {
  const copy = {
    default: "Eine Anfrage ist noch keine Buchung. Bitte senden Sie keine Zugangscodes, Zahlungsdaten oder sensiblen Dokumente im ersten Schritt.",
    discreet: "Sensible Details müssen nicht in die erste Nachricht. Ort, grober Umfang und bevorzugter Kontaktweg reichen für den Start.",
    b2b: "Für Unternehmen helfen Fläche, Turnus, gewünschte Reinigungszeiten und Ansprechpartner. Eine Anfrage ist noch keine Beauftragung.",
  }[tone];

  return (
    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-950" data-component="SafeRequestNotice">
      <div className="flex gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
        <p className="text-sm font-bold leading-7">{copy}</p>
      </div>
    </div>
  );
}
