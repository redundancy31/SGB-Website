import type { Metadata } from "next";

import { SectionHeading } from "@/components/sections/SectionHeading";

export const metadata: Metadata = {
  title: "Terms",
  description: "Placeholder website terms for SGB Engineering."
};

export default function TermsPage() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Legal"
          title="Terms of Use (Placeholder)"
          description="Replace this content with legal counsel-reviewed terms."
        />
        <div className="mt-8 space-y-6 rounded-lg border border-slate-200 bg-white p-8 text-sm text-muted-foreground">
          <section>
            <h2 className="text-base font-semibold text-primary">1. Website Usage</h2>
            <p className="mt-2">Placeholder terms regarding permitted website use and information reliance.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-primary">2. Intellectual Property</h2>
            <p className="mt-2">Placeholder terms for ownership of logos, media and technical documents.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-primary">3. Liability</h2>
            <p className="mt-2">Placeholder limitation clauses and service disclaimer language.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-primary">4. Governing Law</h2>
            <p className="mt-2">Placeholder jurisdiction and governing law details.</p>
          </section>
        </div>
      </div>
    </section>
  );
}
