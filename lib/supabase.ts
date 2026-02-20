import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "placeholder";

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) {
    console.warn("WARNING: Missing Supabase environment variables. Using placeholder values.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
