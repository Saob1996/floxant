export const runtime = "nodejs";

import React from "react";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Document, Page, StyleSheet, Text, View, renderToStream } from "@react-pdf/renderer";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import {
 floxantDocumentSettings,
 formatDateDE,
 formatMoney,
 getDocumentTitle,
 normalizeDocument,
 validateDocument,
} from "@/lib/documents/document-core";
import type { FloxDocument } from "@/lib/types/intake";

const styles = StyleSheet.create({
 page: {
  paddingTop: 42,
  paddingBottom: 74,
  paddingHorizontal: 42,
  fontFamily: "Helvetica",
  fontSize: 9.6,
  color: "#0f172a",
  lineHeight: 1.42,
 },
 fixedHeader: {
  position: "absolute",
  top: 18,
  left: 42,
  right: 42,
  height: 15,
  flexDirection: "row",
  justifyContent: "space-between",
  borderBottomWidth: 0.6,
  borderBottomColor: "#e2e8f0",
  color: "#64748b",
  fontSize: 7.4,
 },
 brand: {
  fontSize: 25,
  fontWeight: 800,
  letterSpacing: 2.2,
 },
 brandLine: {
  marginTop: 4,
  fontSize: 8,
  letterSpacing: 0.8,
  color: "#64748b",
 },
 header: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 30,
  marginBottom: 24,
 },
 businessBox: {
  width: 190,
  padding: 12,
  borderWidth: 0.8,
  borderColor: "#e2e8f0",
  backgroundColor: "#f8fafc",
  borderRadius: 8,
  fontSize: 8,
  color: "#334155",
 },
 senderLine: {
  marginTop: 20,
  width: 270,
  paddingBottom: 3,
  borderBottomWidth: 0.5,
  borderBottomColor: "#cbd5e1",
  color: "#64748b",
  fontSize: 7,
 },
 recipient: {
  marginTop: 8,
  minHeight: 82,
  fontSize: 10.2,
  lineHeight: 1.55,
 },
 titleRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 22,
  paddingTop: 18,
  borderTopWidth: 1.2,
  borderTopColor: "#0f172a",
  marginBottom: 18,
 },
 title: {
  fontSize: 19,
  fontWeight: 800,
  letterSpacing: 0.2,
 },
 intro: {
  marginTop: 13,
  maxWidth: 330,
  fontSize: 10,
  lineHeight: 1.6,
  color: "#334155",
 },
 meta: {
  width: 190,
  fontSize: 8.8,
 },
 metaRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  borderBottomWidth: 0.4,
  borderBottomColor: "#e2e8f0",
  paddingVertical: 4,
  gap: 8,
 },
 metaLabel: {
  color: "#64748b",
  fontWeight: 700,
 },
 sectionTitle: {
  marginTop: 14,
  marginBottom: 8,
  fontSize: 8.4,
  fontWeight: 800,
  letterSpacing: 1,
  color: "#475569",
  textTransform: "uppercase",
 },
 serviceCard: {
  padding: 10,
  borderWidth: 0.6,
  borderColor: "#e2e8f0",
  backgroundColor: "#f8fafc",
  borderRadius: 7,
  marginBottom: 7,
 },
 serviceTitle: {
  fontSize: 10,
  fontWeight: 800,
 },
 serviceText: {
  marginTop: 5,
  fontSize: 9,
  lineHeight: 1.5,
  color: "#334155",
 },
 tableHeader: {
  flexDirection: "row",
  borderTopWidth: 1,
  borderBottomWidth: 1,
  borderColor: "#0f172a",
  backgroundColor: "#f1f5f9",
  paddingVertical: 7,
  fontSize: 7.4,
  fontWeight: 800,
  color: "#334155",
 },
 tableRow: {
  flexDirection: "row",
  borderBottomWidth: 0.45,
  borderBottomColor: "#e2e8f0",
  paddingVertical: 7,
  minHeight: 28,
 },
 colPos: { width: "7%", paddingRight: 4 },
 colDesc: { width: "40%", paddingRight: 8 },
 colQty: { width: "12%", paddingRight: 6, textAlign: "right" },
 colUnit: { width: "15%", paddingRight: 6, textAlign: "right" },
 colTax: { width: "10%", paddingRight: 6, textAlign: "right" },
 colTotal: { width: "16%", textAlign: "right", fontWeight: 700 },
 totalsWrap: {
  marginTop: 14,
  alignItems: "flex-end",
 },
 totalsBox: {
  width: 230,
  borderWidth: 0.9,
  borderColor: "#0f172a",
  padding: 10,
  borderRadius: 7,
 },
 totalRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: 3,
  borderBottomWidth: 0.35,
  borderBottomColor: "#e2e8f0",
 },
 grandRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingTop: 7,
  marginTop: 4,
  fontSize: 11,
  fontWeight: 800,
 },
 notes: {
  marginTop: 18,
  fontSize: 8.6,
  lineHeight: 1.55,
  color: "#334155",
 },
 warningBox: {
  marginTop: 16,
  padding: 9,
  borderWidth: 0.6,
  borderColor: "#f59e0b",
  backgroundColor: "#fffbeb",
  borderRadius: 6,
  fontSize: 8,
  color: "#92400e",
 },
 footer: {
  position: "absolute",
  left: 42,
  right: 42,
  bottom: 28,
  paddingTop: 8,
  borderTopWidth: 0.55,
  borderTopColor: "#cbd5e1",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 16,
  fontSize: 6.8,
  lineHeight: 1.45,
  color: "#475569",
 },
 footerCol: {
  width: "32%",
 },
 footerTitle: {
  fontWeight: 800,
  color: "#0f172a",
  marginBottom: 2,
 },
 pageNumber: {
  position: "absolute",
  right: 42,
  bottom: 14,
  fontSize: 7,
  color: "#94a3b8",
 },
});

function text(value: unknown) {
 return String(value || "").trim();
}

function recipientLines(doc: FloxDocument) {
 const customer = doc.editableData.customer;
 return [
  customer?.companyName,
  customer?.contactPerson ? `z. Hd. ${customer.contactPerson}` : "",
  !customer?.companyName ? customer?.name : "",
  customer?.street,
  [customer?.zip, customer?.city].filter(Boolean).join(" "),
  customer?.country && customer.country !== "Deutschland" ? customer.country : "",
 ].filter(Boolean) as string[];
}

function servicePeriod(doc: FloxDocument) {
 const data = doc.editableData;
 if (data.servicePeriodStart && data.servicePeriodEnd) {
  return `${formatDateDE(data.servicePeriodStart)} bis ${formatDateDE(data.servicePeriodEnd)}`;
 }
 if (data.serviceDate) return formatDateDE(data.serviceDate);
 return "";
}

function BusinessInfo() {
 return (
  <View style={styles.businessBox}>
   <Text style={{ fontWeight: 800 }}>FLOXANT</Text>
   <Text>{floxantDocumentSettings.legalName}</Text>
   <Text>{floxantDocumentSettings.streetAddress}</Text>
   <Text>
    {floxantDocumentSettings.postalCode} {floxantDocumentSettings.city}
   </Text>
   <Text>{floxantDocumentSettings.country}</Text>
   <Text style={{ marginTop: 5 }}>{floxantDocumentSettings.phone}</Text>
   <Text>{floxantDocumentSettings.email}</Text>
   <Text>{floxantDocumentSettings.website.replace(/^https?:\/\//, "")}</Text>
  </View>
 );
}

function FloxPdfDocument({ document }: { document: FloxDocument }) {
 const doc = normalizeDocument(document);
 const warnings = validateDocument(doc);
 const title = doc.editableData.title || getDocumentTitle(doc.type);
 const period = servicePeriod(doc);
 const dueDate = doc.editableData.paymentDueDate || doc.editableData.dueDate;
 const notes = [
  doc.editableData.conditions,
  doc.editableData.notesText,
  doc.editableData.paymentTerms ? `Zahlungsbedingungen: ${doc.editableData.paymentTerms}` : "",
  doc.editableData.footerNote,
 ].filter(Boolean);

 return (
  <Document title={`${title} ${doc.number}`} author="FLOXANT">
   <Page size="A4" style={styles.page} wrap>
    <View style={styles.fixedHeader} fixed>
     <Text>FLOXANT Dokument</Text>
     <Text>{doc.number}</Text>
    </View>

    <View style={styles.header}>
     <View>
      <Text style={styles.brand}>FLOXANT</Text>
      <Text style={styles.brandLine}>Umzug · Reinigung · Entrümpelung · Entsorgung</Text>
      <Text style={styles.senderLine}>
       {floxantDocumentSettings.legalName} · {floxantDocumentSettings.streetAddress} ·{" "}
       {floxantDocumentSettings.postalCode} {floxantDocumentSettings.city}
      </Text>
      <View style={styles.recipient}>
       {recipientLines(doc).map((line) => (
        <Text key={line}>{line}</Text>
       ))}
      </View>
     </View>
     <BusinessInfo />
    </View>

    <View style={styles.titleRow}>
     <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.intro}>Sehr geehrte Damen und Herren,{"\n"}{doc.editableData.introText}</Text>
     </View>
     <View style={styles.meta}>
      <View style={styles.metaRow}>
       <Text style={styles.metaLabel}>Nummer</Text>
       <Text>{doc.number}</Text>
      </View>
      <View style={styles.metaRow}>
       <Text style={styles.metaLabel}>Datum</Text>
       <Text>{formatDateDE(doc.editableData.documentDate || doc.createdAt)}</Text>
      </View>
      {doc.type === "quote" ? (
       <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Gültig bis</Text>
        <Text>{formatDateDE(doc.editableData.validUntil)}</Text>
       </View>
      ) : null}
      {doc.type === "invoice" ? (
       <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Zahlbar bis</Text>
        <Text>{formatDateDE(dueDate)}</Text>
       </View>
      ) : null}
      {period ? (
       <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Leistung</Text>
        <Text>{period}</Text>
       </View>
      ) : null}
      {doc.editableData.performanceLocation ? (
       <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Ort</Text>
        <Text>{doc.editableData.performanceLocation}</Text>
       </View>
      ) : null}
     </View>
    </View>

    <Text style={styles.sectionTitle}>Vereinbarte Services</Text>
    {(doc.editableData.services || []).map((service, index) => (
     <View key={service.id} style={styles.serviceCard} wrap={false}>
      <Text style={styles.serviceTitle}>
       {index + 1}. {service.title}
      </Text>
      {service.description ? <Text style={styles.serviceText}>{service.description}</Text> : null}
      {service.location || service.notes ? (
       <Text style={styles.serviceText}>{[service.location, service.notes].filter(Boolean).join(" · ")}</Text>
      ) : null}
     </View>
    ))}

    <Text style={styles.sectionTitle}>Positionen</Text>
    <View style={styles.tableHeader} fixed={false}>
     <Text style={styles.colPos}>Pos.</Text>
     <Text style={styles.colDesc}>Beschreibung</Text>
     <Text style={styles.colQty}>Menge</Text>
     <Text style={styles.colUnit}>Einzel netto</Text>
     <Text style={styles.colTax}>USt.</Text>
     <Text style={styles.colTotal}>Gesamt netto</Text>
    </View>
    {doc.editableData.items.map((item, index) => (
     <View key={item.id} style={styles.tableRow} wrap={false}>
      <Text style={styles.colPos}>{index + 1}</Text>
      <View style={styles.colDesc}>
       <Text>{item.description}</Text>
       {item.category ? <Text style={{ marginTop: 2, color: "#64748b", fontSize: 7.4 }}>{item.category}</Text> : null}
      </View>
      <Text style={styles.colQty}>
       {item.quantity} {item.unit}
      </Text>
      <Text style={styles.colUnit}>{formatMoney(item.unitPriceNet ?? item.unitPrice)}</Text>
      <Text style={styles.colTax}>{item.taxRate}%</Text>
      <Text style={styles.colTotal}>{formatMoney(item.lineTotalNet ?? item.total)}</Text>
     </View>
    ))}

    <View style={styles.totalsWrap} wrap={false}>
     <View style={styles.totalsBox}>
      {doc.totals.discountTotal ? (
       <View style={styles.totalRow}>
        <Text>Rabatt gesamt</Text>
        <Text>{formatMoney(doc.totals.discountTotal)}</Text>
       </View>
      ) : null}
      <View style={styles.totalRow}>
       <Text>Summe netto</Text>
       <Text>{formatMoney(doc.totals.net)}</Text>
      </View>
      <View style={styles.totalRow}>
       <Text>Umsatzsteuer</Text>
       <Text>{formatMoney(doc.totals.tax)}</Text>
      </View>
      <View style={styles.grandRow}>
       <Text>Gesamt brutto</Text>
       <Text>{formatMoney(doc.totals.gross)}</Text>
      </View>
     </View>
    </View>

    {notes.length ? (
     <View style={styles.notes} wrap={false}>
      {notes.map((note) => (
       <Text key={text(note)} style={{ marginBottom: 5 }}>
        {text(note)}
       </Text>
      ))}
     </View>
    ) : null}

    {warnings.some((warning) => warning.level === "critical") && doc.status === "draft" ? (
     <View style={styles.warningBox} wrap={false}>
      <Text>Interne Entwurfswarnung: {warnings.map((warning) => warning.message).join(" ")}</Text>
     </View>
    ) : null}

    <View style={styles.footer} fixed>
     <View style={styles.footerCol}>
      <Text style={styles.footerTitle}>FLOXANT</Text>
      <Text>{floxantDocumentSettings.legalName}</Text>
      <Text>{floxantDocumentSettings.streetAddress}</Text>
      <Text>
       {floxantDocumentSettings.postalCode} {floxantDocumentSettings.city}
      </Text>
     </View>
     <View style={styles.footerCol}>
      <Text style={styles.footerTitle}>Kontakt</Text>
      <Text>{floxantDocumentSettings.phone}</Text>
      <Text>{floxantDocumentSettings.email}</Text>
      <Text>{floxantDocumentSettings.website}</Text>
     </View>
     <View style={styles.footerCol}>
      <Text style={styles.footerTitle}>Steuer / Zahlung</Text>
      <Text>{floxantDocumentSettings.vatId ? `USt-ID: ${floxantDocumentSettings.vatId}` : "USt-ID: nicht konfiguriert"}</Text>
      <Text>{floxantDocumentSettings.taxNumber ? `St.-Nr.: ${floxantDocumentSettings.taxNumber}` : "Steuernummer: nicht konfiguriert"}</Text>
      <Text>{floxantDocumentSettings.iban ? `IBAN: ${floxantDocumentSettings.iban}` : "IBAN: nicht konfiguriert"}</Text>
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
 if (error || !data) return null;
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

 const normalized = normalizeDocument(targetDoc);
 const stream = await renderToStream(<FloxPdfDocument document={normalized} />);

 return new NextResponse(stream as unknown as BodyInit, {
  headers: {
   "Content-Type": "application/pdf",
   "Content-Disposition": `inline; filename="${normalized.number || "floxant-dokument"}.pdf"`,
   "Cache-Control": "private, no-store",
  },
 });
}

