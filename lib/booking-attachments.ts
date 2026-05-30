import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

type BookingUploadMeta = {
  publicUrl?: unknown;
  storagePath?: unknown;
  originalName?: unknown;
};

type BookingLike = {
  file_url?: unknown;
  file_urls?: unknown;
  details?: unknown;
};

const UPLOAD_METADATA_KEYS = [
  "offerFiles",
  "photoFiles",
  "planBOfferFiles",
  "planBPhotoFiles",
  "damageOfferFiles",
  "damagePhotoFiles",
  "handoverPhotoFiles",
  "rentalReadyPhotoFiles",
  "propertyReadyPhotoFiles",
  "estateClearancePhotoFiles",
  "discreetMovePhotoFiles",
  "objectCasePhotoFiles",
  "b2bCleaningPhotoFiles",
  "apartmentCleaningPhotoFiles",
  "routePhotoFiles",
  "cellarTrashroomPhotoFiles",
];

function asRecord(value: unknown): Record<string, any> {
  return value && typeof value === "object" ? (value as Record<string, any>) : {};
}

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function getUploadPublicUrl(storagePath: unknown) {
  const path = cleanString(storagePath);
  if (!path) return "";

  const { data } = getSupabaseAdmin().storage.from("uploads").getPublicUrl(path);
  return data.publicUrl || "";
}

export function getUploadMetadataPublicUrl(meta: BookingUploadMeta) {
  return cleanString(meta.publicUrl) || getUploadPublicUrl(meta.storagePath);
}

export function getUploadMetadataPublicUrls(metadata: unknown) {
  if (!Array.isArray(metadata)) return [];

  return metadata
    .map((item) => getUploadMetadataPublicUrl(asRecord(item) as BookingUploadMeta))
    .filter(Boolean);
}

export function getBookingUploadPublicUrls(details: unknown) {
  const config = asRecord(asRecord(details).configuration);

  return UPLOAD_METADATA_KEYS.flatMap((key) => getUploadMetadataPublicUrls(config[key]));
}

export function enrichBookingFileUrls<T extends BookingLike>(booking: T): T & { file_urls: string[] } {
  const currentUrls = Array.isArray(booking.file_urls)
    ? booking.file_urls.map(cleanString).filter(Boolean)
    : cleanString(booking.file_url)
      ? [cleanString(booking.file_url)]
      : [];
  const uploadUrls = getBookingUploadPublicUrls(booking.details);

  return {
    ...booking,
    file_urls: Array.from(new Set([...currentUrls, ...uploadUrls])),
  };
}
