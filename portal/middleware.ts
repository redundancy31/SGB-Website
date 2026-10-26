import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const protectedPath = (pathname: string) =>
  pathname === "/dashboard" || pathname.startsWith("/dashboard/") ||
  pathname === "/account" || pathname.startsWith("/account/") ||
  pathname === "/management" || pathname.startsWith("/management/");

export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return NextResponse.next({ request });

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, key, {
    cookieOptions: {
      name: process.env.NODE_ENV === "production" ? "__Host-sgb-portal-auth" : "sgb-portal-auth",
      path: "/", sameSite: "lax", secure: process.env.NODE_ENV === "production", httpOnly: false
    },
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(values) {
        for (const { name, value } of values) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of values) response.cookies.set(name, value, options);
      }
    }
  });

  // getClaims verifies the JWT; getSession would only trust cookie contents.
  const { data, error } = await supabase.auth.getClaims();
  if (protectedPath(request.nextUrl.pathname) && (error || !data?.claims?.sub)) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", request.nextUrl.pathname);
    const redirectResponse = NextResponse.redirect(login);
    for (const cookie of response.cookies.getAll()) redirectResponse.cookies.set(cookie);
    return redirectResponse;
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"]
};
