import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// In a real app, use a DB. Here we use a local JSON file.
const DB_PATH = path.join(process.cwd(), "data", "bookings.json");

// Ensure data dir exists
if (!fs.existsSync(path.dirname(DB_PATH))) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        // Extract basic data
        const booking = {
            id: Date.now().toString(),
            service: formData.get("service") as string,
            upgrades: JSON.parse(formData.get("upgrades") as string || "[]"),
            details: JSON.parse(formData.get("details") as string || "{}"),
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string,
            timestamp: formData.get("timestamp") as string,
            hasFile: !!formData.get("file"), // Just tracking if file exists for now
            status: "new"
        };

        // File handling (simplified for file system storage)
        const file = formData.get("file") as File | null;
        let fileName = null;

        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            fileName = `${booking.id}_${file.name}`;
            const uploadPath = path.join(process.cwd(), "public", "uploads", fileName);

            // Ensure uploads dir
            if (!fs.existsSync(path.dirname(uploadPath))) {
                fs.mkdirSync(path.dirname(uploadPath), { recursive: true });
            }

            fs.writeFileSync(uploadPath, buffer);
            // @ts-ignore
            booking.fileUrl = `/uploads/${fileName}`;
        }

        // Save to JSON DB
        let bookings = [];
        if (fs.existsSync(DB_PATH)) {
            const content = fs.readFileSync(DB_PATH, "utf-8");
            try {
                bookings = JSON.parse(content);
            } catch (e) {
                bookings = [];
            }
        }

        bookings.push(booking);
        fs.writeFileSync(DB_PATH, JSON.stringify(bookings, null, 2));

        return NextResponse.json({ success: true, id: booking.id });

    } catch (error) {
        console.error("Booking API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    // Determine if we should allow access (Basic check, real auth handled by middleware or session)
    // For this route, we assume middleware protects /dashboard, but API might need session check if exposed.
    // We will just read the file.

    if (!fs.existsSync(DB_PATH)) {
        return NextResponse.json([]);
    }

    const content = fs.readFileSync(DB_PATH, "utf-8");
    try {
        const bookings = JSON.parse(content);
        return NextResponse.json(bookings.reverse()); // Newest first
    } catch (e) {
        return NextResponse.json([]);
    }
}
