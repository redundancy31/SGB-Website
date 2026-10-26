import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabasePublicConfig } from "./config";

export async function createClient() {
  const cookieStore = await cookies();
  const { url, key } = supabasePublicConfig();
  return createServerClient(url, key, {
    cookieOptions: {
      name: process.env.NODE_ENV === "production" ? "__Host-sgb-portal-auth" : "sgb-portal-auth",
      path: "/", sameSite: "lax", secure: process.env.NODE_ENV === "production", httpOnly: false
    },
    cookies: {
      getAll() { return cookieStore.getAll(); },
      setAll(values) {
        try { for (const { name, value, options } of values) cookieStore.set(name, value, options); }
        catch { /* Server Components cannot write cookies; middleware/server actions perform refresh writes. */ }
      }
    }
  });
}
