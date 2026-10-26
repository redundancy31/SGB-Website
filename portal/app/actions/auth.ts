"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { portalOrigin } from "@/lib/supabase/config";
import { safePortalDestination } from "@/lib/auth/redirects";

export type FormState = { error?: string; success?: string };

export async function loginAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = safePortalDestination(String(formData.get("next") ?? ""));
  if (email.length > 320 || password.length > 1024 || !email || !password) return { error: "Sign-in failed. Check your details or contact the portal administrator." };
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Sign-in failed. Check your details or contact the portal administrator." };
  redirect(next);
}

export async function requestRecoveryAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email || email.length > 320) return { success: "If that address is registered, recovery instructions will be sent." };
  try {
    const supabase = await createClient();
    await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${portalOrigin()}/` });
  } catch { /* Keep account existence and provider state private. */ }
  return { success: "If that address is registered, recovery instructions will be sent." };
}

export async function establishPasswordAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");
  if (password.length < 12 || password.length > 1024 || password !== confirmation) return { error: "Use a password of at least 12 characters and make sure both entries match." };
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims?.sub) return { error: "This recovery link is invalid or expired. Request a new one." };
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: "The password could not be changed. Request a new recovery link or contact the portal administrator." };
  redirect("/dashboard");
}

export async function updateOwnPhoneAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims?.claims?.sub) return { error: "Sign in again to update your contact details." };
  const { data: link } = await supabase.from("user_employee_links").select("employee_id,account_status").eq("user_id", claims.claims.sub).maybeSingle();
  if (!link || link.account_status !== "ACTIVE") return { error: "This account is unavailable." };
  const phone = String(formData.get("contact_phone") ?? "").trim();
  if (phone.length > 40) return { error: "Enter a shorter contact number." };
  const { error } = await supabase.from("employee_hr_details").update({ contact_phone: phone || null }).eq("employee_id", link.employee_id);
  if (error) return { error: "The contact detail could not be saved." };
  return { success: "Contact detail saved." };
}
