import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { portalOrigin } from "@/lib/supabase/config";

export async function POST(request: NextRequest) {
  const origin = portalOrigin();
  if (request.headers.get("origin") !== origin) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "local" });
  return NextResponse.redirect(new URL("/login", origin), { status: 303, headers: { "Cache-Control": "no-store" } });
}
