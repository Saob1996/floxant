"use client";

import {
 formatDateDE,
 formatMoney,
 getDocumentBusinessSettings,
 getDocumentTitle,
 getMissingBusinessData,
 normalizeDocument,
 validateDocument,
} from "@/lib/documents/document-core";
import type { FloxDocument } from "@/lib/types/intake";

type DocumentA4PreviewProps = {
 document: FloxDocument;
 compact?: boolean;
};

function recipientLines(document: FloxDocument) {
 const customer = document.editableData.customer;
 const lines = [
  customer?.companyName || "",
  customer?.contactPerson ? `z. Hd. ${customer.contactPerson}` : "",
  !customer?.companyName ? customer?.name || "" : "",
  customer?.street || "",
  [customer?.zip, customer?.city].filter(Boolean).join(" "),
  customer?.country && customer.country !== "Deutschland" ? customer.country : "",
 ];
 return lines.filter(Boolean);
}

function periodLabel(document: FloxDocument) {
 const data = document.editableData;
 if (data.servicePeriodStart && data.servicePeriodEnd) {
  return `${formatDateDE(data.servicePeriodStart)} bis ${formatDateDE(data.servicePeriodEnd)}`;
 }
 if (data.serviceDate) return formatDateDE(data.serviceDate);
 return "";
}

export function DocumentA4Preview({ document, compact = false }: DocumentA4PreviewProps) {
 const doc = normalizeDocument(document);
 const warnings = validateDocument(doc);
 const business = getDocumentBusinessSettings(doc);
 const missingBusinessData = getMissingBusinessData(business);
 const customer = doc.editableData.customer;
 const title = doc.editableData.title || getDocumentTitle(doc.type);
 const dueDate = doc.editableData.paymentDueDate || doc.editableData.dueDate;
 const servicePeriod = periodLabel(doc);

 return (
  <div className="document-preview-root">
   <style jsx global>{`
    @page {
     size: A4;
     margin: 13mm 12mm 15mm;
    }

    @media print {
     html,
     body {
      background: #ffffff !important;
     }

     body * {
      visibility: hidden !important;
     }

     .document-print-zone,
     .document-print-zone * {
      visibility: visible !important;
     }

     .document-print-zone {
      position: absolute !important;
      inset: 0 auto auto 0 !important;
      width: 100% !important;
      background: #ffffff !important;
     }

     .no-print,
     .no-print * {
      display: none !important;
     }

     .document-sheet {
      width: auto !important;
      min-height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      box-shadow: none !important;
     }

     .document-section,
     .document-total-box,
     .document-notes {
      break-inside: avoid;
      page-break-inside: avoid;
     }

     .document-items thead {
      display: table-header-group;
     }

     .document-items tr {
      break-inside: avoid;
      page-break-inside: avoid;
     }
    }
   `}</style>

   <article
    className={[
     "document-print-zone document-sheet mx-auto bg-white text-slate-950 shadow-2xl shadow-slate-950/15 ring-1 ring-slate-200",
     compact ? "w-full rounded-2xl p-5" : "w-[210mm] min-h-[297mm] rounded-sm p-[16mm]",
    ].join(" ")}
   >
    <header className="document-section grid gap-8 border-b border-slate-900 pb-8 sm:grid-cols-[1fr_230px]">
     <div>
      <p className="text-3xl font-black tracking-[0.18em] text-slate-950">FLOXANT</p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
       Umzug · Reinigung · Entrümpelung · Entsorgung
      </p>
      <p className="mt-8 max-w-[75mm] border-b border-slate-300 pb-1 text-[9px] text-slate-500">
       {business.legalName} · {business.streetAddress} ·{" "}
       {business.postalCode} {business.city}
      </p>
      <div className="mt-3 min-h-[34mm] text-sm leading-6">
       {recipientLines(doc).map((line) => (
        <p key={line}>{line}</p>
       ))}
      </div>
     </div>

     <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-6">
      <p className="font-black uppercase tracking-[0.16em] text-slate-500">FLOXANT</p>
      <p className="mt-2 font-bold">{business.legalName}</p>
      <p>{business.streetAddress}</p>
      <p>
       {business.postalCode} {business.city}
      </p>
      <p>{business.country}</p>
      <p className="mt-2">{business.phone}</p>
      <p>{business.email}</p>
      <p>{business.website.replace(/^https?:\/\//, "")}</p>
     </div>
    </header>

    <section className="document-section mt-8 grid gap-8 sm:grid-cols-[1fr_240px]">
     <div>
      <h1 className="text-3xl font-black tracking-tight text-slate-950">{title}</h1>
      <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-700">
       Sehr geehrte Damen und Herren,
       {"\n"}
       {doc.editableData.introText}
      </p>
     </div>

     <dl className="grid gap-2 text-sm">
      <div className="grid grid-cols-[105px_1fr] gap-3 border-b border-slate-200 pb-2">
       <dt className="font-bold text-slate-500">Nummer</dt>
       <dd className="font-mono font-black">{doc.number}</dd>
      </div>
      <div className="grid grid-cols-[105px_1fr] gap-3 border-b border-slate-200 pb-2">
       <dt className="font-bold text-slate-500">Datum</dt>
       <dd>{formatDateDE(doc.editableData.documentDate || doc.createdAt)}</dd>
      </div>
      {doc.type === "quote" ? (
       <div className="grid grid-cols-[105px_1fr] gap-3 border-b border-slate-200 pb-2">
        <dt className="font-bold text-slate-500">Gültig bis</dt>
        <dd>{formatDateDE(doc.editableData.validUntil)}</dd>
       </div>
      ) : null}
      {doc.type === "invoice" ? (
       <div className="grid grid-cols-[105px_1fr] gap-3 border-b border-slate-200 pb-2">
        <dt className="font-bold text-slate-500">Zahlbar bis</dt>
        <dd>{formatDateDE(dueDate)}</dd>
       </div>
      ) : null}
      {servicePeriod ? (
       <div className="grid grid-cols-[105px_1fr] gap-3 border-b border-slate-200 pb-2">
        <dt className="font-bold text-slate-500">Leistung</dt>
        <dd>{servicePeriod}</dd>
       </div>
      ) : null}
      {doc.editableData.performanceLocation ? (
       <div className="grid grid-cols-[105px_1fr] gap-3 border-b border-slate-200 pb-2">
        <dt className="font-bold text-slate-500">Ort</dt>
        <dd>{doc.editableData.performanceLocation}</dd>
       </div>
      ) : null}
     </dl>
    </section>

    <section className="document-section mt-8">
     <h2 className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">Vereinbarte Services</h2>
     <div className="mt-3 grid gap-3">
      {(doc.editableData.services || []).map((service, index) => (
       <div key={service.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-start justify-between gap-4">
         <div>
          <p className="text-sm font-black text-slate-950">
           {index + 1}. {service.title}
          </p>
          {service.description ? <p className="mt-2 text-sm leading-6 text-slate-700">{service.description}</p> : null}
         </div>
         {service.date ? <span className="shrink-0 text-xs font-bold text-slate-500">{formatDateDE(service.date)}</span> : null}
        </div>
        {service.location || service.notes ? (
         <p className="mt-2 text-xs leading-5 text-slate-500">
          {[service.location, service.notes].filter(Boolean).join(" · ")}
         </p>
        ) : null}
       </div>
      ))}
     </div>
    </section>

    <section className="mt-8">
     <h2 className="text-sm font-black uppercase tracking-[0.16em] text-slate-500">Positionen und Kalkulation</h2>
     <table className="document-items mt-3 w-full border-collapse text-sm">
      <thead>
       <tr className="border-y border-slate-900 bg-slate-100 text-left text-[11px] uppercase tracking-[0.12em] text-slate-600">
        <th className="w-12 py-3 pr-2">Pos.</th>
        <th className="py-3 pr-3">Beschreibung</th>
        <th className="w-20 py-3 pr-3 text-right">Menge</th>
        <th className="w-26 py-3 pr-3 text-right">Einzel netto</th>
        <th className="w-20 py-3 pr-3 text-right">USt.</th>
        <th className="w-28 py-3 text-right">Gesamt netto</th>
       </tr>
      </thead>
      <tbody>
       {doc.editableData.items.map((item, index) => (
        <tr key={item.id} className="border-b border-slate-200 align-top">
         <td className="py-3 pr-2 font-mono text-xs text-slate-500">{index + 1}</td>
         <td className="py-3 pr-3">
          <p className="font-semibold text-slate-950">{item.description}</p>
          {item.category ? <p className="mt-1 text-xs text-slate-500">{item.category}</p> : null}
         </td>
         <td className="py-3 pr-3 text-right">
          {item.quantity} {item.unit}
         </td>
         <td className="py-3 pr-3 text-right">{formatMoney(item.unitPriceNet ?? item.unitPrice)}</td>
         <td className="py-3 pr-3 text-right">{item.taxRate}%</td>
         <td className="py-3 text-right font-bold">{formatMoney(item.lineTotalNet ?? item.total)}</td>
        </tr>
       ))}
      </tbody>
     </table>
    </section>

    <section className="document-total-box mt-8 flex justify-end">
     <div className="w-full max-w-[85mm] rounded-2xl border border-slate-900 bg-white p-4 text-sm">
      {doc.totals.discountTotal ? (
       <div className="flex justify-between border-b border-slate-200 py-2">
        <span>Rabatt gesamt</span>
        <span>{formatMoney(doc.totals.discountTotal)}</span>
       </div>
      ) : null}
      <div className="flex justify-between border-b border-slate-200 py-2">
       <span>Summe netto</span>
       <span>{formatMoney(doc.totals.net)}</span>
      </div>
      <div className="flex justify-between border-b border-slate-200 py-2">
       <span>Umsatzsteuer</span>
       <span>{formatMoney(doc.totals.tax)}</span>
      </div>
      <div className="flex justify-between pt-3 text-lg font-black">
       <span>Gesamt brutto</span>
       <span>{formatMoney(doc.totals.gross)}</span>
      </div>
     </div>
    </section>

    <section className="document-notes mt-8 grid gap-4 text-sm leading-7 text-slate-700">
     {doc.editableData.conditions ? <p className="whitespace-pre-line">{doc.editableData.conditions}</p> : null}
     {doc.editableData.notesText ? <p className="whitespace-pre-line">{doc.editableData.notesText}</p> : null}
     {doc.editableData.paymentTerms ? <p>Zahlungsbedingungen: {doc.editableData.paymentTerms}</p> : null}
     {doc.editableData.footerNote ? <p>{doc.editableData.footerNote}</p> : null}
    </section>

    <footer className="document-section mt-12 border-t border-slate-200 pt-5 text-[10px] leading-5 text-slate-500">
     <div className="grid gap-4 sm:grid-cols-3">
      <div>
       <p className="font-black text-slate-700">FLOXANT</p>
       <p>{business.legalName}</p>
       <p>{business.streetAddress}</p>
       <p>
        {business.postalCode} {business.city}
       </p>
      </div>
      <div>
       <p className="font-black text-slate-700">Kontakt</p>
       <p>{business.phone}</p>
       <p>{business.email}</p>
       <p>{business.website}</p>
      </div>
      <div>
       <p className="font-black text-slate-700">Steuer / Zahlung</p>
       <p>{business.vatId ? `USt-ID: ${business.vatId}` : "USt-ID: nicht konfiguriert"}</p>
       <p>{business.taxNumber ? `St.-Nr.: ${business.taxNumber}` : "Steuernummer: nicht konfiguriert"}</p>
       <p>{business.iban ? `IBAN: ${business.iban}` : "IBAN: nicht konfiguriert"}</p>
      </div>
     </div>
     {customer?.email || customer?.phone ? (
      <p className="mt-4 border-t border-slate-100 pt-3">
       Kundenkontakt im Dokument-Snapshot: {[customer.email, customer.phone].filter(Boolean).join(" · ")}
      </p>
     ) : null}
    </footer>
   </article>

   {(warnings.length || missingBusinessData.length) && !compact ? (
    <aside className="no-print mx-auto mt-4 w-[210mm] rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
     <p className="font-black">Dokumentenprüfung</p>
     <ul className="mt-2 list-disc space-y-1 pl-5">
      {warnings.map((warning) => (
       <li key={warning.message}>{warning.message}</li>
      ))}
     </ul>
    </aside>
   ) : null}
  </div>
 );
}
