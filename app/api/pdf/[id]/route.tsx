import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, renderToStream, Font } from '@react-pdf/renderer';

// Register fonts if needed, using standard Helvetica for now
// Font.register({ family: 'Inter', src: '...' });

const styles = StyleSheet.create({
    page: {
        padding: 50,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: '#000',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    logoSection: {
        width: '50%',
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    subLogoText: {
        fontSize: 10,
        color: '#6b7280',
        marginTop: 2,
    },
    senderInfo: {
        width: '40%',
        textAlign: 'right',
        fontSize: 8,
        color: '#6b7280',
        lineHeight: 1.5,
    },
    recipient: {
        marginBottom: 40,
        fontSize: 10,
        lineHeight: 1.5,
    },
    docTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        paddingBottom: 10,
        marginBottom: 20,
    },
    docTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    docNumber: {
        fontSize: 10,
        color: '#6b7280',
        marginTop: 2,
    },
    intro: {
        marginBottom: 20,
        lineHeight: 1.5,
    },
    table: {
        width: '100%',
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#d1d5db',
        paddingBottom: 5,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
        paddingVertical: 8,
    },
    col1: { width: '10%', textAlign: 'left' },
    col2: { width: '60%', textAlign: 'left' },
    col3: { width: '30%', textAlign: 'right' },

    totals: {
        marginTop: 10,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 4,
    },
    totalLabel: {
        width: '30%',
        textAlign: 'right',
        paddingRight: 10,
        color: '#6b7280',
    },
    totalValue: {
        width: '20%',
        textAlign: 'right',
    },
    finalTotal: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#000',
    },
    finalTotalLabel: {
        width: '30%',
        textAlign: 'right',
        paddingRight: 10,
        fontWeight: 'bold',
        fontSize: 12,
    },
    finalTotalValue: {
        width: '20%',
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 12,
    },
    footer: {
        position: 'absolute',
        bottom: 50,
        left: 50,
        right: 50,
        borderTopWidth: 1,
        borderTopColor: '#d1d5db',
        paddingTop: 20,
        fontSize: 7,
        color: '#374151',
        flexDirection: 'row',
        justifyContent: 'space-between',
        lineHeight: 1.5,
    }
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

    // Calculate items
    const items = [
        {
            name: booking.service ? booking.service.charAt(0).toUpperCase() + booking.service.slice(1) : "Service",
            description: `Basis-Paket für ${booking.service || 'Dienstleistung'} - Datum: ${booking.details?.date || 'Nach Vereinbarung'}`,
            price: 0
        }
    ];

    if (booking.upgrades && Array.isArray(booking.upgrades)) {
        booking.upgrades.forEach((u: string) => {
            items.push({
                name: u.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                description: "Signature Service Upgrade",
                price: 0
            });
        });
    }

    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const vat = subtotal * 0.19;
    const total = subtotal + vat;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoSection}>
                        {/* We use text for logo if image path is tricky in server environment, or use absolute public URL if possible */}
                        <Text style={styles.logoText}>floxant.</Text>
                        <Text style={styles.subLogoText}>Premium Services</Text>
                    </View>
                    <View style={styles.senderInfo}>
                        <Text>Floxant GmbH</Text>
                        <Text>Musterstraße 123</Text>
                        <Text>10115 Berlin</Text>
                        <Text>Deutschland</Text>
                        <Text>Tel: +49 30 12345678</Text>
                        <Text>Email: contact@floxant.de</Text>
                    </View>
                </View>

                {/* Recipient */}
                <View style={styles.recipient}>
                    <Text>{booking.name}</Text>
                    <Text>{booking.email}</Text>
                    <Text>{booking.phone}</Text>
                </View>

                {/* Title & Date */}
                <View style={styles.docTitleRow}>
                    <View>
                        <Text style={styles.docTitle}>Angebot</Text>
                        <Text style={styles.docNumber}>Nr. {booking.id.slice(0, 8).toUpperCase()}</Text>
                    </View>
                    <Text style={{ fontSize: 10, color: '#6b7280' }}>Berlin, den {today}</Text>
                </View>

                {/* Intro */}
                <Text style={styles.intro}>
                    Sehr geehrte(r) {booking.name},{"\n\n"}
                    vielen Dank für Ihre Anfrage. Basierend auf Ihren Angaben, erlauben wir uns, Ihnen folgendes Angebot zu unterbreiten:
                </Text>

                {/* Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.col1}>Pos.</Text>
                        <Text style={styles.col2}>Beschreibung</Text>
                        <Text style={styles.col3}>Betrag (€)</Text>
                    </View>
                    {items.map((item, idx) => (
                        <View style={styles.tableRow} key={idx}>
                            <Text style={styles.col1}>{idx + 1}</Text>
                            <View style={styles.col2}>
                                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                <Text style={{ fontSize: 8, color: '#6b7280' }}>{item.description}</Text>
                            </View>
                            <Text style={styles.col3}>{item.price.toFixed(2)}</Text>
                        </View>
                    ))}
                </View>

                {/* Totals */}
                <View style={styles.totals}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Zwischensumme</Text>
                        <Text style={styles.totalValue}>{subtotal.toFixed(2)} €</Text>
                    </View>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>MwSt. 19%</Text>
                        <Text style={styles.totalValue}>{vat.toFixed(2)} €</Text>
                    </View>
                    <View style={styles.finalTotal}>
                        <Text style={styles.finalTotalLabel}>Gesamtsumme</Text>
                        <Text style={styles.finalTotalValue}>{total.toFixed(2)} €</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <View style={{ width: '60%' }}>
                        <Text>Dieses Angebot ist freibleibend. Zahlungsziel: 14 Tage nach Rechnungserhalt. Es gelten unsere Allgemeinen Geschäftsbedingungen (AGB).</Text>
                        <Text style={{ marginTop: 5 }}>Bankverbindung: Floxant Bank | IBAN: DE12 3456... | BIC: FLOXDEBB</Text>
                    </View>
                    <View style={{ width: '35%', textAlign: 'right' }}>
                        <Text>Amtsgericht Berlin-Charlottenburg</Text>
                        <Text>HRB 123456</Text>
                        <Text>GF: Max Mustermann</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions);
    // Optional: Allow public to download their own invoice if they have link? 
    // For now strict auth as requested by user prompt history context ("Admin Dashboard")
    // But usually offer links are public or token protected. 
    // User Prompt: "Protect the dashboard". Does not explicitly say protect PDF API but implied.
    // However, if we want to print from dashboard, user is admin.

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Fetch booking
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
