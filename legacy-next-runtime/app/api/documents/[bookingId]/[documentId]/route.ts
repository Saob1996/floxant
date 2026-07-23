export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
 buildDocumentFromInput,
 getDocumentTypeLabel,
 normalizeDocument,
} from "@/lib/documents/document-core";
import type { FloxDocument, FloxDocumentStatus, FloxDocumentType, IntakePayload } from "@/lib/types/intake";

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

type PatchBody = {
 action?: "update" | "duplicate" | "derive" | "status";
 document?: FloxDocument;
 targetType?: FloxDocumentType;
 status?: FloxDocumentStatus;
};

async function requireSession() {
 const session = await getServerSession(authOptions);
 if (!session) {
  return { session: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
 }
 return { session, response: null };
}

async function loadBooking(id: string) {
 const { data, error } = await getSupabaseAdmin().from("bookings").select("*").eq("id", id).single();
 if (error || !data) return null;
 return data as BookingRecord;
}

async function loadAllDocuments() {
 const { data } = await getSupabaseAdmin().from("bookings").select("details");
 return ((data || []) as Array<{ details?: IntakePayload }>).flatMap((entry) => entry.details?.admin?.docs || []);
}

function appendHistory(details: IntakePayload | undefined, user: string, note: string, status: string) {
 const history = details?.admin?.history || [];
 return [
  {
   status,
   note,
   timestamp: new Date().toISOString(),
   user,
  },
  ...history,
 ].slice(0, 40);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ bookingId: string; documentId: string }> }) {
 const { session, response } = await requireSession();
 if (response || !session) return response;

 try {
  const { bookingId, documentId } = await params;
  const body = (await req.json()) as PatchBody;
  const booking = await loadBooking(bookingId);

  if (!booking) {
   return NextResponse.json({ error: "Dokumentencontainer wurde nicht gefunden." }, { status: 404 });
  }

  const currentDetails = booking.details || ({} as IntakePayload);
  const currentAdmin = currentDetails.admin || {};
  const docs = [...(currentAdmin.docs || [])].map(normalizeDocument);
  const sourceDocument = docs.find((doc) => doc.id === documentId);

  if (!sourceDocument) {
   return NextResponse.json({ error: "Dokument wurde nicht gefunden." }, { status: 404 });
  }

  let updatedDocs = docs;
  let note = "Dokument aktualisiert";

  if (!body.action || body.action === "update") {
   if (!body.document) {
    return NextResponse.json({ error: "Aktualisierte Dokumentdaten fehlen." }, { status: 400 });
   }
   const normalized = normalizeDocument({
    ...body.document,
    bookingId,
    leadId: body.document.leadId || (booking.service === "manual_document" ? undefined : bookingId),
   });
   updatedDocs = docs.map((doc) => (doc.id === documentId ? normalized : doc));
   note = `${getDocumentTypeLabel(normalized.type)} aktualisiert`;
  }

  if (body.action === "status") {
   const normalized = normalizeDocument({
    ...sourceDocument,
    status: body.status || sourceDocument.status,
   });
   updatedDocs = docs.map((doc) => (doc.id === documentId ? normalized : doc));
   note = `${getDocumentTypeLabel(normalized.type)} Status geändert`;
  }

  if (body.action === "duplicate") {
   const allDocuments = await loadAllDocuments();
   const duplicated = normalizeDocument(
    buildDocumentFromInput({
     type: sourceDocument.type,
     allDocuments,
     sourceBooking: booking,
     sourceDocument,
     sourceFlow: "manual",
    }),
   );
   const nextVersion = docs.filter((doc) => doc.type === duplicated.type).length + 1;
   updatedDocs = [
    ...docs,
    {
     ...duplicated,
     bookingId,
     leadId: sourceDocument.leadId,
     version: nextVersion,
     status: "draft",
    },
   ];
   note = `${getDocumentTypeLabel(sourceDocument.type)} dupliziert`;
  }

  if (body.action === "derive") {
   const targetType = body.targetType || (sourceDocument.type === "quote" ? "order_confirmation" : "invoice");
   const allDocuments = await loadAllDocuments();
   const derived = normalizeDocument(
    buildDocumentFromInput({
     type: targetType,
     allDocuments,
     sourceBooking: booking,
     sourceDocument,
     sourceFlow: "derived",
    }),
   );
   const nextVersion = docs.filter((doc) => doc.type === derived.type).length + 1;
   updatedDocs = [
    ...docs,
    {
     ...derived,
     bookingId,
     leadId: sourceDocument.leadId || (booking.service === "manual_document" ? undefined : bookingId),
     sourceDocumentId: sourceDocument.id,
     relatedDocumentId: sourceDocument.id,
     version: nextVersion,
     status: "draft",
    },
   ];
   note = `${getDocumentTypeLabel(targetType)} aus ${getDocumentTypeLabel(sourceDocument.type)} erstellt`;
  }

  const updatedDetails: IntakePayload = {
   ...(currentDetails as IntakePayload),
   admin: {
    ...currentAdmin,
    docs: updatedDocs,
    history: appendHistory(currentDetails as IntakePayload, session.user?.email || "dashboard", note, booking.status),
    updatedAt: new Date().toISOString(),
    updatedBy: session.user?.email || "dashboard",
   },
  };

  const { data, error } = await getSupabaseAdmin()
   .from("bookings")
   .update({
    status: booking.service === "manual_document" ? "document_draft" : booking.status,
    details: updatedDetails,
   })
   .eq("id", bookingId)
   .select()
   .single();

  if (error || !data) {
   return NextResponse.json({ error: "Dokument konnte nicht gespeichert werden.", details: error?.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, booking: data, documents: updatedDocs });
 } catch (error: any) {
  return NextResponse.json({ error: "Dokumentenaktion fehlgeschlagen.", details: error?.message }, { status: 500 });
 }
}
