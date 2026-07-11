export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { enrichBookingFileUrls } from "@/lib/booking-attachments";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { company } from "@/lib/company";
import {
 calculateDocumentTotals,
 extractCustomerFromBooking,
 extractServicesFromBooking,
 normalizeItems,
 suggestDocumentNumber,
} from "@/lib/documents/document-core";
import { sendDocumentMail } from "@/lib/mail";
import {
 CommercialDecision,
 DocumentLineItem,
 FinanceLedgerEntry,
 FloxDocument,
 FloxDocumentType,
 IntakePayload,
 OperationCostLine,
 WorkOrderDetails,
} from "@/lib/types/intake";

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

type PatchPayload = {
 status?: string;
 internalNotes?: string;
 nextAction?: string;
 operations?: {
  workOrder?: WorkOrderDetails;
  costLines?: OperationCostLine[];
  ledgerEntries?: FinanceLedgerEntry[];
  commercialDecision?: CommercialDecision;
 };
 action?: "create_doc" | "update_doc" | "send_doc";
 documentType?: FloxDocumentType;
 documentId?: string;
 fromDocumentId?: string;
 updatedDoc?: FloxDocument;
};

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function normalizeCostLines(lines: OperationCostLine[] = []) {
 return lines.map((line) => ({
  ...line,
  quantity: Number(line.quantity) || 0,
  unitCost: Number(line.unitCost) || 0,
  note: line.note || "",
 }));
}

function normalizeLedgerEntries(entries: FinanceLedgerEntry[] = []) {
 return entries.map((entry) => ({
  ...entry,
  amount: Number(entry.amount) || 0,
  note: entry.note || "",
  date: entry.date || new Date().toISOString().slice(0, 10),
 }));
}

function buildProfitability(costLines: OperationCostLine[] = [], ledgerEntries: FinanceLedgerEntry[] = []) {
 const costTotal = costLines.reduce(
  (sum, line) => sum + (Number(line.quantity) || 0) * (Number(line.unitCost) || 0),
  0
 );
 const incomeTotal = ledgerEntries
  .filter((entry) => entry.type === "income")
  .reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0);
 const ledgerExpenseTotal = ledgerEntries
  .filter((entry) => entry.type === "expense")
  .reduce((sum, entry) => sum + (Number(entry.amount) || 0), 0);
 const expenseTotal = costTotal + ledgerExpenseTotal;

 return {
  incomeTotal,
  expenseTotal,
  costTotal,
  profit: incomeTotal - expenseTotal,
  updatedAt: new Date().toISOString(),
 };
}

function cloneItems(items: DocumentLineItem[] = []) {
 return normalizeItems(items);
}

function calculateTotals(items: DocumentLineItem[]) {
 return calculateDocumentTotals(items);
}

function findLatestDoc(documents: FloxDocument[], type: FloxDocumentType) {
 return [...documents]
  .filter((doc) => doc.type === type)
  .sort((a, b) => b.version - a.version || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
}

function getTypePrefix(type: FloxDocumentType) {
 if (type === "quote") return "ANG";
 if (type === "order_confirmation") return "AB";
 if (type === "invoice") return "RE";
 return "ANF";
}

function getTypeLabel(type: FloxDocumentType) {
 if (type === "quote") return "Angebot";
 if (type === "order_confirmation") return "Auftragsbestätigung";
 if (type === "invoice") return "Rechnung";
 return "Anfrage-Zusammenfassung";
}

function getDefaultIntro(type: FloxDocumentType) {
 if (type === "quote") {
  return "Vielen Dank für Ihre Anfrage. Auf Basis Ihrer Angaben und unserer Vorprüfung erhalten Sie hier den aktuellen Leistungsstand.";
 }
 if (type === "order_confirmation") {
  return "Hiermit bestätigen wir die vereinbarten Leistungen und den aktuellen Umsetzungsstand.";
 }
 if (type === "invoice") {
  return "Vielen Dank für Ihren Auftrag. Wir berechnen Ihnen die nachfolgend aufgeführten Leistungen.";
 }
 return "Zusammenfassung Ihrer Anfrage und der aktuellen Vorprüfung.";
}

function getDefaultConditions(type: FloxDocumentType) {
 if (type === "quote") return "Dieses Angebot dient der operativen Planung und ist freibleibend bis zur finalen Abstimmung.";
 if (type === "order_confirmation") return "Es gelten die vereinbarten Bedingungen und unsere AGB.";
 if (type === "invoice") return "Bitte geben Sie bei der Zahlung die Rechnungsnummer an.";
 return "Diese Zusammenfassung basiert auf den bisher übermittelten Angaben.";
}

function buildDefaultItems(current: BookingRecord) {
 const rangeMin = Number(current.details?.valuation?.systemPriceRangeMin) || 0;
 const description = `${current.service || "Service"} - ${current.details?.valuation?.valuationStage || "Vorprüfung"}`;

 return normalizeItems([
  {
   id: crypto.randomUUID(),
   description,
   quantity: 1,
   unit: "pauschal",
   unitPrice: rangeMin,
   unitPriceNet: rangeMin,
   discountPercent: 0,
   discountAmountNet: 0,
   taxRate: 19,
   total: rangeMin,
  },
 ]);
}

function buildDocumentTemplate(
 current: BookingRecord,
 documents: FloxDocument[],
 documentType: FloxDocumentType,
 fromDocumentId?: string
) {
 const explicitSource = fromDocumentId ? documents.find((doc) => doc.id === fromDocumentId) : undefined;
 const inheritedSource =
  explicitSource ||
  (documentType === "order_confirmation"
   ? findLatestDoc(documents, "quote")
   : documentType === "invoice"
    ? findLatestDoc(documents, "order_confirmation") || findLatestDoc(documents, "quote")
    : undefined);

 const items = inheritedSource ? cloneItems(inheritedSource.editableData.items) : buildDefaultItems(current);
 const totals = inheritedSource ? { ...inheritedSource.totals } : calculateTotals(items);
 const version = documents.filter((doc) => doc.type === documentType).length + 1;
 const now = new Date();
 const number = suggestDocumentNumber(documentType, documents, now);
 const dueDate = new Date(now);
 dueDate.setDate(now.getDate() + 14);

 return {
  id: crypto.randomUUID(),
  bookingId: current.id,
  leadId: current.id,
  type: documentType,
  number,
  status: "draft" as const,
  version,
  sourceFlow: "lead" as const,
  snapshot: {
   contact: current.details?.contact || {
    fullName: current.name,
    email: current.email,
    phone: current.phone,
    callbackPreference: "",
   },
   service: current.details?.service || {
    type: current.service,
    source: "dashboard",
   },
   valuation: current.details?.valuation || {
    systemPriceRangeMin: 0,
    systemPriceRangeMax: 0,
    priceRangeMin: 0,
    priceRangeMax: 0,
    valuationLabel: "Orientierungsrahmen",
    valuationStage: "Vorprüfung",
    accuracyState: "Vorprüfung",
    topDrivers: [],
   },
   configuration: current.details?.configuration || {},
   timestamp: now.toISOString(),
  },
  editableData: {
   title: getTypeLabel(documentType),
   documentNumber: number,
   customer: inheritedSource?.editableData?.customer || extractCustomerFromBooking(current),
   services: inheritedSource?.editableData?.services || extractServicesFromBooking(current),
   introText: inheritedSource?.editableData?.introText || getDefaultIntro(documentType),
   items,
   conditions: inheritedSource?.editableData?.conditions || getDefaultConditions(documentType),
   validUntil: documentType === "quote" ? dueDate.toISOString() : undefined,
   documentDate: now.toISOString(),
   serviceDate: current.details?.configuration?.desiredDate || current.details?.configuration?.date || "",
   performanceLocation:
    current.details?.configuration?.objectLocation ||
    current.details?.configuration?.cityOrZip ||
    current.details?.configuration?.location ||
    "",
   dueDate: documentType === "invoice" ? dueDate.toISOString() : undefined,
   paymentDueDate: documentType === "invoice" ? dueDate.toISOString() : undefined,
   paymentTerms:
    inheritedSource?.editableData?.paymentTerms ||
    (documentType === "invoice" ? "Banküberweisung innerhalb von 14 Tagen." : undefined),
  },
  totals,
  createdAt: now.toISOString(),
  updatedAt: now.toISOString(),
 };
}

function appendHistory(
 details: IntakePayload["admin"] | undefined,
 user: string,
 status: string,
 note: string
) {
 const history = details?.history || [];
 return [
  {
   status,
   note,
   timestamp: new Date().toISOString(),
   user,
  },
  ...history,
 ].slice(0, 30);
}

async function requireSession() {
 const session = await getServerSession(authOptions);
 if (!session) {
  return { session: null, response: NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 }) };
 }

 return { session, response: null };
}

function isValidBookingId(id: string) {
 return UUID_PATTERN.test(id);
}

function isMissingConversionEventsTable(error: { code?: string; message?: string; details?: string | null }) {
 const text = `${error.code || ""} ${error.message || ""} ${error.details || ""}`.toLowerCase();
 return (
  error.code === "42P01" ||
  error.code === "PGRST205" ||
  (text.includes("conversion_events") &&
   (text.includes("does not exist") ||
    text.includes("schema cache") ||
    text.includes("could not find") ||
    text.includes("not found")))
 );
}

async function detachConversionEventsFromBooking(bookingId: string) {
 try {
  const { error } = await getSupabaseAdmin()
   .from("conversion_events")
   .update({
    booking_id: null,
    converted_at: null,
   })
   .eq("booking_id", bookingId);

  if (error && !isMissingConversionEventsTable(error)) {
   console.warn("Conversion event unlink failed before booking delete:", error.message);
  }
 } catch (error) {
  console.warn("Conversion event unlink skipped before booking delete:", error);
 }
}

async function loadBooking(id: string) {
 const { data, error } = await getSupabaseAdmin().from("bookings").select("*").eq("id", id).single();
 if (error || !data) return null;
 return data as BookingRecord;
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
 const { response } = await requireSession();
 if (response) return response;

 const { id } = await params;
 const booking = await loadBooking(id);

 if (!booking) {
  return NextResponse.json({ error: "Booking not found" }, { status: 404 });
 }

 return NextResponse.json(enrichBookingFileUrls(booking));
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
 const { session, response } = await requireSession();
 if (response || !session) return response;

 try {
  const { id } = await params;
  const body = (await req.json()) as PatchPayload;
  const current = await loadBooking(id);

  if (!current) {
   return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const actingUser = session.user?.email || "system";
  const currentDetails = current.details || ({} as IntakePayload);
  const currentAdmin = currentDetails.admin || {};
  let targetBookingStatus = body.status || current.status;
  let updatedDocs = [...(currentAdmin.docs || [])];
  let adminHistory = currentAdmin.history || [];

  if (body.action === "create_doc" && body.documentType) {
   const newDoc = buildDocumentTemplate(current, updatedDocs, body.documentType, body.fromDocumentId);
   updatedDocs = [...updatedDocs, newDoc];
   adminHistory = appendHistory(currentAdmin, actingUser, targetBookingStatus, `${getTypeLabel(body.documentType)} erstellt`);
  }

  if (body.action === "update_doc" && body.documentId && body.updatedDoc) {
   const existingDoc = updatedDocs.find((doc) => doc.id === body.documentId);

   if (!existingDoc) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
   }

   const normalizedItems = cloneItems(body.updatedDoc.editableData.items);
   const normalizedDoc: FloxDocument = {
    ...body.updatedDoc,
    editableData: {
     ...body.updatedDoc.editableData,
     items: normalizedItems,
    },
    totals: calculateTotals(normalizedItems),
    updatedAt: new Date().toISOString(),
   };

   const isLocked = ["approved", "sent", "paid"].includes(existingDoc.status);
   const contentChanged =
    JSON.stringify(existingDoc.editableData) !== JSON.stringify(normalizedDoc.editableData) ||
    JSON.stringify(existingDoc.totals) !== JSON.stringify(normalizedDoc.totals);

   if (isLocked && contentChanged) {
    const nextVersion = updatedDocs.filter((doc) => doc.type === existingDoc.type).length + 1;
    const versionedDoc: FloxDocument = {
     ...normalizedDoc,
     id: crypto.randomUUID(),
     version: nextVersion,
     number: `${getTypePrefix(existingDoc.type)}-${id.slice(0, 8).toUpperCase()}-V${nextVersion}`,
     status: "draft",
     createdAt: new Date().toISOString(),
     updatedAt: new Date().toISOString(),
    };
    updatedDocs = [...updatedDocs, versionedDoc];
    adminHistory = appendHistory(currentAdmin, actingUser, targetBookingStatus, `${getTypeLabel(existingDoc.type)} als neue Version gespeichert`);
   } else {
    updatedDocs = updatedDocs.map((doc) => {
     if (doc.id !== body.documentId) return doc;

     const now = new Date().toISOString();
     return {
      ...normalizedDoc,
      approvedAt:
       normalizedDoc.status === "approved" && doc.status !== "approved"
        ? now
        : normalizedDoc.approvedAt,
      sentAt: normalizedDoc.status === "sent" && doc.status !== "sent" ? now : normalizedDoc.sentAt,
      updatedAt: now,
     };
    });

    if (normalizedDoc.status === "paid") {
     targetBookingStatus = "abgeschlossen";
    }

    adminHistory = appendHistory(currentAdmin, actingUser, targetBookingStatus, `${getTypeLabel(existingDoc.type)} aktualisiert`);
   }
  }

  if (body.action === "send_doc" && body.documentId) {
   const targetDoc = updatedDocs.find((doc) => doc.id === body.documentId);

   if (!targetDoc) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
   }

   if (targetDoc.status !== "approved" && targetDoc.status !== "sent") {
    return NextResponse.json({ error: "Dokument muss vor dem Versand freigegeben werden." }, { status: 400 });
   }

   const previewLink = `${company.url}/api/pdf/${id}?documentId=${targetDoc.id}`;
   const mailResult = await sendDocumentMail({
    to: current.email,
    customerName: current.name,
    documentNumber: targetDoc.number,
    documentType: getTypeLabel(targetDoc.type),
    subject: `${getTypeLabel(targetDoc.type)} von FLOXANT - ${targetDoc.number}`,
    previewLink,
   });

   if (!mailResult.success && !mailResult.dryRun) {
    return NextResponse.json({ error: mailResult.error || "Versand fehlgeschlagen" }, { status: 500 });
   }

   updatedDocs = updatedDocs.map((doc) =>
    doc.id === body.documentId
     ? {
       ...doc,
       status: "sent",
       sentAt: new Date().toISOString(),
       deliveryInfo: {
        method: "email",
        sentTo: current.email,
        status: mailResult.dryRun ? "pending" : "success",
       },
       updatedAt: new Date().toISOString(),
      }
     : doc
   );

   if (targetDoc.type === "quote") {
    targetBookingStatus = "angebot_versendet";
   }

   adminHistory = appendHistory(currentAdmin, actingUser, targetBookingStatus, `${getTypeLabel(targetDoc.type)} versendet`);
  }

  const stateChanges: string[] = [];

  if (body.status && body.status !== current.status) {
   stateChanges.push(`Status auf ${body.status} gesetzt`);
  }

  if (body.internalNotes !== undefined && body.internalNotes !== currentAdmin.internalNotes) {
   stateChanges.push(body.internalNotes ? "Interne Notiz aktualisiert" : "Interne Notiz entfernt");
  }

  if (body.nextAction !== undefined && body.nextAction !== currentAdmin.nextAction) {
   stateChanges.push(body.nextAction ? `Nächste Aktion gesetzt: ${body.nextAction}` : "Nächste Aktion entfernt");
  }

  const nextCostLines = body.operations?.costLines
   ? normalizeCostLines(body.operations.costLines)
   : currentAdmin.costLines || [];
  const nextLedgerEntries = body.operations?.ledgerEntries
   ? normalizeLedgerEntries(body.operations.ledgerEntries)
   : currentAdmin.ledgerEntries || [];
  const nextWorkOrder = body.operations?.workOrder ?? currentAdmin.workOrder;
  const nextCommercialDecision = body.operations?.commercialDecision ?? currentAdmin.commercialDecision;
  const nextProfitability = body.operations
   ? buildProfitability(nextCostLines, nextLedgerEntries)
   : currentAdmin.profitability;

  if (body.operations) {
   stateChanges.push(
    `Interne Kalkulation aktualisiert (${nextCostLines.length} Kostenpositionen / ${nextLedgerEntries.length} Finanzposten)`
   );
  }

  if (stateChanges.length > 0) {
   adminHistory = appendHistory(
    { ...currentAdmin, history: adminHistory },
    actingUser,
    targetBookingStatus,
    stateChanges.join(" / ")
   );
  }

  const updatedDetails: IntakePayload = {
   ...(currentDetails as IntakePayload),
   admin: {
    ...currentAdmin,
    internalNotes: body.internalNotes ?? currentAdmin.internalNotes,
    nextAction: body.nextAction ?? currentAdmin.nextAction,
    docs: updatedDocs,
    workOrder: nextWorkOrder,
    costLines: nextCostLines,
    ledgerEntries: nextLedgerEntries,
    commercialDecision: nextCommercialDecision,
    profitability: nextProfitability,
    history: adminHistory,
    updatedAt: new Date().toISOString(),
    updatedBy: actingUser,
   },
  };

  const { data, error } = await getSupabaseAdmin()
   .from("bookings")
   .update({
    status: targetBookingStatus,
    details: updatedDetails,
   })
   .eq("id", id)
   .select()
   .single();

  if (error || !data) {
   return NextResponse.json({ error: "Update failed", details: error?.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
 } catch (error: any) {
  return NextResponse.json({ error: "Internal Server Error", details: error?.message }, { status: 500 });
 }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
 const { response } = await requireSession();
 if (response) return response;

 try {
  const { id } = await params;

  if (!isValidBookingId(id)) {
   return NextResponse.json({ ok: false, error: "Ungültige Anfrage-ID." }, { status: 400 });
  }

  const booking = await loadBooking(id);

  if (!booking) {
   return NextResponse.json({ ok: false, error: "Anfrage nicht gefunden." }, { status: 404 });
  }

  await detachConversionEventsFromBooking(id);

  const { error } = await getSupabaseAdmin().from("bookings").delete().eq("id", id);

  if (error) {
   console.warn("Booking delete failed:", error.message);
   return NextResponse.json({ ok: false, error: "Anfrage konnte nicht gelöscht werden." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id });
 } catch (error) {
  console.warn("Booking delete rejected:", error);
  return NextResponse.json({ ok: false, error: "Anfrage konnte nicht gelöscht werden." }, { status: 500 });
 }
}
