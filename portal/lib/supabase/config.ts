export function supabasePublicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase is not configured. Copy .env.example and set local Supabase values.");
  return { url, key };
}

export function portalOrigin() {
  const value = process.env.PORTAL_ORIGIN;
  if (!value) throw new Error("PORTAL_ORIGIN is required.");
  const url = new URL(value);
  if (url.pathname !== "/" || url.search || url.hash || (url.protocol !== "https:" && url.hostname !== "localhost" && url.hostname !== "127.0.0.1")) {
    throw new Error("PORTAL_ORIGIN must be a secure origin without a path or query.");
  }
  return url.origin;
}
