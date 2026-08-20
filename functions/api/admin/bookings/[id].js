import { handleAdminBookingDelete } from "../../../_lib/admin-booking-delete.js";
import { handleAdminBookingStatusUpdate } from "../../../_lib/admin-booking-status.js";

export async function onRequestPatch(context) {
  return handleAdminBookingStatusUpdate(context);
}

export async function onRequestDelete(context) {
  return handleAdminBookingDelete(context);
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "PATCH, DELETE, OPTIONS",
      "Cache-Control": "no-store",
    },
  });
}
