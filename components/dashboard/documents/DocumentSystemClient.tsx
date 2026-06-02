"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
 AlertTriangle,
 ArrowDown,
 ArrowLeft,
 ArrowUp,
 Copy,
 Download,
 FileCheck2,
 FileText,
 Loader2,
 Plus,
 Printer,
 Receipt,
 RefreshCw,
 Save,
 ShieldCheck,
 Trash2,
} from "lucide-react";
import {
 DOCUMENT_UNITS,
 buildDocumentFromInput,
 calculateDocumentTotals,
 createDefaultLineItem,
 formatDateForInput,
 formatMoney,
 getDocumentStatuses,
 getDocumentTypeLabel,
 getMissingBusinessData,
 getStatusLabel,
 normalizeDocument,
 normalizeItems,
 validateDocument,
} from "@/lib/documents/document-core";
import type {
 DocumentCustomerSnapshot,
 DocumentLineItem,
 DocumentServiceBlock,
 FloxDocument,
 FloxDocumentStatus,
 FloxDocumentType,
 IntakePayload,
} from "@/lib/types/intake";
import { cn } from "@/lib/utils";
import { DocumentA4Preview } from "./DocumentA4Preview";

type DocumentEntry = {
 bookingId: string;
 bookingService: string;
 bookingStatus: string;
 bookingTimestamp: string;
 bookingName: string;
 bookingEmail: string;
 bookingPhone: string;
 document: FloxDocument;
};

type BookingOption = {
 id: string;
 service: string;
 name: string;
 email: string;
 phone: string;
 status: string;
 timestamp: string;
 details?: IntakePayload;
 documentCount: number;
};

type ApiPayload = {
 documents: DocumentEntry[];
 bookings: BookingOption[];
};

const DOCUMENT_TYPES: Array<{ value: FloxDocumentType; label: string; icon: typeof FileText }> = [
 { value: "quote", label: "Angebot", icon: FileCheck2 },
 { value: "order_confirmation", label: "Auftragsbestätigung", icon: ShieldCheck },
 { value: "invoice", label: "Rechnung", icon: Receipt },
];

const EMPTY_CUSTOMER: Partial<DocumentCustomerSnapshot> = {
 customerType: "private",
 name: "",
 companyName: "",
 contactPerson: "",
 street: "",
 zip: "",
 city: "",
 country: "Deutschland",
 email: "",
 phone: "",
 vatId: "",
};

function todayInput() {
 return new Date().toISOString().slice(0, 10);
}

function toIsoDate(value: string) {
 return value ? new Date(`${value}T12:00:00`).toISOString() : "";
}

function latestEntries(entries: DocumentEntry[]) {
 return [...entries].sort(
  (a, b) => new Date(b.document.updatedAt || b.document.createdAt).getTime() - new Date(a.document.updatedAt || a.document.createdAt).getTime(),
 );
}

export function DocumentSystemClient() {
 const [entries, setEntries] = useState<DocumentEntry[]>([]);
 const [bookings, setBookings] = useState<BookingOption[]>([]);
 const [selected, setSelected] = useState<DocumentEntry | null>(null);
 const [draft, setDraft] = useState<FloxDocument | null>(null);
 const [loading, setLoading] = useState(true);
 const [saving, setSaving] = useState(false);
 const [creating, setCreating] = useState(false);
 const [error, setError] = useState("");
 const [query, setQuery] = useState("");
 const [typeFilter, setTypeFilter] = useState<FloxDocumentType | "all">("all");
 const [newType, setNewType] = useState<FloxDocumentType>("quote");
 const [sourceBookingId, setSourceBookingId] = useState("");
 const [manualCustomer, setManualCustomer] = useState(EMPTY_CUSTOMER);

 async function reload(preferredDocumentId?: string) {
  setLoading(true);
  setError("");
  try {
   const response = await fetch("/api/documents", { cache: "no-store" });
   const payload = (await response.json()) as ApiPayload | { error?: string };
   if (!response.ok || !("documents" in payload)) {
    const message = "error" in payload ? payload.error : "";
    throw new Error(message || "Dokumente konnten nicht geladen werden.");
   }
   const normalizedEntries = latestEntries(
    payload.documents.map((entry) => ({
     ...entry,
     document: normalizeDocument(entry.document),
    })),
   );
   setEntries(normalizedEntries);
   setBookings(payload.bookings || []);
   const nextSelected =
    (preferredDocumentId ? normalizedEntries.find((entry) => entry.document.id === preferredDocumentId) : null) ||
    (selected ? normalizedEntries.find((entry) => entry.document.id === selected.document.id) : null) ||
    normalizedEntries[0] ||
    null;
   setSelected(nextSelected);
   setDraft(nextSelected ? normalizeDocument(nextSelected.document) : null);
  } catch (loadError: any) {
   setError(loadError?.message || "Dokumente konnten nicht geladen werden.");
  } finally {
   setLoading(false);
  }
 }

 useEffect(() => {
  void reload();
 }, []);

 const filteredEntries = useMemo(() => {
  const needle = query.trim().toLowerCase();
  return entries.filter((entry) => {
   if (typeFilter !== "all" && entry.document.type !== typeFilter) return false;
   if (!needle) return true;
   const haystack = [
    entry.document.number,
    entry.document.editableData.customer?.name,
    entry.document.editableData.customer?.companyName,
    entry.bookingName,
    entry.bookingEmail,
    entry.document.editableData.performanceLocation,
    entry.document.editableData.services?.map((service) => service.title).join(" "),
   ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
   return haystack.includes(needle);
  });
 }, [entries, query, typeFilter]);

 const warnings = useMemo(() => (draft ? validateDocument(draft) : []), [draft]);
 const missingBusinessData = useMemo(() => getMissingBusinessData(), []);

 async function createDocument() {
  setCreating(true);
  setError("");
  try {
   const response = await fetch("/api/documents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     documentType: newType,
     sourceBookingId: sourceBookingId || undefined,
     customer: sourceBookingId ? undefined : manualCustomer,
    }),
   });
   const payload = await response.json();
   if (!response.ok) throw new Error(payload.error || "Dokument konnte nicht erstellt werden.");
   await reload(payload.document?.id);
  } catch (createError: any) {
   setError(createError?.message || "Dokument konnte nicht erstellt werden.");
  } finally {
   setCreating(false);
  }
 }

 async function saveDraft() {
  if (!selected || !draft) return;
  setSaving(true);
  setError("");
  try {
   const normalized = normalizeDocument({
    ...draft,
    totals: calculateDocumentTotals(draft.editableData.items),
   });
   const response = await fetch(`/api/documents/${selected.bookingId}/${selected.document.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "update", document: normalized }),
   });
   const payload = await response.json();
   if (!response.ok) throw new Error(payload.error || "Dokument konnte nicht gespeichert werden.");
   await reload(normalized.id);
  } catch (saveError: any) {
   setError(saveError?.message || "Dokument konnte nicht gespeichert werden.");
  } finally {
   setSaving(false);
  }
 }

 async function runDocumentAction(action: "duplicate" | "derive" | "status", extra: Record<string, unknown> = {}) {
  if (!selected) return;
  setSaving(true);
  setError("");
  try {
   const response = await fetch(`/api/documents/${selected.bookingId}/${selected.document.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...extra }),
   });
   const payload = await response.json();
   if (!response.ok) throw new Error(payload.error || "Dokumentenaktion fehlgeschlagen.");
   const newId =
    action === "derive" || action === "duplicate"
     ? payload.documents?.[payload.documents.length - 1]?.id
     : selected.document.id;
   await reload(newId);
  } catch (actionError: any) {
   setError(actionError?.message || "Dokumentenaktion fehlgeschlagen.");
  } finally {
   setSaving(false);
  }
 }

 function updateDraft(updater: (current: FloxDocument) => FloxDocument) {
  setDraft((current) => (current ? normalizeDocument(updater(current)) : current));
 }

 function updateCustomer(updates: Partial<DocumentCustomerSnapshot>) {
  updateDraft((current) => ({
   ...current,
   editableData: {
    ...current.editableData,
    customer: {
     ...current.editableData.customer!,
     ...updates,
    },
   },
  }));
 }

 function addService() {
  updateDraft((current) => ({
   ...current,
   editableData: {
    ...current.editableData,
    services: [
     ...(current.editableData.services || []),
     {
      id: crypto.randomUUID(),
      title: "Neuer Leistungsblock",
      description: "",
      orderIndex: current.editableData.services?.length || 0,
     },
    ],
   },
  }));
 }

 function updateService(id: string, updates: Partial<DocumentServiceBlock>) {
  updateDraft((current) => ({
   ...current,
   editableData: {
    ...current.editableData,
    services: (current.editableData.services || []).map((service) =>
     service.id === id ? { ...service, ...updates } : service,
    ),
   },
  }));
 }

 function removeService(id: string) {
  updateDraft((current) => ({
   ...current,
   editableData: {
    ...current.editableData,
    services: (current.editableData.services || []).filter((service) => service.id !== id),
    items: current.editableData.items.map((item) => (item.serviceId === id ? { ...item, serviceId: "" } : item)),
   },
  }));
 }

 function addItem() {
  updateDraft((current) => {
   const item = createDefaultLineItem(current.editableData.services?.[0]?.id);
   return {
    ...current,
    editableData: {
     ...current.editableData,
     items: normalizeItems([
      ...current.editableData.items,
      { ...item, orderIndex: current.editableData.items.length },
     ]),
    },
   };
  });
 }

 function updateItem(id: string, updates: Partial<DocumentLineItem>) {
  updateDraft((current) => ({
   ...current,
   editableData: {
    ...current.editableData,
    items: normalizeItems(current.editableData.items.map((item) => (item.id === id ? { ...item, ...updates } : item))),
   },
  }));
 }

 function removeItem(id: string) {
  updateDraft((current) => ({
   ...current,
   editableData: {
    ...current.editableData,
    items: normalizeItems(current.editableData.items.filter((item) => item.id !== id)),
   },
  }));
 }

 function duplicateItem(id: string) {
  updateDraft((current) => {
   const source = current.editableData.items.find((item) => item.id === id);
   if (!source) return current;
   return {
    ...current,
    editableData: {
     ...current.editableData,
     items: normalizeItems([
      ...current.editableData.items,
      { ...source, id: crypto.randomUUID(), description: `${source.description} (Kopie)` },
     ]),
    },
   };
  });
 }

 function moveItem(id: string, direction: -1 | 1) {
  updateDraft((current) => {
   const items = [...current.editableData.items];
   const index = items.findIndex((item) => item.id === id);
   const target = index + direction;
   if (index < 0 || target < 0 || target >= items.length) return current;
   [items[index], items[target]] = [items[target], items[index]];
   return {
    ...current,
    editableData: {
     ...current.editableData,
     items: normalizeItems(items.map((item, orderIndex) => ({ ...item, orderIndex }))),
    },
   };
  });
 }

 const totals = draft ? calculateDocumentTotals(draft.editableData.items) : null;

 return (
  <main className="min-h-screen bg-[linear-gradient(135deg,#eef6ff_0%,#ffffff_42%,#f8fafc_100%)] text-slate-950">
   <div className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8">
    <div className="no-print mb-6 flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-sm shadow-slate-950/5 lg:flex-row lg:items-end lg:justify-between">
     <div>
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-slate-500 hover:text-blue-700">
       <ArrowLeft className="h-4 w-4" />
       Zurück zum Dashboard
      </Link>
      <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-blue-700">FLOXANT Dokumenten-System</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
       Angebote, Auftragsbestätigungen und Rechnungen
      </h1>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">
       Erstellen Sie professionelle A4-Dokumente manuell oder aus bestehenden Website-Anfragen. Services erklären den Auftrag,
       Positionen kalkulieren den Preis. Die Vorschau ist druckoptimiert und kann als PDF gespeichert werden.
      </p>
     </div>

     <div className="grid gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm lg:min-w-[420px]">
      <div className="grid gap-3 sm:grid-cols-2">
       <label>
        <FieldLabel>Dokumenttyp</FieldLabel>
        <select value={newType} onChange={(event) => setNewType(event.target.value as FloxDocumentType)} className="dashboard-input">
         {DOCUMENT_TYPES.map((type) => (
          <option key={type.value} value={type.value}>
           {type.label}
          </option>
         ))}
        </select>
       </label>
       <label>
        <FieldLabel>Quelle</FieldLabel>
        <select value={sourceBookingId} onChange={(event) => setSourceBookingId(event.target.value)} className="dashboard-input">
         <option value="">Manuell ohne Anfrage</option>
         {bookings
          .filter((booking) => booking.service !== "manual_document")
          .slice(0, 80)
          .map((booking) => (
           <option key={booking.id} value={booking.id}>
            {booking.name} · {booking.service}
           </option>
          ))}
        </select>
       </label>
      </div>

      {!sourceBookingId ? (
       <div className="grid gap-3 sm:grid-cols-3">
        <input
         value={manualCustomer.name || ""}
         onChange={(event) => setManualCustomer((current) => ({ ...current, name: event.target.value }))}
         className="dashboard-input"
         placeholder="Kundenname"
        />
        <input
         value={manualCustomer.email || ""}
         onChange={(event) => setManualCustomer((current) => ({ ...current, email: event.target.value }))}
         className="dashboard-input"
         placeholder="E-Mail"
        />
        <input
         value={manualCustomer.phone || ""}
         onChange={(event) => setManualCustomer((current) => ({ ...current, phone: event.target.value }))}
         className="dashboard-input"
         placeholder="Telefon"
        />
       </div>
      ) : null}

      <button type="button" onClick={createDocument} disabled={creating} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 text-sm font-black text-white transition hover:bg-blue-800 disabled:opacity-60">
       {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
       Neues Dokument erstellen
      </button>
     </div>
    </div>

    {error ? (
     <div className="no-print mb-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-800">
      {error}
     </div>
    ) : null}

    <div className="grid gap-5 xl:grid-cols-[360px_minmax(620px,1fr)_minmax(460px,0.9fr)]">
     <aside className="no-print space-y-4">
      <Panel title="Dokumentenliste" subtitle={`${filteredEntries.length} Dokumente sichtbar`}>
       <div className="grid gap-3">
        <input
         value={query}
         onChange={(event) => setQuery(event.target.value)}
         className="dashboard-input"
         placeholder="Suchen: Kunde, Nummer, Ort..."
        />
        <div className="grid grid-cols-2 gap-2">
         <button className={filterButton(typeFilter === "all")} onClick={() => setTypeFilter("all")} type="button">Alle</button>
         {DOCUMENT_TYPES.map((type) => (
          <button key={type.value} className={filterButton(typeFilter === type.value)} onClick={() => setTypeFilter(type.value)} type="button">
           {type.label}
          </button>
         ))}
        </div>
       </div>
      </Panel>

      <div className="max-h-[calc(100vh-360px)] space-y-2 overflow-y-auto pr-1">
       {loading ? <EmptyState text="Dokumente werden geladen." /> : null}
       {!loading && filteredEntries.length === 0 ? <EmptyState text="Noch keine Dokumente gefunden." /> : null}
       {filteredEntries.map((entry) => {
        const active = selected?.document.id === entry.document.id;
        const Icon = DOCUMENT_TYPES.find((type) => type.value === entry.document.type)?.icon || FileText;
        return (
         <button
          key={`${entry.bookingId}-${entry.document.id}`}
          type="button"
          onClick={() => {
           setSelected(entry);
           setDraft(normalizeDocument(entry.document));
          }}
          className={cn(
           "w-full rounded-2xl border p-4 text-left transition",
           active ? "border-blue-300 bg-blue-50 shadow-sm shadow-blue-950/10" : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/50",
          )}
         >
          <div className="flex items-start gap-3">
           <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
            <Icon className="h-4 w-4 text-blue-700" />
           </div>
           <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-black text-slate-950">{entry.document.number}</p>
            <p className="mt-1 truncate text-xs font-semibold text-slate-600">
             {entry.document.editableData.customer?.companyName || entry.document.editableData.customer?.name || entry.bookingName}
            </p>
            <p className="mt-2 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
             {getDocumentTypeLabel(entry.document.type)} · {getStatusLabel(entry.document.type, entry.document.status)}
            </p>
           </div>
          </div>
         </button>
        );
       })}
      </div>
     </aside>

     <section className="no-print space-y-4">
      {!draft || !selected ? (
       <EmptyState text="Wählen oder erstellen Sie links ein Dokument." />
      ) : (
       <>
        <Panel
         title={`${getDocumentTypeLabel(draft.type)} bearbeiten`}
         subtitle="Alle Dokumentdaten bleiben manuell editierbar."
         right={
          <div className="flex flex-wrap gap-2">
           <button type="button" onClick={saveDraft} disabled={saving} className="action-primary">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Speichern
           </button>
           <a href={`/api/pdf/${selected.bookingId}?documentId=${selected.document.id}&download=1`} target="_blank" rel="noreferrer" className="action-secondary">
            <Download className="h-4 w-4" />
            PDF herunterladen
           </a>
           <button type="button" onClick={() => window.print()} className="action-secondary">
            <Printer className="h-4 w-4" />
            Drucken
           </button>
          </div>
         }
        >
         <div className="grid gap-4 md:grid-cols-4">
          <label>
           <FieldLabel>Typ</FieldLabel>
           <select
            value={draft.type}
            onChange={(event) =>
             updateDraft((current) => {
              const nextType = event.target.value as FloxDocumentType;
              const rebuilt = buildDocumentFromInput({
               type: nextType,
               allDocuments: entries.map((entry) => entry.document),
               customer: current.editableData.customer,
               services: current.editableData.services,
               items: current.editableData.items,
               sourceDocument: current,
              });
              return { ...rebuilt, id: current.id, bookingId: current.bookingId, number: current.number, editableData: { ...rebuilt.editableData, documentNumber: current.number } };
             })
            }
            className="dashboard-input"
           >
            {DOCUMENT_TYPES.map((type) => (
             <option key={type.value} value={type.value}>{type.label}</option>
            ))}
           </select>
          </label>
          <TextField label="Dokumentnummer" value={draft.number} onChange={(value) => updateDraft((current) => ({ ...current, number: value, editableData: { ...current.editableData, documentNumber: value } }))} />
          <DateField label="Datum" value={draft.editableData.documentDate} onChange={(value) => updateDraft((current) => ({ ...current, editableData: { ...current.editableData, documentDate: value } }))} />
          <label>
           <FieldLabel>Status</FieldLabel>
           <select value={draft.status} onChange={(event) => updateDraft((current) => ({ ...current, status: event.target.value as FloxDocumentStatus }))} className="dashboard-input">
            {getDocumentStatuses(draft.type).map((status) => (
             <option key={status.value} value={status.value}>{status.label}</option>
            ))}
           </select>
          </label>
          <DateField label="Leistungsdatum" value={draft.editableData.serviceDate} onChange={(value) => updateDraft((current) => ({ ...current, editableData: { ...current.editableData, serviceDate: value } }))} />
          <DateField label="Zeitraum von" value={draft.editableData.servicePeriodStart} onChange={(value) => updateDraft((current) => ({ ...current, editableData: { ...current.editableData, servicePeriodStart: value } }))} />
          <DateField label="Zeitraum bis" value={draft.editableData.servicePeriodEnd} onChange={(value) => updateDraft((current) => ({ ...current, editableData: { ...current.editableData, servicePeriodEnd: value } }))} />
          <DateField
           label={draft.type === "quote" ? "Gültig bis" : "Zahlungsziel"}
           value={draft.type === "quote" ? draft.editableData.validUntil : draft.editableData.paymentDueDate || draft.editableData.dueDate}
           onChange={(value) =>
            updateDraft((current) => ({
             ...current,
             editableData:
              current.type === "quote"
               ? { ...current.editableData, validUntil: value }
               : { ...current.editableData, paymentDueDate: value, dueDate: value },
            }))
           }
          />
         </div>
         {draft.type === "invoice" ? (
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-900">
           Rechnungsnummern müssen intern eindeutig und nachvollziehbar bleiben. Manuelle Änderungen bitte nur bewusst vornehmen.
          </p>
         ) : null}
        </Panel>

        <Panel title="Kunde" subtitle="Snapshot im Dokument. Spätere Kundendatenänderungen ändern dieses Dokument nicht.">
         <div className="grid gap-4 md:grid-cols-3">
          <label>
           <FieldLabel>Kundentyp</FieldLabel>
           <select value={draft.editableData.customer?.customerType || "private"} onChange={(event) => updateCustomer({ customerType: event.target.value as "private" | "company" })} className="dashboard-input">
            <option value="private">Privat</option>
            <option value="company">Firma</option>
           </select>
          </label>
          <TextField label="Name" value={draft.editableData.customer?.name || ""} onChange={(value) => updateCustomer({ name: value })} />
          <TextField label="Firma" value={draft.editableData.customer?.companyName || ""} onChange={(value) => updateCustomer({ companyName: value })} />
          <TextField label="Ansprechpartner" value={draft.editableData.customer?.contactPerson || ""} onChange={(value) => updateCustomer({ contactPerson: value })} />
          <TextField label="Straße / Hausnummer" value={draft.editableData.customer?.street || ""} onChange={(value) => updateCustomer({ street: value })} />
          <TextField label="PLZ" value={draft.editableData.customer?.zip || ""} onChange={(value) => updateCustomer({ zip: value })} />
          <TextField label="Ort" value={draft.editableData.customer?.city || ""} onChange={(value) => updateCustomer({ city: value })} />
          <TextField label="Land" value={draft.editableData.customer?.country || ""} onChange={(value) => updateCustomer({ country: value })} />
          <TextField label="E-Mail" value={draft.editableData.customer?.email || ""} onChange={(value) => updateCustomer({ email: value })} />
          <TextField label="Telefon" value={draft.editableData.customer?.phone || ""} onChange={(value) => updateCustomer({ phone: value })} />
          <TextField label="USt-ID optional" value={draft.editableData.customer?.vatId || ""} onChange={(value) => updateCustomer({ vatId: value })} />
          <TextField label="Kundennummer optional" value={draft.editableData.customer?.customerNumber || ""} onChange={(value) => updateCustomer({ customerNumber: value })} />
         </div>
        </Panel>

        <Panel title="Services" subtitle="Services erklären den Auftrag. Positionen kalkulieren den Preis." right={<button type="button" onClick={addService} className="action-secondary"><Plus className="h-4 w-4" /> Service</button>}>
         <div className="space-y-3">
          {(draft.editableData.services || []).map((service, index) => (
           <div key={service.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
             <TextField label={`Service ${index + 1}`} value={service.title} onChange={(value) => updateService(service.id, { title: value })} />
             <TextField label="Ort / Objekt" value={service.location || ""} onChange={(value) => updateService(service.id, { location: value })} />
             <button type="button" onClick={() => removeService(service.id)} className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-red-200 bg-red-50 px-3 text-red-700">
              <Trash2 className="h-4 w-4" />
             </button>
            </div>
            <label className="mt-3 block">
             <FieldLabel>Beschreibung</FieldLabel>
             <textarea value={service.description || ""} onChange={(event) => updateService(service.id, { description: event.target.value })} rows={3} className="dashboard-textarea" />
            </label>
           </div>
          ))}
         </div>
        </Panel>

        <Panel title="Positionen" subtitle="Positionen sind die abrechenbaren Zeilen." right={<button type="button" onClick={addItem} className="action-secondary"><Plus className="h-4 w-4" /> Position</button>}>
         <div className="space-y-3">
          {draft.editableData.items.map((item, index) => (
           <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
            <div className="grid gap-3 2xl:grid-cols-[minmax(220px,1.5fr)_90px_120px_120px_100px_110px_120px_auto]">
             <TextField label={`Pos. ${index + 1}`} value={item.description} onChange={(value) => updateItem(item.id, { description: value })} />
             <NumberField label="Menge" value={item.quantity} step="0.1" onChange={(value) => updateItem(item.id, { quantity: value })} />
             <label>
              <FieldLabel>Einheit</FieldLabel>
              <select value={item.unit} onChange={(event) => updateItem(item.id, { unit: event.target.value })} className="dashboard-input">
               {DOCUMENT_UNITS.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
              </select>
             </label>
             <NumberField label="Netto" value={item.unitPriceNet ?? item.unitPrice} step="0.01" onChange={(value) => updateItem(item.id, { unitPriceNet: value, unitPrice: value })} />
             <NumberField label="Rabatt %" value={item.discountPercent || 0} step="0.1" onChange={(value) => updateItem(item.id, { discountPercent: value })} />
             <NumberField label="USt. %" value={item.taxRate} step="1" onChange={(value) => updateItem(item.id, { taxRate: value })} />
             <div>
              <FieldLabel>Netto gesamt</FieldLabel>
              <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-black text-slate-950">
               {formatMoney(item.lineTotalNet ?? item.total)}
              </div>
             </div>
             <div className="flex items-end gap-1">
              <IconButton label="hoch" onClick={() => moveItem(item.id, -1)}><ArrowUp className="h-4 w-4" /></IconButton>
              <IconButton label="runter" onClick={() => moveItem(item.id, 1)}><ArrowDown className="h-4 w-4" /></IconButton>
              <IconButton label="duplizieren" onClick={() => duplicateItem(item.id)}><Copy className="h-4 w-4" /></IconButton>
              <IconButton label="löschen" onClick={() => removeItem(item.id)} danger><Trash2 className="h-4 w-4" /></IconButton>
             </div>
            </div>
           </div>
          ))}
         </div>
        </Panel>

        <Panel title="Texte und Hinweise" subtitle="Professionelle deutsche Textbausteine, jederzeit bearbeitbar.">
         <div className="grid gap-4 md:grid-cols-2">
          <TextAreaField label="Einleitung" value={draft.editableData.introText || ""} onChange={(value) => updateDraft((current) => ({ ...current, editableData: { ...current.editableData, introText: value } }))} />
          <TextAreaField label="Hinweise / Bedingungen" value={draft.editableData.conditions || ""} onChange={(value) => updateDraft((current) => ({ ...current, editableData: { ...current.editableData, conditions: value } }))} />
          <TextAreaField label="Öffentliche Bemerkung" value={draft.editableData.notesText || ""} onChange={(value) => updateDraft((current) => ({ ...current, editableData: { ...current.editableData, notesText: value } }))} />
          <TextAreaField label="Interne Notiz" value={draft.editableData.internalNote || ""} onChange={(value) => updateDraft((current) => ({ ...current, editableData: { ...current.editableData, internalNote: value } }))} />
         </div>
        </Panel>

        <Panel title="Summen und Prüfungen">
         <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
          <div className="grid gap-2">
           {warnings.length ? warnings.map((warning) => (
            <div key={warning.message} className={cn("flex items-start gap-2 rounded-xl border px-4 py-3 text-sm", warning.level === "critical" ? "border-red-200 bg-red-50 text-red-800" : "border-amber-200 bg-amber-50 text-amber-900")}>
             <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
             <span>{warning.message}</span>
            </div>
           )) : <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">Keine kritischen Warnungen.</div>}
           {missingBusinessData.length ? (
            <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-6 text-slate-600">
             Fehlende Stammdaten: {missingBusinessData.join(", ")}. Diese Werte sollten vor echtem Rechnungsversand in der Umgebung konfiguriert werden.
            </p>
           ) : null}
          </div>
          <div className="rounded-2xl border border-slate-900 bg-white p-4">
           <Line label="Netto" value={formatMoney(totals?.net || 0)} />
           <Line label="Rabatt" value={formatMoney(totals?.discountTotal || 0)} />
           <Line label="USt." value={formatMoney(totals?.tax || 0)} />
           <div className="mt-3 flex justify-between border-t border-slate-900 pt-3 text-lg font-black">
            <span>Brutto</span>
            <span>{formatMoney(totals?.gross || 0)}</span>
           </div>
          </div>
         </div>
        </Panel>

        <Panel title="Dokumentenkette" subtitle="Aus vorhandenen Dokumenten Folgeunterlagen erstellen.">
         <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => runDocumentAction("duplicate")} className="action-secondary"><Copy className="h-4 w-4" /> Duplizieren</button>
          {draft.type === "quote" ? (
           <>
            <button type="button" onClick={() => runDocumentAction("derive", { targetType: "order_confirmation" })} className="action-secondary"><ShieldCheck className="h-4 w-4" /> AB aus Angebot</button>
            <button type="button" onClick={() => runDocumentAction("derive", { targetType: "invoice" })} className="action-secondary"><Receipt className="h-4 w-4" /> Rechnung aus Angebot</button>
           </>
          ) : null}
          {draft.type === "order_confirmation" ? (
           <button type="button" onClick={() => runDocumentAction("derive", { targetType: "invoice" })} className="action-secondary"><Receipt className="h-4 w-4" /> Rechnung aus AB</button>
          ) : null}
          <button type="button" onClick={() => void reload(selected.document.id)} className="action-secondary"><RefreshCw className="h-4 w-4" /> Neu laden</button>
         </div>
        </Panel>
       </>
      )}
     </section>

     <aside className="space-y-4">
      {draft ? <DocumentA4Preview document={draft} compact /> : <EmptyState text="Live-Vorschau erscheint nach Auswahl." />}
     </aside>
    </div>
   </div>
  </main>
 );
}

function filterButton(active: boolean) {
 return cn(
  "rounded-xl border px-3 py-2 text-xs font-black uppercase tracking-[0.12em] transition",
  active ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
 );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
 return <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{children}</span>;
}

function Panel({
 title,
 subtitle,
 right,
 children,
}: {
 title: string;
 subtitle?: string;
 right?: React.ReactNode;
 children: React.ReactNode;
}) {
 return (
  <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
   <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
    <div>
     <h2 className="text-lg font-black tracking-tight text-slate-950">{title}</h2>
     {subtitle ? <p className="mt-1 text-sm leading-6 text-slate-500">{subtitle}</p> : null}
    </div>
    {right}
   </div>
   {children}
  </section>
 );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
 return (
  <label className="block">
   <FieldLabel>{label}</FieldLabel>
   <input value={value} onChange={(event) => onChange(event.target.value)} className="dashboard-input" />
  </label>
 );
}

function NumberField({
 label,
 value,
 step,
 onChange,
}: {
 label: string;
 value: number;
 step: string;
 onChange: (value: number) => void;
}) {
 return (
  <label className="block">
   <FieldLabel>{label}</FieldLabel>
   <input type="number" value={Number.isFinite(value) ? value : 0} step={step} onChange={(event) => onChange(Number(event.target.value) || 0)} className="dashboard-input" />
  </label>
 );
}

function DateField({ label, value, onChange }: { label: string; value?: string; onChange: (value: string) => void }) {
 return (
  <label className="block">
   <FieldLabel>{label}</FieldLabel>
   <input type="date" value={formatDateForInput(value) || todayInput()} onChange={(event) => onChange(toIsoDate(event.target.value))} className="dashboard-input" />
  </label>
 );
}

function TextAreaField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
 return (
  <label className="block">
   <FieldLabel>{label}</FieldLabel>
   <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={5} className="dashboard-textarea" />
  </label>
 );
}

function IconButton({
 label,
 onClick,
 danger = false,
 children,
}: {
 label: string;
 onClick: () => void;
 danger?: boolean;
 children: React.ReactNode;
}) {
 return (
  <button
   type="button"
   aria-label={label}
   title={label}
   onClick={onClick}
   className={cn(
    "inline-flex h-11 w-11 items-center justify-center rounded-xl border transition",
    danger ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100" : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white",
   )}
  >
   {children}
  </button>
 );
}

function Line({ label, value }: { label: string; value: string }) {
 return (
  <div className="flex justify-between border-b border-slate-100 py-2 text-sm">
   <span className="text-slate-500">{label}</span>
   <span className="font-bold text-slate-950">{value}</span>
  </div>
 );
}

function EmptyState({ text }: { text: string }) {
 return <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-sm font-semibold text-slate-500">{text}</div>;
}
