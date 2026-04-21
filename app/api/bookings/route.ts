import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import sharp from "sharp";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { IntakePayload } from "@/lib/types/intake";

export const runtime = "nodejs";

function parseBudgetValue(value: unknown) {
  const raw = String(value || "").trim();
  if (!raw) return null;

  const normalized = raw.replace(/[^\d.,-]/g, "").replace(/\./g, "").replace(",", ".");
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : null;
}

function normalizeService(service: unknown) {
  const raw = String(service || "umzug").trim().toLowerCase();
  if (raw === "reinigung") return "reinigung";
  if (raw === "entsorgung" || raw === "entruempelung" || raw === "entrümpelung") return "entsorgung";
  if (raw === "bueroumzug" || raw === "büroumzug" || raw === "firmenumzug") return "bueroumzug";
  if (
    raw === "firmenentsorgung" ||
    raw === "bueroentsorgung" ||
    raw === "büroentsorgung" ||
    raw === "gewerbeentsorgung"
  ) {
    return "firmenentsorgung";
  }
  if (
    raw === "private-client-service" ||
    raw === "villenservice" ||
    raw === "private-client" ||
    raw === "private_client" ||
    raw === "private client" ||
    raw === "luxusumzug" ||
    raw === "anwesenservice"
  ) {
    return "private_client";
  }
  if (raw === "leerfahrt" || raw === "leerfahrt-rueckfahrt" || raw === "leer-rueckfahrt") return "leerfahrt";
  if (raw === "beiladung") return "beiladung";
  if (raw === "seniorenumzug") return "seniorenumzug";
  if (raw === "klaviertransport") return "klaviertransport";
  if (raw === "einlagerung") return "einlagerung";
  if (raw === "akteneinlagerung") return "akteneinlagerung";
  if (raw === "malerarbeiten") return "malerarbeiten";
  if (raw === "mixed") return "umzug";
  return "umzug";
}

function buildBudgetInquiryDetails(payload: any): IntakePayload {
  const normalizedService = normalizeService(payload.service);
  const budget = parseBudgetValue(payload.budget);

  return {
    contact: {
      fullName: payload.name || "Interessent",
      email: payload.email || "",
      phone: payload.phone || "",
      callbackPreference: "jederzeit",
      notes: payload.message || "",
    },
    service: {
      type: normalizedService,
      source: "budget_contact_form",
      entryPoint: "/anfrage-mit-preisrahmen",
      presetFromUrl: normalizedService,
    },
    valuation: {
      systemPriceRangeMin: 0,
      systemPriceRangeMax: 0,
      priceRangeMin: 0,
      priceRangeMax: 0,
      valuationLabel: "Preisvorstellung vom Kunden",
      valuationStage: "Direkte Budget-Anfrage",
      accuracyState: "Direkte Budget-Anfrage",
      topDrivers: budget
        ? ["Preisvorstellung vorhanden", "Projektart gesetzt", "Freitext zur Vorprüfung"]
        : ["Projektart gesetzt", "Freitext zur Vorprüfung"],
      customerBudget: budget,
      priceSuggestion: budget,
      priceExplanation:
        "Der Kunde hat eine eigene Preisvorstellung übermittelt. Eine operative Vorprüfung und spätere Einordnung folgen im Backoffice.",
      pricingSignals: {
        inquiryMode: "budget_inquiry",
        requestedBudgetText: String(payload.budget || ""),
        serviceType: normalizedService,
      },
    },
    configuration: {
      requestContext: "budget_inquiry",
      customerMessage: payload.message || "",
      pricingSignals: {
        inquiryMode: "budget_inquiry",
        serviceType: normalizedService,
      },
    },
    metadata: {
      createdAt: payload.timestamp || new Date().toISOString(),
      intakeVersion: "1.1.0",
      source: "budget_contact_form",
      servicePresetFromUrl: normalizedService,
    },
  };
}

async function uploadBookingFiles(files: File[]) {
  const fileUrls: string[] = [];
  const timestamp = Date.now();

  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    if (!file || file.size <= 0 || !file.type.startsWith("image/")) continue;

    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const compressedBuffer = await sharp(buffer)
        .resize(1600, null, { withoutEnlargement: true })
        .jpeg({ quality: 72 })
        .toBuffer();
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").replace(/\.[^/.]+$/, "");
      const storagePath = `bookings/${timestamp}_${index}_${safeName || "upload"}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(storagePath, compressedBuffer, {
          contentType: "image/jpeg",
          upsert: false,
        });

      if (uploadError) {
        console.error("Supabase Storage Upload Error:", uploadError);
        continue;
      }

      const { data: publicUrlData } = supabase.storage.from("uploads").getPublicUrl(storagePath);
      if (publicUrlData.publicUrl) fileUrls.push(publicUrlData.publicUrl);
    } catch (error) {
      console.error("File processing failed:", file.name, error);
    }
  }

  return fileUrls;
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let payload: any = {};
    let fileUrls: string[] = [];

    if (contentType.includes("application/json")) {
      payload = await req.json();
    } else {
      const formData = await req.formData();
      const files = formData
        .getAll("file")
        .filter((entry): entry is File => entry instanceof File && entry.size > 0);

      fileUrls = files.length > 0 ? await uploadBookingFiles(files) : [];
      payload = {
        type: formData.get("type"),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        service: formData.get("service"),
        budget: formData.get("budget"),
        message: formData.get("message"),
        timestamp: formData.get("timestamp"),
        upgrades: formData.get("upgrades") ? JSON.parse(String(formData.get("upgrades"))) : [],
        details: formData.get("details") ? JSON.parse(String(formData.get("details"))) : {},
      };
    }

    const normalizedService = normalizeService(payload.service);
    const details =
      payload.type === "budget_inquiry" ? buildBudgetInquiryDetails(payload) : payload.details || {};

    const booking = {
      name: payload.name || "Interessent",
      email: payload.email || "",
      phone: payload.phone || "",
      service: payload.service ? normalizedService : "umzug",
      timestamp: payload.timestamp || new Date().toISOString(),
      status: "new",
      upgrades: payload.upgrades || [],
      details,
      file_urls: fileUrls,
    };

    const { data, error } = await supabase.from("bookings").insert([booking]).select();

    if (error) {
      return NextResponse.json(
        {
          error: "Database Error",
          message: error.message,
          details: error.details,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.[0]?.id });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Request failed",
        message: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await supabase.from("bookings").select("*").order("timestamp", { ascending: false });
    if (error) throw error;
    return NextResponse.json(data || []);
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
