import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { portalOrigin } from "@/lib/supabase/config";

export async function GET(request: NextRequest) {
  const origin = portalOrigin();
  const code = request.nextUrl.searchParams.get("code");
  const flow = request.nextUrl.searchParams.get("flow");
  if (!code || code.length > 2048 || !["invite", "recovery", "login"].includes(flow ?? "")) {
    return NextResponse.redirect(new URL("/login?error=sign-in", origin), { headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL("/login?error=sign-in", origin), { headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
  if (flow === "invite") {
    const { data, error: activationError } = await supabase.rpc("activate_invited_employee");
    if (activationError || data !== true) {
      await supabase.auth.signOut({ scope: "local" });
      return NextResponse.redirect(new URL("/login?error=activation", origin), { headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
    }
    return NextResponse.redirect(new URL("/account/set-password", origin), { headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
  }
  const destination = flow === "recovery" ? "/account/set-password" : "/dashboard";
  return NextResponse.redirect(new URL(destination, origin), { headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
}
