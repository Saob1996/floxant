export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import React from 'react';
import { Page, Text, View, Document, StyleSheet, renderToStream, Font } from '@react-pdf/renderer';

// FLOXANT Business Data — German Compliance
const BIZ = {
    name: "FLOXANT – Saleh Obid",
    street: "Johanna-Kinkel-Straße 1 + 2",
    zip: "93049",
    city: "Regensburg",
    country: "Deutschland",
    phone: "+49 1577 1105087",
    email: "info@floxant.de",
    steuernummer: "103/5163/5231",
    ustIdNr: "DE 45971484",
    bank: "Sparkasse Neuss",
    iban: "DE87 3055 0000 0093 7290 93",
};

const styles = StyleSheet.create({
    page: { paddingTop: 50, paddingBottom: 100, paddingHorizontal: 50, fontFamily: 'Helvetica', fontSize: 10, color: '#1a1a1a' },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, alignItems: 'flex-start' },
    logoSection: { width: '50%' },
    logoText: { fontSize: 22, fontWeight: 'bold', letterSpacing: 1 },
    subText: { fontSize: 8, color: '#6b7280', marginTop: 3 },
    senderInfo: { width: '45%', textAlign: 'right', fontSize: 8, color: '#4b5563', lineHeight: 1.6 },
    recipientLine: { fontSize: 7, color: '#9ca3af', borderBottomWidth: 0.5, borderBottomColor: '#d1d5db', paddingBottom: 3, marginBottom: 6 },
    recipient: { marginBottom: 25, fontSize: 10, lineHeight: 1.6 },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1.5, borderBottomColor: '#1a1a1a', paddingBottom: 8, marginBottom: 12, alignItems: 'flex-end' },
    docTitle: { fontSize: 16, fontWeight: 'bold', letterSpacing: 0.5 },
    docNr: { fontSize: 9, color: '#6b7280', marginTop: 2 },
    dateInfo: { fontSize: 9, color: '#4b5563', textAlign: 'right', lineHeight: 1.5 },
    intro: { marginBottom: 15, lineHeight: 1.6, fontSize: 10 },
    // Table
    tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#4b5563', paddingBottom: 5, marginBottom: 2, fontWeight: 'bold', fontSize: 8, textTransform: 'uppercase' as any, color: '#4b5563', letterSpacing: 0.5 },
    tableRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#e5e7eb', paddingVertical: 7, minHeight: 28 },
    colPos: { width: '8%', fontSize: 9 },
    colDesc: { width: '42%', fontSize: 9 },
    colQty: { width: '12%', textAlign: 'right', fontSize: 9 },
    colUnit: { width: '19%', textAlign: 'right', fontSize: 9 },
    colTotal: { width: '19%', textAlign: 'right', fontSize: 9, fontWeight: 'bold' },
    // Totals
    totalsWrap: { marginTop: 15, alignItems: 'flex-end' },
    totalsBox: { width: '50%' },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
    totalLabel: { color: '#4b5563', fontSize: 10 },
    totalValue: { fontSize: 10 },
    grandRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderTopWidth: 2, borderTopColor: '#1a1a1a', marginTop: 6 },
    grandLabel: { fontWeight: 'bold', fontSize: 13 },
    grandValue: { fontWeight: 'bold', fontSize: 13 },
    // Legal note
    legalNote: { marginTop: 25, fontSize: 8, color: '#6b7280', lineHeight: 1.5 },
    // Footer — fixed at bottom
    footer: { position: 'absolute', bottom: 30, left: 50, right: 50, borderTopWidth: 0.5, borderTopColor: '#d1d5db', paddingTop: 10, fontSize: 7, color: '#4b5563', flexDirection: 'row', justifyContent: 'space-between', lineHeight: 1.6 },
    footerCol: { width: '30%' },
    footerColRight: { width: '35%', textAlign: 'right' },
    footerBold: { fontWeight: 'bold', marginBottom: 2 },
    // Page number
    pageNumber: { position: 'absolute', bottom: 15, right: 50, fontSize: 7, color: '#9ca3af' },
});

interface Booking {
    id: string;
    service: string;
    name: string;
    email: string;
    phone: string;
    upgrades: string[];
    details: any;
    timestamp: string;
}

const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

const InvoiceDocument = ({ booking, docType }: { booking: Booking; docType: 'angebot' | 'rechnung' }) => {
    const today = new Date().toLocaleDateString("de-DE");
    const prefix = docType === 'rechnung' ? 'RE' : 'AG';
    const docNr = `${prefix}-${booking.id.slice(0, 8).toUpperCase()}`;
    const title = docType === 'rechnung' ? 'RECHNUNG' : 'ANGEBOT';

    const items = [
        {
            description: `${booking.service?.charAt(0).toUpperCase()}${booking.service?.slice(1) || 'Service'} – ${booking.details?.date || 'Nach Vereinbarung'}`,
            quantity: 1,
            unitPrice: 0,
        }
    ];

    if (booking.upgrades && Array.isArray(booking.upgrades)) {
        booking.upgrades.forEach((u: string) => {
            items.push({
                description: u.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                quantity: 1,
                unitPrice: 0,
            });
        });
    }

    const netto = items.reduce((sum, i) => sum + (i.quantity * i.unitPrice), 0);
    const ust = netto * 0.19;
    const brutto = netto + ust;

    return (
        <Document>
            <Page size="A4" style={styles.page} wrap>
                {/* Header */}
                <View style={styles.header} fixed>
                    <View style={styles.logoSection}>
                        <Text style={styles.logoText}>FLOXANT</Text>
                        <Text style={styles.subText}>Premium Umzug · Reinigung · Entrümpelung</Text>
                    </View>
                    <View style={styles.senderInfo}>
                        <Text style={styles.footerBold}>{BIZ.name}</Text>
                        <Text>{BIZ.street}</Text>
                        <Text>{BIZ.zip} {BIZ.city}</Text>
                        <Text>{BIZ.country}</Text>
                        <Text style={{ marginTop: 3 }}>Tel: {BIZ.phone}</Text>
                        <Text>E-Mail: {BIZ.email}</Text>
                    </View>
                </View>

                {/* Recipient */}
                <View style={styles.recipient}>
                    <Text style={styles.recipientLine}>{BIZ.name} · {BIZ.street} · {BIZ.zip} {BIZ.city}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{booking.name}</Text>
                    <Text>{booking.email}</Text>
                    <Text>{booking.phone}</Text>
                </View>

                {/* Title Row */}
                <View style={styles.titleRow}>
                    <View>
                        <Text style={styles.docTitle}>{title}</Text>
                        <Text style={styles.docNr}>{docNr}</Text>
                    </View>
                    <View>
                        <Text style={styles.dateInfo}>Datum: {today}</Text>
                        <Text style={styles.dateInfo}>Leistungsdatum: {today}</Text>
                    </View>
                </View>

                {/* Intro */}
                <Text style={styles.intro}>
                    Sehr geehrte(r) {booking.name},{"\n\n"}
                    {docType === 'angebot'
                        ? 'vielen Dank für Ihre Anfrage. Wir unterbreiten Ihnen folgendes Angebot:'
                        : 'wir stellen Ihnen folgende Leistungen in Rechnung:'}
                </Text>

                {/* Table */}
                <View>
                    <View style={styles.tableHeader}>
                        <Text style={styles.colPos}>Pos.</Text>
                        <Text style={styles.colDesc}>Beschreibung</Text>
                        <Text style={styles.colQty}>Menge</Text>
                        <Text style={styles.colUnit}>Einzelpreis</Text>
                        <Text style={styles.colTotal}>Gesamt</Text>
                    </View>
                    {items.map((item, idx) => (
                        <View style={styles.tableRow} key={idx} wrap={false}>
                            <Text style={styles.colPos}>{idx + 1}</Text>
                            <Text style={styles.colDesc}>{item.description}</Text>
                            <Text style={styles.colQty}>{item.quantity}</Text>
                            <Text style={styles.colUnit}>{fmt(item.unitPrice)}</Text>
                            <Text style={styles.colTotal}>{fmt(item.quantity * item.unitPrice)}</Text>
                        </View>
                    ))}
                </View>

                {/* Totals */}
                <View style={styles.totalsWrap} wrap={false}>
                    <View style={styles.totalsBox}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Zwischensumme (Netto)</Text>
                            <Text style={styles.totalValue}>{fmt(netto)}</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Umsatzsteuer 19%</Text>
                            <Text style={styles.totalValue}>{fmt(ust)}</Text>
                        </View>
                        <View style={styles.grandRow}>
                            <Text style={styles.grandLabel}>Gesamtbetrag (Brutto)</Text>
                            <Text style={styles.grandValue}>{fmt(brutto)}</Text>
                        </View>
                    </View>
                </View>

                {/* Legal Note */}
                <View style={styles.legalNote} wrap={false}>
                    <Text>
                        {docType === 'angebot'
                            ? 'Dieses Angebot ist freibleibend und 30 Tage gültig. Es gelten unsere AGB.'
                            : 'Zahlungsziel: 14 Tage nach Rechnungserhalt ohne Abzug. Es gelten unsere AGB.'}
                    </Text>
                </View>

                {/* Footer — fixed at bottom of every page */}
                <View style={styles.footer} fixed>
                    <View style={styles.footerCol}>
                        <Text style={styles.footerBold}>{BIZ.name}</Text>
                        <Text>{BIZ.street}</Text>
                        <Text>{BIZ.zip} {BIZ.city}</Text>
                        <Text>Tel: {BIZ.phone}</Text>
                        <Text>E-Mail: {BIZ.email}</Text>
                    </View>
                    <View style={styles.footerCol}>
                        <Text style={styles.footerBold}>Bankverbindung</Text>
                        <Text>{BIZ.bank}</Text>
                        <Text>IBAN: {BIZ.iban}</Text>
                    </View>
                    <View style={styles.footerColRight}>
                        <Text style={styles.footerBold}>Steuerliche Angaben</Text>
                        <Text>St.-Nr.: {BIZ.steuernummer}</Text>
                        <Text>USt-IdNr: {BIZ.ustIdNr}</Text>
                        <Text style={{ marginTop: 2 }}>USt. gem. §1 Abs. 1 Nr. 1 UStG</Text>
                    </View>
                </View>

                {/* Page number */}
                <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `Seite ${pageNumber} von ${totalPages}`} fixed />
            </Page>
        </Document>
    );
};

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const url = new URL(req.url);
    const docType = (url.searchParams.get('type') === 'rechnung' ? 'rechnung' : 'angebot') as 'angebot' | 'rechnung';

    const { data: booking, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !booking) {
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const prefix = docType === 'rechnung' ? 'rechnung' : 'angebot';
    const stream = await renderToStream(<InvoiceDocument booking={booking} docType={docType} />);

    return new NextResponse(stream as unknown as BodyInit, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=${prefix}-${id.slice(0, 8)}.pdf`,
        },
    });
}
