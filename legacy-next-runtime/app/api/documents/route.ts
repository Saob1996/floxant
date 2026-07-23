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
import type {
 DocumentCustomerSnapshot,
 DocumentLineItem,
 DocumentServiceBlock,
 FloxDocument,
 FloxDocumentType,
 IntakePayload,
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
 file_urls?: string[];
};

type CreateDocumentBody = {
 documentType?: FloxDocumentType;
 sourceBookingId?: string;
 customer?: Partial<DocumentCustomerSnapshot>;
 services?: DocumentServiceBlock[];
 items?: DocumentLineItem[];
};

async function requireSession() {
 const session = await getServerSession(authOptions);
 if (!session) {
  return { session: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
 }
 return { session, response: null };
}

async function loadBookings() {
 const { data, error } = await getSupabaseAdmin().from("bookings").select("*").order("timestamp", { ascending: false });
 if (error) throw error;
 return (data || []) as BookingRecord[];
}

function getDocs(booking: BookingRecord) {
 return (booking.details?.admin?.docs || []).map(normalizeDocument);
}

function flattenDocuments(bookings: BookingRecord[]) {
 return bookings.flatMap((booking) =>
  getDocs(booking).map((document) => ({
   bookingId: booking.id,
   bookingService: booking.service,
   bookingStatus: booking.status,
   bookingTimestamp: booking.timestamp,
   bookingName: booking.name,
   bookingEmail: booking.email,
   bookingPhone: booking.phone,
   document,
  })),
 );
}

function buildManualDetails(document?: FloxDocument): IntakePayload {
 const customer = document?.editableData.customer;
 const now = new Date().toISOString();

 return {
  contact: {
   fullName: customer?.companyName || customer?.name || "Kunde",
   email: customer?.email || "",
   phone: customer?.phone || "",
   callbackPreference: "dashboard",
   notes: "Manuell erstellter Dokumentencontainer im FLOXANT Dashboard.",
  },
  service: {
   type: "manual_document",
   source: "dashboard_manual_document",
   entryPoint: "/dashboard/documents",
  },
  valuation: {
   systemPriceRangeMin: 0,
   systemPriceRangeMax: 0,
   priceRangeMin: 0,
   priceRangeMax: 0,
   valuationLabel: "Manuelles Dokument",
   valuationStage: "Manuelle Dokumenterstellung",
   accuracyState: "Bearbeitbare Dokumentdaten",
   topDrivers: [],
  },
  configuration: {
   requestContext: "manual_document",
   documentSystem: "floxant_document_system",
  },
  admin: {
   docs: document ? [document] : [],
   history: [
    {
     status: "document_created",
     note: document ? `${getDocumentTypeLabel(document.type)} manuell erstellt` : "Dokumentencontainer erstellt",
     timestamp: now,
     user: "dashboard",
    },
   ],
   updatedAt: now,
   updatedBy: "dashboard",
  },
  metadata: {
   createdAt: now,
   intakeVersion: "document-system-1.0",
   source: "dashboard_manual_document",
  },
 };
}

export async function GET() {
 const { response } = await requireSession();
 if (response) return response;

 try {
  const bookings = await loadBookings();
  return NextResponse.json({
   documents: flattenDocuments(bookings),
   bookings: bookings.map((booking) => ({
    id: booking.id,
    service: booking.service,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    status: booking.status,
    timestamp: booking.timestamp,
    details: booking.details,
    documentCount: getDocs(booking).length,
   })),
  });
 } catch (error: any) {
  return NextResponse.json({ error: "Dokumente konnten nicht geladen werden.", details: error?.message }, { status: 500 });
 }
}

export async function POST(req: Request) {
 const { session, response } = await requireSession();
 if (response || !session) return response;

 try {
  const body = (await req.json()) as CreateDocumentBody;
  const documentType = body.documentType || "quote";
  const bookings = await loadBookings();
  const allDocuments = flattenDocuments(bookings).map((entry) => entry.document);
  const sourceBooking = body.sourceBookingId ? bookings.find((booking) => booking.id === body.sourceBookingId) : undefined;

  if (body.sourceBookingId && !sourceBooking) {
   return NextResponse.json({ error: "Ausgewählter Vorgang wurde nicht gefunden." }, { status: 404 });
  }

  const document = normalizeDocument(
   buildDocumentFromInput({
    type: documentType,
    allDocuments,
    customer: body.customer,
    services: body.services,
    items: body.items,
    sourceBooking,
    sourceFlow: sourceBooking ? "lead" : "manual",
   }),
  );

  if (sourceBooking) {
   const currentAdmin = sourceBooking.details?.admin || {};
   const updatedDocument = { ...document, bookingId: sourceBooking.id, leadId: sourceBooking.id };
   const updatedDetails: IntakePayload = {
    ...(sourceBooking.details as IntakePayload),
    admin: {
     ...currentAdmin,
     docs: [...(currentAdmin.docs || []), updatedDocument],
     history: [
      {
       status: sourceBooking.status || "new",
       note: `${getDocumentTypeLabel(documentType)} aus Vorgang erstellt`,
       timestamp: new Date().toISOString(),
       user: session.user?.email || "dashboard",
      },
      ...(currentAdmin.history || []),
     ].slice(0, 40),
     updatedAt: new Date().toISOString(),
     updatedBy: session.user?.email || "dashboard",
    },
   };

   const { data, error } = await getSupabaseAdmin()
    .from("bookings")
    .update({ details: updatedDetails })
    .eq("id", sourceBooking.id)
    .select()
    .single();

   if (error || !data) {
    return NextResponse.json({ error: "Dokument konnte nicht am Vorgang gespeichert werden.", details: error?.message }, { status: 500 });
   }

   return NextResponse.json({ success: true, bookingId: sourceBooking.id, document: updatedDocument, booking: data });
  }

  const customer = document.editableData.customer;
  const createdAt = new Date().toISOString();
  const insertPayload = {
   name: customer?.companyName || customer?.name || "Kunde",
   email: customer?.email || "",
   phone: customer?.phone || "",
   service: "manual_document",
   timestamp: createdAt,
   status: "document_draft",
   upgrades: [],
   file_urls: [],
   details: buildManualDetails(),
  };

  const { data: inserted, error: insertError } = await getSupabaseAdmin()
   .from("bookings")
   .insert([insertPayload])
   .select()
   .single();

  if (insertError || !inserted) {
   return NextResponse.json({ error: "Manuelles Dokument konnte nicht angelegt werden.", details: insertError?.message }, { status: 500 });
  }

  const storedDocument = normalizeDocument({
   ...document,
   bookingId: inserted.id,
   leadId: undefined,
  });
  const updatedDetails = buildManualDetails(storedDocument);

  const { data: updated, error: updateError } = await getSupabaseAdmin()
   .from("bookings")
   .update({ details: updatedDetails })
   .eq("id", inserted.id)
   .select()
   .single();

  if (updateError || !updated) {
   return NextResponse.json({ error: "Dokument wurde angelegt, aber nicht final gespeichert.", details: updateError?.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, bookingId: inserted.id, document: storedDocument, booking: updated });
 } catch (error: any) {
  return NextResponse.json({ error: "Dokument konnte nicht erstellt werden.", details: error?.message }, { status: 500 });
 }
}
