import { handleAdminBookingDelete } from "../../../_lib/admin-booking-delete.js";

export async function onRequestDelete(context) {
  return handleAdminBookingDelete(context);
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "DELETE, OPTIONS",
      "Cache-Control": "no-store",
    },
  });
}
