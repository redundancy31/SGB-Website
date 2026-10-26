import Link from "next/link";

export default function PortalHome() {
  return <section className="panel"><p className="muted">SGB Engineering</p><h1>Employee self-service portal</h1>
    <p className="muted">Invitation-only access for SGB workers and authorized management.</p>
    <div className="row"><Link className="button" href="/login">Worker Login</Link><a href="https://sgbengg.com">Company website</a></div>
    <p className="muted">Do not use this portal for real employee data until the company Supabase project, custom SMTP, MFA settings, and deployment have been configured and reviewed.</p>
  </section>;
}
