import { PasswordForm } from "@/app/components/forms";

export const metadata = { title: "Set password" };

export default function SetPasswordPage() {
  return <section className="panel"><h1>Set your password</h1><p className="muted">Use a password manager and a unique password for this portal.</p><PasswordForm /></section>;
}
