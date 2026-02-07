import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        // Extract basic data
        const booking = {
            service: formData.get("service") as string,
            upgrades: JSON.parse(formData.get("upgrades") as string || "[]"),
            details: JSON.parse(formData.get("details") as string || "{}"),
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            timestamp: formData.get("timestamp") as string,
            file_url: null, // Placeholder as requested, file handled separately or later
            status: "new"
        };


        const { data, error } = await supabase
            .from('bookings')
            .insert([booking])
            .select();

        if (error) {
            console.error("Supabase Insert Error:", error);
            throw error;
        }

        // Return the id from the inserted record
        const newId = data && data[0] ? data[0].id : "unknown";

        return NextResponse.json({ success: true, id: newId });

    } catch (error) {
        console.error("Booking API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('timestamp', { ascending: false });

        if (error) {
            throw error;
        }

        return NextResponse.json(data || []);
    } catch (error) {
        console.error("Supabase Fetch Error:", error);
        return NextResponse.json([]);
    }
}
