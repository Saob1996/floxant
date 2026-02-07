import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import sharp from "sharp";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const files = formData.getAll("file") as File[];
        const fileUrls: string[] = [];

        // Handle File Uploads to Supabase Storage with Compression
        if (files && files.length > 0) {
            const timestamp = Date.now();

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.size > 0 && file.type.startsWith("image/")) {
                    try {
                        const buffer = Buffer.from(await file.arrayBuffer());

                        // Compress image using sharp
                        const compressedBuffer = await sharp(buffer)
                            .resize(1600, null, { withoutEnlargement: true }) // Max width 1600px, preserve aspect ratio
                            .jpeg({ quality: 70 }) // Convert to JPEG with 70% quality
                            .toBuffer();

                        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
                        // Use .jpg extension since we converted to jpeg
                        const filename = `${timestamp}_${i}_${safeName}.jpg`;
                        const path = `bookings/${filename}`;

                        console.log(`Uploading compressed file ${i + 1}/${files.length} to Supabase:`, path);

                        const { error: uploadError } = await supabase.storage
                            .from('uploads')
                            .upload(path, compressedBuffer, {
                                contentType: 'image/jpeg'
                            });

                        if (uploadError) {
                            console.error("Supabase Storage Upload Error:", uploadError);
                        } else {
                            const { data: publicUrlData } = supabase.storage
                                .from('uploads')
                                .getPublicUrl(path);

                            fileUrls.push(publicUrlData.publicUrl);
                        }
                    } catch (err) {
                        console.error("Error processing file:", file.name, err);
                    }
                }
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
            file_urls: fileUrls, // Store array of URLs
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
