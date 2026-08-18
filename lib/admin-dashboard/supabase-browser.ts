import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const dashboardSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
const dashboardSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || "";
const dashboardAdminDeleteEnabled =
  process.env.NEXT_PUBLIC_ADMIN_DELETE_ENABLED?.trim().toLowerCase() === "true";

export const dashboardSupabaseConfig = {
  isConfigured: Boolean(dashboardSupabaseUrl && dashboardSupabaseAnonKey),
  adminDeleteEnabled: dashboardAdminDeleteEnabled,
  requiredVariables: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"] as const,
};

let dashboardSupabaseClient: SupabaseClient | null = null;

export function getDashboardSupabaseClient(): SupabaseClient | null {
  if (!dashboardSupabaseConfig.isConfigured) return null;
  if (dashboardSupabaseClient) return dashboardSupabaseClient;

  dashboardSupabaseClient = createClient(dashboardSupabaseUrl, dashboardSupabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: false,
      persistSession: true,
      storageKey: "floxant-admin-session",
    },
  });

  return dashboardSupabaseClient;
}
