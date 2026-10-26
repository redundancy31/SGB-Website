import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { supabasePublicConfig } from "./config";

// Only import this in narrow server actions which need Auth Admin operations.
export function createAdminClient() {
  const { url } = supabasePublicConfig();
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!secret) throw new Error("SUPABASE_SECRET_KEY is not configured.");
  return createSupabaseClient(url, secret, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false }
  });
}
