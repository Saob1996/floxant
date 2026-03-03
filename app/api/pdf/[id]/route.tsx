export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import React from 'react';
import { Page, Text, View, Document, StyleSheet, renderToStream } from '@react-pdf/renderer';

// FLOXANT Business Data
const BIZ = {
    name: "FLOXANT – Saleh Obid",
    city: "Regensburg, Deutschland",
    phone: "+49 1577 1105087",
    email: "info@floxant.de",
    steuernummer: "103/5163/5231",
    bank: "Sparkasse Neuss",
    iban: "DE87 3055 0000 0093 7290 93",
};

const styles = StyleSheet.create({
    page: { padding: 50, fontFamily: 'Helvetica', fontSize: 10, color: '#000' },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
    logoSection: { width: '50%' },
    logoText: { fontSize: 22, fontWeight: 'bold' },
    subText: { fontSize: 9, color: '#6b7280', marginTop: 2 },
    senderInfo: { width: '40%', textAlign: 'right', fontSize: 8, color: '#6b7280', lineHeight: 1.5 },
    recipientLine: { fontSize: 7, color: '#9ca3af', borderBottomWidth: 0.5, borderBottomColor: '#d1d5db', paddingBottom: 3, marginBottom: 8 },
    recipient: { marginBottom: 30, fontSize: 10, lineHeight: 1.5 },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#d1d5db', paddingBottom: 8, marginBottom: 15 },
    docTitle: { fontSize: 16, fontWeight: 'bold' },
    docNr: { fontSize: 9, color: '#6b7280', marginTop: 2 },
    intro: { marginBottom: 15, lineHeight: 1.5, fontSize: 10 },
    // Table
    tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#9ca3af', paddingBottom: 4, marginBottom: 4, fontWeight: 'bold', fontSize: 8, textTransform: 'uppercase' as any, color: '#6b7280' },
    tableRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#e5e7eb', paddingVertical: 6 },
    colPos: { width: '8%' },
    colDesc: { width: '42%' },
    colQty: { width: '10%', textAlign: 'right' },
    colUnit: { width: '20%', textAlign: 'right' },
    colTotal: { width: '20%', textAlign: 'right' },
    // Totals
    totalsWrap: { marginTop: 10, alignItems: 'flex-end' },
    totalsBox: { width: '45%' },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
    totalLabel: { color: '#6b7280', fontSize: 10 },
    totalValue: { fontSize: 10 },
    grandRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderTopWidth: 1.5, borderTopColor: '#000', marginTop: 4 },
    grandLabel: { fontWeight: 'bold', fontSize: 12 },
    grandValue: { fontWeight: 'bold', fontSize: 12 },
    // Footer
    footer: { position: 'absolute', bottom: 40, left: 50, right: 50, borderTopWidth: 0.5, borderTopColor: '#d1d5db', paddingTop: 12, fontSize: 7, color: '#4b5563', flexDirection: 'row', justifyContent: 'space-between', lineHeight: 1.5 },
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

const InvoiceDocument = ({ booking }: { booking: Booking }) => {
    const today = new Date().toLocaleDateString("de-DE");
    const docNr = `AG-${booking.id.slice(0, 8).toUpperCase()}`;

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
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoSection}>
                        <Text style={styles.logoText}>FLOXANT</Text>
                        <Text style={styles.subText}>Premium Umzug · Reinigung · Entrümpelung</Text>
                    </View>
                    <View style={styles.senderInfo}>
                        <Text>{BIZ.name}</Text>
                        <Text>{BIZ.city}</Text>
                        <Text>Tel: {BIZ.phone}</Text>
                        <Text>E-Mail: {BIZ.email}</Text>
                        <Text style={{ marginTop: 4 }}>St.-Nr.: {BIZ.steuernummer}</Text>
                    </View>
                </View>

                {/* Recipient */}
                <View style={styles.recipient}>
                    <Text style={styles.recipientLine}>{BIZ.name} · {BIZ.city}</Text>
                    <Text>{booking.name}</Text>
                    <Text>{booking.email}</Text>
                    <Text>{booking.phone}</Text>
                </View>

                {/* Title */}
                <View style={styles.titleRow}>
                    <View>
                        <Text style={styles.docTitle}>ANGEBOT</Text>
                        <Text style={styles.docNr}>{docNr}</Text>
                    </View>
                    <View style={{ textAlign: 'right' }}>
                        <Text style={{ fontSize: 9, color: '#6b7280' }}>Datum: {today}</Text>
                        <Text style={{ fontSize: 9, color: '#6b7280' }}>Leistungsdatum: {today}</Text>
                    </View>
                </View>

                {/* Intro */}
                <Text style={styles.intro}>
                    Sehr geehrte(r) {booking.name},{"\n\n"}
                    vielen Dank für Ihre Anfrage. Wir unterbreiten Ihnen folgendes Angebot:
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
                        <View style={styles.tableRow} key={idx}>
                            <Text style={styles.colPos}>{idx + 1}</Text>
                            <Text style={styles.colDesc}>{item.description}</Text>
                            <Text style={styles.colQty}>{item.quantity}</Text>
                            <Text style={styles.colUnit}>{item.unitPrice.toFixed(2)} €</Text>
                            <Text style={styles.colTotal}>{(item.quantity * item.unitPrice).toFixed(2)} €</Text>
                        </View>
                    ))}
                </View>

                {/* Totals */}
                <View style={styles.totalsWrap}>
                    <View style={styles.totalsBox}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Zwischensumme (Netto)</Text>
                            <Text style={styles.totalValue}>{netto.toFixed(2)} €</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Umsatzsteuer 19%</Text>
                            <Text style={styles.totalValue}>{ust.toFixed(2)} €</Text>
                        </View>
                        <View style={styles.grandRow}>
                            <Text style={styles.grandLabel}>Gesamtbetrag (Brutto)</Text>
                            <Text style={styles.grandValue}>{brutto.toFixed(2)} €</Text>
                        </View>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <View style={{ width: '33%' }}>
                        <Text style={{ fontWeight: 'bold' }}>{BIZ.name}</Text>
                        <Text>{BIZ.city}</Text>
                        <Text>Tel: {BIZ.phone}</Text>
                        <Text>E-Mail: {BIZ.email}</Text>
                    </View>
                    <View style={{ width: '33%' }}>
                        <Text style={{ fontWeight: 'bold' }}>Bankverbindung</Text>
                        <Text>{BIZ.bank}</Text>
                        <Text>IBAN: {BIZ.iban}</Text>
                    </View>
                    <View style={{ width: '30%', textAlign: 'right' }}>
                        <Text style={{ fontWeight: 'bold' }}>Steuerliche Angaben</Text>
                        <Text>St.-Nr.: {BIZ.steuernummer}</Text>
                        <Text style={{ marginTop: 3 }}>USt. gem. §1 Abs. 1 Nr. 1 UStG</Text>
                    </View>
                </View>
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

    const { data: booking, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !booking) {
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const stream = await renderToStream(<InvoiceDocument booking={booking} />);

    return new NextResponse(stream as unknown as BodyInit, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=angebot-${id}.pdf`,
        },
    });
}
