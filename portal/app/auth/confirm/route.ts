import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { portalOrigin } from "@/lib/supabase/config";

export async function GET(request: NextRequest) {
  const origin = portalOrigin();
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const rawType = request.nextUrl.searchParams.get("type");
  if (!tokenHash || tokenHash.length > 512 || (rawType !== "invite" && rawType !== "recovery")) {
    return NextResponse.redirect(new URL("/login?error=sign-in", origin), { headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: rawType as EmailOtpType });
  if (error) return NextResponse.redirect(new URL("/login?error=sign-in", origin), { headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });

  if (rawType === "invite") {
    const { data: activated, error: activationError } = await supabase.rpc("activate_invited_employee");
    if (activationError || activated !== true) {
      await supabase.auth.signOut({ scope: "local" });
      return NextResponse.redirect(new URL("/login?error=activation", origin), { headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
    }
    return NextResponse.redirect(new URL("/account/set-password", origin), { headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
  }
  return NextResponse.redirect(new URL("/account/set-password", origin), { headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
}
