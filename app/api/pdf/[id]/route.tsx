export const runtime = "nodejs";

import React from "react";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Document, Page, StyleSheet, Text, View, renderToStream } from "@react-pdf/renderer";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { FloxDocument, FloxDocumentType } from "@/lib/types/intake";

const BUSINESS = {
 name: "FLOXANT - Saleh Obid",
 street: "Johanna-Kinkel-Strasse 1 + 2",
 zip: "93049",
 city: "Regensburg",
 country: "Deutschland",
 phone: "+49 1577 1105087",
 email: "info@floxant.de",
 taxNumber: "103/5163/5231",
 vatId: "DE 45971484",
 bank: "Sparkasse Neuss",
 iban: "DE87 3055 0000 0093 7290 93",
};

const styles = StyleSheet.create({
 page: {
  paddingTop: 44,
  paddingBottom: 88,
  paddingHorizontal: 40,
  fontFamily: "Helvetica",
  fontSize: 10,
  color: "#111827",
  lineHeight: 1.4,
 },
 header: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 28,
  alignItems: "flex-start",
 },
 brandTitle: {
  fontSize: 23,
  fontWeight: "bold",
  letterSpacing: 1.2,
 },
 brandSubtitle: {
  marginTop: 4,
  fontSize: 8,
  color: "#6b7280",
 },
 senderInfo: {
  width: "45%",
  textAlign: "right",
  fontSize: 8,
  color: "#4b5563",
  lineHeight: 1.55,
 },
 recipientWrap: {
  marginBottom: 26,
 },
 recipientLine: {
  fontSize: 7,
  color: "#9ca3af",
  borderBottomWidth: 0.5,
  borderBottomColor: "#d1d5db",
  paddingBottom: 3,
  marginBottom: 8,
 },
 recipientName: {
  fontWeight: "bold",
  fontSize: 11,
 },
 recipientText: {
  marginTop: 2,
 },
 titleRow: {
  borderBottomWidth: 1.5,
  borderBottomColor: "#111827",
  paddingBottom: 10,
  marginBottom: 14,
 },
 docTitle: {
  fontSize: 16,
  fontWeight: "bold",
  letterSpacing: 0.5,
 },
 metaGrid: {
  flexDirection: "row",
  gap: 18,
  marginTop: 10,
 },
 metaItem: {
  minWidth: 96,
 },
 metaLabel: {
  fontSize: 7,
  fontWeight: "bold",
  color: "#6b7280",
  textTransform: "uppercase",
  letterSpacing: 0.5,
 },
 metaValue: {
  marginTop: 2,
  fontSize: 9,
  color: "#111827",
 },
 intro: {
  marginBottom: 16,
  fontSize: 10,
  lineHeight: 1.6,
 },
 tableHeader: {
  flexDirection: "row",
  borderBottomWidth: 1,
  borderBottomColor: "#111827",
  paddingBottom: 6,
  marginBottom: 2,
 },
 tableRow: {
  flexDirection: "row",
  borderBottomWidth: 0.5,
  borderBottomColor: "#e5e7eb",
  paddingVertical: 7,
  minHeight: 26,
 },
 colPos: { width: "8%", fontSize: 8.5 },
 colDesc: { width: "42%", fontSize: 8.8, paddingRight: 8 },
 colQty: { width: "12%", fontSize: 8.5, textAlign: "right" },
 colUnit: { width: "18%", fontSize: 8.5, textAlign: "right" },
 colTotal: { width: "20%", fontSize: 8.8, textAlign: "right", fontWeight: "bold" },
 totalsWrap: {
  marginTop: 16,
  alignItems: "flex-end",
 },
 totalsBox: {
  width: "48%",
 },
 totalRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: 3,
 },
 totalLabel: {
  fontSize: 9,
  color: "#4b5563",
 },
 totalValue: {
  fontSize: 9,
 },
 grandRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 5,
  paddingTop: 7,
  borderTopWidth: 1.5,
  borderTopColor: "#111827",
 },
 grandLabel: {
  fontSize: 11,
  fontWeight: "bold",
 },
 grandValue: {
  fontSize: 11,
  fontWeight: "bold",
 },
 section: {
  marginBottom: 16,
  padding: 12,
  backgroundColor: "#f9fafb",
  borderRadius: 4,
 },
 sectionTitle: {
  fontSize: 8,
  fontWeight: "bold",
  color: "#4b5563",
  marginBottom: 8,
  paddingBottom: 4,
  borderBottomWidth: 0.5,
  borderBottomColor: "#d1d5db",
  textTransform: "uppercase",
 },
 grid: {
  flexDirection: "row",
  flexWrap: "wrap",
 },
 gridItem: {
  width: "50%",
  marginBottom: 6,
  paddingRight: 10,
 },
 gridLabel: {
  fontSize: 7,
  color: "#9ca3af",
 },
 gridValue: {
  marginTop: 1,
  fontSize: 9,
 },
 tagWrap: {
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 8,
  gap: 5,
 },
 tag: {
  paddingVertical: 3,
  paddingHorizontal: 7,
  borderRadius: 999,
  backgroundColor: "#eef2ff",
  color: "#1d4ed8",
  fontSize: 8,
 },
 signatureRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 28,
  gap: 20,
 },
 signatureBlock: {
  width: "46%",
  paddingTop: 20,
  borderTopWidth: 0.7,
  borderTopColor: "#9ca3af",
  fontSize: 8,
  color: "#6b7280",
 },
 legalNote: {
  marginTop: 26,
  fontSize: 8,
  color: "#4b5563",
  lineHeight: 1.55,
 },
 footer: {
  position: "absolute",
  bottom: 30,
  left: 40,
  right: 40,
  borderTopWidth: 0.5,
  borderTopColor: "#d1d5db",
  paddingTop: 10,
  fontSize: 7,
  color: "#4b5563",
  flexDirection: "row",
  justifyContent: "space-between",
  lineHeight: 1.55,
 },
 footerCol: {
  width: "31%",
 },
 footerColRight: {
  width: "34%",
  textAlign: "right",
 },
 footerHeadline: {
  fontWeight: "bold",
  marginBottom: 2,
 },
 pageNumber: {
  position: "absolute",
  bottom: 15,
  right: 40,
  fontSize: 7,
  color: "#9ca3af",
 },
});

type AdHocPdfRequest = {
 docType?: string;
 items?: Array<{
  id?: string;
  description?: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  taxRate?: number;
 }>;
 clientInfo?: {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
 };
 leistungsdatum?: string;
 introText?: string;
 conditions?: string;
 paymentTerms?: string;
 dueDate?: string;
 documentDate?: string;
};

function formatMoney(value: number) {
 return `${new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
 }).format(value)} EUR`;
}

function formatDate(value?: string) {
 if (!value) return "";
 const parsed = new Date(value);
 if (Number.isNaN(parsed.getTime())) return value;
 return parsed.toLocaleDateString("de-DE");
}

function toDocTitle(type: FloxDocumentType) {
 if (type === "invoice") return "RECHNUNG";
 if (type === "order_confirmation") return "AUFTRAGSBESTÄTIGUNG";
 if (type === "quote") return "ANGEBOT";
 return "ANFRAGE-ZUSAMMENFASSUNG";
}

function normalizeDocType(input?: string): FloxDocumentType {
 if (!input) return "quote";
 if (input === "angebot" || input === "quote") return "quote";
 if (input === "auftragsbestaetigung" || input === "order_confirmation") return "order_confirmation";
 if (input === "rechnung" || input === "invoice") return "invoice";
 return "inquiry_summary";
}

function cloneLineItems(items: FloxDocument["editableData"]["items"] = []) {
 return items.map((item) => ({
  ...item,
  quantity: Number(item.quantity) || 0,
  unitPrice: Number(item.unitPrice) || 0,
  taxRate: Number(item.taxRate) || 19,
  total: Number(item.total) || Number(item.quantity || 0) * Number(item.unitPrice || 0),
 }));
}

function calculateTotals(items: FloxDocument["editableData"]["items"]) {
 const net = items.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.unitPrice || 0), 0);
 const tax = items.reduce(
  (sum, item) => sum + Number(item.quantity || 0) * Number(item.unitPrice || 0) * ((Number(item.taxRate || 0) || 0) / 100),
  0
 );

 return {
  net,
  tax,
  gross: net + tax,
  currency: "EUR",
 };
}

function buildFallbackDocument(bookingId: string, booking: any, body: AdHocPdfRequest): FloxDocument {
 const type = normalizeDocType(body.docType);
 const snapshot = booking?.details || {};
 const items = (body.items || [])
  .filter((item) => (item.description || "").trim().length > 0)
  .map((item, index) => {
   const quantity = Number(item.quantity) || 1;
   const unitPrice = Number(item.unitPrice) || 0;

   return {
    id: item.id || `row-${index + 1}`,
    description: item.description?.trim() || "Leistung",
    quantity,
    unit: item.unit?.trim() || "Pauschale",
    unitPrice,
    taxRate: Number(item.taxRate) || 19,
    total: quantity * unitPrice,
   };
  });

 const totals = calculateTotals(items);
 const documentDate = body.documentDate || new Date().toISOString();
 const dueDate = body.dueDate || body.leistungsdatum;
 const prefix = type === "invoice" ? "RE" : type === "order_confirmation" ? "AB" : type === "quote" ? "AG" : "ANF";

 return {
  id: crypto.randomUUID(),
  bookingId,
  type,
  number: `${prefix}-${bookingId.slice(0, 8).toUpperCase()}-LIVE`,
  status: "draft",
  version: 1,
  snapshot: {
   contact: {
    fullName: body.clientInfo?.name || booking?.name || "Interessent",
    email: body.clientInfo?.email || booking?.email || "",
    phone: body.clientInfo?.phone || booking?.phone || "",
    callbackPreference: "",
    notes: body.clientInfo?.address || "",
   },
   service: snapshot.service || {
    type: booking?.service || "service",
    source: "dashboard_document_page",
   },
   valuation: snapshot.valuation || {
    systemPriceRangeMin: 0,
    systemPriceRangeMax: 0,
    priceRangeMin: 0,
    priceRangeMax: 0,
    valuationLabel: "Orientierungsrahmen",
    valuationStage: "Vorprüfung",
    accuracyState: "Vorprüfung",
    topDrivers: [],
   },
   configuration: snapshot.configuration || {},
   timestamp: new Date().toISOString(),
  },
  editableData: {
   title: toDocTitle(type),
   introText:
    body.introText ||
    (type === "invoice"
     ? "Wir berechnen Ihnen die folgenden Leistungen."
     : type === "order_confirmation"
      ? "Hiermit bestaetigen wir die vereinbarten Leistungen."
      : type === "quote"
       ? "Vielen Dank für Ihre Anfrage. Nach Ihrer Vorprüfung erhalten Sie hier den aktuellen Leistungsstand."
       : "Zusammenfassung Ihrer Anfrage und Vorprüfung."),
   items,
   conditions:
    body.conditions ||
    (type === "invoice"
     ? "Zahlbar gemaess Zahlungsbedingungen."
     : type === "order_confirmation"
      ? "Es gelten unsere vereinbarten Bedingungen und AGB."
      : "Dieses Dokument dient Ihrer weiteren Planung."),
   documentDate,
   dueDate,
   paymentTerms: body.paymentTerms || "",
  },
  totals,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
 };
}

function SnapshotPdfDocument({ doc }: { doc: FloxDocument }) {
 const { snapshot, editableData, totals, type, number } = doc;
 const lineItemMode = type === "quote" || type === "order_confirmation" || type === "invoice";
 const topDrivers = snapshot.valuation?.topDrivers || [];

 return (
  <Document>
   <Page size="A4" style={styles.page} wrap>
    <View style={styles.header} fixed>
     <View>
      <Text style={styles.brandTitle}>FLOXANT</Text>
      <Text style={styles.brandSubtitle}>Premium Umzug · Reinigung · Entrümpelung</Text>
     </View>

     <View style={styles.senderInfo}>
      <Text style={styles.footerHeadline}>{BUSINESS.name}</Text>
      <Text>{BUSINESS.street}</Text>
      <Text>
       {BUSINESS.zip} {BUSINESS.city}
      </Text>
      <Text style={{ marginTop: 3 }}>Tel: {BUSINESS.phone}</Text>
      <Text>E-Mail: {BUSINESS.email}</Text>
     </View>
    </View>

    <View style={styles.recipientWrap}>
     <Text style={styles.recipientLine}>
      {BUSINESS.name} · {BUSINESS.street} · {BUSINESS.zip} {BUSINESS.city}
     </Text>
     <Text style={styles.recipientName}>{snapshot.contact.fullName}</Text>
     {snapshot.contact.email ? <Text style={styles.recipientText}>{snapshot.contact.email}</Text> : null}
     {snapshot.contact.phone ? <Text style={styles.recipientText}>{snapshot.contact.phone}</Text> : null}
     {snapshot.contact.notes ? <Text style={styles.recipientText}>{snapshot.contact.notes}</Text> : null}
    </View>

    <View style={styles.titleRow}>
     <Text style={styles.docTitle}>{editableData.title || toDocTitle(type)}</Text>
     <View style={styles.metaGrid}>
      <View style={styles.metaItem}>
       <Text style={styles.metaLabel}>Nummer</Text>
       <Text style={styles.metaValue}>{number}</Text>
      </View>
      <View style={styles.metaItem}>
       <Text style={styles.metaLabel}>Dokumentdatum</Text>
       <Text style={styles.metaValue}>{formatDate(editableData.documentDate || doc.createdAt)}</Text>
      </View>
      {type === "invoice" && editableData.dueDate ? (
       <View style={styles.metaItem}>
        <Text style={styles.metaLabel}>Fälligkeit</Text>
        <Text style={styles.metaValue}>{formatDate(editableData.dueDate)}</Text>
       </View>
      ) : null}
     </View>
    </View>

    {editableData.introText ? <Text style={styles.intro}>{editableData.introText}</Text> : null}

    {lineItemMode ? (
     <View>
      <View style={styles.tableHeader}>
       <Text style={styles.colPos}>Pos.</Text>
       <Text style={styles.colDesc}>Leistung</Text>
       <Text style={styles.colQty}>Menge</Text>
       <Text style={styles.colUnit}>Einzelpreis</Text>
       <Text style={styles.colTotal}>Gesamt</Text>
      </View>

      {cloneLineItems(editableData.items).map((item, index) => (
       <View key={item.id} style={styles.tableRow} wrap={false}>
        <Text style={styles.colPos}>{index + 1}</Text>
        <Text style={styles.colDesc}>{item.description}</Text>
        <Text style={styles.colQty}>
         {item.quantity} {item.unit}
        </Text>
        <Text style={styles.colUnit}>{formatMoney(item.unitPrice)}</Text>
        <Text style={styles.colTotal}>{formatMoney(item.quantity * item.unitPrice)}</Text>
       </View>
      ))}

      <View style={styles.totalsWrap} wrap={false}>
       <View style={styles.totalsBox}>
        <View style={styles.totalRow}>
         <Text style={styles.totalLabel}>Summe netto</Text>
         <Text style={styles.totalValue}>{formatMoney(totals.net)}</Text>
        </View>
        <View style={styles.totalRow}>
         <Text style={styles.totalLabel}>Umsatzsteuer</Text>
         <Text style={styles.totalValue}>{formatMoney(totals.tax)}</Text>
        </View>
        <View style={styles.grandRow}>
         <Text style={styles.grandLabel}>Gesamtbetrag brutto</Text>
         <Text style={styles.grandValue}>{formatMoney(totals.gross)}</Text>
        </View>
       </View>
      </View>

      {type === "order_confirmation" ? (
       <View style={styles.signatureRow} wrap={false}>
        <View style={styles.signatureBlock}>
         <Text>Ort, Datum</Text>
        </View>
        <View style={styles.signatureBlock}>
         <Text>Unterschrift Auftraggeber</Text>
        </View>
       </View>
      ) : null}
     </View>
    ) : (
     <View>
      <View style={styles.section}>
       <Text style={styles.sectionTitle}>Anfrage und Service</Text>
       <View style={styles.grid}>
        <View style={styles.gridItem}>
         <Text style={styles.gridLabel}>Service</Text>
         <Text style={styles.gridValue}>{String(snapshot.service?.type || "-")}</Text>
        </View>
        <View style={styles.gridItem}>
         <Text style={styles.gridLabel}>Quelle</Text>
         <Text style={styles.gridValue}>{String(snapshot.service?.source || "-")}</Text>
        </View>
       </View>
      </View>

      <View style={styles.section}>
       <Text style={styles.sectionTitle}>Preisrahmen und Kundenwunsch</Text>
       <View style={styles.grid}>
        <View style={styles.gridItem}>
         <Text style={styles.gridLabel}>System-Orientierungsrahmen</Text>
         <Text style={styles.gridValue}>
          {snapshot.valuation?.systemPriceRangeMin || 0} EUR - {snapshot.valuation?.systemPriceRangeMax || 0} EUR
         </Text>
        </View>
        <View style={styles.gridItem}>
         <Text style={styles.gridLabel}>Vorprüfungsstufe</Text>
         <Text style={styles.gridValue}>{snapshot.valuation?.valuationStage || "-"}</Text>
        </View>
        <View style={styles.gridItem}>
         <Text style={styles.gridLabel}>Preisvorstellung</Text>
         <Text style={styles.gridValue}>
          {snapshot.valuation?.customerBudget ? `${snapshot.valuation.customerBudget} EUR` : "Nicht angegeben"}
         </Text>
        </View>
       </View>
       {topDrivers.length > 0 ? (
        <View style={styles.tagWrap}>
         {topDrivers.map((driver) => (
          <Text key={driver} style={styles.tag}>
           {driver}
          </Text>
         ))}
        </View>
       ) : null}
      </View>

      <View style={styles.section}>
       <Text style={styles.sectionTitle}>Konfiguration</Text>
       <View style={styles.grid}>
        {Object.entries(snapshot.configuration || {}).map(([key, value]) => {
         if (value === null || value === undefined) return null;
         if (typeof value === "object") return null;
         if (key === "note") return null;

         return (
          <View key={key} style={styles.gridItem}>
           <Text style={styles.gridLabel}>{key.replace(/([A-Z])/g, " $1")}</Text>
           <Text style={styles.gridValue}>{String(value)}</Text>
          </View>
         );
        })}
       </View>
       {snapshot.configuration?.note ? (
        <View style={{ marginTop: 8 }}>
         <Text style={styles.gridLabel}>Bemerkung</Text>
         <Text style={styles.gridValue}>{snapshot.configuration.note}</Text>
        </View>
       ) : null}
      </View>
     </View>
    )}

    <View style={styles.legalNote} wrap={false}>
     <Text>
      {editableData.conditions ||
       (type === "invoice"
        ? "Bitte geben Sie bei der Zahlung die Rechnungsnummer an."
        : type === "order_confirmation"
         ? "Es gelten die vereinbarten Bedingungen und AGB."
         : type === "quote"
          ? "Dieses Angebot dient der weiteren operativen Planung."
          : "Diese Zusammenfassung basiert auf den bisher vorliegenden Angaben.")}
     </Text>
     {editableData.paymentTerms ? <Text style={{ marginTop: 5 }}>Zahlung: {editableData.paymentTerms}</Text> : null}
    </View>

    <View style={styles.footer} fixed>
     <View style={styles.footerCol}>
      <Text style={styles.footerHeadline}>{BUSINESS.name}</Text>
      <Text>{BUSINESS.street}</Text>
      <Text>
       {BUSINESS.zip} {BUSINESS.city}
      </Text>
      <Text>E-Mail: {BUSINESS.email}</Text>
     </View>

     <View style={styles.footerCol}>
      <Text style={styles.footerHeadline}>Bankverbindung</Text>
      <Text>{BUSINESS.bank}</Text>
      <Text>IBAN: {BUSINESS.iban}</Text>
     </View>

     <View style={styles.footerColRight}>
      <Text style={styles.footerHeadline}>Steuerliche Angaben</Text>
      <Text>St.-Nr.: {BUSINESS.taxNumber}</Text>
      <Text>USt-IdNr.: {BUSINESS.vatId}</Text>
     </View>
    </View>

    <Text
     style={styles.pageNumber}
     render={({ pageNumber, totalPages }) => `Seite ${pageNumber} von ${totalPages}`}
     fixed
    />
   </Page>
  </Document>
 );
}

async function requireSession() {
 const session = await getServerSession(authOptions);
 if (!session) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 }
 return null;
}

async function loadBooking(id: string) {
 const { data, error } = await supabase.from("bookings").select("*").eq("id", id).single();
 if (error || !data) {
  return null;
 }
 return data;
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
 const authError = await requireSession();
 if (authError) return authError;

 const { id } = await params;
 const { searchParams } = new URL(req.url);
 const documentId = searchParams.get("documentId");

 if (!documentId) {
  return NextResponse.json({ error: "documentId is required" }, { status: 400 });
 }

 const booking = await loadBooking(id);
 if (!booking) {
  return NextResponse.json({ error: "Booking not found" }, { status: 404 });
 }

 const docs = booking.details?.admin?.docs || [];
 const targetDoc = docs.find((doc: FloxDocument) => doc.id === documentId);

 if (!targetDoc) {
  return NextResponse.json({ error: "Document version not found" }, { status: 404 });
 }

 const stream = await renderToStream(<SnapshotPdfDocument doc={targetDoc} />);

 return new NextResponse(stream as unknown as BodyInit, {
  headers: {
   "Content-Type": "application/pdf",
   "Content-Disposition": `inline; filename=${targetDoc.number}.pdf`,
  },
 });
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
 const authError = await requireSession();
 if (authError) return authError;

 const { id } = await params;
 const booking = await loadBooking(id);

 if (!booking) {
  return NextResponse.json({ error: "Booking not found" }, { status: 404 });
 }

 const body = (await req.json()) as AdHocPdfRequest;
 const draftDoc = buildFallbackDocument(id, booking, body);
 const stream = await renderToStream(<SnapshotPdfDocument doc={draftDoc} />);

 return new NextResponse(stream as unknown as BodyInit, {
  headers: {
   "Content-Type": "application/pdf",
   "Content-Disposition": `inline; filename=${draftDoc.number}.pdf`,
  },
 });
}
