import Link from "next/link";
import { LoginForm } from "@/app/components/forms";
import { safePortalDestination } from "@/lib/auth/redirects";

export const metadata = { title: "Worker Login" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const params = await searchParams;
  return <section className="panel"><h1>Worker Login</h1>
    <p className="muted">Sign in with the individual email address used for your invitation.</p>
    {params.error === "activation" && <p className="notice error" role="alert">This account could not be linked to an active employee invitation. Contact HR.</p>}
    {params.error === "sign-in" && <p className="notice error" role="alert">Please sign in again to continue.</p>}
    <LoginForm next={safePortalDestination(params.next)} />
    <p className="muted"><Link href="/forgot-password">Forgot your password?</Link></p>
    <p className="muted">Account creation is invitation-only. There is no public registration.</p>
  </section>;
}
