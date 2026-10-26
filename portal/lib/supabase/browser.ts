"use client";

import { createBrowserClient } from "@supabase/ssr";
import { supabasePublicConfig } from "./config";

let browserClient: ReturnType<typeof createBrowserClient> | undefined;
export function createClient() {
  if (!browserClient) {
    const { url, key } = supabasePublicConfig();
    browserClient = createBrowserClient(url, key, {
      cookieOptions: {
        name: window.location.protocol === "https:" ? "__Host-sgb-portal-auth" : "sgb-portal-auth",
        path: "/", sameSite: "lax", secure: window.location.protocol === "https:", httpOnly: false
      }
    });
  }
  return browserClient;
}
