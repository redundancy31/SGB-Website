import type { Metadata } from "next";

import { SectionHeading } from "@/components/sections/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Placeholder privacy policy for SGB Engineering website."
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section-space">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Legal"
          title="Privacy Policy (Placeholder)"
          description="Replace this content with legal counsel-reviewed privacy policy text."
        />
        <div className="mt-8 space-y-6 rounded-lg border border-slate-200 bg-white p-8 text-sm text-muted-foreground">
          <section>
            <h2 className="text-base font-semibold text-primary">1. Data Collection</h2>
            <p className="mt-2">Placeholder section describing what personal and project data may be collected through forms and communications.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-primary">2. Data Usage</h2>
            <p className="mt-2">Placeholder section for service delivery, communication and compliance-related use cases.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-primary">3. Data Retention and Security</h2>
            <p className="mt-2">Placeholder section on retention period, access controls and security practices.</p>
          </section>
          <section>
            <h2 className="text-base font-semibold text-primary">4. Contact</h2>
            <p className="mt-2">Placeholder legal contact details for privacy matters.</p>
          </section>
        </div>
      </div>
    </section>
  );
}
