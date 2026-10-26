import Link from "next/link";
import { RecoveryForm } from "@/app/components/forms";

export const metadata = { title: "Recover access" };

export default function ForgotPasswordPage() {
  return <section className="panel"><h1>Recover access</h1><p className="muted">Enter your email. If the address is registered, recovery instructions will be sent.</p>
    <RecoveryForm /><p className="muted"><Link href="/login">Return to sign in</Link></p>
  </section>;
}
