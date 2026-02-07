import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        let fileUrl: string | null = null;

        // Handle File Upload to Supabase Storage
        if (file && file.size > 0) {
            try {
                const timestamp = Date.now();
                // Sanitize filename: remove special chars, keep extension
                const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
                const path = `bookings/${timestamp}_${safeName}`;

                console.log("Uploading file to Supabase:", path);

                const { error: uploadError } = await supabase.storage
                    .from('uploads')
                    .upload(path, file);

                if (uploadError) {
                    console.error("Supabase Storage Upload Error:", uploadError);
                    // Continue without file if upload fails
                } else {
                    // Get Public URL
                    const { data: publicUrlData } = supabase.storage
                        .from('uploads')
                        .getPublicUrl(path);

                    fileUrl = publicUrlData.publicUrl;
                    console.log("File uploaded successfully. URL:", fileUrl);
                }
            } catch (err) {
                console.error("Unexpected error during file upload:", err);
            }
        }

        // Extract basic data
        const booking = {
            service: formData.get("service") as string,
            upgrades: JSON.parse(formData.get("upgrades") as string || "[]"),
            details: JSON.parse(formData.get("details") as string || "{}"),
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            timestamp: formData.get("timestamp") as string,
            file_url: fileUrl,
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
