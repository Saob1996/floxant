"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
 ArrowLeft,
 Download,
 FileCheck,
 Layers3,
 Loader2,
 Mail,
 Phone,
 Receipt,
 ShieldCheck,
 Wallet,
} from "lucide-react";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { DocumentChainTracker } from "@/components/dashboard/documents/DocumentChainTracker";
import { DocumentManager } from "@/components/dashboard/documents/DocumentManager";
import { FloxDocument, IntakePayload } from "@/lib/types/intake";

type BookingRecord = {
 id: string;
 service: string;
 name: string;
 email: string;
 phone: string;
 status: string;
 timestamp: string;
 details?: IntakePayload;
};

export default function DocumentWorkbenchPage() {
 const params = useParams<{ id: string }>();
 const [booking, setBooking] = useState<BookingRecord | null>(null);
 const [loading, setLoading] = useState(true);
 const [syncing, setSyncing] = useState(false);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  let isMounted = true;

  async function loadBooking() {
   try {
    setLoading(true);
    const response = await fetch(`/api/bookings/${params.id}`);
    if (!response.ok) {
     throw new Error("Vorgang konnte nicht geladen werden.");
    }

    const data = (await response.json()) as BookingRecord;
    if (isMounted) {
     setBooking(data);
     setError(null);
    }
   } catch (loadError: any) {
    if (isMounted) {
     setError(loadError?.message || "Unbekannter Fehler");
    }
   } finally {
    if (isMounted) {
     setLoading(false);
    }
   }
  }

  void loadBooking();

  return () => {
   isMounted = false;
  };
 }, [params.id]);

 const documents = booking?.details?.admin?.docs || [];
 const latestQuote = useMemo(
  () =>
   [...documents]
    .filter((doc) => doc.type === "quote")
    .sort((a, b) => b.version - a.version || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0],
  [documents]
 );
 const latestConfirmation = useMemo(
  () =>
   [...documents]
    .filter((doc) => doc.type === "order_confirmation")
    .sort((a, b) => b.version - a.version || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0],
  [documents]
 );
 const latestInvoice = useMemo(
  () =>
   [...documents]
    .filter((doc) => doc.type === "invoice")
    .sort((a, b) => b.version - a.version || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0],
  [documents]
 );

 async function handleDocumentUpdate(payload: any) {
  if (!booking) return;

  setSyncing(true);
  setError(null);

  try {
   const response = await fetch(`/api/bookings/${booking.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
   });

   const data = await response.json();
   if (!response.ok) {
    throw new Error(data.error || "Dokumentenaktion fehlgeschlagen.");
   }

   setBooking(data.data as BookingRecord);
  } catch (actionError: any) {
   setError(actionError?.message || "Dokumentenaktion fehlgeschlagen.");
   throw actionError;
  } finally {
   setSyncing(false);
  }
 }

 function renderDownloadLink(doc?: FloxDocument) {
  if (!booking || !doc) return null;

  return (
   <a
    href={`/api/pdf/${booking.id}?documentId=${doc.id}`}
    target="_blank"
    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400 hover:text-blue-300"
    rel="noreferrer"
   >
    <Download className="h-3.5 w-3.5" />
    {doc.number}
   </a>
  );
 }

 if (loading) {
  return (
   <div className="min-h-screen bg-background px-6 py-20">
    <div className="mx-auto flex max-w-4xl items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02] p-10">
     <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
     <span className="ml-3 text-sm text-white/60">Dokumenten-Workbench wird geladen.</span>
    </div>
   </div>
  );
 }

 if (!booking) {
  return (
   <div className="min-h-screen bg-background px-6 py-20">
    <div className="mx-auto max-w-4xl rounded-3xl border border-red-500/20 bg-red-500/5 p-8 text-sm text-red-300">
     {error || "Vorgang wurde nicht gefunden."}
    </div>
   </div>
  );
 }

 const systemRange = booking.details?.valuation
  ? `${booking.details.valuation.systemPriceRangeMin} EUR - ${booking.details.valuation.systemPriceRangeMax} EUR`
  : "Noch keine Einschätzung";

 return (
  <main className="min-h-screen bg-background px-6 py-10">
   <div className="mx-auto max-w-7xl space-y-8">
    <div className="flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-8 shadow-2xl shadow-black/30 lg:flex-row lg:items-end lg:justify-between">
     <div className="space-y-5">
      <Link
       href="/dashboard"
       className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45 hover:text-white"
      >
       <ArrowLeft className="h-3.5 w-3.5" />
       Zurück zum Dashboard
      </Link>

      <div>
       <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-400/75">Document Workbench</p>
       <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        Dokumente, Versionen und PDF-Ausgabe für {booking.name}
       </h1>
       <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/50">
        Diese Arbeitsfläche nutzt dieselben gespeicherten Snapshots wie das Dashboard. Angebote,
        Auftragsbestätigungen und Rechnungen bleiben versioniert, editierbar und als PDF sauber exportierbar.
       </p>
      </div>
     </div>

     <div className="flex flex-wrap gap-3">
      <PremiumButton
       variant="ghost"
       className="h-11 border border-white/10 bg-white/[0.04] px-5 text-[11px] uppercase tracking-[0.18em] text-white"
       onClick={() => void handleDocumentUpdate({ action: "create_doc", documentType: "inquiry_summary" })}
       disabled={syncing}
      >
       {syncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Layers3 className="h-4 w-4" />}
       Zusammenfassung
      </PremiumButton>
      <PremiumButton
       variant="ghost"
       className="h-11 border border-white/10 bg-white/[0.04] px-5 text-[11px] uppercase tracking-[0.18em] text-white"
       onClick={() => void handleDocumentUpdate({ action: "create_doc", documentType: "quote" })}
       disabled={syncing}
      >
       {syncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileCheck className="h-4 w-4" />}
       Angebot anlegen
      </PremiumButton>
      <PremiumButton
       variant="ghost"
       className="h-11 border border-blue-500/20 bg-blue-500/10 px-5 text-[11px] uppercase tracking-[0.18em] text-blue-300"
       onClick={() =>
        void handleDocumentUpdate({
         action: "create_doc",
         documentType: "order_confirmation",
         fromDocumentId: latestQuote?.id,
        })
       }
       disabled={syncing}
      >
       {syncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
         Auftragsbestätigung
      </PremiumButton>
      <PremiumButton
       variant="ghost"
       className="h-11 border border-indigo-500/20 bg-indigo-500/10 px-5 text-[11px] uppercase tracking-[0.18em] text-indigo-300"
       onClick={() =>
        void handleDocumentUpdate({
         action: "create_doc",
         documentType: "invoice",
         fromDocumentId: latestConfirmation?.id || latestQuote?.id,
        })
       }
       disabled={syncing}
      >
       {syncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Receipt className="h-4 w-4" />}
       Rechnung
      </PremiumButton>
     </div>
    </div>

    {error ? (
     <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-4 text-sm text-red-300">{error}</div>
    ) : null}

    <div className="grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
     <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6">
       <DocumentChainTracker documents={documents} />
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6">
       <DocumentManager bookingId={booking.id} documents={documents} onUpdate={handleDocumentUpdate} />
      </div>
     </div>

     <aside className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6">
       <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">Vorgang</p>
       <div className="mt-5 space-y-4 text-sm">
        <div className="flex items-start gap-3">
         <Mail className="mt-0.5 h-4 w-4 text-blue-400" />
         <div>
          <p className="font-medium text-white">{booking.email}</p>
          <p className="text-white/45">E-Mail Kontakt</p>
         </div>
        </div>
        <div className="flex items-start gap-3">
         <Phone className="mt-0.5 h-4 w-4 text-blue-400" />
         <div>
          <p className="font-medium text-white">{booking.phone}</p>
          <p className="text-white/45">Telefon</p>
         </div>
        </div>
        <div className="flex items-start gap-3">
         <Wallet className="mt-0.5 h-4 w-4 text-blue-400" />
         <div>
          <p className="font-medium text-white">{systemRange}</p>
          <p className="text-white/45">{booking.details?.valuation?.valuationStage || "Vorprüfung"}</p>
         </div>
        </div>
        <div className="flex items-start gap-3">
         <Layers3 className="mt-0.5 h-4 w-4 text-blue-400" />
         <div>
          <p className="font-medium text-white">
           {booking.details?.valuation?.customerBudget
            ? `${booking.details.valuation.customerBudget} EUR`
            : "Keine Preisvorstellung"}
          </p>
          <p className="text-white/45">Kundenbudget</p>
         </div>
        </div>
       </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6">
       <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">Anfragebild</p>
       <div className="mt-5 space-y-4 text-sm text-white/60">
        <p>{booking.service || "Service"} für {booking.name}</p>
        <p>{booking.details?.valuation?.priceExplanation || "Noch keine ausformulierte Preisbegruendung gespeichert."}</p>
        {booking.details?.valuation?.topDrivers?.length ? (
         <div className="flex flex-wrap gap-2">
          {booking.details.valuation.topDrivers.slice(0, 4).map((driver) => (
           <span
            key={driver}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55"
           >
            {driver}
           </span>
          ))}
         </div>
        ) : null}
       </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6">
       <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">PDF-Verhalten</p>
       <div className="mt-5 space-y-4 text-sm text-white/55">
        <p>
         PDF-Exporte laufen über die serverseitige React-PDF-Ausgabe. Wenn Positionen eine Seite fuellen,
         wird automatisch eine weitere Seite erzeugt.
        </p>
        <p>
         Angebote, Auftragsbestätigungen und Rechnungen nutzen dieselben gespeicherten Dokumentdaten.
         Änderungen bleiben damit für Versand, Dashboard und spätere Abrechnung konsistent.
        </p>
       </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6">
       <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">Letzte Dokumente</p>
       <div className="mt-5 space-y-5">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
         <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
          <FileCheck className="h-3.5 w-3.5 text-blue-400" />
          Angebot
         </div>
         {renderDownloadLink(latestQuote)}
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
         <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
         Auftragsbestätigung
         </div>
         {renderDownloadLink(latestConfirmation)}
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
         <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
          <Receipt className="h-3.5 w-3.5 text-blue-400" />
          Rechnung
         </div>
         {renderDownloadLink(latestInvoice)}
        </div>
       </div>
      </div>
     </aside>
    </div>
   </div>
  </main>
 );
}
