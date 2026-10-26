import { requirePortalContext } from "@/lib/auth/context";
import { MfaSetup } from "@/app/components/forms";

export const metadata = { title: "Account & Security" };

export default async function SecurityPage({ searchParams }: { searchParams: Promise<{ required?: string }> }) {
  const context = await requirePortalContext();
  const params = await searchParams;
  return <section className="panel"><h1>Account &amp; Security</h1>
    {params.required === "1" && <p className="notice">Complete MFA setup or verification before using management functions.</p>}
    <p className="muted">Privileged roles must use an authenticator factor. Enrollment and verification are checked against Supabase Auth assurance claims and database policies.</p>
    <MfaSetup />
    <p className="muted">Your roles: {context.roles.length ? context.roles.join(", ") : "None assigned"}</p>
    <p className="muted">If you lose access to your authenticator, contact the designated portal operator. An operator-assisted reset must be verified and audited; do not use shared recovery codes.</p>
  </section>;
}
