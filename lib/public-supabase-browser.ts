import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
const publicSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || "";

let publicSupabaseClient: SupabaseClient | null = null;

export function getPublicSupabaseClient(): SupabaseClient | null {
  if (!publicSupabaseUrl || !publicSupabaseAnonKey) return null;
  if (publicSupabaseClient) return publicSupabaseClient;

  publicSupabaseClient = createClient(publicSupabaseUrl, publicSupabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  return publicSupabaseClient;
}
