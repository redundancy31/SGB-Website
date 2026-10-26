import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Worker Login",
  description: "Access to the SGB Engineering employee portal."
};

export default function WorkerLoginPage() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">SGB Engineering employee portal</p>
          <h1 className="mt-3 text-3xl font-bold text-primary">Worker Login</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Employee portal access is being prepared. Sign-in and account activation are not available on this website yet.
          </p>
          <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
            Do not enter a password or send personal or employment documents through this page. SGB will provide workers with the official portal address when access is ready.
          </p>
          <Link href="/" className="mt-6 inline-flex min-h-11 items-center font-semibold text-secondary underline underline-offset-4">
            Return to the company website
          </Link>
        </div>
      </div>
    </section>
  );
}
